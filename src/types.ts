export type ActivePage = 
  | 'home' 
  | 'course' 
  | 'about' 
  | 'projects' 
  | 'placements' 
  | 'reviews' 
  | 'blog' 
  | 'guide'
  | 'contact' 
  | 'portal' 
  | 'admin'
  | 'privacy' 
  | 'terms'
  | 'refund'
  | 'payment';

export interface CourseModule {
  id: number;
  title: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  labsCount: number;
  projectsCount: number;
  skills: string[];
  description: string;
  topics: string[];
  icon: string;
}

export interface RealProject {
  id: string;
  title: string;
  category: string;
  description: string;
  architectureSteps: string[];
  techStack: string[];
  githubRepo: string;
  complexity: 'Intermediate' | 'Advanced' | 'Enterprise';
  keyLearnings: string[];
  featuredImage?: string;
  commandSnippet?: string;
}

export interface PlacementPartner {
  name: string;
  logo: string;
  hiredCount: number;
  highestPackage?: string;
  avgPackage?: string;
}

export interface StudentReview {
  id: string;
  name: string;
  currentRole: string;
  company: string;
  previousRole: string;
  hikePercent: number;
  rating: number;
  avatar: string;
  testimonial: string;
  videoUrl?: string;
  batchYear: string;
}

export interface BlogPost {
  id: string;
  title: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  excerpt: string;
  content: string;
  tags: string[];
  image: string;
}

export interface FAQItem {
  id: string;
  category: 'General' | 'Eligibility' | 'Curriculum' | 'Placement' | 'Schedule' | 'Certification';
  question: string;
  answer: string;
}

export interface LeadEnquiry {
  id: string;
  name: string;
  email: string;
  mobile: string;
  city?: string;
  course: string;
  experience: string;
  message: string;
  date: string;
  status: 'New' | 'Contacted' | 'Enrolled' | 'Closed';
  submissionDateTime?: string;
  emailStatus?: string;
  emailDispatchedTo?: string;
  ipAddress?: string;
  whatsappStatus?: string;
}

export interface DemoBooking {
  name: string;
  email: string;
  mobile: string;
  batch: string;
  preferredDate: string;
}

export interface AttendanceRecord {
  id: string;
  date: string;
  topic: string;
  status: 'Present' | 'Absent' | 'Late';
  timeMarked?: string;
}

export type StudentApprovalStatus = 'Pending' | 'Approved' | 'Rejected';

export interface AuditLogEntry {
  id: string;
  action: string;
  performedBy: string;
  performedById: string;
  timestamp: string;
  recordId?: string;
  details: string;
  ipAddress?: string;
}

export interface CourseRecord {
  id: string;
  title: string;
  category: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  labsCount: number;
  description: string;
  status: 'Active' | 'Draft' | 'Archived';
  createdBy: string;
  createdByName: string;
  createdAt: string;
  updatedBy?: string;
  updatedByName?: string;
  updatedAt?: string;
}

export interface AnnouncementRecord {
  id: string;
  title: string;
  content: string;
  targetBatch: string;
  priority: 'Normal' | 'Urgent' | 'Important';
  createdBy: string;
  createdByName: string;
  createdAt: string;
  updatedBy?: string;
  updatedByName?: string;
  updatedAt?: string;
}

export interface UserStudent {
  id: string;
  studentId: string;
  name: string;
  email: string;
  password?: string;
  role: 'student' | 'admin';
  approvalStatus: StudentApprovalStatus;
  isDisabled?: boolean;
  registrationDate: string;
  courseName: string;
  enrolledBatch: string;
  progressPercentage: number;
  completedLabs: number;
  totalLabs: number;
  joinedDate: string;
  certificateEarned: boolean;
  certificateId?: string;
  token?: string;
  createdBy?: string;
  createdByName?: string;
  createdAt?: string;
  updatedBy?: string;
  updatedByName?: string;
  updatedAt?: string;
  profile?: {
    mobile?: string;
    location?: string;
    githubProfile?: string;
    linkedinProfile?: string;
  };
  attendance?: {
    presentDays: number;
    absentDays: number;
    totalDays: number;
    attendancePercentage: number;
    todayMarked: boolean;
    todayTopic?: string;
    history: AttendanceRecord[];
  };
}
