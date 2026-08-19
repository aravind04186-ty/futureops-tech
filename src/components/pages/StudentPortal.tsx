import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { InteractiveTerminal } from '../shared/InteractiveTerminal';
import { GoogleDriveManager } from '../shared/GoogleDriveManager';
import { 
  BookOpen, 
  Award, 
  Terminal, 
  Video, 
  CheckCircle2, 
  Clock, 
  Play, 
  Download, 
  LogOut,
  UserCheck,
  Lock,
  Mail,
  Eye,
  EyeOff,
  KeyRound,
  ShieldCheck,
  Calendar,
  User,
  Check,
  XCircle,
  AlertCircle,
  Smartphone,
  MapPin,
  Sparkles,
  RefreshCw,
  Search,
  Filter,
  HardDrive
} from 'lucide-react';

export const StudentPortal: React.FC = () => {
  const { 
    user, 
    loginWithCredentials, 
    registerStudent,
    logout, 
    setIsCertificateModalOpen, 
    showToast,
    markAttendance,
    updatePassword
  } = useAuth();

  // Mode: login vs register
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

  // Login Form State
  const [loginTab, setLoginTab] = useState<'student' | 'admin'>('student');
  const [studentIdOrEmail, setStudentIdOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Register Form State
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regCourse, setRegCourse] = useState('DevOps & Cloud Engineering Master Program');
  const [registerSuccessMsg, setRegisterSuccessMsg] = useState('');
  const [registerError, setRegisterError] = useState('');

  // Forgot Password Modal State
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetSent, setResetSent] = useState(false);

  // Dashboard Tab State
  const [activeTab, setActiveTab] = useState<'overview' | 'attendance' | 'drive' | 'profile'>('overview');

  // Change Password Form State
  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [passError, setPassError] = useState('');

  // Attendance History Search & Filter State
  const [attendanceFilter, setAttendanceFilter] = useState<'All' | 'Present' | 'Absent' | 'Late'>('All');

  // Handle Login Submit
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    if (!studentIdOrEmail.trim()) {
      setLoginError('Please enter your Student ID or Registered Email');
      return;
    }
    if (!password.trim()) {
      setLoginError('Please enter your account password');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await loginWithCredentials(studentIdOrEmail, password, rememberMe);
      if (!res.success) {
        setLoginError(res.error || 'Invalid Student ID / Email or Password.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle Register Submit
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegisterError('');
    setRegisterSuccessMsg('');

    if (!regName.trim()) {
      setRegisterError('Please enter your full name');
      return;
    }
    if (!regEmail.trim()) {
      setRegisterError('Please enter a valid email address');
      return;
    }
    if (!regPassword || regPassword.length < 6) {
      setRegisterError('Password must be at least 6 characters');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await registerStudent(regName, regEmail, regPassword, regCourse);
      if (res.success) {
        setRegisterSuccessMsg(res.message);
      } else {
        setRegisterError(res.message);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleQuickFillApprovedStudent = () => {
    setAuthMode('login');
    setStudentIdOrEmail('kushal.devops@futureops-tech.com');
    setPassword('password123');
    setLoginTab('student');
    setLoginError('');
  };

  const handleQuickFillPendingStudent = () => {
    setAuthMode('login');
    setStudentIdOrEmail('ananya.s@gmail.com');
    setPassword('password123');
    setLoginTab('student');
    setLoginError('');
  };

  const handleQuickFillAdmin = () => {
    setAuthMode('login');
    setStudentIdOrEmail('admin@futureops-tech.com');
    setPassword('admin123');
    setLoginTab('admin');
    setLoginError('');
  };

  const handleForgotPasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetEmail.trim()) {
      showToast('Please enter your registered email address');
      return;
    }
    setResetSent(true);
    showToast(`Password reset link sent to ${resetEmail}`);
  };

  const handleChangePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPassError('');

    if (!currentPass) {
      setPassError('Please enter your current password');
      return;
    }
    if (!newPass) {
      setPassError('Please enter a new password');
      return;
    }
    if (newPass.length < 6) {
      setPassError('New password must be at least 6 characters');
      return;
    }
    if (newPass !== confirmPass) {
      setPassError('New password and confirm password do not match');
      return;
    }

    const success = updatePassword(currentPass, newPass);
    if (success) {
      setCurrentPass('');
      setNewPass('');
      setConfirmPass('');
    }
  };

  // -------------------------------------------------------------
  // UNAUTHENTICATED STUDENT LOGIN PORTAL
  // -------------------------------------------------------------
  if (!user) {
    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-8 animate-fadeIn">
        {/* Top Title Header */}
        <div className="text-center space-y-3">
          <span className="text-xs font-extrabold text-cyan-400 uppercase tracking-widest bg-cyan-500/10 px-3.5 py-1 rounded-full border border-cyan-500/20">
            FutureOps-Tech LMS Access
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-poppins">
            Student & Candidate Login Portal
          </h1>
          <p className="text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
            Access your live class recordings, cloud lab terminal sandboxes, attendance history, and course certificates.
          </p>
        </div>

        {/* Login & Register Container */}
        <div className="max-w-md mx-auto bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden">
          
          {/* Main Auth Mode Selector: Login vs Register vs Admin */}
          <div className="grid grid-cols-3 bg-slate-950 p-1.5 border-b border-slate-800 text-[11px] font-bold">
            <button
              type="button"
              onClick={() => {
                setAuthMode('login');
                setLoginTab('student');
                setLoginError('');
              }}
              className={`py-2 rounded-xl transition flex items-center justify-center gap-1.5 ${
                authMode === 'login' && loginTab === 'student'
                  ? 'bg-cyan-500 text-slate-950 font-extrabold shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>Student Login</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setAuthMode('register');
                setRegisterError('');
                setRegisterSuccessMsg('');
              }}
              className={`py-2 rounded-xl transition flex items-center justify-center gap-1.5 ${
                authMode === 'register'
                  ? 'bg-emerald-500 text-slate-950 font-extrabold shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>New Student</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setAuthMode('login');
                setLoginTab('admin');
                setLoginError('');
              }}
              className={`py-2 rounded-xl transition flex items-center justify-center gap-1.5 ${
                authMode === 'login' && loginTab === 'admin'
                  ? 'bg-blue-600 text-white font-extrabold shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Admin Portal</span>
            </button>
          </div>

          <div className="p-6 sm:p-8 space-y-6">
            
            {/* Quick Fill Preset Buttons */}
            <div className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300 space-y-2">
              <div className="flex items-center justify-between font-bold text-cyan-300 text-[11px]">
                <span className="flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Demo Accounts
                </span>
                <span className="text-[10px] text-slate-500">Test Login States</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5 pt-1">
                <button
                  type="button"
                  onClick={handleQuickFillApprovedStudent}
                  className="py-1.5 px-2 rounded-lg bg-emerald-950/40 hover:bg-emerald-900/60 text-emerald-300 text-[10px] font-bold border border-emerald-500/30 text-center transition"
                  title="Approved Student: Kushal"
                >
                  ✓ Approved
                </button>
                <button
                  type="button"
                  onClick={handleQuickFillPendingStudent}
                  className="py-1.5 px-2 rounded-lg bg-amber-950/40 hover:bg-amber-900/60 text-amber-300 text-[10px] font-bold border border-amber-500/30 text-center transition"
                  title="Pending Student: Ananya Sharma"
                >
                  ⏰ Pending
                </button>
                <button
                  type="button"
                  onClick={handleQuickFillAdmin}
                  className="py-1.5 px-2 rounded-lg bg-blue-950/40 hover:bg-blue-900/60 text-blue-300 text-[10px] font-bold border border-blue-500/30 text-center transition"
                  title="Admin Director"
                >
                  🛡️ Admin
                </button>
              </div>
            </div>

            {/* AUTH MODE 1: LOGIN FORM */}
            {authMode === 'login' && (
              <div className="space-y-4">
                
                {/* Error Banner / Pending Alert */}
                {loginError && (
                  loginError.includes('awaiting admin approval') ? (
                    <div className="p-4 rounded-2xl bg-amber-500/15 border border-amber-500/40 text-amber-200 text-xs space-y-2.5 shadow-lg animate-fadeIn">
                      <div className="flex items-center gap-2 font-black text-amber-300 text-xs uppercase tracking-wider">
                        <Clock className="w-4 h-4 text-amber-400 shrink-0 animate-pulse" />
                        <span>APPROVAL PENDING</span>
                      </div>
                      <p className="font-medium leading-relaxed text-amber-100 bg-slate-950/60 p-3 rounded-xl border border-amber-500/20 font-mono text-[11px]">
                        "Your account is awaiting admin approval. Please wait until your account is activated."
                      </p>
                      <div className="text-[11px] text-slate-300 pt-1 flex items-center justify-between">
                        <span>Status: <strong className="text-amber-400">Pending Review</strong></span>
                        <button
                          type="button"
                          onClick={handleQuickFillAdmin}
                          className="text-cyan-400 font-extrabold hover:underline flex items-center gap-1"
                        >
                          Log in as Admin &rarr;
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                      <span>{loginError}</span>
                    </div>
                  )
                )}

                <form onSubmit={handleLogin} className="space-y-4">
                  {/* Student ID / Email */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300 block">
                      {loginTab === 'student' ? 'Student ID or Registered Email' : 'Admin Username / Email'}
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={studentIdOrEmail}
                        onChange={(e) => setStudentIdOrEmail(e.target.value)}
                        placeholder={loginTab === 'student' ? 'e.g. kushal.devops@futureops-tech.com' : 'admin@futureops-tech.com'}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 pl-10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition"
                      />
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    </div>
                  </div>

                  {/* Password */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-semibold text-slate-300">Password</label>
                      <button
                        type="button"
                        onClick={() => {
                          setIsForgotPasswordOpen(true);
                          setResetSent(false);
                          setResetEmail(studentIdOrEmail.includes('@') ? studentIdOrEmail : '');
                        }}
                        className="text-[11px] font-semibold text-cyan-400 hover:underline"
                      >
                        Forgot Password?
                      </button>
                    </div>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter account password"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 pl-10 pr-10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition"
                      />
                      <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3.5 top-3 text-slate-400 hover:text-white"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Remember Me */}
                  <div className="flex items-center justify-between pt-1">
                    <label className="flex items-center space-x-2 text-xs text-slate-300 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="rounded bg-slate-950 border-slate-800 text-cyan-500 focus:ring-cyan-500"
                      />
                      <span>Remember me on this device</span>
                    </label>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-extrabold text-xs uppercase tracking-wider transition shadow-lg flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin text-slate-950" />
                        <span>Authenticating...</span>
                      </>
                    ) : (
                      <>
                        <KeyRound className="w-4 h-4 text-slate-950" />
                        <span>Secure Sign In</span>
                      </>
                    )}
                  </button>
                </form>

                <div className="pt-3 text-center text-xs text-slate-400 border-t border-slate-800">
                  New Candidate?{' '}
                  <button
                    type="button"
                    onClick={() => {
                      setAuthMode('register');
                      setRegisterError('');
                      setRegisterSuccessMsg('');
                    }}
                    className="text-cyan-400 font-bold hover:underline"
                  >
                    Register Account & Request Approval &rarr;
                  </button>
                </div>
              </div>
            )}

            {/* AUTH MODE 2: NEW STUDENT REGISTRATION FORM */}
            {authMode === 'register' && (
              <div className="space-y-4 animate-fadeIn">
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-white font-poppins flex items-center gap-2">
                    <UserCheck className="w-4 h-4 text-emerald-400" /> New Student Registration
                  </h3>
                  <p className="text-xs text-slate-400">
                    Register your candidate details. Accounts enter <span className="text-amber-400 font-bold">Pending Approval</span> state.
                  </p>
                </div>

                {registerSuccessMsg ? (
                  <div className="p-4 rounded-2xl bg-amber-500/15 border border-amber-500/40 text-amber-200 text-xs space-y-3 shadow-lg">
                    <div className="flex items-center gap-2 font-black text-amber-300 text-xs uppercase tracking-wider">
                      <Clock className="w-4 h-4 text-amber-400 shrink-0 animate-pulse" />
                      <span>REGISTRATION SUBMITTED</span>
                    </div>
                    <p className="font-medium leading-relaxed text-amber-100 bg-slate-950/60 p-3 rounded-xl border border-amber-500/20 font-mono text-[11px]">
                      "{registerSuccessMsg}"
                    </p>
                    <div className="text-[11px] text-slate-300 space-y-2 pt-1">
                      <p>An administrator will review your enrollment and activate your account shortly.</p>
                      <button
                        type="button"
                        onClick={() => {
                          setAuthMode('login');
                          setStudentIdOrEmail(regEmail);
                          setLoginError('');
                        }}
                        className="w-full py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition"
                      >
                        Proceed to Login Page
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleRegister} className="space-y-3.5">
                    {registerError && (
                      <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                        <span>{registerError}</span>
                      </div>
                    )}

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-300">Full Name</label>
                      <input
                        type="text"
                        value={regName}
                        onChange={(e) => setRegName(e.target.value)}
                        placeholder="e.g. Ramesh Kumar"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-300">Email Address</label>
                      <input
                        type="email"
                        value={regEmail}
                        onChange={(e) => setRegEmail(e.target.value)}
                        placeholder="e.g. ramesh.cloud@gmail.com"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-300">Choose Password</label>
                      <input
                        type="password"
                        value={regPassword}
                        onChange={(e) => setRegPassword(e.target.value)}
                        placeholder="Min 6 characters"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-300">Enrolled Course</label>
                      <select
                        value={regCourse}
                        onChange={(e) => setRegCourse(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500"
                      >
                        <option value="DevOps & Cloud Engineering Master Program">DevOps & Cloud Engineering Master Program</option>
                        <option value="AWS Certified Solutions Architect & DevOps">AWS Certified Solutions Architect & DevOps</option>
                        <option value="Full-Stack Web Development Masterclass">Full-Stack Web Development Masterclass</option>
                      </select>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs uppercase tracking-wider transition shadow-lg flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin text-slate-950" />
                          <span>Registering Account...</span>
                        </>
                      ) : (
                        <>
                          <UserCheck className="w-4 h-4 text-slate-950" />
                          <span>Register & Request Approval</span>
                        </>
                      )}
                    </button>
                  </form>
                )}

                <div className="pt-2 text-center text-xs text-slate-400 border-t border-slate-800">
                  Already registered?{' '}
                  <button
                    type="button"
                    onClick={() => {
                      setAuthMode('login');
                      setLoginError('');
                    }}
                    className="text-cyan-400 font-bold hover:underline"
                  >
                    Back to Login
                  </button>
                </div>
              </div>
            )}

            <div className="pt-2 text-center text-[11px] text-slate-400 border-t border-slate-800">
              Need admission help? Call Admissions Cell: <a href="tel:+918277759401" className="text-cyan-400 font-bold hover:underline">+91 82777 59401</a> / <a href="tel:+919482617166" className="text-cyan-400 font-bold hover:underline">+91 94826 17166</a>
            </div>

          </div>
        </div>

        {/* Forgot Password Modal */}
        {isForgotPasswordOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
            <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-5 shadow-2xl relative">
              <button
                onClick={() => setIsForgotPasswordOpen(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white p-1"
              >
                <XCircle className="w-5 h-5" />
              </button>

              <div className="space-y-1">
                <h3 className="text-lg font-bold text-white font-poppins flex items-center gap-2">
                  <KeyRound className="w-5 h-5 text-amber-400" /> Reset Account Password
                </h3>
                <p className="text-xs text-slate-400">
                  Enter your registered Student ID or Email address to receive a password reset link.
                </p>
              </div>

              {resetSent ? (
                <div className="p-4 rounded-2xl bg-emerald-950/50 border border-emerald-500/30 text-emerald-200 text-xs space-y-3">
                  <div className="flex items-center gap-2 font-bold text-emerald-400 text-sm">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" /> Password Reset Email Sent!
                  </div>
                  <p>
                    We have sent password recovery instructions to <strong className="text-white">{resetEmail}</strong>. Please check your inbox or spam folder.
                  </p>
                  <button
                    onClick={() => setIsForgotPasswordOpen(false)}
                    className="w-full py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold transition text-xs"
                  >
                    Return to Login
                  </button>
                </div>
              ) : (
                <form onSubmit={handleForgotPasswordSubmit} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300">Registered Email</label>
                    <input
                      type="email"
                      value={resetEmail}
                      onChange={(e) => setResetEmail(e.target.value)}
                      placeholder="student@example.com"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsForgotPasswordOpen(false)}
                      className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-extrabold text-xs shadow"
                    >
                      Send Recovery Email
                    </button>
                  </div>
                </form>
              )}

            </div>
          </div>
        )}

      </div>
    );
  }

  // -------------------------------------------------------------
  // AUTHENTICATED STUDENT DASHBOARD
  // -------------------------------------------------------------
  const att = user.attendance || {
    presentDays: 32,
    absentDays: 4,
    totalDays: 36,
    attendancePercentage: 88.9,
    todayMarked: false,
    todayTopic: 'AWS EKS Auto-Scaling & ArgoCD GitOps Live Lab',
    history: []
  };

  const filteredHistory = att.history.filter(item => {
    if (attendanceFilter === 'All') return true;
    return item.status === attendanceFilter;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-8 animate-fadeIn">
      
      {/* 1. Student Master Header Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-blue-950 to-slate-950 border border-cyan-500/30 shadow-2xl space-y-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-slate-950 text-2xl font-black shadow-lg shrink-0">
              {user.name.charAt(0)}
            </div>
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl font-extrabold text-white font-poppins">{user.name}</h1>
                <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 uppercase tracking-wide">
                  {user.role === 'admin' ? 'SYSTEM ADMINISTRATOR' : 'ACTIVE STUDENT'}
                </span>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 text-cyan-300 border border-slate-700">
                  ID: {user.studentId || 'FOT-2026-STD-088'}
                </span>
              </div>
              
              <div className="text-xs text-slate-300 flex flex-wrap items-center gap-x-4 gap-y-1">
                <span className="font-semibold text-cyan-200">📚 {user.courseName || 'DevOps & Cloud Engineering Master Program'}</span>
                <span>•</span>
                <span className="text-slate-300 font-medium">🗓️ Batch: {user.enrolledBatch}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setIsCertificateModalOpen(true)}
              className="py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition flex items-center gap-1.5 shadow-md"
            >
              <Award className="w-4 h-4 text-slate-950" />
              <span>Verified Certificate</span>
            </button>
            <button
              onClick={logout}
              className="py-2.5 px-4 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 text-xs font-bold transition flex items-center gap-1.5 shadow"
              title="Sign out of student account"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Inner Sub-Navigation Bar */}
        <div className="flex items-center gap-2 border-t border-slate-800/80 pt-4 overflow-x-auto text-xs font-bold no-scrollbar">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 rounded-xl transition flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'overview'
                ? 'bg-cyan-500 text-slate-950 font-extrabold shadow'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Course Overview & Labs</span>
          </button>

          <button
            onClick={() => setActiveTab('attendance')}
            className={`px-4 py-2 rounded-xl transition flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'attendance'
                ? 'bg-cyan-500 text-slate-950 font-extrabold shadow'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Attendance & Live Classes</span>
            {att.todayMarked ? (
              <span className="bg-emerald-950 text-emerald-400 text-[9px] px-1.5 py-0.5 rounded font-mono">Present ✓</span>
            ) : (
              <span className="bg-amber-500/20 text-amber-300 text-[9px] px-1.5 py-0.5 rounded font-mono">Mark Ready</span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('drive')}
            className={`px-4 py-2 rounded-xl transition flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'drive'
                ? 'bg-blue-600 text-white font-extrabold shadow'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <HardDrive className="w-4 h-4 text-blue-400" />
            <span>Google Drive Vault</span>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`px-4 py-2 rounded-xl transition flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'profile'
                ? 'bg-cyan-500 text-slate-950 font-extrabold shadow'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Profile & Security</span>
          </button>
        </div>
      </div>

      {/* TAB: GOOGLE DRIVE VAULT */}
      {activeTab === 'drive' && (
        <div className="animate-fadeIn">
          <GoogleDriveManager 
            title="Student Google Drive Repository"
            subtitle="Connect your Google Drive account to store, organize, and submit course lab reports, YAML scripts, and project capstones directly."
          />
        </div>
      )}

      {/* TAB 1: OVERVIEW & LABS */}
      {activeTab === 'overview' && (
        <div className="space-y-8 animate-fadeIn">
          {/* Progress Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-400 uppercase">
                <span>Course Completion Progress</span>
                <span className="text-cyan-400 font-bold">{user.progressPercentage}%</span>
              </div>
              <div className="text-3xl font-extrabold text-cyan-400 font-poppins">{user.progressPercentage}%</div>
              <div className="w-full bg-slate-950 h-2.5 rounded-full overflow-hidden border border-slate-800">
                <div className="bg-gradient-to-r from-cyan-500 to-blue-500 h-full transition-all duration-500" style={{ width: `${user.progressPercentage}%` }} />
              </div>
              <div className="text-[11px] text-slate-400">Module 13 of 17 Currently Active (GitOps & ArgoCD)</div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="text-xs font-semibold text-slate-400 uppercase">Hands-On Cloud Labs</div>
              <div className="text-3xl font-extrabold text-emerald-400 font-poppins">{user.completedLabs} / {user.totalLabs}</div>
              <div className="text-xs text-slate-300">28 Practical Cloud Labs Verified</div>
              <div className="text-[11px] text-emerald-400 font-medium">✓ AWS EKS & Terraform state verified</div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="text-xs font-semibold text-slate-400 uppercase">Attendance Summary</div>
              <div className="text-3xl font-extrabold text-amber-400 font-poppins">{att.attendancePercentage}%</div>
              <div className="text-xs text-slate-300">{att.presentDays} Days Present out of {att.totalDays} Sessions</div>
              <button
                onClick={() => setActiveTab('attendance')}
                className="text-xs text-cyan-400 font-semibold hover:underline flex items-center gap-1"
              >
                <span>View Attendance Ledger</span> &rarr;
              </button>
            </div>
          </div>

          {/* Cloud Terminal Simulator */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-white font-poppins flex items-center gap-2">
                <Terminal className="w-5 h-5 text-cyan-400" /> Student Cloud Sandbox Terminal
              </h2>
              <span className="text-xs text-slate-400 font-mono">AWS EC2 / K8s Cluster Sandbox</span>
            </div>
            <InteractiveTerminal />
          </div>

          {/* Recorded Video Lectures */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-white font-poppins flex items-center gap-2">
              <Video className="w-5 h-5 text-cyan-400" /> Recorded Live Class HD Video Library
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: 'Class 24: Kubernetes Deployments & Ingress', date: 'July 26, 2026', dur: '2h 15m' },
                { title: 'Class 23: Docker Multi-Stage Builds & Trivy', date: 'July 20, 2026', dur: '2h 05m' },
                { title: 'Class 22: Terraform S3 State & DynamoDB Locking', date: 'July 19, 2026', dur: '2h 30m' }
              ].map((v, idx) => (
                <div key={idx} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 hover:border-slate-700 transition">
                  <div className="h-32 rounded-xl bg-slate-950 flex items-center justify-center text-cyan-400 border border-slate-800 relative group cursor-pointer">
                    <Play className="w-10 h-10 group-hover:scale-110 transition-transform" />
                    <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-slate-900 text-[10px] text-slate-300 font-mono">{v.dur}</span>
                  </div>
                  <h3 className="text-sm font-bold text-white">{v.title}</h3>
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>{v.date}</span>
                    <button
                      onClick={() => showToast(`Playing HD lecture: ${v.title}`)}
                      className="text-cyan-400 font-semibold hover:underline"
                    >
                      Watch Lecture
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: ATTENDANCE & LIVE CLASSES */}
      {activeTab === 'attendance' && (
        <div className="space-y-8 animate-fadeIn">
          
          {/* Top Attendance Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
              <span className="text-xs text-slate-400 uppercase font-semibold">Total Live Sessions</span>
              <div className="text-3xl font-extrabold text-white font-poppins">{att.totalDays}</div>
              <span className="text-[11px] text-slate-500">Scheduled in Cohort #42</span>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
              <span className="text-xs text-slate-400 uppercase font-semibold">Present Days</span>
              <div className="text-3xl font-extrabold text-emerald-400 font-poppins">{att.presentDays}</div>
              <span className="text-[11px] text-emerald-400">Classes Attended</span>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
              <span className="text-xs text-slate-400 uppercase font-semibold">Absent Days</span>
              <div className="text-3xl font-extrabold text-rose-400 font-poppins">{att.absentDays}</div>
              <span className="text-[11px] text-rose-400">Missed Sessions</span>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
              <span className="text-xs text-slate-400 uppercase font-semibold">Attendance Rate</span>
              <div className="text-3xl font-extrabold text-cyan-400 font-poppins">{att.attendancePercentage}%</div>
              <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800 mt-1">
                <div className="bg-cyan-400 h-full" style={{ width: `${att.attendancePercentage}%` }} />
              </div>
            </div>
          </div>

          {/* Mark Attendance Action Banner */}
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 border border-emerald-500/40 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <span className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-xs font-bold text-emerald-400 font-mono uppercase tracking-wider">
                  TODAY'S LIVE CLASS ATTENDANCE DESK
                </span>
              </div>
              <h3 className="text-xl font-bold text-white font-poppins">
                {att.todayTopic || 'AWS EKS Auto-Scaling & ArgoCD GitOps Live Lab'}
              </h3>
              <p className="text-xs text-slate-300">
                Live Interactive Online Class • Saturday 10:00 AM - 1:00 PM IST (Google Meet)
              </p>
            </div>

            <div className="shrink-0">
              {att.todayMarked ? (
                <div className="px-6 py-3 rounded-2xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 flex items-center gap-2 font-extrabold text-sm shadow">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  <span>PRESENT MARKED TODAY</span>
                </div>
              ) : (
                <button
                  onClick={markAttendance}
                  className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs uppercase tracking-wider transition shadow-lg hover:scale-105 flex items-center gap-2"
                >
                  <CheckCircle2 className="w-5 h-5 text-slate-950" />
                  <span>Mark Attendance Now</span>
                </button>
              )}
            </div>
          </div>

          {/* Attendance History Table */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-white font-poppins">Attendance Ledger History</h3>
                <p className="text-xs text-slate-400">Complete log of session attendance and live lab verification</p>
              </div>

              {/* Status Filter Buttons */}
              <div className="flex items-center gap-1.5 bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs">
                {(['All', 'Present', 'Absent', 'Late'] as const).map((st) => (
                  <button
                    key={st}
                    onClick={() => setAttendanceFilter(st)}
                    className={`px-3 py-1 rounded-lg font-semibold transition ${
                      attendanceFilter === st
                        ? 'bg-cyan-500 text-slate-950'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-950 border-b border-slate-800 text-slate-400 uppercase text-[10px] font-mono tracking-wider">
                      <th className="p-4">Date</th>
                      <th className="p-4">Topic / Module Name</th>
                      <th className="p-4">Status</th>
                      <th className="p-4">Time Marked</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 text-slate-300">
                    {filteredHistory.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="p-6 text-center text-slate-500">
                          No attendance records found matching status "{attendanceFilter}"
                        </td>
                      </tr>
                    ) : (
                      filteredHistory.map((row) => (
                        <tr key={row.id} className="hover:bg-slate-800/50 transition">
                          <td className="p-4 font-mono font-semibold text-white">{row.date}</td>
                          <td className="p-4 font-medium text-slate-200">{row.topic}</td>
                          <td className="p-4">
                            {row.status === 'Present' && (
                              <span className="px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold text-[11px]">
                                ✓ Present
                              </span>
                            )}
                            {row.status === 'Late' && (
                              <span className="px-2.5 py-1 rounded-md bg-amber-500/10 text-amber-300 border border-amber-500/20 font-bold text-[11px]">
                                ⏰ Late
                              </span>
                            )}
                            {row.status === 'Absent' && (
                              <span className="px-2.5 py-1 rounded-md bg-rose-500/10 text-rose-400 border border-rose-500/20 font-bold text-[11px]">
                                ✕ Absent
                              </span>
                            )}
                          </td>
                          <td className="p-4 font-mono text-slate-400">{row.timeMarked || '—'}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* TAB 3: PROFILE & SECURITY */}
      {activeTab === 'profile' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fadeIn">
          
          {/* Profile Details Card */}
          <div className="lg:col-span-1 bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6 shadow-xl">
            <div className="text-center space-y-3 border-b border-slate-800 pb-6">
              <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-slate-950 text-3xl font-black shadow-xl">
                {user.name.charAt(0)}
              </div>
              <div>
                <h3 className="text-lg font-bold text-white font-poppins">{user.name}</h3>
                <p className="text-xs text-cyan-400 font-mono font-semibold">ID: {user.studentId || 'FOT-2026-STD-088'}</p>
              </div>
              <span className="inline-block px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 text-[11px] font-bold">
                Student Account Verified
              </span>
            </div>

            <div className="space-y-4 text-xs">
              <div className="space-y-1">
                <span className="text-slate-500 font-semibold uppercase text-[10px]">Email Address</span>
                <p className="text-slate-200 font-medium">{user.email}</p>
              </div>

              <div className="space-y-1">
                <span className="text-slate-500 font-semibold uppercase text-[10px]">Enrolled Course</span>
                <p className="text-cyan-300 font-bold">{user.courseName}</p>
              </div>

              <div className="space-y-1">
                <span className="text-slate-500 font-semibold uppercase text-[10px]">Batch</span>
                <p className="text-slate-200 font-medium">{user.enrolledBatch}</p>
              </div>

              <div className="space-y-1">
                <span className="text-slate-500 font-semibold uppercase text-[10px]">Mobile</span>
                <p className="text-slate-200 font-medium">{user.profile?.mobile || '+91 98765 43210'}</p>
              </div>

              <div className="space-y-1">
                <span className="text-slate-500 font-semibold uppercase text-[10px]">Campus Location</span>
                <p className="text-slate-200 font-medium">{user.profile?.location || 'Bangalore, India'}</p>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800">
              <button
                onClick={logout}
                className="w-full py-2.5 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 font-bold text-xs transition flex items-center justify-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout from Account</span>
              </button>
            </div>
          </div>

          {/* Change Password & Security Form */}
          <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
            <div className="space-y-1 border-b border-slate-800 pb-4">
              <h3 className="text-lg font-bold text-white font-poppins flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-cyan-400" /> Account Security & Password Settings
              </h3>
              <p className="text-xs text-slate-400">
                Update your LMS student portal login password to keep your cloud lab credentials safe.
              </p>
            </div>

            {passError && (
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                <span>{passError}</span>
              </div>
            )}

            <form onSubmit={handleChangePasswordSubmit} className="space-y-4 max-w-lg">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Current Password</label>
                <input
                  type="password"
                  value={currentPass}
                  onChange={(e) => setCurrentPass(e.target.value)}
                  placeholder="Enter current password"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">New Password</label>
                <input
                  type="password"
                  value={newPass}
                  onChange={(e) => setNewPass(e.target.value)}
                  placeholder="At least 6 characters"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Confirm New Password</label>
                <input
                  type="password"
                  value={confirmPass}
                  onChange={(e) => setConfirmPass(e.target.value)}
                  placeholder="Re-type new password"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="py-2.5 px-6 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-extrabold text-xs shadow transition"
                >
                  Save New Password
                </button>
              </div>
            </form>
          </div>

        </div>
      )}

    </div>
  );
};
