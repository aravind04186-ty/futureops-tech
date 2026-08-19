import React, { useState, useEffect } from 'react';
import { 
  Layers, 
  Terminal, 
  Sparkles, 
  X, 
  CheckCircle2, 
  ArrowRight, 
  Workflow, 
  ShieldCheck, 
  Cpu, 
  Globe, 
  Activity, 
  FileCode, 
  BookOpen, 
  Briefcase, 
  ExternalLink, 
  Server, 
  Database, 
  Lock, 
  Play,
  Copy,
  Check
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { TechLogo } from '../shared/TechLogo';

export { TechLogo };

// Data Structures
export interface WorkflowStep {
  stepNumber: number;
  title: string;
  description: string;
  commandSnippet?: string;
}

export interface ProjectCardData {
  id: string;
  title: string;
  category: string;
  description: string;
  fullOverview: string;
  technologies: string[];
  badgeColor: string;
  architectureHighlights: string[];
  workflowSteps: WorkflowStep[];
  learningOutcomes: string[];
  realWorldUseCases: string[];
}

// 5 Industry Standard Real-Time Projects
const REAL_TIME_PROJECTS: ProjectCardData[] = [
  {
    id: 'cicd-automation',
    title: 'CI/CD Pipeline Automation',
    category: 'DevOps & Continuous Delivery',
    description: 'Automate build, test, containerization, and zero-downtime deployment workflows using Jenkins, Docker, and GitHub.',
    fullOverview: 'An enterprise-grade Continuous Integration and Continuous Deployment (CI/CD) automation pipeline using Jenkins Pipeline-as-Code (Jenkinsfile), GitHub webhooks, multi-stage Docker builds, static security scanning, and automated zero-downtime deployments.',
    technologies: ['Jenkins', 'Docker', 'GitHub'],
    badgeColor: 'bg-blue-50 text-blue-700 border-blue-200/80',
    architectureHighlights: [
      'GitHub Webhook trigger on developer git commit',
      'Jenkins Master/Agent node isolated docker runtime execution',
      'Multi-stage Dockerfile compiling assets with <80MB target size',
      'Trivy static vulnerability scanner gate (fails build on Critical CVEs)',
      'Immutable tag registry upload and rolling deploy with health checks'
    ],
    workflowSteps: [
      {
        stepNumber: 1,
        title: 'Source Control & Webhook Trigger',
        description: 'Developer pushes code to GitHub repository, which fires a secure payload webhook to the Jenkins Master endpoint.',
        commandSnippet: 'git push origin main'
      },
      {
        stepNumber: 2,
        title: 'Multi-Stage Docker Image Build',
        description: 'Jenkins launches an ephemeral Docker build agent that executes a multi-stage Dockerfile for minimum final binary size.',
        commandSnippet: 'docker build -t app:v1.2.0 --target runner .'
      },
      {
        stepNumber: 3,
        title: 'Automated Vulnerability Scan',
        description: 'Trivy security scanner analyzes container layers for known vulnerability CVEs before artifact publication.',
        commandSnippet: 'trivy image --severity HIGH,CRITICAL app:v1.2.0'
      },
      {
        stepNumber: 4,
        title: 'Registry Push & Immutable Versioning',
        description: 'Clean OCI container image is tagged with Git commit SHA and published to container repository.',
        commandSnippet: 'docker push registry.company.com/devops/app:v1.2.0'
      },
      {
        stepNumber: 5,
        title: 'Zero-Downtime Rolling Update',
        description: 'Target server executes a rolling update. If health checks fail within 30 seconds, pipeline auto-rolls back.',
        commandSnippet: 'docker-compose up -d --no-deps --build'
      }
    ],
    learningOutcomes: [
      'Mastering Jenkins Declarative Pipeline-as-Code (Groovy syntax)',
      'Designing lean, multi-stage Docker containers for high-performance builds',
      'Integrating automated Trivy security checks into CI/CD release engineering',
      'Handling automatic rollback mechanisms upon HTTP deployment errors'
    ],
    realWorldUseCases: [
      'FinTech core banking API release pipeline requiring strict audit compliance.',
      'E-commerce platforms deploying multi-daily updates during peak retail traffic without customer downtime.'
    ]
  },
  {
    id: 'k8s-deployment',
    title: 'Kubernetes Application Deployment',
    category: 'Container Orchestration & Microservices',
    description: 'Containerize, orchestrate, and manage scalable microservice applications on Kubernetes using Docker.',
    fullOverview: 'Production-grade Kubernetes microservice orchestration with Horizontal Pod Autoscalers (HPA), NGINX Ingress Routing with SSL/TLS termination, ConfigMaps, Secrets, and Helm packaging for continuous cloud availability.',
    technologies: ['Kubernetes', 'Docker'],
    badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
    architectureHighlights: [
      'NGINX Ingress Controller with SSL/TLS termination and path-based routing',
      'ClusterIP Service mapping to multi-replica Deployment pods',
      'Horizontal Pod Autoscaler (HPA) dynamically scaling 2 to 10 pods on CPU load',
      'ConfigMaps & Encrypted Secrets mounted as volume drives',
      'Liveness & Readiness HTTP probes ensuring self-healing pod recovery'
    ],
    workflowSteps: [
      {
        stepNumber: 1,
        title: 'Microservices Containerization',
        description: 'Application services packaged into OCI-compliant Docker images optimized for Kubernetes deployment.',
        commandSnippet: 'docker build -t microservice-api:v2 .'
      },
      {
        stepNumber: 2,
        title: 'Declarative K8s Manifest Generation',
        description: 'Drafting production YAML manifests for Deployments, ClusterIP Services, and Secret objects.',
        commandSnippet: 'kubectl apply -f k8s/deployment.yaml -f k8s/service.yaml'
      },
      {
        stepNumber: 3,
        title: 'Ingress Controller & SSL Termination',
        description: 'Configuring NGINX Ingress rules with SSL/TLS certificates for public HTTPS endpoint exposure.',
        commandSnippet: 'kubectl apply -f k8s/ingress.yaml'
      },
      {
        stepNumber: 4,
        title: 'HPA & Self-Healing Setup',
        description: 'Enabling Horizontal Pod Autoscaler based on 70% CPU threshold alongside liveness/readiness probes.',
        commandSnippet: 'kubectl autoscale deployment microservice-api --cpu-percent=70 --min=2 --max=10'
      },
      {
        stepNumber: 5,
        title: 'Helm Package Management',
        description: 'Packaging cluster manifests into version-controlled Helm charts for easy multi-environment upgrades.',
        commandSnippet: 'helm upgrade --install api-release ./helm-chart'
      }
    ],
    learningOutcomes: [
      'Deep expertise in Kubernetes objects (Pods, Deployments, Services, Ingress, Secrets)',
      'Designing auto-scaling microservices with Horizontal Pod Autoscaling (HPA)',
      'Managing production deployments using Helm Chart package management',
      'Configuring Kubernetes self-healing probes and rolling upgrade strategies'
    ],
    realWorldUseCases: [
      'High-scale SaaS web applications with dynamic user load surges.',
      'Containerized ride-sharing or food delivery backends requiring rapid elasticity.'
    ]
  },
  {
    id: 'aws-infrastructure',
    title: 'AWS Cloud Infrastructure',
    category: 'Cloud Architecture & Security',
    description: 'Architect secure, resilient, and highly available cloud environments utilizing AWS EC2, VPC, IAM, and S3 storage.',
    fullOverview: 'Comprehensive multi-AZ Amazon Web Services (AWS) enterprise cloud foundation. Features custom VPC networking with public/private subnets, NAT Gateways, Application Load Balancers (ALB), EC2 Auto Scaling Groups, KMS S3 encryption, and strict IAM security policies.',
    technologies: ['AWS EC2', 'VPC', 'IAM', 'S3'],
    badgeColor: 'bg-blue-50 text-blue-700 border-blue-200/80',
    architectureHighlights: [
      'Multi-AZ Amazon VPC (10.0.0.0/16) with isolated Public & Private subnets',
      'Application Load Balancer (ALB) balancing HTTP/HTTPS across availability zones',
      'EC2 Auto Scaling Group (ASG) in private subnets with NAT Gateway outbound routing',
      'Least-privilege IAM Roles and AWS KMS encrypted S3 storage buckets',
      'CloudWatch Alarm metrics triggering dynamic scaling policies'
    ],
    workflowSteps: [
      {
        stepNumber: 1,
        title: 'Amazon VPC Network Topology',
        description: 'Provisioning custom VPC spanning 2 Availability Zones with 2 Public Subnets and 2 Private Subnets.',
        commandSnippet: 'aws ec2 create-vpc --cidr-block 10.0.0.0/16'
      },
      {
        stepNumber: 2,
        title: 'Security Groups & IAM Role Lockdown',
        description: 'Enforcing strict Security Group ingress rules allowing traffic only from ALB to EC2 instances.',
        commandSnippet: 'aws iam create-role --role-name EC2-S3-ReadAccess'
      },
      {
        stepNumber: 3,
        title: 'ALB & Auto Scaling Group Deployment',
        description: 'Setting up Application Load Balancer in public subnets routing to EC2 instances in private subnets.',
        commandSnippet: 'aws autoscaling create-auto-scaling-group --auto-scaling-group-name Prod-ASG'
      },
      {
        stepNumber: 4,
        title: 'KMS Encrypted Amazon S3 Bucket',
        description: 'Creating S3 storage bucket configured with Server-Side AES-256 KMS encryption and CORS policies.',
        commandSnippet: 'aws s3api create-bucket --bucket company-media-prod --region us-east-1'
      },
      {
        stepNumber: 5,
        title: 'CloudWatch Alarms & Health Check',
        description: 'Configuring CloudWatch metric alarms for CPU utilization and ALB target group health.',
        commandSnippet: 'aws cloudwatch put-metric-alarm --alarm-name HighCPU'
      }
    ],
    learningOutcomes: [
      'Designing fault-tolerant, multi-AZ cloud architecture on AWS',
      'Applying AWS IAM least-privilege principles and security group isolation',
      'Configuring Elastic Load Balancing (ALB) and EC2 Auto Scaling Groups',
      'Securing enterprise cloud storage using AWS S3 encryption and lifecycle rules'
    ],
    realWorldUseCases: [
      'Enterprise cloud migration moving legacy on-premises workloads to AWS.',
      'Secure healthcare patient portal hosting requiring strict HIPAA cloud compliance.'
    ]
  },
  {
    id: 'infrastructure-as-code',
    title: 'Infrastructure as Code',
    category: 'Cloud Automation & Provisioning',
    description: 'Automate, provision, and manage repeatable cloud infrastructure declaratively with Terraform and AWS.',
    fullOverview: 'Declarative cloud infrastructure provisioning using HashiCorp Terraform modules. Integrates remote S3 state backends with DynamoDB state locking, environment parameterization, static code linting with tfsec, and zero-drift cloud automation.',
    technologies: ['Terraform', 'AWS'],
    badgeColor: 'bg-blue-50 text-blue-700 border-blue-200/80',
    architectureHighlights: [
      'Modular HCL codebase separating VPC, Compute, IAM, and Storage resources',
      'Remote S3 bucket state storage with DynamoDB table state locking',
      'Environment isolated parameterization via terraform.tfvars',
      'Static security auditing using tfsec and checkov static code analysis',
      'Declarative zero-drift cloud resource creation and automated destruction'
    ],
    workflowSteps: [
      {
        stepNumber: 1,
        title: 'Terraform HCL Module Architecture',
        description: 'Writing reusable, parameter-driven HCL code modules for VPC, Subnets, EC2, and Security Groups.',
        commandSnippet: 'module "vpc" { source = "./modules/vpc" }'
      },
      {
        stepNumber: 2,
        title: 'Remote State & DynamoDB Locking',
        description: 'Configuring Terraform backend block to store state in encrypted AWS S3 bucket with state locking.',
        commandSnippet: 'terraform init -backend-config="bucket=my-tf-state"'
      },
      {
        stepNumber: 3,
        title: 'Static Security & Code Validation',
        description: 'Executing tfsec security scanner to identify permissive security group rules before apply.',
        commandSnippet: 'tfsec . && terraform fmt -check'
      },
      {
        stepNumber: 4,
        title: 'Plan Execution & Preview',
        description: 'Generating dry-run execution plan detailing cloud resources to create, modify, or destroy.',
        commandSnippet: 'terraform plan -out=tfplan'
      },
      {
        stepNumber: 5,
        title: 'Automated Infrastructure Provisioning',
        description: 'Executing declarative plan to provision full AWS infrastructure stack in under 3 minutes.',
        commandSnippet: 'terraform apply "tfplan"'
      }
    ],
    learningOutcomes: [
      'Mastering HashiCorp Configuration Language (HCL) and modular IaC design',
      'Managing remote state backends, state locking, and team collaboration workflows',
      'Preventing cloud configuration drift and auditing IaC security with tfsec',
      'Automating multi-environment cloud infrastructure deployment (Dev, QA, Prod)'
    ],
    realWorldUseCases: [
      'Replicating identical staging and disaster recovery environments in minutes.',
      'Financial services infrastructure automation ensuring strict audit-ready cloud baselines.'
    ]
  },
  {
    id: 'monitoring-logging',
    title: 'Monitoring & Logging',
    category: 'Observability & SRE',
    description: 'Implement full-stack cluster observability, real-time metrics, and custom dashboards with Prometheus and Grafana.',
    fullOverview: 'Full-stack cloud cluster observability and site reliability engineering (SRE) stack. Features Prometheus for automated metric scraping and PromQL querying, Grafana for interactive visual dashboards, and AlertManager for automated notification routing.',
    technologies: ['Prometheus', 'Grafana'],
    badgeColor: 'bg-blue-50 text-blue-700 border-blue-200/80',
    architectureHighlights: [
      'Prometheus server with dynamic Kubernetes target service discovery',
      'Node Exporters and Kube-State-Metrics scraping cluster telemetry',
      'Grafana visualization dashboards displaying CPU, Memory, Disk IO, and Latency',
      'PromQL alert rule engine detecting HTTP 5xx error rate spikes',
      'AlertManager routing critical alerts to Slack webhooks and PagerDuty'
    ],
    workflowSteps: [
      {
        stepNumber: 1,
        title: 'Prometheus & Node Exporters Deployment',
        description: 'Deploying Prometheus server alongside Node Exporters across target infrastructure for metric scraping.',
        commandSnippet: 'helm install prometheus prometheus-community/prometheus'
      },
      {
        stepNumber: 2,
        title: 'Dynamic Service Discovery Setup',
        description: 'Configuring scraper rules to auto-detect new microservice pods and EC2 compute nodes.',
        commandSnippet: 'kubectl get servicemonitors -n monitoring'
      },
      {
        stepNumber: 3,
        title: 'Grafana Dashboard Visualization',
        description: 'Designing custom executive dashboards tracking SRE Golden Signals (Latency, Traffic, Errors, Saturation).',
        commandSnippet: 'grafana-cli plugins install grafana-piechart-panel'
      },
      {
        stepNumber: 4,
        title: 'PromQL Alert Rule Definition',
        description: 'Writing PromQL queries to fire alerts when 99th percentile request latency exceeds 500ms.',
        commandSnippet: 'histogram_quantile(0.99, sum(rate(http_request_duration_seconds_bucket[5m])) by (le)) > 0.5'
      },
      {
        stepNumber: 5,
        title: 'AlertManager & Slack Integration',
        description: 'Configuring AlertManager routes to send instant notifications to DevOps Slack channel and PagerDuty.',
        commandSnippet: 'kubectl apply -f alertmanager-config.yaml'
      }
    ],
    learningOutcomes: [
      'Writing advanced PromQL (Prometheus Query Language) metrics expressions',
      'Building interactive Grafana dashboards for executive and technical cluster monitoring',
      'Configuring AlertManager alert thresholds, escalation trees, and notification channels',
      'Implementing Site Reliability Engineering (SRE) golden signals and SLA/SLO tracking'
    ],
    realWorldUseCases: [
      '24/7 proactive system monitoring for digital banking and payment gateway platforms.',
      'Instant incident detection reducing Mean Time To Resolution (MTTR) during cloud outages.'
    ]
  }
];

// Interactive Visual Diagrams for Project Modals & Card Thumbnails
const ProjectArchitectureGraphic: React.FC<{ projectId: string; isModal?: boolean }> = ({ projectId, isModal = false }) => {
  // Common container wrapper for ultra-modern dark theme architecture diagram layout
  const containerClasses = `bg-gradient-to-br from-slate-950 via-slate-900/95 to-slate-950 rounded-2xl p-3.5 sm:p-4 border border-slate-800/90 hover:border-blue-500/40 text-white font-mono text-xs overflow-hidden relative flex flex-col justify-between shadow-xl transition-all duration-300 group ${
    isModal ? 'min-h-[220px]' : 'h-40 sm:h-44'
  }`;

  if (projectId === 'cicd-automation') {
    return (
      <div className={containerClasses}>
        {/* Subtle Background Grid Line Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:12px_12px] opacity-20 pointer-events-none" />

        {/* Header Bar */}
        <div className="flex items-center justify-between pb-2 border-b border-slate-800/80 relative z-10">
          <div className="flex items-center space-x-2">
            <Workflow className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
            <span className="text-[11px] text-slate-200 font-sans font-semibold tracking-wide">CI/CD Pipeline Flow</span>
          </div>
          <span className="text-[9px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-sans font-semibold border border-emerald-500/30 flex items-center gap-1.5 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
            Automated Deployment
          </span>
        </div>

        {/* Workflow Nodes with Connected Flow Lines */}
        <div className="grid grid-cols-4 gap-1 sm:gap-1.5 items-center my-auto py-1 relative z-10">
          {/* Node 1: GitHub */}
          <div className="p-2 sm:p-2.5 rounded-xl bg-slate-900/90 border border-slate-800/90 hover:border-blue-500/50 hover:bg-slate-800/90 transition-all flex flex-col items-center text-center space-y-1 shadow-md">
            <TechLogo name="github" className="w-6 h-6 text-white shrink-0" />
            <span className="text-[10px] text-slate-200 font-sans font-semibold">GitHub</span>
            <span className="text-[7.5px] text-slate-400 font-mono">Source Push</span>
          </div>

          {/* Node 2: Jenkins */}
          <div className="p-2 sm:p-2.5 rounded-xl bg-slate-900/90 border border-slate-800/90 hover:border-blue-500/50 hover:bg-slate-800/90 transition-all flex flex-col items-center text-center space-y-1 shadow-md">
            <TechLogo name="jenkins" className="w-6 h-6 shrink-0" />
            <span className="text-[10px] text-slate-200 font-sans font-semibold">Jenkins</span>
            <span className="text-[7.5px] text-slate-400 font-mono">Build &amp; Test</span>
          </div>

          {/* Node 3: Docker */}
          <div className="p-2 sm:p-2.5 rounded-xl bg-slate-900/90 border border-slate-800/90 hover:border-blue-500/50 hover:bg-slate-800/90 transition-all flex flex-col items-center text-center space-y-1 shadow-md">
            <TechLogo name="docker" className="w-6 h-6 shrink-0" />
            <span className="text-[10px] text-slate-200 font-sans font-semibold">Docker</span>
            <span className="text-[7.5px] text-slate-400 font-mono">OCI Registry</span>
          </div>

          {/* Node 4: AWS World */}
          <div className="p-2 sm:p-2.5 rounded-xl bg-slate-900/90 border border-amber-500/40 hover:border-amber-400 hover:bg-slate-800/90 transition-all flex flex-col items-center text-center space-y-1 shadow-md">
            <TechLogo name="aws-world" className="w-6 h-6 shrink-0" />
            <span className="text-[10px] text-amber-300 font-sans font-semibold">AWS Cloud</span>
            <span className="text-[7.5px] text-emerald-400 font-mono font-bold">Production</span>
          </div>
        </div>

        {/* Footer info bar */}
        <div className="flex items-center justify-between text-[9px] text-slate-400 font-sans pt-1.5 border-t border-slate-800/60 relative z-10">
          <span className="flex items-center gap-1.5 text-slate-300">
            <ShieldCheck className="w-3 h-3 text-emerald-400" />
            Trivy Vulnerability Scan
          </span>
          <span className="text-slate-400 font-mono">Zero Downtime</span>
        </div>
      </div>
    );
  }

  if (projectId === 'k8s-deployment') {
    return (
      <div className={containerClasses}>
        <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:12px_12px] opacity-20 pointer-events-none" />

        <div className="flex items-center justify-between pb-2 border-b border-slate-800/80 relative z-10">
          <div className="flex items-center space-x-2">
            <Layers className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
            <span className="text-[11px] text-slate-200 font-sans font-semibold tracking-wide">Kubernetes Microservices Topology</span>
          </div>
          <span className="text-[9px] px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 font-sans font-semibold border border-blue-500/30 flex items-center gap-1.5 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-ping"></span>
            Auto-Scaling Cluster
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2 sm:gap-2.5 items-center my-auto py-1 relative z-10">
          <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800/90 hover:border-blue-500/50 hover:bg-slate-800/90 transition-all flex flex-col items-center text-center space-y-1 shadow-md">
            <Globe className="w-6 h-6 text-blue-400 shrink-0" />
            <span className="text-[10px] text-slate-200 font-sans font-semibold">NGINX Ingress</span>
            <span className="text-[7.5px] text-slate-400 font-mono">SSL Termination</span>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800/90 hover:border-blue-500/50 hover:bg-slate-800/90 transition-all flex flex-col items-center text-center space-y-1 shadow-md">
            <TechLogo name="kubernetes" className="w-6 h-6 shrink-0" />
            <span className="text-[10px] text-slate-200 font-sans font-semibold">ClusterIP Service</span>
            <span className="text-[7.5px] text-slate-400 font-mono">Load Balancer</span>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800/90 hover:border-blue-500/50 hover:bg-slate-800/90 transition-all flex flex-col items-center text-center space-y-1 shadow-md">
            <TechLogo name="docker" className="w-6 h-6 shrink-0" />
            <span className="text-[10px] text-slate-200 font-sans font-semibold">Pod Replicas</span>
            <span className="text-[7.5px] text-blue-400 font-mono font-bold">HPA Scaled</span>
          </div>
        </div>

        <div className="flex items-center justify-between text-[9px] text-slate-400 font-sans pt-1.5 border-t border-slate-800/60 relative z-10">
          <span className="flex items-center gap-1.5 text-slate-300">
            <Cpu className="w-3 h-3 text-cyan-400" />
            Liveness &amp; Readiness Probes
          </span>
          <span className="text-slate-400 font-mono">Helm v3</span>
        </div>
      </div>
    );
  }

  if (projectId === 'aws-infrastructure') {
    return (
      <div className={containerClasses}>
        <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:12px_12px] opacity-20 pointer-events-none" />

        <div className="flex items-center justify-between pb-2 border-b border-slate-800/80 relative z-10">
          <div className="flex items-center space-x-2">
            <Server className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span className="text-[11px] text-slate-200 font-sans font-semibold tracking-wide">AWS Multi-AZ Cloud Stack</span>
          </div>
          <span className="text-[9px] px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 font-sans font-semibold border border-amber-500/30">
            Resilient Infrastructure
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2 sm:gap-2.5 items-center my-auto py-1 relative z-10">
          <div className="p-2.5 rounded-xl bg-slate-900/90 border border-amber-500/30 hover:border-amber-400 hover:bg-slate-800/90 transition-all flex flex-col items-center text-center space-y-1 shadow-md">
            <TechLogo name="aws-world" className="w-6 h-6 shrink-0" />
            <span className="text-[10px] text-amber-300 font-sans font-semibold">AWS VPC &amp; ALB</span>
            <span className="text-[7.5px] text-slate-400 font-mono">Public Subnet</span>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800/90 hover:border-amber-500/50 hover:bg-slate-800/90 transition-all flex flex-col items-center text-center space-y-1 shadow-md">
            <TechLogo name="ec2" className="w-6 h-6 shrink-0" />
            <span className="text-[10px] text-slate-200 font-sans font-semibold">EC2 Auto Scaling</span>
            <span className="text-[7.5px] text-slate-400 font-mono">Private Subnet</span>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800/90 hover:border-amber-500/50 hover:bg-slate-800/90 transition-all flex flex-col items-center text-center space-y-1 shadow-md">
            <TechLogo name="s3" className="w-6 h-6 shrink-0" />
            <span className="text-[10px] text-slate-200 font-sans font-semibold">Amazon S3</span>
            <span className="text-[7.5px] text-amber-400 font-mono font-bold">KMS Encrypted</span>
          </div>
        </div>

        <div className="flex items-center justify-between text-[9px] text-slate-400 font-sans pt-1.5 border-t border-slate-800/60 relative z-10">
          <span className="flex items-center gap-1.5 text-slate-300">
            <Lock className="w-3 h-3 text-amber-400" />
            IAM Least-Privilege
          </span>
          <span className="text-slate-400 font-mono">CloudWatch Alarms</span>
        </div>
      </div>
    );
  }

  if (projectId === 'infrastructure-as-code') {
    return (
      <div className={containerClasses}>
        <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:12px_12px] opacity-20 pointer-events-none" />

        <div className="flex items-center justify-between pb-2 border-b border-slate-800/80 relative z-10">
          <div className="flex items-center space-x-2">
            <Terminal className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
            <span className="text-[11px] text-slate-200 font-sans font-semibold tracking-wide">Terraform Declarative Provisioning</span>
          </div>
          <span className="text-[9px] px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-400 font-sans font-semibold border border-purple-500/30">
            Zero Drift
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2 sm:gap-2.5 items-center my-auto py-1 relative z-10">
          <div className="p-2.5 rounded-xl bg-slate-900/90 border border-purple-500/30 hover:border-purple-400 hover:bg-slate-800/90 transition-all flex flex-col items-center text-center space-y-1 shadow-md">
            <TechLogo name="terraform" className="w-6 h-6 shrink-0" />
            <span className="text-[10px] text-slate-200 font-sans font-semibold">Terraform HCL</span>
            <span className="text-[7.5px] text-slate-400 font-mono">Modular Code</span>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800/90 hover:border-purple-500/50 hover:bg-slate-800/90 transition-all flex flex-col items-center text-center space-y-1 shadow-md">
            <Database className="w-6 h-6 text-purple-400 shrink-0" />
            <span className="text-[10px] text-slate-200 font-sans font-semibold">S3 State Backend</span>
            <span className="text-[7.5px] text-slate-400 font-mono">DynamoDB Lock</span>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-900/90 border border-amber-500/30 hover:border-amber-400 hover:bg-slate-800/90 transition-all flex flex-col items-center text-center space-y-1 shadow-md">
            <TechLogo name="aws-world" className="w-6 h-6 shrink-0" />
            <span className="text-[10px] text-amber-300 font-sans font-semibold">AWS Cloud Stack</span>
            <span className="text-[7.5px] text-amber-400 font-mono font-bold">Automated Apply</span>
          </div>
        </div>

        <div className="flex items-center justify-between text-[9px] text-slate-400 font-sans pt-1.5 border-t border-slate-800/60 relative z-10">
          <span className="flex items-center gap-1.5 text-slate-300">
            <FileCode className="w-3 h-3 text-purple-400" />
            tfsec Security Audit
          </span>
          <span className="text-slate-400 font-mono">Version Controlled</span>
        </div>
      </div>
    );
  }

  // monitoring-logging
  return (
    <div className={containerClasses}>
      <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:12px_12px] opacity-20 pointer-events-none" />

      <div className="flex items-center justify-between pb-2 border-b border-slate-800/80 relative z-10">
        <div className="flex items-center space-x-2">
          <Activity className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
          <span className="text-[11px] text-slate-200 font-sans font-semibold tracking-wide">Full-Stack Observability Stack</span>
        </div>
        <span className="text-[9px] px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 font-sans font-semibold border border-cyan-500/30 flex items-center gap-1.5 shadow-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping"></span>
          Real-Time Telemetry
        </span>
      </div>

      <div className="grid grid-cols-3 gap-2 sm:gap-2.5 items-center my-auto py-1 relative z-10">
        <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800/90 hover:border-cyan-500/50 hover:bg-slate-800/90 transition-all flex flex-col items-center text-center space-y-1 shadow-md">
          <TechLogo name="linux" className="w-6 h-6 shrink-0" />
          <span className="text-[10px] text-slate-200 font-sans font-semibold">Node Exporter</span>
          <span className="text-[7.5px] text-slate-400 font-mono">Metrics Scrape</span>
        </div>

        <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800/90 hover:border-cyan-500/50 hover:bg-slate-800/90 transition-all flex flex-col items-center text-center space-y-1 shadow-md">
          <TechLogo name="prometheus" className="w-6 h-6 shrink-0" />
          <span className="text-[10px] text-slate-200 font-sans font-semibold">Prometheus Engine</span>
          <span className="text-[7.5px] text-slate-400 font-mono">PromQL Rules</span>
        </div>

        <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800/90 hover:border-cyan-500/50 hover:bg-slate-800/90 transition-all flex flex-col items-center text-center space-y-1 shadow-md">
          <TechLogo name="grafana" className="w-6 h-6 shrink-0" />
          <span className="text-[10px] text-slate-200 font-sans font-semibold">Grafana Dashboard</span>
          <span className="text-[7.5px] text-cyan-400 font-mono font-bold">SRE Dashboards</span>
        </div>
      </div>

      <div className="flex items-center justify-between text-[9px] text-slate-400 font-sans pt-1.5 border-t border-slate-800/60 relative z-10">
        <span className="flex items-center gap-1.5 text-slate-300">
          <Activity className="w-3 h-3 text-cyan-400" />
          AlertManager Notifications
        </span>
        <span className="text-slate-400 font-mono">SLA / SLO Tracking</span>
      </div>
    </div>
  );
};

