import React from 'react';
import { useAuth } from '../../context/AuthContext';

export const DevOpsGuidePage: React.FC = () => {
  const { setIsDemoModalOpen } = useAuth();

  return (
    <div className="bg-gray-50 text-[#111827] min-h-screen font-sans py-12 px-4 sm:px-8">
      <div className="max-w-5xl mx-auto space-y-12">
        
        {/* Header Title Section (Text Only) */}
        <div className="bg-white rounded-2xl p-6 sm:p-10 border border-gray-200 shadow-sm space-y-4 text-center sm:text-left">
          <div className="inline-block px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-wider">
            Career Guide &amp; Master Blueprint
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#111827] font-poppins leading-tight">
            How to Succeed in DevOps &amp; Get Your First Job
          </h1>
          <p className="text-base text-[#6B7280] leading-relaxed max-w-3xl">
            A comprehensive, step-by-step career roadmap for aspiring engineers, freshers, and IT professionals transitioning into high-demand DevOps, Cloud, and SRE roles.
          </p>
          <div className="pt-2 text-xs text-gray-500 font-mono flex flex-wrap gap-4 border-t border-gray-100">
            <span>Published by: FutureOps-Tech Academy</span>
            <span>•</span>
            <span>Target Roles: DevOps Engineer, Cloud Specialist, SRE</span>
            <span>•</span>
            <span>Reading Time: 12 min</span>
          </div>
        </div>

        {/* Section 1: What is DevOps and why it is a high-demand career */}
        <section className="bg-white rounded-2xl p-6 sm:p-10 border border-gray-200 shadow-sm space-y-4">
          <div className="text-xs font-bold text-blue-600 uppercase tracking-widest font-mono">Section 1</div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#111827]">
            What is DevOps and Why It Is a High-Demand Career
          </h2>
          <div className="space-y-4 text-sm text-[#6B7280] leading-relaxed">
            <p>
              DevOps is a set of cultural philosophies, practices, and automated tools that increases an organization's ability to deliver applications and services at high velocity. Rather than operating in isolated silos, Development (Dev) and Operations (Ops) teams work together across the entire software application lifecycle—from development and testing to deployment and infrastructure management.
            </p>
            <p>
              Why is DevOps in such extreme demand globally?
            </p>
            <ul className="list-disc pl-5 space-y-2 text-[#111827] font-medium">
              <li>
                <strong className="text-[#111827]">Accelerated Cloud Migration:</strong> Enterprise organizations across every industry are shifting away from traditional on-premise servers toward cloud infrastructure like AWS, Azure, and Google Cloud, requiring skilled engineers to manage automated cloud deployments.
              </li>
              <li>
                <strong className="text-[#111827]">High Compensation &amp; Career Growth:</strong> Due to a critical global shortage of qualified DevOps talent, certified engineers enjoy competitive starting salaries, rapid career advancement, and high demand across major IT hubs including Bengaluru, Hyderabad, Chennai, Mumbai, and Pune.
              </li>
              <li>
                <strong className="text-[#111827]">High Operational Efficiency:</strong> Companies that adopt DevOps practices achieve 200x faster deployment frequency, significantly lower failure rates for new releases, and faster mean-time-to-recovery (MTTR).
              </li>
            </ul>
          </div>
        </section>

        {/* Section 2: Essential Skills You Need to Learn */}
        <section className="bg-white rounded-2xl p-6 sm:p-10 border border-gray-200 shadow-sm space-y-6">
          <div className="text-xs font-bold text-blue-600 uppercase tracking-widest font-mono">Section 2</div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#111827]">
            Essential Skills You Need to Master
          </h2>
          <p className="text-sm text-[#6B7280]">
            To build a successful career as a job-ready DevOps Engineer, you must gain hands-on mastery over the following core technology domains:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-xl bg-gray-50 border border-gray-200 space-y-2">
              <h3 className="text-base font-bold text-[#111827]">1. Linux Operating System</h3>
              <p className="text-xs text-[#6B7280] leading-relaxed">
                Master terminal navigation, file permissions, user management, process monitoring, systemctl services, SSH key authentication, and network utilities (netstat, curl, iptables).
              </p>
            </div>

            <div className="p-5 rounded-xl bg-gray-50 border border-gray-200 space-y-2">
              <h3 className="text-base font-bold text-[#111827]">2. Git &amp; Version Control</h3>
              <p className="text-xs text-[#6B7280] leading-relaxed">
                Understand code repository management, branching strategies (GitFlow, feature branches), pull requests, merge conflict resolution, and GitOps workflows on GitHub.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-gray-50 border border-gray-200 space-y-2">
              <h3 className="text-base font-bold text-[#111827]">3. Docker Containerization</h3>
              <p className="text-xs text-[#6B7280] leading-relaxed">
                Learn container architecture, writing optimized multi-stage Dockerfiles, image caching, container networking, volume mounting, and multi-container orchestration with Docker Compose.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-gray-50 border border-gray-200 space-y-2">
              <h3 className="text-base font-bold text-[#111827]">4. Kubernetes Orchestration</h3>
              <p className="text-xs text-[#6B7280] leading-relaxed">
                Master cluster architecture, Pods, Deployments, Services, Ingress controllers, Persistent Volumes, Horizontal Pod Autoscaling (HPA), and Helm package management.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-gray-50 border border-gray-200 space-y-2">
              <h3 className="text-base font-bold text-[#111827]">5. Amazon Web Services (AWS)</h3>
              <p className="text-xs text-[#6B7280] leading-relaxed">
                Build core cloud infrastructure using VPC subnets, EC2 compute instances, IAM security policies, S3 object storage, Application Load Balancers (ALB), and Amazon EKS clusters.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-gray-50 border border-gray-200 space-y-2">
              <h3 className="text-base font-bold text-[#111827]">6. Terraform Infrastructure as Code</h3>
              <p className="text-xs text-[#6B7280] leading-relaxed">
                Provision repeatable cloud environments declaratively using HashiCorp Configuration Language (HCL), modular code design, S3 remote state storage, and DynamoDB state locking.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-gray-50 border border-gray-200 space-y-2">
              <h3 className="text-base font-bold text-[#111827]">7. Jenkins &amp; CI/CD Automation</h3>
              <p className="text-xs text-[#6B7280] leading-relaxed">
                Construct end-to-end continuous integration pipelines using Jenkinsfile Pipeline-as-Code, GitHub webhooks, automated unit testing, static security scans, and artifact pushes.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-gray-50 border border-gray-200 space-y-2">
              <h3 className="text-base font-bold text-[#111827]">8. CI/CD &amp; Deployment Strategies</h3>
              <p className="text-xs text-[#6B7280] leading-relaxed">
                Understand modern deployment patterns including Blue-Green deployments, Canary releases, Rolling updates, and automated rollback triggers for zero downtime.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-gray-50 border border-gray-200 space-y-2">
              <h3 className="text-base font-bold text-[#111827]">9. Monitoring &amp; Observability</h3>
              <p className="text-xs text-[#6B7280] leading-relaxed">
                Configure full-stack cluster telemetry using Prometheus metric scraping, PromQL queries, Grafana visual dashboards, and AlertManager notification routing to Slack/email.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-gray-50 border border-gray-200 space-y-2">
              <h3 className="text-base font-bold text-[#111827]">10. Shell Scripting &amp; Automation</h3>
              <p className="text-xs text-[#6B7280] leading-relaxed">
                Write robust Bash scripts for automated system maintenance, cron job execution, log parsing, backup routines, and environment setup scripts.
              </p>
            </div>
          </div>
        </section>

        {/* Section 3: Create Real-Time Projects and Build a Portfolio */}
        <section className="bg-white rounded-2xl p-6 sm:p-10 border border-gray-200 shadow-sm space-y-4">
          <div className="text-xs font-bold text-blue-600 uppercase tracking-widest font-mono">Section 3</div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#111827]">
            Create Real-Time Projects and Build a Strong Portfolio
          </h2>
          <div className="space-y-4 text-sm text-[#6B7280] leading-relaxed">
            <p>
              Theoretical knowledge alone will not clear technical DevOps interviews. Recruiters look for proof of hands-on capability. Building and showcasing real production-grade projects is the most effective way to validate your skills.
            </p>
            <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-[#111827] space-y-2">
              <h4 className="font-bold text-sm">Key Portfolio Projects Every Candidate Must Build:</h4>
              <ol className="list-decimal pl-5 space-y-1.5 text-xs text-gray-800">
                <li><strong>Automated Microservices CI/CD Pipeline:</strong> A complete pipeline that triggers on Git commit, builds Docker images, runs security scans with Trivy, pushes to DockerHub, and deploys automatically to AWS EC2 or Kubernetes.</li>
                <li><strong>Production Kubernetes Microservices Cluster:</strong> Deployment of a multi-tier microservices application with Ingress routing, SSL termination, ClusterIP services, and Horizontal Pod Autoscaling (HPA).</li>
                <li><strong>Terraform Multi-AZ AWS Cloud Infrastructure:</strong> Declarative HCL code provisioning a custom VPC across two availability zones with public/private subnets, Application Load Balancer, and S3 backend state locking.</li>
                <li><strong>Full Observability Stack with Prometheus &amp; Grafana:</strong> Real-time cluster metrics monitoring dashboard tracking CPU, memory, HTTP response codes, and automated alert rules.</li>
              </ol>
            </div>
            <p>
              Host all your project code in public GitHub repositories. Include detailed architecture diagrams, step-by-step setup commands, environment prerequisites, and live demo links in clean, well-formatted README files.
            </p>
          </div>
        </section>

        {/* Section 4: Practice Interview Questions & Technical Assessments */}
        <section className="bg-white rounded-2xl p-6 sm:p-10 border border-gray-200 shadow-sm space-y-4">
          <div className="text-xs font-bold text-blue-600 uppercase tracking-widest font-mono">Section 4</div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#111827]">
            Practice Interview Questions and Technical Assessments Regularly
          </h2>
          <div className="space-y-3 text-sm text-[#6B7280] leading-relaxed">
            <p>
              DevOps technical interviews assess both theoretical concepts and practical troubleshooting abilities. Allocate dedicated time daily to solve real scenario-based questions.
            </p>
            <ul className="list-disc pl-5 space-y-2 text-[#111827]">
              <li><strong>Scenario Troubleshooting:</strong> Practice diagnosing common operational issues like Kubernetes Pod CrashLoopBackOff errors, high CPU utilization alerts, broken Jenkins pipelines, or DNS resolution failures.</li>
              <li><strong>CLI Command Speed:</strong> Practice Linux terminal commands and kubectl syntax until you can inspect logs, check pod status, and edit deployments comfortably in real time.</li>
              <li><strong>Architecture Explanation:</strong> Practice explaining your project architecture out loud. Be prepared to defend your technology choices (e.g., why Kubernetes instead of Docker Swarm, or why Terraform instead of CloudFormation).</li>
            </ul>
          </div>
        </section>

        {/* Section 5: Improve Problem-Solving and Communication Skills */}
        <section className="bg-white rounded-2xl p-6 sm:p-10 border border-gray-200 shadow-sm space-y-4">
          <div className="text-xs font-bold text-blue-600 uppercase tracking-widest font-mono">Section 5</div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#111827]">
            Improve Problem-Solving and Communication Skills
          </h2>
          <div className="space-y-3 text-sm text-[#6B7280] leading-relaxed">
            <p>
              DevOps is inherently a collaborative role. A great DevOps engineer acts as a bridge connecting developers, quality assurance engineers, system administrators, and business leadership.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-gray-50 border border-gray-200">
                <h4 className="font-bold text-[#111827] text-xs mb-1">Analytical Problem-Solving</h4>
                <p className="text-xs text-[#6B7280]">
                  Focus on root-cause analysis rather than temporary quick fixes. Learn how to systematically parse system logs, analyze stack traces, and isolate network bottlenecks.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-gray-50 border border-gray-200">
                <h4 className="font-bold text-[#111827] text-xs mb-1">Clear Technical Communication</h4>
                <p className="text-xs text-[#6B7280]">
                  Practice explaining complex cloud architectures in simple terms. Develop strong documentation habits for writing clear operational runbooks, post-mortem reports, and team guides.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 6: Learn Resume Building & LinkedIn Profile Optimization */}
        <section className="bg-white rounded-2xl p-6 sm:p-10 border border-gray-200 shadow-sm space-y-4">
          <div className="text-xs font-bold text-blue-600 uppercase tracking-widest font-mono">Section 6</div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#111827]">
            Learn Resume Building and LinkedIn Profile Optimization
          </h2>
          <div className="space-y-4 text-sm text-[#6B7280] leading-relaxed">
            <p>
              Your resume and LinkedIn profile are your primary tools for securing interview calls. Most major IT recruiters use Applicant Tracking Systems (ATS) to filter candidate applications.
            </p>
            <div className="space-y-2">
              <h4 className="font-bold text-[#111827]">ATS Resume Guidelines:</h4>
              <ul className="list-disc pl-5 space-y-1.5 text-xs text-gray-800">
                <li>Use clean, single-column text formatting without tables or graphics that confuse ATS scanners.</li>
                <li>Highlight quantifiable achievements in bullet points (e.g., "Automated CI/CD pipeline reducing build and deployment time by 55%").</li>
                <li>Include a prominent technical skill section listing Linux, Docker, Kubernetes, AWS, Terraform, Jenkins, Git, and Prometheus.</li>
                <li>Place your GitHub profile link at the top of your resume so technical hiring managers can review your project code directly.</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-bold text-[#111827]">LinkedIn Profile Optimization:</h4>
              <ul className="list-disc pl-5 space-y-1.5 text-xs text-gray-800">
                <li>Craft a professional headline: "Aspiring DevOps Engineer | AWS, Docker, Kubernetes, Terraform &amp; CI/CD".</li>
                <li>Write a compelling summary detailing your technical journey, hands-on lab experience, and core project accomplishments.</li>
                <li>Regularly post short technical updates, architectural snippets, or lab milestone summaries to build industry visibility.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 7: Apply Consistently for Internships and Full-Time Roles */}
        <section className="bg-white rounded-2xl p-6 sm:p-10 border border-gray-200 shadow-sm space-y-4">
          <div className="text-xs font-bold text-blue-600 uppercase tracking-widest font-mono">Section 7</div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#111827]">
            Apply Consistently for Internships and Full-Time DevOps Roles
          </h2>
          <div className="space-y-3 text-sm text-[#6B7280] leading-relaxed">
            <p>
              Job searching is a numbers game that requires strategy, consistency, and discipline. Set daily targets and leverage multiple job channels systematically.
            </p>
            <ul className="list-disc pl-5 space-y-2 text-[#111827]">
              <li><strong>Target Multiple Job Portals:</strong> Maintain active candidate profiles across LinkedIn, Naukri, Indeed, Foundit, and specialized tech job platforms.</li>
              <li><strong>Apply for Relevant Target Titles:</strong> Search for Junior DevOps Engineer, Associate Cloud Engineer, Build &amp; Release Engineer, Site Reliability Engineering (SRE) Trainee, and Infrastructure Engineer roles.</li>
              <li><strong>Direct Networking:</strong> Reach out directly to DevOps Leads, SRE Managers, and Tech Recruiters on LinkedIn with a concise, professional message highlighting your GitHub portfolio and willingness to contribute.</li>
              <li><strong>Daily Application Target:</strong> Aim to submit 10 to 15 tailored applications daily and track responses in a simple spreadsheet.</li>
            </ul>
          </div>
        </section>

        {/* Section 8: Attend Mock Interviews and HR Interview Preparation */}
        <section className="bg-white rounded-2xl p-6 sm:p-10 border border-gray-200 shadow-sm space-y-4">
          <div className="text-xs font-bold text-blue-600 uppercase tracking-widest font-mono">Section 8</div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#111827]">
            Attend Mock Interviews and HR Interview Preparation Sessions
          </h2>
          <div className="space-y-3 text-sm text-[#6B7280] leading-relaxed">
            <p>
              Mock interviews bridge the gap between preparing by yourself and performing confidently under real interview conditions.
            </p>
            <div className="space-y-2">
              <h4 className="font-bold text-[#111827]">Technical Mock Rounds:</h4>
              <p className="text-xs text-[#6B7280]">
                Participate in structured 1-on-1 mock interviews evaluated by experienced DevOps architects. Request detailed feedback on your technical depth, problem-solving approach, and CLI speed.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-bold text-[#111827]">HR &amp; Behavioral Round Preparation:</h4>
              <p className="text-xs text-[#6B7280]">
                Prepare polished, honest answers for standard HR questions including "Tell me about yourself," "Why do you want to work in DevOps?", explaining career gaps or transitions, notice period discussions, and salary expectations.
              </p>
            </div>
          </div>
        </section>

        {/* Section 9: Stay Updated with Latest DevOps Tools & Cloud Tech */}
        <section className="bg-white rounded-2xl p-6 sm:p-10 border border-gray-200 shadow-sm space-y-4">
          <div className="text-xs font-bold text-blue-600 uppercase tracking-widest font-mono">Section 9</div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#111827]">
            Stay Updated with the Latest DevOps Tools and Cloud Technologies
          </h2>
          <div className="space-y-3 text-sm text-[#6B7280] leading-relaxed">
            <p>
              The cloud ecosystem evolves rapidly. To maintain a competitive edge, make continuous learning an ongoing habit throughout your career.
            </p>
            <ul className="list-disc pl-5 space-y-2 text-[#111827]">
              <li><strong>CNCF Landscape:</strong> Follow the Cloud Native Computing Foundation (CNCF) landscape to monitor emerging open-source technologies in containerization, service meshes (Istio), and GitOps (ArgoCD).</li>
              <li><strong>Emerging Industry Trends:</strong> Explore DevSecOps security integrations, AI-assisted operations (AIOps), infrastructure drift detection, and serverless computing.</li>
              <li><strong>Industry Blogs &amp; Podcasts:</strong> Read engineering blogs from cloud leaders (AWS Architecture Blog, Kubernetes Blog, HashiCorp Blog) to stay informed on modern enterprise best practices.</li>
            </ul>
          </div>
        </section>

        {/* Section 10: Success Roadmap from Beginner to Job-Ready DevOps Engineer */}
        <section className="bg-white rounded-2xl p-6 sm:p-10 border border-gray-200 shadow-sm space-y-6">
          <div className="text-xs font-bold text-blue-600 uppercase tracking-widest font-mono">Section 10</div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#111827]">
            Success Roadmap: Beginner to Job-Ready DevOps Engineer
          </h2>
          <p className="text-sm text-[#6B7280]">
            Follow this structured 4-phase execution timeline designed to take you from foundational concepts to enterprise job readiness in 16 to 20 weeks:
          </p>

          <div className="space-y-4">
            <div className="p-5 rounded-xl bg-gray-50 border border-gray-200 space-y-2">
              <div className="text-xs font-bold text-blue-600 uppercase font-mono">Phase 1: Foundations (Weeks 1 - 4)</div>
              <h3 className="text-base font-bold text-[#111827]">Linux Administration, Networking &amp; Git</h3>
              <p className="text-xs text-[#6B7280]">
                Master Linux CLI commands, process control, file permissions, shell scripting basics, networking concepts (TCP/IP, DNS, HTTP/HTTPS, SSH), and Git workflow management on GitHub.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-gray-50 border border-gray-200 space-y-2">
              <div className="text-xs font-bold text-blue-600 uppercase font-mono">Phase 2: Containerization &amp; CI/CD (Weeks 5 - 9)</div>
              <h3 className="text-base font-bold text-[#111827]">Docker &amp; Jenkins Automation Pipelines</h3>
              <p className="text-xs text-[#6B7280]">
                Build optimized Docker images, write multi-container Compose environments, configure Jenkins master/agent nodes, and author automated Jenkinsfile CI/CD build and scan pipelines.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-gray-50 border border-gray-200 space-y-2">
              <div className="text-xs font-bold text-blue-600 uppercase font-mono">Phase 3: Cloud Infrastructure &amp; Orchestration (Weeks 10 - 15)</div>
              <h3 className="text-base font-bold text-[#111827]">AWS Cloud, Terraform IaC &amp; Kubernetes</h3>
              <p className="text-xs text-[#6B7280]">
                Deploy secure AWS multi-AZ VPC environments, provision cloud resources with Terraform IaC, configure Kubernetes cluster objects, Ingress controllers, Helm charts, and Prometheus monitoring.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-gray-50 border border-gray-200 space-y-2">
              <div className="text-xs font-bold text-blue-600 uppercase font-mono">Phase 4: Career Launch &amp; Job Readiness (Weeks 16 - 20)</div>
              <h3 className="text-base font-bold text-[#111827]">Projects, ATS Resume &amp; Mock Interviews</h3>
              <p className="text-xs text-[#6B7280]">
                Finalize end-to-end GitHub portfolio projects, build an ATS-optimized DevOps resume, refine your LinkedIn profile, complete 5 technical mock interview rounds, and apply actively to hiring corporate drives.
              </p>
            </div>
          </div>
        </section>

        {/* Section 11: Tips to Crack DevOps Interviews and Secure Your First Job */}
        <section className="bg-white rounded-2xl p-6 sm:p-10 border border-gray-200 shadow-sm space-y-4">
          <div className="text-xs font-bold text-blue-600 uppercase tracking-widest font-mono">Section 11</div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#111827]">
            Tips to Crack DevOps Interviews and Secure Your First Job
          </h2>
          <div className="space-y-3 text-sm text-[#6B7280] leading-relaxed">
            <ul className="list-disc pl-5 space-y-2 text-[#111827]">
              <li><strong>Explain the "Why":</strong> When answering technical questions, don't just state what a command does—explain why you chose a specific approach or tool over alternatives.</li>
              <li><strong>Draw Architectural Diagrams:</strong> In technical rounds, offer to write down or sketch the workflow architecture (e.g. Git -&gt; Jenkins -&gt; Docker -&gt; AWS EKS -&gt; Prometheus).</li>
              <li><strong>Walk Through Real Debugging Experiences:</strong> Share real stories of errors you encountered during hands-on labs (e.g., resolving a Docker permission issue or debugging a Kubernetes crash loop).</li>
              <li><strong>Demonstrate CLI Confidence:</strong> Practice terminal operations so you can inspect logs, describe resources, and edit YAML files smoothly during live technical tests.</li>
              <li><strong>Show Eagerness to Learn:</strong> Maintain a positive, solution-oriented mindset. If you don't know the exact answer to a question, explain how you would troubleshoot and research the issue.</li>
            </ul>
          </div>
        </section>

        {/* Section 12: Final Motivation */}
        <section className="bg-gradient-to-r from-blue-900 to-slate-900 text-white rounded-2xl p-6 sm:p-10 shadow-md space-y-4">
          <div className="text-xs font-bold text-blue-300 uppercase tracking-widest font-mono">Section 12</div>
          <h2 className="text-2xl sm:text-3xl font-bold">
            Final Motivation: Stay Consistent, Practice Daily, Build Projects, and Never Stop Learning
          </h2>
          <div className="space-y-4 text-sm text-slate-200 leading-relaxed">
            <p>
              Becoming a successful DevOps Engineer is not an overnight event—it is the result of focused, consistent daily practice. Every Linux command you run, every Dockerfile you write, every Terraform script you debug, and every mock interview you complete brings you one step closer to your dream IT career.
            </p>
            <p className="font-semibold text-white text-base">
              Stay disciplined, practice hands-on daily, build real production-grade projects, and believe in your journey. The cloud industry needs passionate engineers like you.
            </p>
            <div className="pt-4 border-t border-slate-700/80 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-xs text-slate-300">
                Ready to accelerate your career transformation with expert 1-on-1 mentorship?
              </p>
              <button
                onClick={() => setIsDemoModalOpen(true)}
                className="py-3 px-6 rounded-xl bg-blue-600 hover:bg-blue-500 font-bold text-white text-xs transition-colors shadow-md shrink-0"
              >
                Book Free Live Demo Session
              </button>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};
