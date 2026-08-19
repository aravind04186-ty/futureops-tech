import { BlogPost } from '../types';

export const blogPostsData: BlogPost[] = [
  {
    id: 'blog-1',
    title: 'Complete DevOps Roadmap 2026: From Zero to Senior Cloud Architect',
    category: 'Career Guide',
    author: 'Director',
    date: 'July 24, 2026',
    readTime: '8 min read',
    tags: ['DevOps', 'Career Path', 'AWS', 'Kubernetes'],
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=600',
    excerpt: 'Discover the exact step-by-step roadmap to become a highly paid DevOps Engineer in 2026. Learn which tools matter most, from Linux fundamentals to GitOps and DevSecOps.',
    content: `The DevOps ecosystem is evolving rapidly in 2026. Companies no longer look for simple scriptwriters; they demand Cloud Native Engineers skilled in automated infrastructure, security compliance, and AI-assisted observability.

1. Master Linux & Shell Scripting: Everything runs on Linux. Focus on file systems, systemd, process signals, SSH security, and text processing with awk/sed.
2. Containerization with Docker: Understand image minimization, multi-stage builds, rootless containers, and security vulnerability scanning with Trivy.
3. Kubernetes Orchestration: Master Pod lifecycles, Deployments, Ingress Controllers, Helm Chart packaging, and HPA auto-scaling.
4. Infrastructure as Code (Terraform): Learn modular code structures, remote S3 backends, state locking, and zero-drift deployments.
5. DevSecOps & GitOps: Shift security left with SonarQube, Kyverno, and automate deployment syncing using ArgoCD.`
  },
  {
    id: 'blog-2',
    title: 'AWS EKS vs Self-Managed Kubernetes: Production Comparison',
    category: 'Kubernetes',
    author: 'Praveen Kumar (Senior Mentor)',
    date: 'July 18, 2026',
    readTime: '10 min read',
    tags: ['Kubernetes', 'AWS', 'EKS', 'Cloud'],
    image: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?auto=format&fit=crop&q=80&w=600',
    excerpt: 'Should your organization run Kubernetes via Amazon EKS or manage control planes manually on EC2? We evaluate cost, uptime SLA, maintenance overhead, and security.',
    content: `Running Kubernetes in production requires choosing between managed control planes like Amazon EKS vs running K3s/Kubeadm on bare EC2 instances.

Key Takeaways:
- EKS SLA: Amazon guarantees 99.95% uptime for the EKS control plane at $0.10/hour per cluster.
- Maintenance: Self-managed Kubernetes requires manual etcd backups, control plane upgrades, and certificate rotations.
- IAM Integration: EKS seamlessly integrates with AWS IAM OIDC for pod-level security permissions.`
  },
  {
    id: 'blog-3',
    title: 'Top 50 DevOps Interview Questions & Answers for 2026',
    category: 'Interview Prep',
    author: 'Divya Sharma (Placement Lead)',
    date: 'July 10, 2026',
    readTime: '12 min read',
    tags: ['Interview', 'Docker', 'Jenkins', 'Terraform'],
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=600',
    excerpt: 'Ace your next DevOps technical interview with real production scenario questions on CrashLoopBackOff, Terraform state locking, GitOps sync, and Docker layer caching.',
    content: `Preparing for top tier DevOps interviews requires mastering scenario-based troubleshooting rather than memorizing simple definitions.

Sample Scenario Q1: How do you troubleshoot a Kubernetes Pod stuck in CrashLoopBackOff?
Answer: 
1. Run \`kubectl logs <pod-name> --previous\` to view error logs prior to container termination.
2. Check \`kubectl describe pod <pod-name>\` for OOMKilled events or failed liveness probe checks.
3. Verify environment variable secrets and mount permissions.`
  },
  {
    id: 'blog-4',
    title: 'GitOps with ArgoCD: Eliminating Push-Based CI/CD Deployments',
    category: 'GitOps',
    author: 'Rajesh Nair (DevOps Architect)',
    date: 'June 28, 2026',
    readTime: '7 min read',
    tags: ['ArgoCD', 'GitOps', 'CI/CD'],
    image: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&q=80&w=600',
    excerpt: 'Why modern engineering teams are abandoning traditional push-based CI/CD scripts in favor of declarative Git-driven pull automation with ArgoCD.',
    content: `GitOps treats Git as the single source of truth for infrastructure and application code. When developer code merges to main, ArgoCD continuously pulls changes and reconciles the target cluster automatically.`
  }
];