// Detail Modal Component
interface ProjectModalProps {
  project: ProjectCardData;
  onClose: () => void;
}

const ProjectDetailModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const { setIsDemoModalOpen, setIsWhatsAppModalOpen } = useAuth();
  const [copiedCodeIndex, setCopiedCodeIndex] = useState<number | null>(null);

  // Close on ESC key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleCopyCode = (code: string, index: number) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeIndex(index);
    setTimeout(() => setCopiedCodeIndex(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn overflow-y-auto">
      {/* Modal Container */}
      <div 
        className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden my-8 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header Bar */}
        <div className="p-6 sm:p-8 bg-slate-900 text-white flex items-start justify-between border-b border-slate-800 shrink-0">
          <div className="space-y-3 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold border border-blue-500/30 uppercase tracking-wide">
                {project.category}
              </span>
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30 uppercase tracking-wide flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                PRODUCTION READY CAPSTONE
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold font-poppins text-white leading-tight">
              {project.title}
            </h2>

            {/* Tech stack badge row */}
            <div className="flex items-center space-x-3 pt-1">
              <span className="text-xs text-slate-400 font-medium">Core Tech Stack:</span>
              <div className="flex items-center space-x-2">
                {project.technologies.map((tech) => (
                  <div key={tech} className="flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-slate-800 border border-slate-700 text-xs text-slate-200">
                    <TechLogo name={tech} className="w-4 h-4 shrink-0" />
                    <span>{tech}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-all border border-slate-700 shrink-0 ml-4"
            title="Close Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Content Body */}
        <div className="p-6 sm:p-8 space-y-8 overflow-y-auto flex-1">
          
          {/* Architecture Diagram Preview */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-[#111827] uppercase tracking-wider font-poppins flex items-center gap-2">
                <Workflow className="w-4 h-4 text-blue-600" />
                Production Architecture Topology Diagram
              </h3>
              <span className="text-xs text-slate-500 font-mono">Live Interactive System Map</span>
            </div>
            
            <ProjectArchitectureGraphic projectId={project.id} isModal={true} />
          </div>

          {/* Project Overview */}
          <div className="p-6 rounded-2xl bg-blue-50/60 border border-blue-100 space-y-3">
            <h3 className="text-base font-bold text-blue-950 font-poppins flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-blue-600" />
              Project Executive Overview
            </h3>
            <p className="text-sm text-slate-700 leading-relaxed font-normal">
              {project.fullOverview}
            </p>
            <div className="pt-2 border-t border-blue-100/80 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
              {project.architectureHighlights.map((highlight, idx) => (
                <div key={idx} className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{highlight}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Implementation Workflow */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-[#111827] font-poppins flex items-center gap-2">
              <Terminal className="w-5 h-5 text-blue-600" />
              Step-by-Step Implementation Workflow
            </h3>

            <div className="space-y-3">
              {project.workflowSteps.map((step, idx) => (
                <div key={idx} className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="w-7 h-7 rounded-xl bg-blue-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                        {step.stepNumber}
                      </span>
                      <h4 className="font-bold text-sm text-[#111827] font-poppins">{step.title}</h4>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed pl-10">
                    {step.description}
                  </p>

                  {step.commandSnippet && (
                    <div className="ml-10 mt-2 p-3 rounded-xl bg-slate-900 text-slate-200 font-mono text-xs flex items-center justify-between border border-slate-800">
                      <code className="text-cyan-400 truncate pr-2">$ {step.commandSnippet}</code>
                      <button 
                        onClick={() => handleCopyCode(step.commandSnippet!, idx)}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors text-[10px] flex items-center gap-1 shrink-0"
                      >
                        {copiedCodeIndex === idx ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span className="text-emerald-400 font-sans">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span className="font-sans">Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Learning Outcomes & Real World Use Cases */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Learning Outcomes */}
            <div className="p-5 rounded-2xl bg-emerald-50/50 border border-emerald-100 space-y-3">
              <h3 className="text-sm font-bold text-emerald-900 font-poppins flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-emerald-600" />
                Key Learning Outcomes
              </h3>
              <ul className="space-y-2 text-xs text-slate-700">
                {project.learningOutcomes.map((outcome, idx) => (
                  <li key={idx} className="flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{outcome}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Real World Use Cases */}
            <div className="p-5 rounded-2xl bg-amber-50/50 border border-amber-100 space-y-3">
              <h3 className="text-sm font-bold text-amber-900 font-poppins flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-amber-600" />
                Enterprise Industry Use Cases
              </h3>
              <ul className="space-y-2 text-xs text-slate-700">
                {project.realWorldUseCases.map((useCase, idx) => (
                  <li key={idx} className="flex items-start space-x-2">
                    <Globe className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{useCase}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

        </div>

        {/* Modal Footer Action Bar */}
        <div className="p-6 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0">
          <div className="text-xs text-slate-500 text-center sm:text-left">
            <span className="font-semibold text-slate-700">Need help building this in your portfolio?</span> Live lab guidance included in Master DevOps Course.
          </div>

          <div className="flex items-center space-x-3 w-full sm:w-auto">
            <button
              onClick={() => {
                onClose();
                setIsWhatsAppModalOpen(true);
              }}
              className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors shadow-sm flex items-center justify-center space-x-2"
            >
              <span>Speak to Counselor</span>
            </button>

            <button
              onClick={() => {
                onClose();
                setIsDemoModalOpen(true);
              }}
              className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-colors shadow-sm flex items-center justify-center space-x-2"
            >
              <span>Book Free Live Demo</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

// Main Section Component
export const RealTimeProjectsSection: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<ProjectCardData | null>(null);

  return (
    <section id="real-time-projects" className="py-16 sm:py-20 bg-slate-50 border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-200/80">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>PRACTICAL INDUSTRY CAPSTONES</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111827] tracking-tight font-poppins">
            Real-Time Production Projects
          </h2>
          
          <p className="text-sm sm:text-base text-[#6B7280] leading-relaxed">
            Hands-on, production-grade cloud projects designed to build your portfolio and demonstrate enterprise DevOps expertise to top engineering recruiters. Click any project to view its architecture diagram &amp; step-by-step workflow.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {REAL_TIME_PROJECTS.map((project) => (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="bg-white rounded-2xl border border-gray-200/90 shadow-sm hover:shadow-2xl hover:border-blue-500/50 transition-all duration-300 flex flex-col justify-between group cursor-pointer overflow-hidden transform hover:-translate-y-1"
            >
              {/* Card Top Preview Thumbnail Graphic */}
              <div className="p-4 bg-slate-900 border-b border-slate-800 relative group-hover:bg-slate-950 transition-colors">
                <ProjectArchitectureGraphic projectId={project.id} />
                
                {/* Overlay hover prompt badge */}
                <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
                  <span className="px-4 py-2 rounded-xl bg-blue-600 text-white font-bold text-xs shadow-lg flex items-center gap-2 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                    <Workflow className="w-4 h-4" />
                    Explore Architecture &amp; Workflow
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 sm:p-7 space-y-5 flex-1 flex flex-col justify-between">
                <div className="space-y-3">
                  
                  {/* Tech Logos Header */}
                  <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                    <div className="flex items-center space-x-2">
                      {project.technologies.map((tech) => (
                        <div
                          key={tech}
                          className="p-2 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:bg-blue-50/70 transition-colors"
                          title={tech}
                        >
                          <TechLogo name={tech} className="w-5 h-5 shrink-0" />
                        </div>
                      ))}
                    </div>

                    <span className="text-[11px] font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-100">
                      {project.category}
                    </span>
                  </div>

                  {/* Project Title */}
                  <h3 className="text-lg sm:text-xl font-bold text-[#111827] group-hover:text-blue-600 transition-colors font-poppins leading-snug">
                    {project.title}
                  </h3>

                  {/* Short One-line Description */}
                  <p className="text-xs sm:text-sm text-[#6B7280] leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* Footer Badges & CTA */}
                <div className="pt-4 border-t border-gray-100 space-y-3">
                  <div className="flex flex-wrap gap-1.5 items-center">
                    <span className="text-[11px] font-medium text-gray-400 mr-1">Stack:</span>
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[10px] font-semibold border border-slate-200/60 flex items-center gap-1"
                      >
                        <TechLogo name={tech} className="w-3.5 h-3.5 shrink-0" />
                        <span>{tech}</span>
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-xs font-bold text-blue-600 group-hover:text-blue-700 pt-1">
                    <span className="flex items-center gap-1">
                      View Architecture &amp; Workflow
                    </span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Selected Project Modal Popup */}
      {selectedProject && (
        <ProjectDetailModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
};
