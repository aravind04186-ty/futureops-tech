import { RealProject } from '../types';

export const realProjectsData: RealProject[] = [
  {
    id: 'proj-1',
    title: 'Netflix-Style Microservices Automated CI/CD Pipeline',
    category: 'CI/CD & DevSecOps',
    complexity: 'Enterprise',
    description: 'Build a zero-downtime, fully automated CI/CD pipeline for a high-traffic video streaming microservice application using GitHub Actions, SonarQube, Trivy, Docker, and Kubernetes.',
    techStack: ['GitHub Actions', 'Docker', 'SonarQube', 'Trivy', 'Helm', 'Kubernetes', 'Nexus'],
    githubRepo: 'https://github.com/futureops-tech/netflix-cicd-pipeline-lab',
    commandSnippet: `docker build -t netflix-app:v2.4 .
trivy image --severity HIGH,CRITICAL netflix-app:v2.4
helm upgrade --install netflix-stream ./helm-chart --set image.tag=v2.4`,
    architectureSteps: [
      'Developer pushes code changes to GitHub repository branch',
      'GitHub Actions pipeline triggers automated Unit Tests and SonarQube Static Code Quality check',
      'Trivy scans Docker container dependencies for vulnerabilities with zero-tolerance threshold',
      'Clean Docker image is tagged with Git SHA and pushed to Nexus/Docker Hub Repository',
      'Helm Chart automatically deploys updated microservice to Kubernetes cluster with RollingUpdate strategy'
    ],
    keyLearnings: [
      'Multi-stage Docker build optimizations reducing image size by 75%',
      'Setting strict quality gates in SonarQube to fail builds with vulnerabilities',
      'Zero-downtime rolling upgrades with Kubernetes health readiness/liveness probes',
      'Automated Slack alert notifications on pipeline failure or success'
    ]
  },
  {
    id: 'proj-2',
    title: 'Production Kubernetes Cluster on AWS EKS via Terraform',
    category: 'Cloud Infrastructure & IaC',
    complexity: 'Enterprise',
    description: 'Provision a production-grade multi-AZ Amazon EKS cluster with managed node groups, custom VPC, ALB Ingress Controller, ExternalDNS, and Cert-Manager using modular Terraform code.',
    techStack: ['AWS EKS', 'Terraform', 'AWS IAM OIDC', 'ALB Ingress', 'Cert-Manager', 'Route53'],
    githubRepo: 'https://github.com/futureops-tech/aws-eks-terraform-production',
    commandSnippet: `terraform init -backend-config="bucket=futureops-tf-state"
terraform plan -out=eks-prod.tfplan
terraform apply "eks-prod.tfplan"`,
    architectureSteps: [
      'Terraform provisions Custom VPC with 3 Public and 3 Private Subnets across 3 Availability Zones',
      'Configures NAT Gateways and Internet Gateways for secure private subnet routing',
      'Deploys EKS Control Plane v1.30 with OIDC Provider for fine-grained IAM Roles for Service Accounts (IRSA)',
      'Installs AWS Load Balancer Controller and Cert-Manager via Terraform Helm Providers',
      'Automatically issues Let’s Encrypt TLS/SSL certificates for custom domains linked to Route53'
    ],
    keyLearnings: [
      'Remote S3 state storage with DynamoDB distributed state locking',
      'Granular AWS IAM Security policies for Kubernetes workloads',
      'Infrastructure idempotency and automated zero-drift configuration Management'
    ]
  },
  {
    id: 'proj-3',
    title: 'AWS Three-Tier Enterprise Architecture with Auto-Scaling',
    category: 'Cloud Architecture',
    complexity: 'Advanced',
    description: 'Design and deploy a resilient 3-Tier Web Application (React Frontend, Node.js Backend, Amazon RDS PostgreSQL Database) with Auto Scaling Groups and CloudFront CDN.',
    techStack: ['AWS EC2', 'AWS ALB', 'Amazon RDS', 'S3', 'CloudFront', 'Auto Scaling', 'VPC'],
    githubRepo: 'https://github.com/futureops-tech/aws-3tier-architecture-prod',
    commandSnippet: `aws ec2 describe-auto-scaling-groups --auto-scaling-group-names 3Tier-ASG
aws rds describe-db-instances --db-instance-identifier 3tier-postgres-prod`,
    architectureSteps: [
      'Static Web Assets hosted on Amazon S3 and distributed globally with CloudFront CDN',
      'Application Load Balancer (ALB) routes API traffic across EC2 instances in private subnets',
      'Auto Scaling Group dynamically adjusts server count based on CPU utilization metrics',
      'Database Tier utilizes Amazon RDS PostgreSQL Multi-AZ deployment with automated daily snapshots',
      'AWS Systems Manager (SSM) Session Manager replaces traditional SSH jump hosts for security'
    ],
    keyLearnings: [
      'Multi-AZ high availability and disaster failover mechanisms',
      'Strict Security Group rules allowing only load balancer access to backend servers',
      'Database automated backups and point-in-time recovery testing'
    ]
  },
  {
    id: 'proj-4',
    title: 'Dockerized Microservices with Service Mesh & Envoy',
    category: 'Containerization',
    complexity: 'Intermediate',
    description: 'Decompose a monolithic e-commerce application into 5 independent Dockerized microservices communicating securely via Envoy Proxy sidecars.',
    techStack: ['Docker', 'Docker Compose', 'Envoy Proxy', 'Node.js', 'MongoDB', 'Redis'],
    githubRepo: 'https://github.com/futureops-tech/docker-microservices-envoy',
    commandSnippet: `docker-compose -f docker-compose.prod.yml up -d --build
docker exec -it redis-cache redis-cli ping`,
    architectureSteps: [
      'Separate Auth, Catalog, Cart, Payment, and Notification microservices into standalone Docker containers',
      'Implement Redis In-Memory Cache container for fast session retrieval',
      'Configure Docker Overlay Networks to segregate internal database communication from external web ports',
      'Attach Envoy Proxy sidecars to enable mTLS encryption between microservices',
      'Set up Docker Healthchecks to automatically restart unhealthy container instances'
    ],
    keyLearnings: [
      'Microservices architecture patterns and container inter-service communication',
      'Docker volume persistent storage strategies for MongoDB database files',
      'Container resource limitation (CPU & Memory limits) to prevent noisy neighbor issues'
    ]
  },
  {
    id: 'proj-5',
    title: 'Automated Multi-Region Terraform Infrastructure',
    category: 'IaC & Disaster Recovery',
    complexity: 'Enterprise',
    description: 'Create multi-region redundant cloud infrastructure across US-East-1 and EU-West-1 with automated DNS failover using HashiCorp Terraform and Route53.',
    techStack: ['Terraform', 'AWS Route53', 'Multi-Region VPC', 'S3 Cross-Region Replication'],
    githubRepo: 'https://github.com/futureops-tech/terraform-multiregion-dr',
    commandSnippet: `terragrunt run-all plan
terragrunt run-all apply`,
    architectureSteps: [
      'Terraform scripts create identical VPCs in primary (US) and secondary (EU) AWS regions',
      'S3 Bucket Cross-Region Replication (CRR) automatically syncs uploaded user media within seconds',
      'Amazon RDS Read Replicas established across regions for disaster failover',
      'AWS Route53 Health Checks monitor primary region availability continuously',
      'Automatic DNS failover routes web traffic to EU region within 30 seconds of outage detection'
    ],
    keyLearnings: [
      'Designing for 99.99% uptime and low Recovery Time Objective (RTO)',
      'Terragrunt DRY structure for managing multi-env and multi-region state files',
      'Cost optimization during idle passive disaster recovery states'
    ]
  },
  {
    id: 'proj-6',
    title: 'GitOps Workflow with ArgoCD & Argo Rollouts',
    category: 'GitOps & Kubernetes',
    complexity: 'Advanced',
    description: 'Implement a true GitOps delivery model where Kubernetes cluster state automatically syncs with Git repository configurations using ArgoCD and Canary deployment rollouts.',
    techStack: ['Kubernetes', 'ArgoCD', 'Argo Rollouts', 'Git', 'Prometheus'],
    githubRepo: 'https://github.com/futureops-tech/gitops-argocd-canary-lab',
    commandSnippet: `kubectl argo rollouts get rollout web-app -n production
kubectl argo rollouts promote web-app -n production`,
    architectureSteps: [
      'Developers update image tags in the Kubernetes manifest Git repository',
      'ArgoCD detects configuration drift between Git and active cluster within 15 seconds',
      'Argo Rollouts initiates Canary deployment, routing 10% traffic to new version',
      'Prometheus automatically analyzes error rate metrics on the Canary pods',
      'If error rate remains under 0.1%, deployment automatically promotes to 100% traffic'
    ],
    keyLearnings: [
      'Eliminating direct kubectl/cluster credentials from developer machines',
      'Automated rollback upon detection of elevated HTTP 5xx error codes',
      'Declarative multi-cluster application management with ArgoCD ApplicationSets'
    ]
  },
  {
    id: 'proj-7',
    title: 'Zero-Downtime Jenkins Automation Pipeline',
    category: 'CI/CD Pipelines',
    complexity: 'Intermediate',
    description: 'Build a enterprise Jenkins Pipeline-as-Code with dynamic Docker build agents, parallel automated testing stages, and automated rollback triggers.',
    techStack: ['Jenkins', 'Groovy Pipeline', 'Docker Agents', 'JUnit', 'Slack Webhooks'],
    githubRepo: 'https://github.com/futureops-tech/jenkins-pipeline-as-code',
    commandSnippet: `pipeline {
  agent { docker { image 'node:20-alpine' } }
  stages { stage('Build & Test') { ... } }
}`,
    architectureSteps: [
      'Jenkins Master dynamically launches ephemeral Docker containers on demand to run build steps',
      'Parallel stage runs Unit Tests, Code Linting, and Dependency Audits concurrently to cut build time by 60%',
      'Successful build publishes compressed artifact to Nexus Repository Manager',
      'Deploy stage executes Blue-Green switch over application load balancer',
      'Detailed build summary report generated and posted to dedicated Slack engineering channel'
    ],
    keyLearnings: [
      'Creating reusable Jenkins Shared Libraries in Groovy',
      'Managing secrets securely with Jenkins Credentials Manager',
      'Resource cleanup and ephemeral build agent lifecycle management'
    ]
  },
  {
    id: 'proj-8',
    title: 'Enterprise Prometheus, Grafana & Loki Observability Suite',
    category: 'Monitoring & Observability',
    complexity: 'Advanced',
    description: 'Set up centralized monitoring, log aggregation, and real-time alerting for a 50-node Kubernetes cluster using Prometheus, Grafana, Loki, and Alertmanager.',
    techStack: ['Prometheus', 'Grafana', 'Loki', 'Promtail', 'Alertmanager', 'PagerDuty'],
    githubRepo: 'https://github.com/futureops-tech/observability-prometheus-grafana',
    commandSnippet: `helm install prometheus-stack prometheus-community/kube-prometheus-stack -n monitoring
kubectl get pods -n monitoring`,
    architectureSteps: [
      'Kube-Prometheus-Stack Helm Chart deploys Prometheus Operator, Node-Exporters, and Kube-State-Metrics',
      'Promtail agents installed as DaemonSets on every node to collect container stdout/stderr logs',
      'Loki aggregates logs into indexed storage searchable directly within Grafana dashboards',
      'Grafana displays custom executive dashboards for CPU, Memory, Disk IO, and HTTP request rate',
      'Alertmanager routes critical high-severity alerts to PagerDuty and on-call engineer mobile apps'
    ],
    keyLearnings: [
      'Writing custom PromQL queries for 99th percentile HTTP latency metrics',
      'Configuring alert inhibition rules to suppress duplicate incident notifications',
      'Setting up SLI/SLO dashboards for tracking Service Level Objectives'
    ]
  }
];
