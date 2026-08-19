import { StudentReview, PlacementPartner } from '../types';

export const studentReviewsData: StudentReview[] = [
  {
    id: 'rev-1',
    name: 'Kushal',
    currentRole: 'Senior DevOps Engineer',
    company: 'Amazon Web Services (AWS)',
    previousRole: 'Linux System Administrator (3 Yrs Exp)',
    hikePercent: 185,
    rating: 5,
    batchYear: 'Batch 2025',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
    testimonial: 'Transitioning from basic Linux administration to Senior DevOps Engineer at AWS was a dream come true! FutureOps-Tech’s hands-on approach with Kubernetes, Terraform, and EKS capstone projects gave me the exact real-world confidence required in Amazon technical interviews. The mock interviews were rigorous and spot-on!'
  },
  {
    id: 'rev-2',
    name: 'Pooja Kulkarni',
    currentRole: 'Cloud Infrastructure Specialist',
    company: 'Microsoft Azure',
    previousRole: 'Non-IT / Manual Tester',
    hikePercent: 210,
    rating: 5,
    batchYear: 'Batch 2025',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250',
    testimonial: 'Coming from a non-coding background, I was initially terrified of Python and Terraform. FutureOps-Tech mentors broke down every concept starting from absolute scratch. From day 1 Linux labs to deploying 3-tier architectures on AWS, the structured roadmap made learning smooth. Got placed at Microsoft with a 210% package hike!'
  },
  {
    id: 'rev-3',
    name: 'Rohan Deshmukh',
    currentRole: 'DevSecOps Specialist',
    company: 'Deloitte Digital',
    previousRole: 'Junior Java Developer',
    hikePercent: 150,
    rating: 5,
    batchYear: 'Batch 2025',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250',
    testimonial: 'The DevSecOps and SonarQube/Trivy automation modules set FutureOps-Tech apart from standard institutes. Most academies only teach basic Docker, but here we built production-grade GitOps with ArgoCD and HashiCorp Vault. Deloitte interviewers were thoroughly impressed with my GitHub project portfolio.'
  },
  {
    id: 'rev-4',
    name: 'Deepak Nambiar',
    currentRole: 'Site Reliability Engineer (SRE)',
    company: 'Oracle Cloud Infrastructure',
    previousRole: 'Technical Support Lead',
    hikePercent: 165,
    rating: 5,
    batchYear: 'Batch 2026',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=250',
    testimonial: 'I was stuck in desktop support for 4 years with no salary growth. Joining FutureOps-Tech weekend batch changed my career trajectory completely. The 24/7 cloud lab access and mentor chat support helped me resolve errors fast. Today as an SRE at Oracle, I manage production Kubernetes clusters every day!'
  },
  {
    id: 'rev-5',
    name: 'Meera Iyer',
    currentRole: 'DevOps Lead',
    company: 'Accenture Technology',
    previousRole: 'Build & Release Engineer',
    hikePercent: 140,
    rating: 5,
    batchYear: 'Batch 2025',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=250',
    testimonial: 'The curriculum is continuously updated with cutting-edge tools like ArgoCD, Open Policy Agent, and Prometheus. The resume optimization team transformed my generic profile into a high-visibility profile that attracted calls from top MNCs.'
  },
  {
    id: 'rev-6',
    name: 'Karthik Raja',
    currentRole: 'Cloud DevOps Engineer',
    company: 'Cognizant',
    previousRole: 'Fresher (B.Tech CSE)',
    hikePercent: 120,
    rating: 5,
    batchYear: 'Batch 2026',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=250',
    testimonial: 'As a fresher, landing a DevOps role directly without prior experience is rare. FutureOps-Tech placement assistance team conducted 5 mock interviews and referred my profile directly to Cognizant hiring manager. Cleared all 3 technical rounds easily!'
  }
];

export const placementPartnersData: PlacementPartner[] = [
  { name: 'LTIMindtree', logo: 'LTIM', hiredCount: 220 },
  { name: 'Mphasis', logo: 'MPHASIS', hiredCount: 180 },
  { name: 'Happiest Minds Technologies', logo: 'HAPPIEST', hiredCount: 140 },
  { name: 'Infosys', logo: 'INFY', hiredCount: 420 },
  { name: 'Wipro', logo: 'WIPRO', hiredCount: 310 },
  { name: 'TCS (Tata Consultancy Services)', logo: 'TCS', hiredCount: 390 },
  { name: 'Tech Mahindra', logo: 'TECHM', hiredCount: 260 },
  { name: 'Sonata Software', logo: 'SONATA', hiredCount: 150 },
  { name: 'HCLTech', logo: 'HCL', hiredCount: 290 },
  { name: 'Capgemini', logo: 'CAP', hiredCount: 270 }
];
