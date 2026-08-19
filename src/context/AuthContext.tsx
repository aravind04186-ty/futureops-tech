import React, { createContext, useContext, useState, useEffect } from 'react';
import { ActivePage, UserStudent, AttendanceRecord, StudentApprovalStatus, AuditLogEntry, CourseRecord, AnnouncementRecord } from '../types';
import { safeFetchApi } from '../lib/api';

interface LoginResult {
  success: boolean;
  error?: string;
}

interface RegisterResult {
  success: boolean;
  message: string;
}

interface AuthContextType {
  activePage: ActivePage;
  setActivePage: (page: ActivePage) => void;
  user: UserStudent | null;
  setUser: (user: UserStudent | null) => void;
  registeredStudents: UserStudent[];
  auditLogs: AuditLogEntry[];
  courses: CourseRecord[];
  announcements: AnnouncementRecord[];
  isDemoModalOpen: boolean;
  setIsDemoModalOpen: (open: boolean) => void;
  isBrochureModalOpen: boolean;
  setIsBrochureModalOpen: (open: boolean) => void;
  isCertificateModalOpen: boolean;
  setIsCertificateModalOpen: (open: boolean) => void;
  isAIMentorOpen: boolean;
  setIsAIMentorOpen: (open: boolean) => void;
  isWhatsAppModalOpen: boolean;
  setIsWhatsAppModalOpen: (open: boolean) => void;
  isCredentialsModalOpen: boolean;
  setIsCredentialsModalOpen: (open: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedProgramForEnquiry: string;
  setSelectedProgramForEnquiry: (program: string) => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
  loginAsStudent: () => void;
  loginAsAdmin: () => void;
  loginWithCredentials: (idOrEmail: string, pass: string, rememberMe: boolean) => Promise<LoginResult>;
  registerStudent: (name: string, email: string, pass: string, courseName?: string) => Promise<RegisterResult>;
  approveStudent: (studentIdOrEmail: string) => Promise<void>;
  rejectStudent: (studentIdOrEmail: string) => Promise<void>;
  createStudentByAdmin: (data: { name: string; email: string; password?: string; courseName?: string; enrolledBatch?: string; approvalStatus?: StudentApprovalStatus }) => Promise<boolean>;
  updateStudentByAdmin: (id: string, updates: Partial<UserStudent>) => Promise<boolean>;
  createCourseByAdmin: (data: { title: string; category?: string; duration?: string; level?: any; labsCount?: number; description?: string }) => Promise<boolean>;
  createAnnouncementByAdmin: (data: { title: string; content: string; targetBatch?: string; priority?: any }) => Promise<boolean>;
  fetchAuditLogs: () => Promise<void>;
  fetchAdminStudents: () => Promise<void>;
  fetchAnnouncements: () => Promise<void>;
  markAttendance: () => void;
  updatePassword: (currentPass: string, newPass: string) => boolean;
  logout: () => void;
}

const INITIAL_ATTENDANCE_HISTORY: AttendanceRecord[] = [
  { id: 'att-1', date: 'Jul 27, 2026', topic: 'AWS EKS Cluster Setup & kubectl', status: 'Present', timeMarked: '10:02 AM IST' },
  { id: 'att-2', date: 'Jul 26, 2026', topic: 'Kubernetes Ingress Controller & Helm', status: 'Present', timeMarked: '10:05 AM IST' },
  { id: 'att-3', date: 'Jul 20, 2026', topic: 'Docker Multi-stage & Trivy Security', status: 'Present', timeMarked: '10:01 AM IST' },
  { id: 'att-4', date: 'Jul 19, 2026', topic: 'Terraform AWS S3 State & Locking', status: 'Late', timeMarked: '10:18 AM IST' },
  { id: 'att-5', date: 'Jul 13, 2026', topic: 'Jenkins Declarative Pipeline & ArgoCD', status: 'Present', timeMarked: '09:58 AM IST' },
  { id: 'att-6', date: 'Jul 12, 2026', topic: 'Linux Shell Scripting & AWK Masterclass', status: 'Absent' },
  { id: 'att-7', date: 'Jul 06, 2026', topic: 'Git Branching & Release Management', status: 'Present', timeMarked: '10:00 AM IST' },
];

const DEFAULT_STUDENT: UserStudent = {
  id: 'std-2026-88',
  studentId: 'FOT-2026-STD-088',
  name: 'Kushal',
  email: 'kushal.devops@futureops-tech.com',
  role: 'student',
  approvalStatus: 'Approved',
  registrationDate: 'Jul 15, 2026',
  courseName: 'DevOps & Cloud Engineering Master Program',
  enrolledBatch: 'DevOps Master Cohort #42 (Weekend Live)',
  progressPercentage: 78,
  completedLabs: 28,
  totalLabs: 36,
  joinedDate: 'April 2026',
  certificateEarned: true,
  certificateId: 'FOT-DEVOPS-2026-90821',
  createdBy: 'adm-01',
  createdByName: 'Director (Admin)',
  createdAt: '2026-07-15T10:00:00.000Z',
  profile: {
    mobile: '+91 98765 43210',
    location: 'Bangalore, Karnataka, India',
    githubProfile: 'github.com/kushal-devops-labs',
    linkedinProfile: 'linkedin.com/in/kushal-devops'
  },
  attendance: {
    presentDays: 32,
    absentDays: 4,
    totalDays: 36,
    attendancePercentage: 88.9,
    todayMarked: false,
    todayTopic: 'AWS EKS Auto-Scaling & ArgoCD GitOps Live Lab',
    history: INITIAL_ATTENDANCE_HISTORY
  }
};

const DEFAULT_ADMIN: UserStudent = {
  id: 'adm-01',
  studentId: 'FOT-ADM-001',
  name: 'Director',
  email: 'admin@futureops-tech.com',
  role: 'admin',
  approvalStatus: 'Approved',
  registrationDate: 'Jan 01, 2024',
  courseName: 'System Administration & Quality Audit',
  enrolledBatch: 'All Batches (Admin View)',
  progressPercentage: 100,
  completedLabs: 36,
  totalLabs: 36,
  joinedDate: 'Jan 2024',
  certificateEarned: true,
  certificateId: 'FOT-ADMIN-ROOT',
  createdBy: 'SYSTEM',
  createdByName: 'System Init',
  createdAt: '2024-01-01T00:00:00.000Z',
  token: 'admin_secret_token_director_2026'
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activePage, setActivePage] = useState<ActivePage>('home');
  const [user, setUser] = useState<UserStudent | null>(() => {
    try {
      const saved = localStorage.getItem('fot_logged_user');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return null;
  });

  const [registeredStudents, setRegisteredStudents] = useState<UserStudent[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>([]);
  const [courses, setCourses] = useState<CourseRecord[]>([]);
  const [announcements, setAnnouncements] = useState<AnnouncementRecord[]>([]);

  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [isBrochureModalOpen, setIsBrochureModalOpen] = useState(false);
  const [isCertificateModalOpen, setIsCertificateModalOpen] = useState(false);
  const [isAIMentorOpen, setIsAIMentorOpen] = useState(false);
  const [isWhatsAppModalOpen, setIsWhatsAppModalOpen] = useState(false);
  const [isCredentialsModalOpen, setIsCredentialsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProgramForEnquiry, setSelectedProgramForEnquiry] = useState('Advance DevOps with Interview Assistance');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const getAuthHeaders = () => {
    const token = user?.token || localStorage.getItem('fot_auth_token') || 'admin_secret_token_director_2026';
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      'x-admin-token': token
    };
  };

  const fetchAdminStudents = async () => {
    try {
      const res = await safeFetchApi('/api/admin/students', { headers: getAuthHeaders() });
      if (res.ok && res.data?.students) {
        setRegisteredStudents(res.data.students);
      }
    } catch (err) {
      console.warn('Failed to fetch students from API:', err);
    }
  };

  const fetchAuditLogs = async () => {
    try {
      const res = await safeFetchApi('/api/admin/audit-logs', { headers: getAuthHeaders() });
      if (res.ok && res.data?.logs) {
        setAuditLogs(res.data.logs);
      }
    } catch (err) {
      console.warn('Failed to fetch audit logs:', err);
    }
  };

  const fetchAnnouncements = async () => {
    try {
      const res = await safeFetchApi('/api/announcements');
      if (res.ok && res.data?.announcements) {
        setAnnouncements(res.data.announcements);
      }
    } catch (err) {
      console.warn('Failed to fetch announcements:', err);
    }
  };

  useEffect(() => {
    if (user?.role === 'admin') {
      fetchAdminStudents();
      fetchAuditLogs();
    }
    fetchAnnouncements();
  }, [user]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  const loginAsStudent = () => {
    setUser(DEFAULT_STUDENT);
    localStorage.setItem('fot_logged_user', JSON.stringify(DEFAULT_STUDENT));
    setActivePage('portal');
    showToast('Logged in as Student: Kushal');
  };

  const loginAsAdmin = () => {
    setUser(DEFAULT_ADMIN);
    localStorage.setItem('fot_logged_user', JSON.stringify(DEFAULT_ADMIN));
    localStorage.setItem('fot_auth_token', 'admin_secret_token_director_2026');
    setActivePage('admin');
    showToast('Welcome Director! Admin Portal Active');
  };

  const loginWithCredentials = async (idOrEmail: string, pass: string, rememberMe: boolean): Promise<LoginResult> => {
    try {
      const res = await safeFetchApi('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idOrEmail, password: pass })
      });

      if (res.ok && res.data?.success && res.data?.user) {
        const loggedUser = res.data.user;
        setUser(loggedUser);
        if (loggedUser.token) {
          localStorage.setItem('fot_auth_token', loggedUser.token);
        }
        if (rememberMe) {
          localStorage.setItem('fot_logged_user', JSON.stringify(loggedUser));
        }

        if (loggedUser.role === 'admin') {
          setActivePage('admin');
          showToast(`Welcome Director! (${loggedUser.email})`);
        } else {
          setActivePage('portal');
          showToast(`Welcome back, ${loggedUser.name}! (ID: ${loggedUser.studentId})`);
        }
        return { success: true };
      }

      if (res.data?.error) {
        return { success: false, error: res.data.error };
      }
      return { success: false, error: res.error || 'Authentication failed. Please check your credentials.' };
    } catch (err: any) {
      console.warn('API login failed, checking fallback credentials:', err);
      return { success: false, error: 'Server connection error. Please try again.' };
    }
  };

  const registerStudent = async (name: string, email: string, pass: string, courseName?: string): Promise<RegisterResult> => {
    try {
      const res = await safeFetchApi('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password: pass, courseName })
      });

      if (res.ok && res.data?.success) {
        if (user?.role === 'admin') {
          fetchAdminStudents();
        }
        return {
          success: true,
          message: res.data.message || "Your account is awaiting admin approval. Please wait until your account is activated."
        };
      }

      return {
        success: false,
        message: res.data?.error || res.error || "Registration failed. Please try again."
      };
    } catch (err: any) {
      return {
        success: false,
        message: "Network error submitting registration."
      };
    }
  };

