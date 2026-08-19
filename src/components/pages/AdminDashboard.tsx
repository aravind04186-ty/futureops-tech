import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { safeFetchApi } from '../../lib/api';
import { LeadEnquiry, StudentApprovalStatus, UserStudent } from '../../types';
import { GoogleDriveManager } from '../shared/GoogleDriveManager';
import { 
  Users, 
  FileText, 
  Calendar, 
  BarChart2, 
  CheckCircle2, 
  XCircle,
  Clock,
  RefreshCw, 
  Mail, 
  Phone, 
  Search,
  LogOut,
  UserCheck,
  ShieldCheck,
  Sparkles,
  AlertCircle,
  Check,
  X,
  TrendingUp,
  ArrowUpRight,
  Filter,
  Plus,
  Edit,
  History,
  Megaphone,
  BookOpen,
  UserX,
  UserCheck2,
  Info,
  ShieldAlert
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';

export const AdminDashboard: React.FC = () => {
  const { 
    user, 
    loginAsAdmin,
    logout, 
    showToast, 
    registeredStudents, 
    approveStudent, 
    rejectStudent,
    createStudentByAdmin,
    updateStudentByAdmin,
    auditLogs,
    courses,
    announcements,
    createCourseByAdmin,
    createAnnouncementByAdmin,
    fetchAuditLogs,
    fetchAdminStudents,
    fetchAnnouncements
  } = useAuth();

  const [adminTab, setAdminTab] = useState<'students' | 'audit' | 'courses' | 'announcements' | 'leads'>('students');
  const [enquiries, setEnquiries] = useState<LeadEnquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [studentSearchTerm, setStudentSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Pending' | 'Approved' | 'Rejected' | 'Disabled'>('All');
  const [enquirySearchTerm, setEnquirySearchTerm] = useState('');
  const [auditSearchTerm, setAuditSearchTerm] = useState('');
  const [timeRange, setTimeRange] = useState<30 | 14 | 7>(30);

  // Modal States
  const [isAddStudentOpen, setIsAddStudentOpen] = useState(false);
  const [newStudentData, setNewStudentData] = useState({
    name: '',
    email: '',
    password: '',
    courseName: 'DevOps & Cloud Engineering Master Program',
    enrolledBatch: 'DevOps Master Cohort #42 (Weekend Live)',
    approvalStatus: 'Approved' as StudentApprovalStatus
  });

  const [editingStudent, setEditingStudent] = useState<UserStudent | null>(null);
  const [editStudentData, setEditStudentData] = useState({
    name: '',
    email: '',
    courseName: '',
    enrolledBatch: '',
    approvalStatus: 'Approved' as StudentApprovalStatus,
    isDisabled: false
  });

  const [isAddCourseOpen, setIsAddCourseOpen] = useState(false);
  const [newCourseData, setNewCourseData] = useState({
    title: '',
    category: 'Cloud & DevOps',
    duration: '16 Weeks Live',
    level: 'Advanced' as const,
    labsCount: 36,
    description: ''
  });

  const [isAddAnnOpen, setIsAddAnnOpen] = useState(false);
  const [newAnnData, setNewAnnData] = useState({
    title: '',
    content: '',
    targetBatch: 'All Batches',
    priority: 'Important' as const
  });

  const fetchEnquiries = async () => {
    setLoading(true);
    try {
      const apiRes = await safeFetchApi('/api/enquiries');
      if (apiRes.ok && apiRes.data) {
        setEnquiries(apiRes.data.enquiries || []);
      }
    } catch (err) {
      console.warn('Failed to fetch enquiries:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.role === 'admin') {
      fetchEnquiries();
      fetchAdminStudents();
      fetchAuditLogs();
      fetchAnnouncements();
    }
  }, [user]);

  // Auth Protection Guard for non-admin users
  if (!user || user.role !== 'admin') {
    return (
      <div className="py-16 px-4 bg-gray-50 min-h-[70vh] flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-gray-200 shadow-2xl text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center mx-auto shadow-sm">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">Admin Authentication Required</h2>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
              Administrator privileges are required to inspect lead enquiries, approve student registrations, and manage system resources.
            </p>
          </div>
          <div className="pt-2">
            <button
              onClick={loginAsAdmin}
              className="w-full py-3.5 px-6 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition shadow-lg flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>Authenticate as Administrator</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Calculate approval metrics
  const pendingCount = registeredStudents.filter(s => s.approvalStatus === 'Pending' && !s.isDisabled).length;
  const approvedCount = registeredStudents.filter(s => s.approvalStatus === 'Approved' && !s.isDisabled).length;
  const rejectedCount = registeredStudents.filter(s => s.approvalStatus === 'Rejected').length;
  const disabledCount = registeredStudents.filter(s => s.isDisabled).length;

  // Filtered Students
  const filteredStudents = registeredStudents.filter(s => {
    const matchesFilter = 
      statusFilter === 'All' ? true :
      statusFilter === 'Disabled' ? s.isDisabled :
      (s.approvalStatus === statusFilter && !s.isDisabled);

    const matchesSearch = 
      s.name.toLowerCase().includes(studentSearchTerm.toLowerCase()) ||
      s.email.toLowerCase().includes(studentSearchTerm.toLowerCase()) ||
      s.studentId.toLowerCase().includes(studentSearchTerm.toLowerCase()) ||
      s.courseName.toLowerCase().includes(studentSearchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Filtered Audit Logs
  const filteredAuditLogs = auditLogs.filter(l =>
    l.action.toLowerCase().includes(auditSearchTerm.toLowerCase()) ||
    l.performedBy.toLowerCase().includes(auditSearchTerm.toLowerCase()) ||
    l.details.toLowerCase().includes(auditSearchTerm.toLowerCase())
  );

  // Filtered Enquiries
  const filteredEnquiries = enquiries.filter(e => 
    e.name.toLowerCase().includes(enquirySearchTerm.toLowerCase()) ||
    e.email.toLowerCase().includes(enquirySearchTerm.toLowerCase()) ||
    e.mobile.includes(enquirySearchTerm)
  );

  // Submit Add Student
  const handleCreateStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStudentData.name || !newStudentData.email) {
      showToast('Name and Email are required.');
      return;
    }
    const success = await createStudentByAdmin(newStudentData);
    if (success) {
      setIsAddStudentOpen(false);
      setNewStudentData({
        name: '',
        email: '',
        password: '',
        courseName: 'DevOps & Cloud Engineering Master Program',
        enrolledBatch: 'DevOps Master Cohort #42 (Weekend Live)',
        approvalStatus: 'Approved'
      });
    }
  };

  // Open Edit Student Modal
  const handleOpenEditStudent = (student: UserStudent) => {
    setEditingStudent(student);
    setEditStudentData({
      name: student.name,
      email: student.email,
      courseName: student.courseName,
      enrolledBatch: student.enrolledBatch,
      approvalStatus: student.approvalStatus,
      isDisabled: !!student.isDisabled
    });
  };

  // Submit Edit Student
  const handleUpdateStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingStudent) return;
    const success = await updateStudentByAdmin(editingStudent.id, editStudentData);
    if (success) {
      setEditingStudent(null);
    }
  };

  // Submit Add Course
  const handleCreateCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCourseData.title) return;
    const success = await createCourseByAdmin(newCourseData);
    if (success) {
      setIsAddCourseOpen(false);
      setNewCourseData({ title: '', category: 'Cloud & DevOps', duration: '16 Weeks Live', level: 'Advanced', labsCount: 36, description: '' });
    }
  };

  // Submit Add Announcement
  const handleCreateAnnouncement = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAnnData.title || !newAnnData.content) return;
    const success = await createAnnouncementByAdmin(newAnnData);
    if (success) {
      setIsAddAnnOpen(false);
      setNewAnnData({ title: '', content: '', targetBatch: 'All Batches', priority: 'Important' });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 space-y-8 animate-fadeIn">
      
      {/* Header Bar */}
      <div className="p-8 rounded-3xl bg-white border border-gray-100 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-sm">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-extrabold text-[#111827] font-poppins">{user.name}</h1>
            <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded bg-blue-50 text-blue-600 border border-blue-200">
              DIRECTOR & ADMINISTRATOR
            </span>
          </div>
          <p className="text-xs text-[#6B7280] mt-1">FutureOps-Tech LMS Security, Audit Logs & Course Management Engine</p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => {
              fetchEnquiries();
              fetchAdminStudents();
              fetchAuditLogs();
              fetchAnnouncements();
              showToast('Admin system state refreshed');
            }}
            className="p-2.5 rounded-xl bg-gray-50 hover:bg-gray-100 text-[#111827] transition-colors border border-gray-200 flex items-center gap-1.5 text-xs font-semibold"
            title="Refresh System Data"
          >
            <RefreshCw className="w-4 h-4" />
            <span className="hidden sm:inline">Refresh Data</span>
          </button>
          <button
            onClick={logout}
            className="py-2.5 px-4 rounded-xl bg-gray-50 hover:bg-gray-100 text-[#111827] text-xs font-semibold transition-colors flex items-center gap-1.5 border border-gray-200"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-gray-200 pb-3">
        <button
          onClick={() => setAdminTab('students')}
          className={`px-4 py-2.5 rounded-xl text-xs font-extrabold transition flex items-center gap-2 ${
            adminTab === 'students' 
              ? 'bg-slate-900 text-white shadow' 
              : 'bg-white text-gray-600 hover:text-gray-900 border border-gray-200'
          }`}
        >
          <UserCheck className="w-4 h-4 text-blue-400" />
          <span>Student Approvals & Accounts</span>
          {pendingCount > 0 && (
            <span className="px-2 py-0.5 rounded-full bg-amber-400 text-slate-900 text-[10px] font-black animate-pulse">
              {pendingCount}
            </span>
          )}
        </button>

        <button
          onClick={() => setAdminTab('audit')}
          className={`px-4 py-2.5 rounded-xl text-xs font-extrabold transition flex items-center gap-2 ${
            adminTab === 'audit' 
              ? 'bg-slate-900 text-white shadow' 
              : 'bg-white text-gray-600 hover:text-gray-900 border border-gray-200'
          }`}
        >
          <History className="w-4 h-4 text-cyan-400" />
          <span>Security Audit Logs</span>
          <span className="px-2 py-0.5 rounded-full bg-slate-800 text-cyan-300 text-[10px]">
            {auditLogs.length}
          </span>
        </button>

        <button
          onClick={() => setAdminTab('courses')}
          className={`px-4 py-2.5 rounded-xl text-xs font-extrabold transition flex items-center gap-2 ${
            adminTab === 'courses' 
              ? 'bg-slate-900 text-white shadow' 
              : 'bg-white text-gray-600 hover:text-gray-900 border border-gray-200'
          }`}
        >
          <BookOpen className="w-4 h-4 text-emerald-400" />
          <span>Curriculum & Courses</span>
          <span className="px-2 py-0.5 rounded-full bg-slate-800 text-emerald-300 text-[10px]">
            {courses.length}
          </span>
        </button>

        <button
          onClick={() => setAdminTab('announcements')}
          className={`px-4 py-2.5 rounded-xl text-xs font-extrabold transition flex items-center gap-2 ${
            adminTab === 'announcements' 
              ? 'bg-slate-900 text-white shadow' 
              : 'bg-white text-gray-600 hover:text-gray-900 border border-gray-200'
          }`}
        >
          <Megaphone className="w-4 h-4 text-amber-400" />
          <span>Notice Broadcasts</span>
          <span className="px-2 py-0.5 rounded-full bg-slate-800 text-amber-300 text-[10px]">
            {announcements.length}
          </span>
        </button>

        <button
          onClick={() => setAdminTab('leads')}
          className={`px-4 py-2.5 rounded-xl text-xs font-extrabold transition flex items-center gap-2 ${
            adminTab === 'leads' 
              ? 'bg-slate-900 text-white shadow' 
              : 'bg-white text-gray-600 hover:text-gray-900 border border-gray-200'
          }`}
        >
          <FileText className="w-4 h-4 text-purple-400" />
          <span>Admission Leads & Trends</span>
        </button>
      </div>

      {/* ========================================================= */}
      {/* TAB 1: STUDENT APPROVALS & ACCOUNTS */}
      {/* ========================================================= */}
      {adminTab === 'students' && (
        <div className="space-y-6">
          
          {/* Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className={`p-5 rounded-2xl bg-white border transition shadow-sm ${pendingCount > 0 ? 'border-amber-300' : 'border-gray-100'}`}>
              <div className="flex items-center justify-between text-xs font-bold text-amber-600 uppercase">Pending Approval</div>
              <div className="text-3xl font-black text-[#111827] font-poppins mt-2">{pendingCount}</div>
              <div className="text-[11px] text-[#6B7280] mt-1">Waiting for activation</div>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between text-xs font-bold text-emerald-600 uppercase">Active Students</div>
              <div className="text-3xl font-black text-[#111827] font-poppins mt-2">{approvedCount}</div>
              <div className="text-[11px] text-[#6B7280] mt-1">Full LMS access enabled</div>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between text-xs font-bold text-rose-600 uppercase">Rejected Requests</div>
              <div className="text-3xl font-black text-[#111827] font-poppins mt-2">{rejectedCount}</div>
              <div className="text-[11px] text-[#6B7280] mt-1">Registration restricted</div>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between text-xs font-bold text-slate-600 uppercase">Disabled Accounts</div>
              <div className="text-3xl font-black text-[#111827] font-poppins mt-2">{disabledCount}</div>
              <div className="text-[11px] text-[#6B7280] mt-1">Access suspended</div>
            </div>
          </div>

          {/* Student Table Block */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-gray-100 space-y-6 shadow-sm">
            
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 border-b border-gray-200 pb-6">
              <div>
                <h2 className="text-xl font-extrabold text-[#111827] font-poppins">Student Accounts & Registration Approvals</h2>
                <p className="text-xs text-[#6B7280] mt-1">
                  Manage student credentials, activate access, and trace creator & modifier metadata.
                </p>
              </div>

              <div className="flex items-center gap-3 w-full lg:w-auto">
                <div className="relative w-full lg:w-64">
                  <input
                    type="text"
                    placeholder="Search name, email, ID..."
                    value={studentSearchTerm}
                    onChange={e => setStudentSearchTerm(e.target.value)}
                    className="w-full px-3.5 py-2 pl-9 rounded-xl bg-gray-50 border border-gray-200 text-xs text-[#111827] placeholder-gray-400 focus:outline-none"
                  />
                  <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-2.5" />
                </div>

                <button
                  onClick={() => setIsAddStudentOpen(true)}
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition shadow-sm flex items-center gap-1.5 shrink-0"
                >
                  <Plus className="w-4 h-4" />
                  <span>Create Student Account</span>
                </button>
              </div>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap items-center gap-2">
              {(['All', 'Pending', 'Approved', 'Rejected', 'Disabled'] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setStatusFilter(tab)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${
                    statusFilter === tab 
                      ? 'bg-blue-600 text-white shadow-sm' 
                      : 'bg-gray-50 text-gray-600 hover:text-gray-900 border border-gray-200'
                  }`}
                >
                  {tab} Students
                </button>
              ))}
            </div>

            {/* Table */}
            <div className="overflow-x-auto border border-gray-200 rounded-2xl">
              <table className="w-full text-left text-xs text-[#6B7280]">
                <thead className="bg-gray-50 text-[#111827] uppercase text-[10px] font-extrabold border-b border-gray-200">
                  <tr>
                    <th className="p-3.5">Student & ID</th>
                    <th className="p-3.5">Course & Batch</th>
                    <th className="p-3.5">Status & Access</th>
                    <th className="p-3.5">Creator / Modifier Info</th>
                    <th className="p-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {filteredStudents.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="p-8 text-center text-[#6B7280] italic">
                        No student records match the search filter.
                      </td>
                    </tr>
                  ) : (
                    filteredStudents.map((std) => (
                      <tr key={std.id} className="hover:bg-gray-50/80 transition-colors">
                        
                        <td className="p-3.5">
                          <div className="font-bold text-[#111827] text-sm">{std.name}</div>
                          <div className="text-[11px] font-mono text-blue-600">{std.studentId}</div>
                          <div className="text-[10px] text-gray-500">{std.email}</div>
                        </td>

                        <td className="p-3.5">
                          <div className="font-semibold text-slate-800">{std.courseName}</div>
                          <div className="text-[10px] text-gray-500 font-mono mt-0.5">{std.enrolledBatch}</div>
                        </td>

                        <td className="p-3.5">
                          <div className="space-y-1">
                            {std.isDisabled ? (
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-700 font-bold text-[10px] border border-gray-300">
                                <UserX className="w-3 h-3 text-gray-600" />
                                <span>Disabled Account</span>
                              </span>
                            ) : std.approvalStatus === 'Approved' ? (
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold text-[10px] border border-emerald-200">
                                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                                <span>Approved</span>
                              </span>
                            ) : std.approvalStatus === 'Pending' ? (
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 font-bold text-[10px] border border-amber-200 animate-pulse">
                                <Clock className="w-3 h-3 text-amber-600" />
                                <span>Pending Approval</span>
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-700 font-bold text-[10px] border border-rose-200">
                                <XCircle className="w-3 h-3 text-rose-600" />
                                <span>Rejected</span>
                              </span>
                            )}
                            <div className="text-[10px] text-gray-400">Reg: {std.registrationDate}</div>
                          </div>
                        </td>

                        {/* CREATOR & MODIFIER METADATA BADGE */}
                        <td className="p-3.5">
                          <div className="space-y-1 text-[11px]">
                            <div className="flex items-center gap-1 text-slate-700">
                              <span className="font-semibold text-slate-900">Created By:</span>
                              <span className="px-1.5 py-0.2 rounded bg-blue-50 text-blue-700 border border-blue-100 font-medium">
                                {std.createdByName || std.createdBy || 'Director (Admin)'}
                              </span>
                            </div>
                            {std.createdAt && (
                              <div className="text-[10px] text-gray-400 font-mono">
                                {new Date(std.createdAt).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}
                              </div>
                            )}

                            {std.updatedByName && (
                              <div className="pt-1 border-t border-gray-100 text-[10px] text-slate-500">
                                <span className="font-semibold text-slate-700">Last Modified:</span> {std.updatedByName}
                                {std.updatedAt && (
                                  <span className="text-gray-400 font-mono block">
                                    {new Date(std.updatedAt).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}
                                  </span>
                                )}
                              </div>
                            )}
                          </div>
                        </td>

                        {/* Actions */}
                        <td className="p-3.5 text-right">
                          <div className="flex items-center justify-end space-x-2">
                            {std.approvalStatus === 'Pending' && (
                              <>
                                <button
                                  onClick={() => approveStudent(std.id)}
                                  className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] transition shadow-sm"
                                >
                                  Approve
                                </button>
                                <button
                                  onClick={() => rejectStudent(std.id)}
                                  className="px-2.5 py-1 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 font-bold text-[11px]"
                                >
                                  Reject
                                </button>
                              </>
                            )}

                            <button
                              onClick={() => handleOpenEditStudent(std)}
                              className="px-2.5 py-1 rounded-lg bg-gray-100 hover:bg-gray-200 text-slate-800 font-bold text-[11px] border border-gray-200 flex items-center gap-1"
                            >
                              <Edit className="w-3 h-3" />
                              <span>Edit</span>
                            </button>
                          </div>
                        </td>

                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

          </div>

        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 2: AUDIT LOGS */}
      {/* ========================================================= */}
      {adminTab === 'audit' && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-gray-100 space-y-6 shadow-sm">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-gray-200 pb-5">
            <div>
              <div className="flex items-center gap-2">
                <History className="w-5 h-5 text-cyan-600" />
                <h2 className="text-xl font-extrabold text-[#111827] font-poppins">System Security & Administrator Audit Logs</h2>
              </div>
              <p className="text-xs text-[#6B7280] mt-1">Immutable trace of student approvals, account updates, curriculum changes, and login attempts.</p>
            </div>

            <div className="relative w-full sm:w-64">
              <input
                type="text"
                placeholder="Search action or admin..."
                value={auditSearchTerm}
                onChange={e => setAuditSearchTerm(e.target.value)}
                className="w-full px-3.5 py-2 pl-9 rounded-xl bg-gray-50 border border-gray-200 text-xs text-[#111827] placeholder-gray-400 focus:outline-none"
              />
              <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-2.5" />
            </div>
          </div>

          <div className="overflow-x-auto border border-gray-200 rounded-2xl">
            <table className="w-full text-left text-xs text-[#6B7280]">
              <thead className="bg-gray-50 text-[#111827] uppercase text-[10px] font-extrabold border-b border-gray-200">
                <tr>
                  <th className="p-3.5">Timestamp</th>
                  <th className="p-3.5">Action Executed</th>
                  <th className="p-3.5">Performed By</th>
                  <th className="p-3.5">Audit Event Details</th>
                  <th className="p-3.5">IP Address</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {filteredAuditLogs.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-[#6B7280] italic">
                      No security audit records match the query.
                    </td>
                  </tr>
                ) : (
                  filteredAuditLogs.map(log => (
                    <tr key={log.id} className="hover:bg-gray-50 transition-colors">
                      <td className="p-3.5 font-mono text-[11px] text-slate-600">
                        {new Date(log.timestamp).toLocaleString()}
                      </td>
                      <td className="p-3.5 font-bold text-slate-900">
                        <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-100 text-[11px]">
                          {log.action}
                        </span>
                      </td>
                      <td className="p-3.5 font-semibold text-slate-800">
                        {log.performedBy} <span className="text-[10px] font-mono text-gray-400">({log.performedById})</span>
                      </td>
                      <td className="p-3.5 max-w-md text-slate-700">
                        {log.details}
                      </td>
                      <td className="p-3.5 font-mono text-[10px] text-gray-400">
                        {log.ipAddress || '127.0.0.1'}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 3: CURRICULUM & COURSES */}
      {/* ========================================================= */}
      {adminTab === 'courses' && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-gray-100 space-y-6 shadow-sm">
          <div className="flex items-center justify-between border-b border-gray-200 pb-5">
            <div>
              <h2 className="text-xl font-extrabold text-[#111827] font-poppins">Course Curriculum & Learning Modules</h2>
              <p className="text-xs text-[#6B7280] mt-1">Manage academy programs, lab counts, and creator tracking.</p>
            </div>
            <button
              onClick={() => setIsAddCourseOpen(true)}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Course</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {courses.map(crs => (
              <div key={crs.id} className="p-6 rounded-2xl bg-white border border-gray-200 space-y-4 shadow-sm hover:border-blue-300 transition">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 font-bold text-[10px]">
                    {crs.category}
                  </span>
                  <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    {crs.status}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-slate-900">{crs.title}</h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">{crs.description}</p>
                </div>

                <div className="flex items-center gap-4 text-xs font-semibold text-slate-700 pt-2 border-t border-gray-100">
                  <div>⏱ {crs.duration}</div>
                  <div>🧪 {crs.labsCount} Hands-On Labs</div>
                  <div>🎯 Level: {crs.level}</div>
                </div>

                <div className="text-[10px] text-slate-400 pt-2 border-t border-gray-100 flex items-center justify-between">
                  <span>Created By: <strong className="text-slate-700">{crs.createdByName || 'Director'}</strong></span>
                  <span>{new Date(crs.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 4: NOTICE BROADCASTS */}
      {/* ========================================================= */}
      {adminTab === 'announcements' && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-gray-100 space-y-6 shadow-sm">
          <div className="flex items-center justify-between border-b border-gray-200 pb-5">
            <div>
              <h2 className="text-xl font-extrabold text-[#111827] font-poppins">Broadcast Notices & Academy Announcements</h2>
              <p className="text-xs text-[#6B7280] mt-1">Publish live notices directly to student dashboards.</p>
            </div>
            <button
              onClick={() => setIsAddAnnOpen(true)}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow flex items-center gap-1.5"
            >
              <Megaphone className="w-4 h-4" />
              <span>New Announcement</span>
            </button>
          </div>

          <div className="space-y-4">
            {announcements.map(ann => (
              <div key={ann.id} className="p-5 rounded-2xl bg-white border border-gray-200 space-y-3 shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] ${
                      ann.priority === 'Urgent' ? 'bg-rose-100 text-rose-800' :
                      ann.priority === 'Important' ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {ann.priority}
                    </span>
                    <span className="text-xs font-semibold text-slate-600">Target: {ann.targetBatch}</span>
                  </div>
                  <span className="text-[11px] text-gray-400">{new Date(ann.createdAt).toLocaleDateString()}</span>
                </div>

                <h3 className="text-base font-bold text-slate-900">{ann.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{ann.content}</p>

                <div className="text-[10px] text-slate-400 pt-2 border-t border-gray-100">
                  Published by: <strong className="text-slate-700">{ann.createdByName || 'Director'}</strong>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 5: LEADS & ANALYTICS */}
      {/* ========================================================= */}
      {adminTab === 'leads' && (
        <div className="space-y-8">
          
          {/* Analytics Chart */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-gray-100 space-y-6 shadow-sm">
            <div className="flex items-center justify-between border-b border-gray-200 pb-5">
              <div>
                <h2 className="text-xl font-extrabold text-[#111827] font-poppins">30-Day Academy Growth & Admissions Analytics</h2>
                <p className="text-xs text-[#6B7280]">Course inquiries and student conversion velocity.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-blue-50 border border-blue-100">
                <div className="text-xs font-bold text-blue-700">30-Day Lead Enquiries</div>
                <div className="text-2xl font-black text-slate-900 mt-1">+238 Leads</div>
              </div>
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-100">
                <div className="text-xs font-bold text-emerald-800">Student Registrations</div>
                <div className="text-2xl font-black text-slate-900 mt-1">+142 Students</div>
              </div>
              <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-100">
                <div className="text-xs font-bold text-indigo-800">Approval Conversion</div>
                <div className="text-2xl font-black text-slate-900 mt-1">98.2% Active</div>
              </div>
            </div>
          </div>

          {/* Lead Enquiries Table */}
          <div className="p-6 rounded-2xl bg-white border border-gray-100 space-y-4 shadow-sm">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold text-[#111827] font-poppins">Submitted Counselor Admission Leads</h2>
                <p className="text-xs text-[#6B7280]">Callbacks requested from website forms.</p>
              </div>
              <div className="relative w-full sm:w-64">
                <input
                  type="text"
                  placeholder="Filter by name or phone..."
                  value={enquirySearchTerm}
                  onChange={e => setEnquirySearchTerm(e.target.value)}
                  className="w-full px-3.5 py-2 pl-9 rounded-xl bg-gray-50 border border-gray-200 text-xs text-[#111827] placeholder-gray-400 focus:outline-none"
                />
                <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-2.5" />
              </div>
            </div>

            <div className="overflow-x-auto border border-gray-200 rounded-xl">
              <table className="w-full text-left text-xs text-[#6B7280]">
                <thead className="bg-gray-50 text-[#111827] uppercase text-[10px] font-bold border-b border-gray-200">
                  <tr>
                    <th className="p-3">Candidate</th>
                    <th className="p-3">Contact</th>
                    <th className="p-3">Course</th>
                    <th className="p-3">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {filteredEnquiries.map((enq) => (
                    <tr key={enq.id} className="hover:bg-gray-50">
                      <td className="p-3 font-semibold text-[#111827]">{enq.name}</td>
                      <td className="p-3">{enq.email} | <span className="font-mono text-blue-600 font-bold">{enq.mobile}</span></td>
                      <td className="p-3 font-semibold text-blue-700">{enq.course}</td>
                      <td className="p-3">
                        <button
                          onClick={() => showToast(`Counselor calling ${enq.name}`)}
                          className="px-2.5 py-1 rounded-lg bg-blue-600 text-white font-bold text-[10px]"
                        >
                          Call Lead
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* Academy Google Drive Repository */}
      <GoogleDriveManager 
        title="Academy Storage & Submissions Repository"
        subtitle="Syllabi, lab manuals, and student capstone backups."
      />

      {/* ========================================================= */}
      {/* MODAL: CREATE STUDENT ACCOUNT */}
      {/* ========================================================= */}
      {isAddStudentOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-gray-200 animate-fadeIn">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <h3 className="text-lg font-bold text-slate-900">Create New Student Account</h3>
              <button onClick={() => setIsAddStudentOpen(false)} className="p-2 text-gray-400 hover:text-gray-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateStudent} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Full Student Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Vikram Aditya"
                  value={newStudentData.name}
                  onChange={e => setNewStudentData({ ...newStudentData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs text-slate-900 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="student@example.com"
                  value={newStudentData.email}
                  onChange={e => setNewStudentData({ ...newStudentData, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs text-slate-900 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Set Account Password (Default: password123)</label>
                <input
                  type="password"
                  placeholder="password123"
                  value={newStudentData.password}
                  onChange={e => setNewStudentData({ ...newStudentData, password: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs text-slate-900 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Course Program</label>
                <select
                  value={newStudentData.courseName}
                  onChange={e => setNewStudentData({ ...newStudentData, courseName: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs text-slate-900 focus:outline-none"
                >
                  <option value="DevOps & Cloud Engineering Master Program">DevOps & Cloud Engineering Master Program</option>
                  <option value="AWS Certified Solutions Architect & DevOps">AWS Certified Solutions Architect & DevOps</option>
                  <option value="Python Automation & Infrastructure as Code">Python Automation & Infrastructure as Code</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Enrolled Batch</label>
                <input
                  type="text"
                  value={newStudentData.enrolledBatch}
                  onChange={e => setNewStudentData({ ...newStudentData, enrolledBatch: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs text-slate-900 focus:outline-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsAddStudentOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-gray-200 text-xs font-bold text-slate-600 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md"
                >
                  Save & Create Student Account
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL: EDIT STUDENT ACCOUNT */}
      {/* ========================================================= */}
      {editingStudent && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-gray-200 animate-fadeIn">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Edit Student Record</h3>
                <p className="text-xs text-blue-600 font-mono mt-0.5">{editingStudent.studentId}</p>
              </div>
              <button onClick={() => setEditingStudent(null)} className="p-2 text-gray-400 hover:text-gray-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUpdateStudent} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Student Name</label>
                <input
                  type="text"
                  value={editStudentData.name}
                  onChange={e => setEditStudentData({ ...editStudentData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs text-slate-900 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
                <input
                  type="email"
                  value={editStudentData.email}
                  onChange={e => setEditStudentData({ ...editStudentData, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs text-slate-900 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Approval Status</label>
                <select
                  value={editStudentData.approvalStatus}
                  onChange={e => setEditStudentData({ ...editStudentData, approvalStatus: e.target.value as any })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs text-slate-900 focus:outline-none"
                >
                  <option value="Approved">Approved</option>
                  <option value="Pending">Pending</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>

              <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-slate-900">Account Access Control</div>
                  <div className="text-[11px] text-slate-500">Disable account to suspend LMS login</div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editStudentData.isDisabled}
                    onChange={e => setEditStudentData({ ...editStudentData, isDisabled: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-rose-600"></div>
                </label>
              </div>

              <div className="pt-2 flex items-center justify-end gap-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setEditingStudent(null)}
                  className="px-4 py-2.5 rounded-xl border border-gray-200 text-xs font-bold text-slate-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-md"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL: ADD COURSE */}
      {/* ========================================================= */}
      {isAddCourseOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-gray-200 animate-fadeIn">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-base font-bold text-slate-900">Add New Course Program</h3>
              <button onClick={() => setIsAddCourseOpen(false)} className="text-gray-400"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleCreateCourse} className="space-y-3">
              <input
                type="text"
                required
                placeholder="Course Title *"
                value={newCourseData.title}
                onChange={e => setNewCourseData({ ...newCourseData, title: e.target.value })}
                className="w-full p-2.5 rounded-xl border text-xs text-slate-900"
              />
              <textarea
                placeholder="Description..."
                value={newCourseData.description}
                onChange={e => setNewCourseData({ ...newCourseData, description: e.target.value })}
                className="w-full p-2.5 rounded-xl border text-xs text-slate-900 h-20"
              />
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setIsAddCourseOpen(false)} className="px-3 py-2 text-xs border rounded-xl">Cancel</button>
                <button type="submit" className="px-4 py-2 text-xs bg-blue-600 text-white rounded-xl font-bold">Save Course</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL: ADD ANNOUNCEMENT */}
      {/* ========================================================= */}
      {isAddAnnOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-gray-200 animate-fadeIn">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-base font-bold text-slate-900">Publish Notice Broadcast</h3>
              <button onClick={() => setIsAddAnnOpen(false)} className="text-gray-400"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleCreateAnnouncement} className="space-y-3">
              <input
                type="text"
                required
                placeholder="Announcement Title *"
                value={newAnnData.title}
                onChange={e => setNewAnnData({ ...newAnnData, title: e.target.value })}
                className="w-full p-2.5 rounded-xl border text-xs text-slate-900"
              />
              <textarea
                required
                placeholder="Content message..."
                value={newAnnData.content}
                onChange={e => setNewAnnData({ ...newAnnData, content: e.target.value })}
                className="w-full p-2.5 rounded-xl border text-xs text-slate-900 h-24"
              />
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setIsAddAnnOpen(false)} className="px-3 py-2 text-xs border rounded-xl">Cancel</button>
                <button type="submit" className="px-4 py-2 text-xs bg-blue-600 text-white rounded-xl font-bold">Publish Notice</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
