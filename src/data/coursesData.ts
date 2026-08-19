import { CourseModule } from '../types';

export const courseModulesData: CourseModule[] = [
  {
    id: 1,
    title: 'Linux Administration & Command Line Mastery',
    duration: 'Week 1 - 2',
    level: 'Beginner',
    labsCount: 8,
    projectsCount: 1,
    skills: ['RHEL/Ubuntu', 'File Hierarchy', 'Bash Permissions', 'SSH Keys', 'Systemd Services', 'Process Management'],
    description: 'Master the backbone operating system of cloud infrastructure. Learn process scheduling, system initialization, storage management, and security hardeners.',
    icon: 'Terminal',
    topics: [
      'Linux Kernel Architecture & File System Structure',
      'User & Group Management with Sudoers & File Permissions',
      'Package Managers (APT, YUM/DNF, Pacman)',
      'Storage Management: LVM, Mount points, Fstab',
      'Process Management (ps, top, htop, systemctl, journalctl)',
      'SSH Key Authentication, Port Forwarding & Hardening'
    ]
  },
  {
    id: 2,
    title: 'Networking & Cloud Infrastructure Fundamentals',
    duration: 'Week 3',
    level: 'Beginner',
    labsCount: 5,
    projectsCount: 1,
    skills: ['OSI Layer', 'TCP/IP', 'DNS & Route53', 'Subnetting', 'Firewalls/UFW', 'VPN & Reverse Proxies'],
    description: 'Build concrete understanding of enterprise networking protocols, load balancing, DNS resolution, and security groups.',
    icon: 'Network',
    topics: [
      'IPv4 & Subnet CIDR Calculation (VLSM)',
      'DNS Infrastructure (A, CNAME, MX records, TTL)',
      'HTTP/HTTPS Protocols, TLS/SSL Certificates & Certbot',
      'Nginx Reverse Proxy, Load Balancing & Keepalived',
      'Firewalls (IPTables, UFW) & VPN Access Controls'
    ]
  },
  {
    id: 3,
    title: 'Git & GitHub Enterprise Version Control',
    duration: 'Week 4',
    level: 'Beginner',
    labsCount: 6,
    projectsCount: 1,
    skills: ['Git Branching', 'Merge vs Rebase', 'Trunk-Based Dev', 'PR Review', 'Git Hooks', 'Merge Conflict Resolution'],
    description: 'Learn collaborative source code management, branch protection rules, semantic versioning, and Git-driven team workflows.',
    icon: 'GitBranch',
    topics: [
      'Git Internals (.git folder, commit objects, trees, blobs)',
      'Branching Strategies: GitFlow, Trunk-Based Development',
      'Interactive Rebase, Cherry-Pick & Stash Management',
      'Pull Request Code Reviews & Branch Protection Rules',
      'Git Client Hooks & Pre-commit Quality Enforcers'
    ]
  },
  {
    id: 4,
    title: 'Shell Scripting & Linux Automation',
    duration: 'Week 5',
    level: 'Intermediate',
    labsCount: 7,
    projectsCount: 1,
    skills: ['Bash Functions', 'CRON Jobs', 'AWK & SED', 'Regex', 'Log Parsing', 'System Health Monitors'],
    description: 'Automate repetitive sysadmin tasks, system backups, log parsing, and server health check alarms with production-grade Bash scripts.',
    icon: 'Code2',
    topics: [
      'Posix & Bash Syntax, Variables, Control Flow',
      'Automated Cron Jobs & Systemd Timers',
      'Text Processing with AWK, SED, Grep, and Cut',
      'Automated Log Archival & S3 Sync Scripts',
      'Robust Error Handling (set -e, set -o pipefail)'
    ]
  },
  {
    id: 5,
    title: 'Python for DevOps & Automation',
    duration: 'Week 6',
    level: 'Intermediate',
    labsCount: 6,
    projectsCount: 1,
    skills: ['Python 3', 'Boto3 (AWS SDK)', 'REST API Automation', 'PyTest', 'JSON/YAML Parsers', 'Paramiko'],
    description: 'Leverage Python scripts to interface with Cloud APIs, query infrastructure states, generate reports, and trigger automation workflows.',
    icon: 'FileCode',
    topics: [
      'Python Data Structures & OOP Basics for DevOps',
      'Interfacing with AWS API via Boto3 SDK',
      'Parsing JSON, YAML, TOML Configuration Files',
      'Building HTTP Webhooks with Python Flask/FastAPI',
      'Remote SSH Execution with Paramiko'
    ]
  },
  {
    id: 6,
    title: 'Docker Containerization & Microservices',
    duration: 'Week 7 - 8',
    level: 'Intermediate',
    labsCount: 9,
    projectsCount: 2,
    skills: ['Dockerfile Optimization', 'Multi-Stage Builds', 'Docker Compose', 'Container Security', 'Overlay Networks', 'Volume Persistence'],
    description: 'Pack apps into secure, lightweight container images. Master multi-stage builds, rootless containers, and multi-container Compose setups.',
    icon: 'Box',
    topics: [
      'Linux Namespaces, Cgroups & Container Isolation',
      'Writing Production Dockerfiles & Multi-stage Minimization',
      'Docker Networking: Bridge, Host, Overlay, Macvlan',
      'Volume Storage Drivers & Persistent Mounts',
      'Docker Compose for Local Microservices Stacks',
      'Trivy Container Vulnerability Scanning'
    ]
  },
  {
    id: 7,
    title: 'Kubernetes Orchestration & Helm Charts',
    duration: 'Week 9 - 10',
    level: 'Advanced',
    labsCount: 10,
    projectsCount: 2,
    skills: ['Pods & Deployments', 'Services & Ingress', 'StatefulSets', 'RBAC & NetworkPolicies', 'Helm Packaging', 'HPA Auto-scaling'],
    description: 'Deploy, scale, and manage containerized apps in production-grade Kubernetes clusters. Master ConfigMaps, Secrets, Ingress Controllers, and Helm.',
    icon: 'Layers',
    topics: [
      'Kubernetes Control Plane & Worker Node Architecture',
      'Pods, ReplicaSets, Deployments & Rolling Updates',
      'Services (ClusterIP, NodePort, LoadBalancer) & Nginx Ingress',
      'ConfigMaps, Secrets, SealedSecrets & HashiCorp Vault Integration',
      'Horizontal Pod Autoscaler (HPA) & Cluster Autoscaler',
      'Helm Chart Creation, Templating & Release Management'
    ]
  },
  {
    id: 8,
    title: 'Jenkins CI/CD Automation & Pipeline as Code',
    duration: 'Week 11',
    level: 'Intermediate',
    labsCount: 7,
    projectsCount: 2,
    skills: ['Declarative Jenkinsfile', 'Shared Libraries', 'Webhook Triggers', 'SonarQube Integration', 'Docker Agents', 'Parallel Stages'],
    description: 'Design end-to-end continuous integration and deployment pipelines. Implement automated unit testing, security scanning, and automated rollbacks.',
    icon: 'Cpu',
    topics: [
      'Jenkins Controller/Agent Architecture Setup',
      'Declarative Pipelines vs Scripted Pipelines',
      'Integrating Git Webhooks & Automated Triggers',
      'SonarQube Static Code Quality Gates',
      'Nexus/JFrog Artifact Repository Publishing',
      'Dynamic Jenkins Build Agents on Kubernetes'
    ]
  },
  {
    id: 9,
    title: 'AWS Cloud Architecture & EKS Cluster Deep Dive',
    duration: 'Week 12 - 13',
    level: 'Advanced',
    labsCount: 11,
    projectsCount: 2,
    skills: ['AWS IAM', 'VPC Architecture', 'EC2 & Auto Scaling', 'Amazon EKS', 'S3 & CloudFront', 'RDS & DynamoDB'],
    description: 'Design highly available, fault-tolerant cloud architectures on AWS. Provision enterprise Elastic Kubernetes Service (EKS) clusters.',
    icon: 'Cloud',
    topics: [
      'AWS Identity & Access Management (IAM Roles, Policies, OIDC)',
      'Custom Multi-AZ VPC Design (Public/Private Subnets, NAT Gateways)',
      'EC2 Auto Scaling Groups & Application Load Balancers (ALB)',
      'Amazon EKS Managed Node Groups & eksctl Setup',
      'S3 Bucket Security, Lifecycle Rules & CloudFront CDN',
      'AWS RDS PostgreSQL Multi-AZ & DynamoDB NoSQL'
    ]
  },
  {
    id: 10,
    title: 'Infrastructure as Code (IaC) with HashiCorp Terraform',
    duration: 'Week 14',
    level: 'Advanced',
    labsCount: 8,
    projectsCount: 2,
    skills: ['HCL Syntax', 'Terraform Modules', 'Remote State & S3 Backend', 'State Locking (DynamoDB)', 'Workspaces', 'Terragrunt'],
    description: 'Automate zero-drift infrastructure provisioning. Modularize AWS, Azure, and GCP resources cleanly with Terraform and state locking.',
    icon: 'Cpu',
    topics: [
      'Terraform Architecture & Provider Ecosystem',
      'HCL Variables, Outputs, Count, For_Each & Expressions',
      'Remote S3 Backend & DynamoDB State Locking',
      'Reusable Infrastructure Modules (VPC, EKS, RDS)',
      'Terraform Import, State Drift Management & Workspaces',
      'Security Compliance Scanning with Checkov & TFSec'
    ]
  },
  {
    id: 11,
    title: 'Configuration Management with Ansible',
    duration: 'Week 15',
    level: 'Intermediate',
    labsCount: 6,
    projectsCount: 1,
    skills: ['Ansible Playbooks', 'Inventory Files', 'Ansible Roles', 'Ansible Vault', 'Jinja2 Templates', 'Idempotency'],
    description: 'Enforce agentless configuration management across thousands of cloud servers with idempotent Ansible playbooks.',
    icon: 'Terminal',
    topics: [
      'Ansible Architecture & SSH Agentless Execution',
      'Writing Idempotent YAML Playbooks & Handlers',
      'Dynamic Inventory for AWS EC2 Instances',
      'Structuring Code with Ansible Roles & Ansible Galaxy',
      'Ansible Vault for Encrypted Secret Variables',
      'Templating Configuration Files with Jinja2'
    ]
  },
  {
    id: 12,
    title: 'GitOps Continuous Delivery with ArgoCD',
    duration: 'Week 16',
    level: 'Advanced',
    labsCount: 5,
    projectsCount: 1,
    skills: ['GitOps Model', 'ArgoCD Sync', 'Application Sets', 'Canary Rollouts', 'Prometheus Metrics Integration', 'Zero-Downtime'],
    description: 'Implement declarative GitOps where Git is the single source of truth for Kubernetes application states using ArgoCD and Argo Rollouts.',
    icon: 'GitPullRequest',
    topics: [
      'GitOps Principles vs Traditional CI/CD Push Models',
      'ArgoCD Installation & Repository Connection',
      'Sync Policies, Self-Healing & Drift Detection',
      'Progressive Delivery with Argo Rollouts (Blue-Green & Canary)',
      'Multi-Cluster Management with ArgoCD ApplicationSets'
    ]
  },
  {
    id: 13,
    title: 'Monitoring, Observability & Alerting (Prometheus & Grafana)',
    duration: 'Week 17',
    level: 'Advanced',
    labsCount: 7,
    projectsCount: 1,
    skills: ['Prometheus Metrics', 'Grafana Dashboards', 'Alertmanager', 'Node Exporter', 'Loki Log Aggregation', 'SLI/SLO Targets'],
    description: 'Build full-stack observability with metrics scraping, custom Grafana dashboards, Loki log streaming, and PagerDuty alert rules.',
    icon: 'BarChart2',
    topics: [
      'Metrics vs Logs vs Traces (The 3 Pillars of Observability)',
      'Prometheus Scraping, PromQL Queries & Custom Exporters',
      'Building Executive Grafana Dashboards for Infrastructure',
      'Prometheus Alertmanager Rules & Slack/PagerDuty Alerts',
      'Grafana Loki for Centralized Container Log Aggregation',
      'Distributed Tracing with OpenTelemetry & Jaeger'
    ]
  },
  {
    id: 14,
    title: 'DevSecOps & Security Automation',
    duration: 'Week 18',
    level: 'Advanced',
    labsCount: 6,
    projectsCount: 1,
    skills: ['SAST/DAST', 'Trivy Image Scan', 'OWASP ZAP', 'HashiCorp Vault', 'Kyverno/OPA', 'Secrets Management'],
    description: 'Shift security left by integrating static analysis, dependency vulnerability scans, container policy checks, and secrets management into CI/CD.',
    icon: 'ShieldCheck',
    topics: [
      'DevSecOps Culture & Shift-Left Security Framework',
      'Static Application Security Testing (SAST) with SonarQube & Bandit',
      'Software Supply Chain Security & Dependency Check (Snyk)',
      'Container & Infrastructure Vulnerability Scans (Trivy, Grype)',
      'Dynamic Policy Enforcement with Kyverno & Open Policy Agent (OPA)',
      'Secrets Management with HashiCorp Vault & Kubernetes Secrets'
    ]
  },
  {
    id: 15,
    title: 'Real-Time Production Capstone Projects',
    duration: 'Week 19 - 20',
    level: 'Expert',
    labsCount: 16,
    projectsCount: 8,
    skills: ['End-to-End DevOps', 'Multi-Cloud', 'Zero-Downtime Deployment', 'Disaster Recovery', 'Cost Optimization'],
    description: 'Execute production-grade real-world projects mimicking high-traffic tech enterprises like Netflix, Spotify, and AWS cloud environments.',
    icon: 'Workflow',
    topics: [
      'Project 1: Netflix-Style Microservices CI/CD Pipeline',
      'Project 2: Highly Available AWS EKS Production Infrastructure via Terraform',
      'Project 3: GitOps Automated Application Delivery with ArgoCD',
      'Project 4: Zero-Trust Security & DevSecOps Automated Gatekeeper Pipeline',
      'Project 5: Enterprise Observability Stack with Prometheus, Grafana & Loki',
      'Project 6: Automated Multi-Region AWS Disaster Recovery Architecture',
      'Project 7: Serverless Microservices Deployment with AWS Lambda & DynamoDB',
      'Project 8: Python ChatOps Bot for Kubernetes Incident Management'
    ]
  },
  {
    id: 16,
    title: 'Real-World Interview Preparation & Technical Mocks',
    duration: 'Week 21',
    level: 'Expert',
    labsCount: 10,
    projectsCount: 0,
    skills: ['Architecture Design', 'Troubleshooting', 'System Design', 'Mock Technical Rounds', 'Salary Negotiation'],
    description: 'Ace tough DevOps technical rounds with 500+ solved scenario questions, system design walkthroughs, and live mock interviews with Senior DevOps Leads.',
    icon: 'MessageSquare',
    topics: [
      'Top 200 Real Production Scenario Questions (Kubernetes, AWS, CI/CD)',
      'DevOps System Design: High Availability, Auto-Scaling & DR',
      'Live Troubleshooting Scenarios: CrashLoopBackOff, OutOfMemory, High Latency',
      '3x 1-on-1 Technical Mock Interviews with Industry Mentors',
      'Detailed Feedback, Weakness Identification & Retakes'
    ]
  },
  {
    id: 17,
    title: 'Career Support, Resume Building & Placement Training',
    duration: 'Week 22',
    level: 'Expert',
    labsCount: 0,
    projectsCount: 0,
    skills: ['DevOps Resume', 'LinkedIn Profile', 'GitHub Portfolio', 'Salary Negotiation', 'HR Mock Round'],
    description: 'Get hired faster with ATS-optimized DevOps resumes, recruiter-magnet LinkedIn profiles, verified GitHub project portfolios, and placement drives.',
    icon: 'Briefcase',
    topics: [
      'Crafting ATS-Compliant Senior DevOps & Cloud Specialist Resumes',
      'Optimizing LinkedIn for Direct Recruiter Inbound Messages',
      'Structuring Production-Grade GitHub Portfolios with Documentation',
      'Salary Benchmarking & Senior DevOps Negotiation Strategies',
      'Direct Referrals to 150+ Hiring Partners (Amazon, Deloitte, Accenture, Infosys)'
    ]
  }
];