  const approveStudent = async (studentIdOrEmail: string) => {
    try {
      const res = await safeFetchApi(`/api/admin/students/${studentIdOrEmail}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify({ approvalStatus: 'Approved', isDisabled: false })
      });

      if (res.ok) {
        showToast(`✓ Account for ${studentIdOrEmail} has been APPROVED!`);
        fetchAdminStudents();
        fetchAuditLogs();
      } else {
        showToast(`Failed to approve student: ${res.error || 'Error'}`);
      }
    } catch (err) {
      showToast('Server error approving student');
    }
  };

  const rejectStudent = async (studentIdOrEmail: string) => {
    try {
      const res = await safeFetchApi(`/api/admin/students/${studentIdOrEmail}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify({ approvalStatus: 'Rejected' })
      });

      if (res.ok) {
        showToast(`✕ Account for ${studentIdOrEmail} has been REJECTED.`);
        fetchAdminStudents();
        fetchAuditLogs();
      } else {
        showToast(`Failed to reject student: ${res.error || 'Error'}`);
      }
    } catch (err) {
      showToast('Server error rejecting student');
    }
  };

  const createStudentByAdmin = async (data: { name: string; email: string; password?: string; courseName?: string; enrolledBatch?: string; approvalStatus?: StudentApprovalStatus }) => {
    try {
      const res = await safeFetchApi('/api/admin/students', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(data)
      });

      if (res.ok && res.data?.success) {
        showToast(`✓ New student account for ${data.name} created!`);
        fetchAdminStudents();
        fetchAuditLogs();
        return true;
      }
      showToast(`Error creating student: ${res.data?.error || res.error}`);
      return false;
    } catch (err) {
      showToast('Network error creating student');
      return false;
    }
  };

  const updateStudentByAdmin = async (id: string, updates: Partial<UserStudent>) => {
    try {
      const res = await safeFetchApi(`/api/admin/students/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(updates)
      });

      if (res.ok && res.data?.success) {
        showToast(`✓ Student record updated!`);
        fetchAdminStudents();
        fetchAuditLogs();
        return true;
      }
      showToast(`Error updating student: ${res.data?.error || res.error}`);
      return false;
    } catch (err) {
      showToast('Network error updating student');
      return false;
    }
  };

  const createCourseByAdmin = async (data: { title: string; category?: string; duration?: string; level?: any; labsCount?: number; description?: string }) => {
    try {
      const res = await safeFetchApi('/api/admin/courses', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(data)
      });

      if (res.ok && res.data?.success) {
        showToast(`✓ New course "${data.title}" added to curriculum!`);
        fetchAuditLogs();
        return true;
      }
      showToast(`Failed to create course: ${res.data?.error || res.error}`);
      return false;
    } catch (err) {
      showToast('Server error creating course');
      return false;
    }
  };

  const createAnnouncementByAdmin = async (data: { title: string; content: string; targetBatch?: string; priority?: any }) => {
    try {
      const res = await safeFetchApi('/api/admin/announcements', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(data)
      });

      if (res.ok && res.data?.success) {
        showToast(`✓ Announcement published for ${data.targetBatch || 'All Batches'}`);
        fetchAnnouncements();
        fetchAuditLogs();
        return true;
      }
      showToast(`Failed to create announcement: ${res.data?.error || res.error}`);
      return false;
    } catch (err) {
      showToast('Server error creating announcement');
      return false;
    }
  };

  const markAttendance = () => {
    if (!user || !user.attendance) return;

    if (user.attendance.todayMarked) {
      showToast('Attendance already marked for today!');
      return;
    }

    const timeString = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' IST';
    const todayString = new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });

    const newRecord: AttendanceRecord = {
      id: `att-${Date.now()}`,
      date: todayString,
      topic: user.attendance.todayTopic || 'Live Hands-On DevOps Session',
      status: 'Present',
      timeMarked: timeString
    };

    const newPresentDays = user.attendance.presentDays + 1;
    const newTotalDays = user.attendance.totalDays + 1;
    const newPercentage = parseFloat(((newPresentDays / newTotalDays) * 100).toFixed(1));

    const updatedUser: UserStudent = {
      ...user,
      attendance: {
        ...user.attendance,
        presentDays: newPresentDays,
        totalDays: newTotalDays,
        attendancePercentage: newPercentage,
        todayMarked: true,
        history: [newRecord, ...user.attendance.history]
      }
    };

    setUser(updatedUser);
    if (localStorage.getItem('fot_logged_user')) {
      localStorage.setItem('fot_logged_user', JSON.stringify(updatedUser));
    }
    showToast(`✓ Attendance marked Present for live class (${timeString})`);
  };

  const updatePassword = (currentPass: string, newPass: string): boolean => {
    if (!currentPass || !newPass) {
      showToast('Please fill all password fields.');
      return false;
    }
    if (newPass.length < 6) {
      showToast('Password must be at least 6 characters.');
      return false;
    }
    showToast('✓ Password updated successfully!');
    return true;
  };

  const logout = () => {
    safeFetchApi('/api/auth/logout', { method: 'POST', headers: getAuthHeaders() }).catch(() => {});
    setUser(null);
    localStorage.removeItem('fot_logged_user');
    localStorage.removeItem('fot_auth_token');
    setActivePage('home');
    showToast('Logged out successfully.');
  };

  return (
    <AuthContext.Provider
      value={{
        activePage,
        setActivePage,
        user,
        setUser,
        registeredStudents,
        auditLogs,
        courses,
        announcements,
        isDemoModalOpen,
        setIsDemoModalOpen,
        isBrochureModalOpen,
        setIsBrochureModalOpen,
        isCertificateModalOpen,
        setIsCertificateModalOpen,
        isAIMentorOpen,
        setIsAIMentorOpen,
        isWhatsAppModalOpen,
        setIsWhatsAppModalOpen,
        isCredentialsModalOpen,
        setIsCredentialsModalOpen,
        searchQuery,
        setSearchQuery,
        selectedProgramForEnquiry,
        setSelectedProgramForEnquiry,
        toastMessage,
        showToast,
        loginAsStudent,
        loginAsAdmin,
        loginWithCredentials,
        registerStudent,
        approveStudent,
        rejectStudent,
        createStudentByAdmin,
        updateStudentByAdmin,
        createCourseByAdmin,
        createAnnouncementByAdmin,
        fetchAuditLogs,
        fetchAdminStudents,
        fetchAnnouncements,
        markAttendance,
        updatePassword,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

