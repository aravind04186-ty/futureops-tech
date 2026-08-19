import React, { useState } from 'react';
import { Terminal as TerminalIcon, Play, RotateCcw, Copy, Check } from 'lucide-react';

interface CommandOutput {
  command: string;
  output: string;
}

export const InteractiveTerminal: React.FC = () => {
  const [inputCommand, setInputCommand] = useState('');
  const [history, setHistory] = useState<CommandOutput[]>([
    {
      command: 'docker run -d -p 8080:80 netflix-app:v2.4',
      output: 'a89c31b87201: Pulling from library/netflix-app\nStatus: Downloaded newer image for netflix-app:v2.4\nContainer started on port 0.0.0.0:8080 (ID: e91f7a098bc2)'
    },
    {
      command: 'kubectl get pods -n production',
      output: 'NAME                           READY   STATUS    RESTARTS   AGE\nnetflix-stream-7d8b9f-x4k21   1/1     Running   0          4m22s\nnetflix-stream-7d8b9f-p8l90   1/1     Running   0          4m20s\nauth-service-5f6c4d-90q11     1/1     Running   0          12m'
    }
  ]);
  const [copied, setCopied] = useState(false);

  const sampleCommands = [
    'kubectl get pods -n production',
    'docker ps',
    'aws s3 ls',
    'terraform plan',
    'git status'
  ];

  const handleRunCommand = (cmdToRun?: string) => {
    const cmd = (cmdToRun || inputCommand).trim();
    if (!cmd) return;

    let output = '';
    const lower = cmd.toLowerCase();

    if (lower.includes('kubectl get pods')) {
      output = `NAME                           READY   STATUS    RESTARTS   AGE
netflix-stream-7d8b9f-x4k21   1/1     Running   0          5m12s
netflix-stream-7d8b9f-p8l90   1/1     Running   0          5m10s
auth-service-5f6c4d-90q11     1/1     Running   0          14m
payment-api-81a2bc-33b09      1/1     Running   0          2h
prometheus-server-0           1/1     Running   0          3d`;
    } else if (lower.includes('docker ps')) {
      output = `CONTAINER ID   IMAGE                COMMAND                  CREATED         STATUS         PORTS
e91f7a098bc2   netflix-app:v2.4    "docker-entrypoint.s…"   2 minutes ago   Up 2 minutes   0.0.0.0:8080->80/tcp
4b210a99c8f1   redis:7-alpine      "docker-entrypoint.s…"   10 minutes ago  Up 10 minutes  6379/tcp
90a12e34f8a1   prom/prometheus     "/bin/prometheus --c…"   1 hour ago      Up 1 hour      9090/tcp`;
    } else if (lower.includes('aws s3 ls')) {
      output = `2026-07-28 14:22:01 futureops-terraform-state-prod-s3
2026-07-29 09:10:45 netflix-media-assets-cdn-bucket
2026-07-30 18:00:12 futureops-app-backups-archive`;
    } else if (lower.includes('terraform plan')) {
      output = `Plan: 3 to add, 1 to change, 0 to destroy.

  + aws_eks_cluster.prod_eks
  + aws_vpc.custom_vpc
  + aws_subnet.private_subnets[0]
  ~ aws_security_group_rule.allow_tls`;
    } else if (lower.includes('git status')) {
      output = `On branch feature/gitops-argocd
Your branch is up to date with 'origin/feature/gitops-argocd'.

Changes to be committed:
  modified:   helm-chart/values.yaml (image.tag: "v2.5")
  modified:   .github/workflows/deploy.yml`;
    } else if (lower.includes('help')) {
      output = `FutureOps-Tech Terminal Simulator Help:
Available quick commands:
  - kubectl get pods -n production
  - docker ps
  - aws s3 ls
  - terraform plan
  - git status
  - clear`;
    } else if (lower === 'clear') {
      setHistory([]);
      setInputCommand('');
      return;
    } else {
      output = `bash: ${cmd}: Command executed successfully in FutureOps Cloud Sandbox Environment. Status [200 OK]`;
    }

    setHistory(prev => [...prev, { command: cmd, output }]);
    setInputCommand('');
  };

  const handleCopyHistory = () => {
    const text = history.map(h => `$ ${h.command}\n${h.output}`).join('\n\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-2xl bg-slate-950 border border-slate-800 shadow-2xl overflow-hidden font-mono text-xs text-slate-200">
      
      {/* Terminal Top Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-slate-900 border-b border-slate-800">
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1.5">
            <div className="w-3 h-3 rounded-full bg-rose-500/80" />
            <div className="w-3 h-3 rounded-full bg-amber-500/80" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
          </div>
          <span className="text-slate-400 font-semibold text-[11px] ml-2 flex items-center gap-1.5">
            <TerminalIcon className="w-3.5 h-3.5 text-cyan-400" /> futureops@cloud-lab-us-east-1:~
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={handleCopyHistory}
            className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
            title="Copy Output"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
          <button
            onClick={() => setHistory([])}
            className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
            title="Reset Terminal"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Quick Sample Cmd Badges */}
      <div className="px-4 py-2 bg-slate-900/60 border-b border-slate-800/80 flex flex-wrap items-center gap-2 text-[11px]">
        <span className="text-slate-400 font-sans">Quick Commands:</span>
        {sampleCommands.map((c, i) => (
          <button
            key={i}
            onClick={() => handleRunCommand(c)}
            className="px-2 py-0.5 rounded bg-slate-800 hover:bg-cyan-950 hover:text-cyan-300 border border-slate-700 text-slate-300 transition"
          >
            {c}
          </button>
        ))}
      </div>

      {/* Terminal Screen Output */}
      <div className="p-4 space-y-4 max-h-72 overflow-y-auto leading-relaxed">
        <div className="text-slate-400">
          # FutureOps-Tech Cloud Sandbox Shell v4.2 [Ubuntu 24.04 LTS]\n
          # Type 'help' or click any quick command above to test interactive CLI execution.
        </div>

        {history.map((item, index) => (
          <div key={index} className="space-y-1">
            <div className="flex items-center text-cyan-400">
              <span className="text-emerald-400 font-bold mr-1.5">student@futureops:~$</span>
              <span className="font-semibold text-white">{item.command}</span>
            </div>
            <pre className="text-slate-300 whitespace-pre-wrap pl-3 border-l-2 border-slate-800">{item.output}</pre>
          </div>
        ))}
      </div>

      {/* Command Input Row */}
      <div className="p-3 bg-slate-900 border-t border-slate-800 flex items-center space-x-2">
        <span className="text-emerald-400 font-bold">student@futureops:~$</span>
        <input
          type="text"
          value={inputCommand}
          onChange={e => setInputCommand(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleRunCommand()}
          placeholder="Type command (e.g. docker ps) and hit Enter..."
          className="flex-1 bg-transparent text-slate-100 focus:outline-none placeholder-slate-500 font-mono text-xs"
        />
        <button
          onClick={() => handleRunCommand()}
          className="p-1.5 rounded bg-cyan-600 hover:bg-cyan-500 text-white transition flex items-center space-x-1"
        >
          <Play className="w-3.5 h-3.5" />
        </button>
      </div>

    </div>
  );
};
