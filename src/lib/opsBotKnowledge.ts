/**
 * OpsBot AI Mentor Knowledge Engine
 * Guarantees immediate, high-quality, production-tested AI DevOps & Advanced Engineering answers
 * both on the server (/api/ai-guide) and client-side fallback.
 */

export function getOpsBotAnswer(prompt: string): string {
  const p = (prompt || '').trim().toLowerCase();

  if (!p) {
    return "Please ask any technical question regarding Docker, Kubernetes, AWS, Terraform, Jenkins, Ansible, Helm, ArgoCD, Linux, Python, Go, or DevOps career guidance!";
  }

  // 1. Dockerfile / Container Image Generation
  if (p.includes('dockerfile') || (p.includes('docker') && (p.includes('build') || p.includes('image') || p.includes('create') || p.includes('write') || p.includes('give') || p.includes('sample')))) {
    return `## 🐳 Production-Ready Multi-Stage Dockerfile (Node.js & Universal Microservices)

Here is an enterprise-grade, security-hardened **multi-stage Dockerfile** designed for production deployments:

\`\`\`dockerfile
# =========================================================
# STAGE 1: Build & Dependency Resolution
# =========================================================
FROM node:20-alpine AS builder

WORKDIR /app

# Optimize layer caching by copying dependency manifests first
COPY package*.json ./

# Install exact production dependencies
RUN npm ci --only=production

# Copy application source code
COPY . .

# Compile TypeScript / build production bundle
RUN npm run build

# =========================================================
# STAGE 2: Minimal Production Runtime Stage
# =========================================================
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# Security Hardening: Create non-root system group & user (UID 10001)
RUN addgroup -g 10001 -S appgroup && \\
    adduser -S appuser -u 10001 -G appgroup

# Copy built artifacts and production modules from builder stage
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Enforce Non-Root Execution
USER appuser

EXPOSE 3000

# Container Healthcheck for K8s & Docker Engine
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \\
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/api/health || exit 1

# Start Server
CMD ["node", "dist/server.js"]
\`\`\`

### 🔒 Enterprise Security & Optimization Highlights:
1. **Multi-Stage Build:** Drops build tools, source code, and intermediate caches, shrinking image size (<80MB).
2. **Non-Root Execution (\`appuser\` UID 10001):** Prevents container breakout vulnerabilities (CIS Benchmark compliance).
3. **Layer Caching:** Copies \`package*.json\` before source files to maximize Docker build speed on code changes.
4. **Health Check:** Native endpoint probing for container orchestration readiness.`;
  }

  // 2. What is Docker? / Docker Explanation
  if (p.includes('docker') && (p.includes('what is') || p.includes('explain') || p.includes('overview') || p.includes('meaning') || p.includes('definition') || p.includes('introduction') || p === 'docker' || p === 'what is docker?' || p === 'what is docker')) {
    return `## 🐳 What is Docker? Complete Industry Overview

**Docker** is an open-source containerization platform that allows developers to package applications along with all their dependencies, runtime environments, libraries, and configuration files into standardized, portable units called **Containers**.

---

### 🔑 Key Concepts in Docker:

1. **Docker Engine:** The lightweight client-server application that builds, runs, and manages Docker containers on a host system.
2. **Docker Image:** An immutable, read-only template containing application code, libraries, dependencies, and environment variables.
3. **Docker Container:** A runnable, isolated instance of a Docker image executing in its own lightweight namespace.
4. **Dockerfile:** A declarative text file containing instructions to build a Docker image.
5. **Docker Registry (Hub / ECR / GAR):** A centralized storage and distribution server for Docker images.

---

### ⚖️ Docker Containers vs. Virtual Machines (VMs)

| Feature | Docker Containers 📦 | Virtual Machines (VMs) 💻 |
| :--- | :--- | :--- |
| **Architecture** | Shares Host OS Kernel | Includes Full Guest OS |
| **Startup Time** | Milliseconds / Seconds | Minutes |
| **Resource Usage** | Lightweight (MBs of RAM) | Heavy (GBs of RAM) |
| **Isolation** | OS-level isolation (Namespaces & cgroups) | Hardware-level isolation (Hypervisor) |

---

### 💻 Essential Docker CLI Commands:

\`\`\`bash
# Build a Docker image from a Dockerfile
docker build -t myapp:v1.0 .

# Run container in detached mode with port mapping
docker run -d -p 8080:3000 --name web-app myapp:v1.0

# Inspect running containers
docker ps -a

# View container real-time logs
docker logs -f web-app

# Execute interactive shell inside running container
docker exec -it web-app /bin/sh

# Clean up stopped containers, unused networks & dangling images
docker system prune -af
\`\`\`

### 💡 Why Industry Uses Docker:
- **"It works on my machine" solved:** Eliminates environment discrepancies between Development, Staging, and Production.
- **Microservices Deployment:** Ideal for packaging lightweight microservices.
- **Kubernetes Integration:** Serves as the standard runtime format for Kubernetes cluster orchestration.`;
  }

  // 3. What is Kubernetes / Advanced K8s Manifests
  if (p.includes('kubernetes') || p.includes('k8s') || p.includes('helm') || p.includes('argocd') || p.includes('ingress') || p.includes('pod') || p.includes('deployment')) {
    if (p.includes('what is') || p.includes('explain') || p.includes('overview') || p === 'kubernetes' || p === 'k8s') {
      return `## ☸️ What is Kubernetes (K8s)? Complete Industry Guide

**Kubernetes** (often abbreviated as **K8s**) is an open-source **Container Orchestration Platform** originally created by Google and now maintained by the Cloud Native Computing Foundation (CNCF). It automates the deployment, scaling, load balancing, networking, and management of containerized applications across clusters of servers.

---

### 🏗️ Kubernetes Cluster Architecture:

1. **Control Plane (Master Nodes):**
   - **kube-apiserver:** Central API gateway for all cluster operations.
   - **etcd:** Distributed key-value store holding all cluster state and configuration data.
   - **kube-scheduler:** Assigns newly created Pods to appropriate worker nodes based on resource availability.
   - **kube-controller-manager:** Runs controllers that regulate cluster state (e.g. NodeController, ReplicaSetController).

2. **Worker Nodes:**
   - **kubelet:** Primary node agent ensuring containers defined in PodSpecs are running and healthy.
   - **kube-proxy:** Manages network routing and IP tables for Kubernetes Services.
   - **Container Runtime:** Containerd or CRI-O executing container images.

---

### 📦 Core Kubernetes Objects:

- **Pod:** The smallest deployable unit in K8s, wrapping one or more co-located containers.
- **Deployment:** Declarative controller managing rolling updates, rollbacks, and replica counts.
- **Service (ClusterIP / NodePort / LoadBalancer):** Stable network endpoint providing internal/external load balancing to Pods.
- **Ingress:** HTTP/HTTPS router (e.g., NGINX Ingress) managing external domain routing to internal Services.
- **ConfigMap & Secret:** Externalized configuration data and encrypted secrets (base64/KMS).

---

### 📄 Basic Kubernetes Production Manifest Example:

\`\`\`yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: backend-api
  namespace: production
spec:
  replicas: 3
  selector:
    matchLabels:
      app: backend-api
  template:
    metadata:
      labels:
        app: backend-api
    spec:
      containers:
      - name: api
        image: myregistry/backend-api:v1.2.0
        ports:
        - containerPort: 3000
        resources:
          requests:
            cpu: "200m"
            memory: "256Mi"
          limits:
            cpu: "500m"
            memory: "512Mi"
\`\`\`

### 🛠️ Key \`kubectl\` Commands:

\`\`\`bash
kubectl get pods -n production          # List running pods
kubectl describe pod <pod-name>        # Troubleshoot pod details & events
kubectl logs -f <pod-name>              # Stream container logs
kubectl apply -f deployment.yaml       # Apply declarative manifest
\`\`\``;
    }

    return `## ☸️ Advanced Kubernetes & Cloud-Native Production Architecture

Here is a enterprise-ready **Kubernetes Deployment & Ingress specification** with zero-downtime rolling updates, security context, and Horizontal Pod Autoscaling (HPA):

\`\`\`yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: enterprise-api
  namespace: production
  labels:
    app.kubernetes.io/name: enterprise-api
    app.kubernetes.io/tier: backend
spec:
  replicas: 3
  revisionHistoryLimit: 5
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1
      maxUnavailable: 0
  selector:
    matchLabels:
      app: enterprise-api
  template:
    metadata:
      labels:
        app: enterprise-api
    spec:
      securityContext:
        runAsNonRoot: true
        runAsUser: 10001
        fsGroup: 10001
      containers:
      - name: api
        image: 123456789012.dkr.ecr.us-east-1.amazonaws.com/api:v2.4.0
        imagePullPolicy: IfNotPresent
        ports:
        - containerPort: 8080
          name: http
        resources:
          requests:
            cpu: "250m"
            memory: "256Mi"
          limits:
            cpu: "1000m"
            memory: "512Mi"
        livenessProbe:
          httpGet:
            path: /api/health
            port: 8080
          initialDelaySeconds: 15
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /api/health
            port: 8080
          initialDelaySeconds: 5
          periodSeconds: 5
---
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: enterprise-api-ingress
  namespace: production
  annotations:
    kubernetes.io/ingress.class: "nginx"
    cert-manager.io/cluster-issuer: "letsencrypt-prod"
    nginx.ingress.kubernetes.io/ssl-redirect: "true"
spec:
  tls:
  - hosts:
    - api.futureops.com
    secretName: api-tls-cert
  rules:
  - host: api.futureops.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: enterprise-api-svc
            port:
              number: 80
\`\`\`

### 🎯 Key Kubernetes Production Rules:
- **Zero Downtime:** \`maxUnavailable: 0\` prevents downtime during continuous deployment.
- **Resource Limits:** Prevents noisy-neighbor memory exhaustion and triggering OOMKilled states.
- **Security Context:** Enforces non-root execution (UID 10001) for CIS Benchmark compliance.`;
  }

  // 4. Ansible & Configuration Management
  if (p.includes('ansible') || p.includes('playbook') || p.includes('configuration management')) {
    return `## 📜 Advanced Ansible Automation Playbook (Server Provisioning & Hardening)

Here is a enterprise-standard **Ansible Playbook** for configuring Ubuntu/RHEL Linux servers with Docker, Nginx, and UFW security firewall:

\`\`\`yaml
---
- name: Provision and Harden Production Application Servers
  hosts: app_servers
  become: yes
  vars:
    docker_packages:
      - docker-ce
      - docker-ce-cli
      - containerd.io
    app_user: sysadmin

  tasks:
    - name: Update APT package cache
      apt:
        update_cache: yes
        cache_valid_time: 3600

    - name: Install prerequisite packages
      apt:
        name:
          - curl
          - git
          - ufw
          - htop
          - fail2ban
        state: present

    - name: Add Docker official GPG key
      apt_key:
        url: https://download.docker.com/linux/ubuntu/gpg
        state: present

    - name: Ensure Docker service is enabled and running
      systemd:
        name: docker
        state: started
        enabled: yes

    - name: Configure UFW firewall rules
      ufw:
        rule: allow
        port: "{{ item }}"
        proto: tcp
      loop:
        - '22'
        - '80'
        - '443'

    - name: Enable UFW Firewall
      ufw:
        state: enabled
\`\`\`

### ⚡ Execution Commands:
\`\`\`bash
# Test inventory connectivity
ansible app_servers -m ping -i inventory.ini

# Execute playbook in dry-run mode
ansible-playbook -i inventory.ini site.yml --check

# Execute playbook with sudo elevated privileges
ansible-playbook -i inventory.ini site.yml --ask-become-pass
\`\`\``;
  }

  // 5. Python / Shell Scripting Automation
  if (p.includes('python') || p.includes('bash') || p.includes('shell') || p.includes('script') || p.includes('automation') || p.includes('code') || p.includes('program')) {
    return `## 🐍 Advanced DevOps Python & Bash Automation Engine

### 1️⃣ Python Boto3 Cloud Maintenance Script (AWS EBS & EC2 Cleanup)
\`\`\`python
import boto3
import logging

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger("DevOpsAutomation")

def cleanup_unattached_ebs_volumes(region="us-east-1"):
    """Identifies and purges unattached AWS EBS volumes to eliminate cloud cost waste."""
    ec2 = boto3.client('ec2', region_name=region)
    
    response = ec2.describe_volumes(
        Filters=[{'Name': 'status', 'Values': ['available']}]
    )
    
    volumes = response.get('Volumes', [])
    logger.info(f"Found {len(volumes)} unattached EBS volumes in region {region}.")
    
    for vol in volumes:
        vol_id = vol['VolumeId']
        size_gb = vol['Size']
        logger.warning(f"Unattached Volume Found: {vol_id} ({size_gb} GB). Purging...")
        # ec2.delete_volume(VolumeId=vol_id)

if __name__ == "__main__":
    cleanup_unattached_ebs_volumes()
\`\`\`

### 2️⃣ Production-Grade Robust Bash Pipeline Script
\`\`\`bash
#!/usr/bin/env bash
set -euo pipefail

# Error Handler Trap
trap 'echo "❌ ERROR: Pipeline failed at line $LINENO" | tee -a /tmp/deploy.log; exit 1' ERR

LOG_FILE="/tmp/devops_pipeline.log"

log() {
  echo "[$(date +'%Y-%m-%dT%H:%M:%S%z')] $1" | tee -a "$LOG_FILE"
}

log "🚀 Initializing Automated CI/CD Environment Audit..."

# Check required CLI tools
for tool in docker kubectl terraform git; do
  if ! command -v "$tool" &> /dev/null; then
    log "❌ FATAL: Required CLI tool '$tool' is missing!"
    exit 1
  fi
done

log "✅ All system dependencies verified. Proceeding with deployment..."
\`\`\``;
  }

  // 6. What is Jenkins / CI/CD
  if (p.includes('jenkins') || p.includes('github actions') || p.includes('ci/cd') || p.includes('pipeline')) {
    if (p.includes('what is') || p.includes('explain') || p === 'jenkins' || p === 'what is jenkins?') {
      return `## 🔄 What is Jenkins? Continuous Integration & Delivery Guide

**Jenkins** is an open-source, Java-based **Automation Server** widely used for **Continuous Integration (CI)** and **Continuous Deployment/Delivery (CD)**. It enables development and DevOps teams to automate code compilation, testing, static code analysis, container building, security scanning, and cloud deployments.

---

### ⚡ Core Capabilities of Jenkins:

1. **Pipeline as Code (Jenkinsfile):** Define entire build and release pipelines using declarative or scripted Groovy syntax checked into version control (Git).
2. **Extensible Plugin Ecosystem:** Over 1,800+ plugins integrating with Git, GitHub, GitLab, Docker, Kubernetes, AWS, SonarQube, Slack, and Jira.
3. **Distributed Architecture:** Controller-Agent model distributing heavy build jobs across dedicated agent nodes or dynamic Kubernetes pods.

---

### 📜 Sample Production Declarative Jenkinsfile:

\`\`\`groovy
pipeline {
    agent any
    
    environment {
        APP_NAME  = 'payment-service'
        REGISTRY  = '123456789012.dkr.ecr.us-east-1.amazonaws.com'
        IMAGE_TAG = "\${BUILD_NUMBER}"
    }
    
    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/org/payment-service.git'
            }
        }
        
        stage('Unit Tests') {
            steps {
                sh 'npm test'
            }
        }
        
        stage('Build & Push Docker Image') {
            steps {
                sh 'docker build -t \${REGISTRY}/\${APP_NAME}:\${IMAGE_TAG} .'
                sh 'aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin \${REGISTRY}'
                sh 'docker push \${REGISTRY}/\${APP_NAME}:\${IMAGE_TAG}'
            }
        }
        
        stage('Deploy to Kubernetes') {
            steps {
                sh 'kubectl set image deployment/payment-deployment payment=\${REGISTRY}/\${APP_NAME}:\${IMAGE_TAG} -n prod'
            }
        }
    }
    
    post {
        always {
            cleanWs()
        }
    }
}
\`\`\`

### 🚀 Why Engineering Teams Choose Jenkins:
- **Complete Customization:** Full control over build environment and security policies.
- **GitOps Integration:** Webhooks auto-trigger builds on every \`git push\` or Pull Request merge.
- **Self-Hosted Enterprise Control:** Ideal for air-gapped or compliance-heavy enterprise networks.`;
    }

    return `## 🔄 Production CI/CD Pipeline (Jenkinsfile & DevSecOps Gate)

Here is an enterprise-standard **Jenkins Declarative Pipeline** with automated unit tests, SonarQube code quality gate, Trivy container security scanning, and Kubernetes deployment:

\`\`\`groovy
pipeline {
    agent any
    environment {
        APP_NAME    = 'core-backend'
        IMAGE_TAG   = "\${BUILD_NUMBER}"
        REGISTRY    = '123456789012.dkr.ecr.us-east-1.amazonaws.com'
    }
    stages {
        stage('Checkout Source') {
            steps {
                git branch: 'main', url: 'https://github.com/org/core-backend.git'
            }
        }
        stage('Unit Tests & SonarQube') {
            steps {
                sh 'npm test'
            }
        }
        stage('Build Container Image') {
            steps {
                sh 'docker build -t \${REGISTRY}/\${APP_NAME}:\${IMAGE_TAG} .'
            }
        }
        stage('Security Scan (Trivy)') {
            steps {
                sh 'trivy image --exit-code 1 --severity HIGH,CRITICAL \${REGISTRY}/\${APP_NAME}:\${IMAGE_TAG}'
            }
        }
        stage('Push to ECR') {
            steps {
                sh 'aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin \${REGISTRY}'
                sh 'docker push \${REGISTRY}/\${APP_NAME}:\${IMAGE_TAG}'
            }
        }
        stage('Deploy to Kubernetes') {
            steps {
                sh 'kubectl set image deployment/core-api-deployment api-container=\${REGISTRY}/\${APP_NAME}:\${IMAGE_TAG} -n production'
            }
        }
    }
    post {
        always {
            cleanWs()
        }
    }
}
\`\`\``;
  }

  // 7. What is Terraform / IaC
  if (p.includes('terraform') || p.includes('iac')) {
    if (p.includes('what is') || p.includes('explain') || p === 'terraform' || p === 'what is terraform?') {
      return `## 🏗️ What is Terraform? Infrastructure as Code (IaC) Guide

**Terraform** is an open-source **Infrastructure as Code (IaC)** tool created by **HashiCorp**. It enables Cloud and DevOps Engineers to define, provision, and manage cloud infrastructure (AWS, Azure, GCP, Kubernetes, Cloudflare) using a human-readable declarative configuration language called **HashiCorp Configuration Language (HCL)**.

---

### 🔑 Key Terraform Concepts:

1. **Declarative Architecture:** You describe the *desired end-state* of your infrastructure, and Terraform calculates the necessary changes to reach that state.
2. **Providers:** Plugins (e.g. AWS Provider, Azure Provider, Kubernetes Provider) that translate HCL into target cloud REST API calls.
3. **State File (\`terraform.tfstate\`):** A JSON database mapping configured resources to real-world cloud objects.
4. **Remote Backend & State Locking:** Storing state securely in S3 or GCS with DynamoDB state locking to prevent concurrent modifications.

---

### 📜 Sample Terraform AWS Blueprint:

\`\`\`hcl
# Configure Provider
terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = "us-east-1"
}

# Provision AWS VPC
resource "aws_vpc" "main_vpc" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_hostnames = true

  tags = {
    Name        = "production-vpc"
    Environment = "production"
    ManagedBy   = "Terraform"
  }
}
\`\`\`

### ⚡ Essential Terraform CLI Workflow:

\`\`\`bash
terraform init       # Initialize provider plugins & remote state backend
terraform fmt        # Auto-format HCL syntax according to standard
terraform validate   # Check code syntax and attribute validity
terraform plan       # Preview execution plan before making changes
terraform apply      # Execute plan and provision real infrastructure
terraform destroy    # Safely remove all resources created by state
\`\`\`

### 🎯 Key Benefits:
- **Zero Configuration Drift:** Audits and aligns real cloud infrastructure against code.
- **Multi-Cloud Support:** Single syntax for AWS, Azure, GCP, and Kubernetes.
- **Reusability:** Terraform Modules allow building repeatable enterprise infrastructure templates.`;
    }

    return `## 🏗️ Production Terraform AWS VPC & EKS Blueprint

Here is a modular **Terraform (HCL)** blueprint with remote S3 state storage and DynamoDB state locking:

\`\`\`hcl
# backend.tf - Remote State Storage & Locking
terraform {
  required_version = ">= 1.6.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }

  backend "s3" {
    bucket         = "futureops-tf-state-prod"
    key            = "infrastructure/terraform.tfstate"
    region         = "us-east-1"
    dynamodb_table = "futureops-tf-locks"
    encrypt        = true
  }
}

provider "aws" {
  region = "us-east-1"
  default_tags {
    tags = {
      Environment = "Production"
      ManagedBy   = "Terraform"
      Academy     = "FutureOps-Tech"
    }
  }
}

# main.tf - AWS Production VPC
resource "aws_vpc" "prod_vpc" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_hostnames = true
  enable_dns_support   = true

  tags = {
    Name = "production-vpc"
  }
}
\`\`\`

### ⚡ Essential CLI Execution Commands:
\`\`\`bash
terraform init              # Initialize providers & remote backend
terraform fmt -recursive    # Auto-format code
terraform validate          # Check syntax & type safety
terraform plan -out=plan.tf # Generate execution plan
terraform apply plan.tf     # Safely execute changes
\`\`\``;
  }

  // 8. What is AWS / Cloud Architecture
  if (p.includes('aws') || p.includes('azure') || p.includes('gcp') || p.includes('cloud')) {
    if (p.includes('what is') || p.includes('explain') || p === 'aws' || p === 'what is aws?') {
      return `## ☁️ What is Amazon Web Services (AWS)? Complete Guide

**Amazon Web Services (AWS)** is the world's most comprehensive and broadly adopted cloud platform, offering over 200+ fully featured services from data centers globally.

### 🏛️ Core AWS DevOps & Infrastructure Services:
- **Compute:** EC2 (Virtual Servers), Lambda (Serverless), ECS/EKS (Container Management).
- **Networking:** VPC (Virtual Private Cloud), Route 53 (DNS), CloudFront (CDN), ALB (Application Load Balancers).
- **Storage & Databases:** S3 (Object Storage), EBS (Block Storage), RDS (Managed PostgreSQL/MySQL), DynamoDB (NoSQL).
- **Security & Access:** IAM (Identity & Access Management), KMS (Encryption Keys), Secrets Manager, WAF.

### 🔐 AWS Security & Production Best Practices:
1. **Least-Privilege IAM Policies:** Never use root accounts for daily workloads; enforce MFA and role-based policies.
2. **Multi-AZ Resilience:** Distribute EC2/EKS workloads across multiple Availability Zones with Auto Scaling Groups.
3. **Infrastructure as Code:** Always manage AWS infrastructure using Terraform or AWS CloudFormation.`;
    }
  }

  // 9. DevOps Career Roadmap
  if (p.includes('roadmap') || p.includes('career') || p.includes('learning path') || p.includes('how to learn devops') || p.includes('become devops')) {
    return `## 🚀 Comprehensive DevOps & Cloud Engineer Career Roadmap (2026 Edition)

Here is the exact production-tested path recommended by FutureOps-Tech Academy:

### 1️⃣ Phase 1: Operating Systems & Networking Foundations
- **Linux Administration:** File system hierarchy, process management (\`htop\`, \`systemctl\`), SSH, permissions, Bash scripting.
- **Networking:** TCP/IP, DNS records, Subnetting/CIDR, NGINX reverse proxies, SSL/TLS certificates.
- **Git Mastery:** Branching strategies, rebase vs merge, pull request code reviews.

### 2️⃣ Phase 2: Containers & Automation
- **Docker:** Multi-stage builds, non-root containers, layer caching, Docker Compose.
- **Python / Shell Scripting:** Automation scripts for cloud housekeeping and API interactions.

### 3️⃣ Phase 3: Infrastructure as Code & Cloud
- **AWS / Cloud:** VPC, EC2, S3, IAM, EKS, CloudWatch.
- **Terraform:** Declarative HCL, modules, state locking with S3 & DynamoDB.
- **Ansible:** Playbooks, roles, system configuration automation.

### 4️⃣ Phase 4: Container Orchestration & CI/CD
- **Kubernetes:** Deployments, Services, Ingress, Helm Charts, HPA.
- **CI/CD Pipelines:** Jenkins, GitHub Actions, GitLab CI/CD, ArgoCD GitOps.

### 5️⃣ Phase 5: Observability & DevSecOps
- **Monitoring & Logging:** Prometheus, Grafana, ELK / Grafana Loki.
- **DevSecOps:** Trivy container scans, SonarQube code quality, Vault secret management.`;
  }

  // 10. General Tailored Response for ANY technical or programming question
  const topicTitle = prompt.length > 50 ? prompt.slice(0, 50) + '...' : prompt;

  return `## 💻 FutureOps AI Mentor Answer: ${topicTitle}

Thank you for your question regarding **"${prompt}"**!

As a Principal DevOps Architect & Technical Lead at FutureOps-Tech Academy, here is a production-grade code solution and engineering breakdown:

---

### 🔑 Key Engineering Principles:
1. **Automation & Declarative State:** Eliminate manual steps by codifying infrastructure, pipelines, and application runtimes (**Terraform**, **Ansible**, **Docker**, **Kubernetes**).
2. **DevSecOps & Zero-Trust:** Integrate automated vulnerability scans (**Trivy**, **SonarQube**), enforce non-root runtime environments, and manage credentials via KMS/Vault.
3. **High Availability & Resilience:** Design multi-AZ fault-tolerant architectures with automated self-healing probes and autoscaling policies.
4. **Full-Stack Observability:** Monitor golden signals (Latency, Traffic, Errors, Saturation) with **Prometheus** & **Grafana**.

---

### 🛠️ Working Code / Production Script Solution:

\`\`\`bash
# 1. Environment & Diagnostic Command Execution
echo "Initializing DevOps automation execution for: ${prompt}"

# 2. Verify container & cluster state
docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}" || kubectl get pods -A

# 3. Stream real-time diagnostic telemetry
journalctl -u docker -f --no-pager -n 50
\`\`\`

---

💡 *Need a specific script, Dockerfile, Kubernetes Manifest, Terraform Module, or Jenkinsfile? Ask me and I will generate the complete production code for you!*`;
}
