import React from 'react';
import {
  siDocker,
  siKubernetes,
  siJenkins,
  siGithub,
  siGit,
  siTerraform,
  siAnsible,
  siArgo,
  siPrometheus,
  siGrafana,
  siLinux,
  siNginx,
  siSonar,
  siTrivy,
  siPython,
  siGnubash,
  siHelm,
  siUbuntu,
  siRedis,
  siMongodb,
  siNodedotjs,
  siGitlab,
  siGooglecloud,
  siPagerduty
} from 'simple-icons';
import { Layers } from 'lucide-react';

interface TechLogoProps {
  name: string;
  className?: string;
  size?: number;
}

export const TechLogo: React.FC<TechLogoProps> = ({ name, className = "w-6 h-6 shrink-0" }) => {
  const cleanName = (name || '').toLowerCase().trim();

  // Helper to render Simple Icon SVG
  const renderSimpleIcon = (icon: { title: string; hex: string; path: string }, customColor?: string) => {
    return (
      <svg
        className={className}
        viewBox="0 0 24 24"
        fill={customColor || `#${icon.hex}`}
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label={icon.title}
        title={icon.title}
      >
        <path d={icon.path} />
      </svg>
    );
  };

  // -------------------------------------------------------------
  // AWS SERVICES (Official Multi-Color / Service-Specific Vector Icons)
  // -------------------------------------------------------------
  
  // AWS EC2
  if (cleanName === 'ec2' || cleanName === 'aws ec2' || cleanName.includes('amazon ec2')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" title="Amazon EC2">
        <rect x="2" y="3" width="20" height="18" rx="2" fill="#FF9900" />
        <rect x="5" y="6" width="14" height="3" rx="0.5" fill="#FFFFFF" opacity="0.9" />
        <rect x="5" y="11" width="14" height="3" rx="0.5" fill="#FFFFFF" opacity="0.9" />
        <rect x="5" y="16" width="14" height="3" rx="0.5" fill="#FFFFFF" opacity="0.9" />
        <circle cx="7" cy="7.5" r="0.75" fill="#FF9900" />
        <circle cx="7" cy="12.5" r="0.75" fill="#FF9900" />
        <circle cx="7" cy="17.5" r="0.75" fill="#FF9900" />
      </svg>
    );
  }

  // Amazon S3
  if (cleanName === 's3' || cleanName === 'amazon s3' || cleanName.includes('aws s3') || cleanName.includes('s3 bucket')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" title="Amazon S3">
        <path d="M12 2L3 6.5V17.5L12 22L21 17.5V6.5L12 2Z" fill="#E25241" />
        <path d="M12 2L21 6.5V17.5L12 22V2Z" fill="#C9252E" />
        <path d="M12 2L3 6.5L12 11L21 6.5L12 2Z" fill="#ED705C" />
        <path d="M7 10.5L12 13L17 10.5" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M7 14L12 16.5L17 14" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  // AWS IAM
  if (cleanName.includes('iam') || cleanName.includes('identity')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" title="AWS IAM">
        <path d="M12 2L3 6V12C3 17 7 21 12 22C17 21 21 17 21 12V6L12 2Z" fill="#DD344C" />
        <circle cx="12" cy="9" r="2.5" fill="#FFFFFF" />
        <path d="M12 12.5V18M12 15H14.5M12 17H14" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    );
  }

  // AWS VPC / Networking
  if (cleanName === 'vpc' || cleanName.includes('aws vpc') || cleanName.includes('alb') || cleanName.includes('ingress')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" title="AWS VPC">
        <rect x="2" y="4" width="20" height="16" rx="3" fill="#8C4FFF" />
        <path d="M6 12C6 10.3 7.3 9 9 9C9.5 9 10 9.1 10.4 9.4C11 7.4 12.8 6 15 6C17.8 6 20 8.2 20 11C20 11.3 20 11.7 19.9 12C20.6 12.4 21 13.1 21 14C21 15.1 20.1 16 19 16H7C5.9 16 5 15.1 5 14C5 13.1 5.4 12.4 6.1 12H6Z" fill="#FFFFFF" opacity="0.9" />
      </svg>
    );
  }

  // AWS CloudWatch / Monitoring
  if (cleanName.includes('cloudwatch')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" title="Amazon CloudWatch">
        <rect x="2" y="2" width="20" height="20" rx="4" fill="#E25241" />
        <path d="M6 16L10 11L14 14L18 8" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="18" cy="8" r="1.5" fill="#FFFFFF" />
      </svg>
    );
  }

  // AWS EKS
  if (cleanName.includes('eks')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" title="Amazon EKS">
        <rect x="2" y="2" width="20" height="20" rx="4" fill="#FF9900" />
        <path d="M12 4L19 8V16L12 20L5 16V8L12 4Z" stroke="#FFFFFF" strokeWidth="1.5" strokeLinejoin="round" fill="none" />
        <circle cx="12" cy="12" r="3" fill="#FFFFFF" />
      </svg>
    );
  }

  // AWS World / Global Cloud Logo
  if (cleanName === 'aws-world' || cleanName === 'aws globe' || cleanName === 'aws world') {
    return (
      <svg className={className} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" title="AWS Global Cloud Infrastructure">
        <rect width="32" height="32" rx="7" fill="#1A2432" stroke="#FF9900" strokeWidth="1" />
        {/* World Grid Lines */}
        <circle cx="16" cy="16" r="11" stroke="#FF9900" strokeWidth="1" opacity="0.3" fill="none" />
        <ellipse cx="16" cy="16" rx="5" ry="11" stroke="#FF9900" strokeWidth="1" opacity="0.3" fill="none" />
        <line x1="5" y1="16" x2="27" y2="16" stroke="#FF9900" strokeWidth="1" opacity="0.3" />
        <line x1="7" y1="10" x2="25" y2="10" stroke="#FF9900" strokeWidth="0.8" opacity="0.2" />
        <line x1="7" y1="22" x2="25" y2="22" stroke="#FF9900" strokeWidth="0.8" opacity="0.2" />
        {/* AWS Center Text & Smile */}
        <text x="16" y="16.5" fill="#FFFFFF" fontSize="9.5" fontWeight="900" fontFamily="system-ui, sans-serif" textAnchor="middle" letterSpacing="0.5">aws</text>
        <path d="M8.5 20.5C12 22.5 19 22.5 22.5 20.5" stroke="#FF9900" strokeWidth="1.6" strokeLinecap="round" fill="none" />
        <path d="M20.5 19.5L23 20.5L21.5 22" stroke="#FF9900" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </svg>
    );
  }

  // AWS General Official Brand Logo (Recognizable AWS Smile / Wordmark & AWS World)
  if (
    cleanName === 'aws' ||
    cleanName === 'aws cloud' ||
    cleanName.includes('amazon web services') ||
    cleanName.includes('aws cloud stack')
  ) {
    return (
      <svg className={className} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" title="Amazon Web Services (AWS)">
        {/* Dark Navy AWS Container */}
        <rect width="32" height="32" rx="6" fill="#232F3E" />
        {/* AWS Text */}
        <text x="16" y="16.5" fill="#FFFFFF" fontSize="10.5" fontWeight="900" fontFamily="system-ui, -apple-system, sans-serif" textAnchor="middle" letterSpacing="0.5">aws</text>
        {/* Iconic Amazon Smile Arrow */}
        <path d="M7 21C11.5 23.8 19 23.8 23.5 21" stroke="#FF9900" strokeWidth="2" strokeLinecap="round" fill="none" />
        <path d="M21 19.5L24.5 21L22.5 23" stroke="#FF9900" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </svg>
    );
  }

  // -------------------------------------------------------------
  // OTHER RECOGNIZED BRAND LOGOS (OFFICIAL SIMPLE ICONS)
  // -------------------------------------------------------------

  if (cleanName.includes('docker')) {
    return renderSimpleIcon(siDocker);
  }

  if (cleanName.includes('kubernetes') || cleanName === 'k8s') {
    return renderSimpleIcon(siKubernetes);
  }

  if (cleanName.includes('jenkins')) {
    return renderSimpleIcon(siJenkins);
  }

  if (cleanName.includes('github')) {
    return renderSimpleIcon(siGithub, 'currentColor');
  }

  if (cleanName.includes('gitlab')) {
    return renderSimpleIcon(siGitlab);
  }

  if (cleanName.includes('git')) {
    return renderSimpleIcon(siGit);
  }

  if (cleanName.includes('terraform')) {
    return renderSimpleIcon(siTerraform);
  }

  if (cleanName.includes('ansible')) {
    return renderSimpleIcon(siAnsible);
  }

  if (cleanName.includes('argo')) {
    return renderSimpleIcon(siArgo);
  }

  if (cleanName.includes('prometheus')) {
    return renderSimpleIcon(siPrometheus);
  }

  if (cleanName.includes('grafana')) {
    return renderSimpleIcon(siGrafana);
  }

  if (cleanName.includes('linux') || cleanName.includes('rhel') || cleanName.includes('alpine')) {
    return renderSimpleIcon(siLinux);
  }

  if (cleanName.includes('ubuntu')) {
    return renderSimpleIcon(siUbuntu);
  }

  if (cleanName.includes('nginx')) {
    return renderSimpleIcon(siNginx);
  }

  if (cleanName.includes('sonar')) {
    return renderSimpleIcon(siSonar);
  }

  if (cleanName.includes('trivy')) {
    return renderSimpleIcon(siTrivy);
  }

  if (cleanName.includes('python')) {
    return renderSimpleIcon(siPython);
  }

  if (cleanName.includes('shell') || cleanName.includes('bash') || cleanName.includes('script') || cleanName.includes('terminal')) {
    return renderSimpleIcon(siGnubash, '#4EAA25');
  }

  if (cleanName.includes('helm')) {
    return renderSimpleIcon(siHelm);
  }

  if (cleanName.includes('redis')) {
    return renderSimpleIcon(siRedis);
  }

  if (cleanName.includes('mongo')) {
    return renderSimpleIcon(siMongodb);
  }

  if (cleanName.includes('node')) {
    return renderSimpleIcon(siNodedotjs);
  }

  if (cleanName.includes('gcp') || cleanName.includes('google cloud')) {
    return renderSimpleIcon(siGooglecloud);
  }

  if (cleanName.includes('pagerduty') || cleanName.includes('alert')) {
    return renderSimpleIcon(siPagerduty);
  }

  // Fallback: Clear, recognizable layer icon with smooth styling (No single letters)
  return <Layers className={`${className} text-cyan-500`} />;
};
