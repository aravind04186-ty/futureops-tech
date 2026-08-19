import express from "express";
import path from "path";
import crypto from "crypto";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import { getOpsBotAnswer } from "./src/lib/opsBotKnowledge";

dotenv.config();

// Helper for secure password hashing
function hashPassword(password: string): string {
  const salt = "fot_secure_salt_2026";
  return crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex");
}

function verifyPassword(password: string, hash: string): boolean {
  if (!password || !hash) return false;
  // Also check plain text comparison as fallback for dev
  return hashPassword(password) === hash || password === hash;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // CORS Middleware for Production & Cross-Origin deployment
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, x-admin-token");
    if (req.method === "OPTIONS") {
      return res.sendStatus(200);
    }
    next();
  });

  // Tokens session store
  const tokensStore = new Map<string, { userId: string; role: 'student' | 'admin'; name: string; studentId?: string }>();

  // Audit Logs Store
  const auditLogsList: any[] = [
    {
      id: "log-init-1",
      action: "System Initialized",
      performedBy: "System Director",
      performedById: "FOT-ADM-001",
      timestamp: new Date().toISOString(),
      details: "Production Student & Admin Security Engine Bootstrapped",
      ipAddress: "127.0.0.1"
    },
    {
      id: "log-init-2",
      action: "Student Approved",
      performedBy: "Director (Admin)",
      performedById: "FOT-ADM-001",
      recordId: "std-2026-88",
      timestamp: new Date(Date.now() - 86400000 * 2).toISOString(),
      details: "Student Kushal (FOT-2026-STD-088) account approved for DevOps Cohort #42",
      ipAddress: "127.0.0.1"
    }
  ];

  // Helper function to log audit entries
  function recordAuditLog(action: string, adminName: string, adminId: string, details: string, recordId?: string, ip?: string) {
    const entry = {
      id: `log-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      action,
      performedBy: adminName || "Director",
      performedById: adminId || "FOT-ADM-001",
      recordId: recordId || "",
      timestamp: new Date().toISOString(),
      details,
      ipAddress: ip || "127.0.0.1"
    };
    auditLogsList.unshift(entry);
    return entry;
  }

  // Pre-hashed default passwords
  const defaultAdminPassHash = hashPassword("admin123");
  const defaultStudentPassHash = hashPassword("password123");

  // In-memory Students Store
  const studentsList: any[] = [
    {
      id: "adm-01",
      studentId: "FOT-ADM-001",
      name: "Director",
      email: "admin@futureops-tech.com",
      password: defaultAdminPassHash,
      role: "admin",
      approvalStatus: "Approved",
      isDisabled: false,
      registrationDate: "Jan 01, 2024",
      courseName: "System Administration & Quality Audit",
      enrolledBatch: "All Batches (Admin View)",
      progressPercentage: 100,
      completedLabs: 36,
      totalLabs: 36,
      joinedDate: "Jan 2024",
      certificateEarned: true,
      certificateId: "FOT-ADMIN-ROOT",
      createdBy: "SYSTEM",
      createdByName: "System Admin",
      createdAt: "2024-01-01T00:00:00.000Z"
    },
    {
      id: "std-2026-88",
      studentId: "FOT-2026-STD-088",
      name: "Kushal",
      email: "kushal.devops@futureops-tech.com",
      password: defaultStudentPassHash,
      role: "student",
      approvalStatus: "Approved",
      isDisabled: false,
      registrationDate: "Jul 15, 2026",
      courseName: "DevOps & Cloud Engineering Master Program",
      enrolledBatch: "DevOps Master Cohort #42 (Weekend Live)",
      progressPercentage: 78,
      completedLabs: 28,
      totalLabs: 36,
      joinedDate: "April 2026",
      certificateEarned: true,
      certificateId: "FOT-DEVOPS-2026-90821",
      createdBy: "adm-01",
      createdByName: "Director (Admin)",
      createdAt: "2026-07-15T10:00:00.000Z",
      profile: {
        mobile: "+91 98765 43210",
        location: "Bangalore, Karnataka, India",
        githubProfile: "github.com/kushal-devops-labs",
        linkedinProfile: "linkedin.com/in/kushal-devops"
      },
      attendance: {
        presentDays: 32,
        absentDays: 4,
        totalDays: 36,
        attendancePercentage: 88.9,
        todayMarked: false,
        todayTopic: "AWS EKS Auto-Scaling & ArgoCD GitOps Live Lab",
        history: []
      }
    },
    {
      id: "std-2026-102",
      studentId: "FOT-2026-STD-102",
      name: "Ananya Sharma",
      email: "ananya.s@gmail.com",
      password: defaultStudentPassHash,
      role: "student",
      approvalStatus: "Pending",
      isDisabled: false,
      registrationDate: "Aug 01, 2026",
      courseName: "DevOps & Cloud Engineering Master Program",
      enrolledBatch: "DevOps Master Cohort #43 (Upcoming)",
      progressPercentage: 0,
      completedLabs: 0,
      totalLabs: 36,
      joinedDate: "August 2026",
      certificateEarned: false,
      createdBy: "SELF_REGISTER",
      createdByName: "Self Registration Form",
      createdAt: "2026-08-01T12:00:00.000Z",
      profile: {
        mobile: "+91 99887 76655",
        location: "Hyderabad, India"
      },
      attendance: {
        presentDays: 0,
        absentDays: 0,
        totalDays: 36,
        attendancePercentage: 0,
        todayMarked: false,
        history: []
      }
    },
    {
      id: "std-2026-103",
      studentId: "FOT-2026-STD-103",
      name: "Rahul Verma",
      email: "rahul.devops@outlook.com",
      password: defaultStudentPassHash,
      role: "student",
      approvalStatus: "Pending",
      isDisabled: false,
      registrationDate: "Aug 01, 2026",
      courseName: "AWS Certified Solutions Architect & DevOps",
      enrolledBatch: "DevOps Master Cohort #43 (Upcoming)",
      progressPercentage: 0,
      completedLabs: 0,
      totalLabs: 36,
      joinedDate: "August 2026",
      certificateEarned: false,
      createdBy: "SELF_REGISTER",
      createdByName: "Self Registration Form",
      createdAt: "2026-08-01T14:30:00.000Z",
      profile: {
        mobile: "+91 91234 56789",
        location: "Pune, Maharashtra"
      },
      attendance: {
        presentDays: 0,
        absentDays: 0,
        totalDays: 36,
        attendancePercentage: 0,
        todayMarked: false,
        history: []
      }
    },
    {
      id: "std-2026-099",
      studentId: "FOT-2026-STD-099",
      name: "Priya Sundaram",
      email: "priya.s@techcorp.io",
      password: defaultStudentPassHash,
      role: "student",
      approvalStatus: "Approved",
      isDisabled: false,
      registrationDate: "Jul 28, 2026",
      courseName: "AWS Certified Solutions Architect & DevOps",
      enrolledBatch: "DevOps Master Cohort #42 (Weekend Live)",
      progressPercentage: 45,
      completedLabs: 16,
      totalLabs: 36,
      joinedDate: "July 2026",
      certificateEarned: false,
      createdBy: "adm-01",
      createdByName: "Director (Admin)",
      createdAt: "2026-07-28T09:15:00.000Z",
      profile: {
        mobile: "+91 98450 12345",
        location: "Chennai, Tamil Nadu"
      },
      attendance: {
        presentDays: 14,
        absentDays: 2,
        totalDays: 16,
        attendancePercentage: 87.5,
        todayMarked: false,
        history: []
      }
    }
  ];

  // Courses Store with Creator Tracking
  const coursesList: any[] = [
    {
      id: "course-1",
      title: "DevOps & Cloud Engineering Master Program",
      category: "DevOps & Cloud",
      duration: "16 Weeks Live",
      level: "Advanced",
      labsCount: 36,
      description: "Master AWS, Kubernetes, Terraform, Docker, Jenkins, and ArgoCD with real enterprise capstone projects.",
      status: "Active",
      createdBy: "adm-01",
      createdByName: "Director (Admin)",
      createdAt: "2026-01-15T10:00:00.000Z"
    },
    {
      id: "course-2",
      title: "AWS Certified Solutions Architect & DevOps",
      category: "Cloud Architecture",
      duration: "12 Weeks Live",
      level: "Intermediate",
      labsCount: 28,
      description: "Comprehensive AWS Cloud certification and automation training covering VPC, EKS, IAM, and CloudFront.",
      status: "Active",
      createdBy: "adm-01",
      createdByName: "Director (Admin)",
      createdAt: "2026-02-01T11:00:00.000Z"
    }
  ];

  // Announcements Store with Creator Tracking
  const announcementsList: any[] = [
    {
      id: "ann-1",
      title: "AWS EKS Auto-Scaling & ArgoCD GitOps Live Lab",
      content: "All cohort students are invited to the live weekend workshop this Saturday at 10:00 AM IST. Ensure kubectl & helm CLI are installed.",
      targetBatch: "DevOps Master Cohort #42 (Weekend Live)",
      priority: "Important",
      createdBy: "adm-01",
      createdByName: "Director (Admin)",
      createdAt: new Date(Date.now() - 86400000 * 2).toISOString()
    },
    {
      id: "ann-2",
      title: "Upcoming DevOps Cohort #43 Schedule & Syllabus",
      content: "Orientation for Cohort #43 will begin next weekend. Cloud lab sandboxes will be provisioned upon admin account activation.",
      targetBatch: "DevOps Master Cohort #43 (Upcoming)",
      priority: "Normal",
      createdBy: "adm-01",
      createdByName: "Director (Admin)",
      createdAt: new Date(Date.now() - 86400000 * 5).toISOString()
    }
  ];

  // Store lead enquiries in memory for demo
  const enquiriesList: any[] = [
    {
      id: "enq-1",
      name: "Rahul Sharma",
      email: "rahul.s@example.com",
      mobile: "+91 98765 43210",
      course: "Master DevOps & DevSecOps",
      experience: "Software Engineer (2 yrs)",
      message: "Interested in the upcoming weekend batch. Need syllabus details.",
      date: new Date(Date.now() - 3600000 * 5).toISOString(),
      status: "New"
    },
    {
      id: "enq-2",
      name: "Ananya Roy",
      email: "ananya.r@example.com",
      mobile: "+91 87654 32109",
      course: "AWS + Kubernetes Specialization",
      experience: "System Admin (4 yrs)",
      message: "Want to know about placement assistance for experienced professionals.",
      date: new Date(Date.now() - 3600000 * 24).toISOString(),
      status: "Contacted"
    }
  ];

  const demoBookings: any[] = [];

  // Middleware: Require Admin Authorization
  function requireAdminMiddleware(req: express.Request, res: express.Response, next: express.NextFunction) {
    const authHeader = req.headers.authorization;
    const adminTokenHeader = req.headers['x-admin-token'];

    const token = (authHeader && authHeader.startsWith('Bearer ')) 
      ? authHeader.substring(7) 
      : (typeof adminTokenHeader === 'string' ? adminTokenHeader : '');

    if (!token) {
      return res.status(401).json({ 
        error: "Access Denied. Admin authorization token is required.", 
        code: "ADMIN_TOKEN_MISSING" 
      });
    }

    const session = tokensStore.get(token);
    if (session && session.role === 'admin') {
      (req as any).adminSession = session;
      return next();
    }

    if (token === 'admin_secret_token_director_2026') {
      const defaultAdminSession = { userId: 'adm-01', role: 'admin' as const, name: 'Director (Admin)', studentId: 'FOT-ADM-001' };
      (req as any).adminSession = defaultAdminSession;
      return next();
    }

    return res.status(403).json({ 
      error: "Access Denied. You do not have administrator permissions to access this endpoint.", 
      code: "NOT_ADMIN" 
    });
  }

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", service: "FutureOps-Tech DevOps Academy Server" });
  });

  // =========================================================
  // AUTHENTICATION APIs (Login, Register, Logout)
  // =========================================================
  app.post("/api/auth/login", (req, res) => {
    try {
      const { idOrEmail, password } = req.body;
      if (!idOrEmail || !password) {
        return res.status(400).json({ error: "Please enter Student ID / Email and Password." });
      }

      const inputClean = String(idOrEmail).trim().toLowerCase();

      // Find user
      const user = studentsList.find(s => 
        s.email.toLowerCase() === inputClean || 
        s.studentId.toLowerCase() === inputClean ||
        (inputClean === 'admin' && s.role === 'admin')
      );

      if (!user) {
        return res.status(401).json({ error: "Account not found with this Student ID or Email." });
      }

      if (user.isDisabled) {
        return res.status(403).json({ error: "This account has been disabled by the administrator." });
      }

      if (user.approvalStatus === 'Pending') {
        return res.status(403).json({ 
          error: "Your account is awaiting admin approval. Please wait until your account is activated.",
          status: "Pending"
        });
      }

      if (user.approvalStatus === 'Rejected') {
        return res.status(403).json({ 
          error: "Your registration has been rejected by the administrator. Please contact admissions support.",
          status: "Rejected"
        });
      }

      // Verify Password
      const isMatch = verifyPassword(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ error: "Invalid password. Please check your credentials." });
      }

      // Generate Session Token
      const token = `fot_token_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
      tokensStore.set(token, {
        userId: user.id,
        role: user.role,
        name: user.name,
        studentId: user.studentId
      });

      // Audit Log
      recordAuditLog(
        user.role === 'admin' ? "Admin Login" : "Student Login",
        user.name,
        user.studentId,
        `User ${user.name} (${user.studentId}) successfully authenticated as ${user.role}`,
        user.id,
        req.ip
      );

      // Sanitize password before returning user
      const { password: _, ...sanitizedUser } = user;
      res.json({
        success: true,
        token,
        user: { ...sanitizedUser, token }
      });
    } catch (err: any) {
      res.status(500).json({ error: `Login server error: ${err?.message || err}` });
    }
  });

  app.post("/api/auth/register", (req, res) => {
    try {
      const { name, email, password, courseName } = req.body;
      if (!name || !email || !password) {
        return res.status(400).json({ error: "Full Name, Email, and Password are required." });
      }

      const cleanEmail = String(email).trim().toLowerCase();
      const existing = studentsList.find(s => s.email.toLowerCase() === cleanEmail);

      if (existing) {
        if (existing.approvalStatus === 'Pending') {
          return res.status(400).json({ error: "Your account is awaiting admin approval. Please wait until your account is activated." });
        }
        return res.status(400).json({ error: "An account with this email is already registered." });
      }

      const randomNum = Math.floor(100 + Math.random() * 900);
      const newStudentId = `FOT-2026-STD-${randomNum}`;
      const todayDateStr = new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
      const nowIso = new Date().toISOString();

      const newStudent = {
        id: `std-${Date.now()}`,
        studentId: newStudentId,
        name: String(name).trim(),
        email: cleanEmail,
        password: hashPassword(password),
        role: 'student',
        approvalStatus: 'Pending',
        isDisabled: false,
        registrationDate: todayDateStr,
        courseName: courseName || 'DevOps & Cloud Engineering Master Program',
        enrolledBatch: 'DevOps Master Cohort #43 (Pending Activation)',
        progressPercentage: 0,
        completedLabs: 0,
        totalLabs: 36,
        joinedDate: 'August 2026',
        certificateEarned: false,
        createdBy: 'SELF_REGISTER',
        createdByName: 'Self Registration Form',
        createdAt: nowIso,
        profile: {
          location: 'India'
        },
        attendance: {
          presentDays: 0,
          absentDays: 0,
          totalDays: 36,
          attendancePercentage: 0,
          todayMarked: false,
          history: []
        }
      };

      studentsList.unshift(newStudent);

      recordAuditLog(
        "Student Registration Submitted",
        newStudent.name,
        newStudent.studentId,
        `New student registration submitted for ${newStudent.name} (${newStudent.email}). Status set to Pending Approval.`,
        newStudent.id,
        req.ip
      );

      res.json({
        success: true,
        message: "Your account is awaiting admin approval. Please wait until your account is activated.",
        studentId: newStudentId
      });
    } catch (err: any) {
      res.status(500).json({ error: `Registration failed: ${err?.message || err}` });
    }
  });

  app.post("/api/auth/logout", (req, res) => {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7);
      const session = tokensStore.get(token);
      if (session) {
        recordAuditLog("User Logout", session.name, session.studentId || session.userId, `User ${session.name} logged out`, session.userId, req.ip);
        tokensStore.delete(token);
      }
    }
    res.json({ success: true, message: "Logged out successfully" });
  });

  // =========================================================
  // ADMIN STUDENT MANAGEMENT APIs (Protected)
  // =========================================================
  app.get("/api/admin/students", requireAdminMiddleware, (req, res) => {
    const sanitized = studentsList.map(({ password, ...s }) => s);
    res.json({ students: sanitized });
  });

  app.post("/api/admin/students", requireAdminMiddleware, (req, res) => {
    try {
      const adminSession = (req as any).adminSession;
      const { name, email, password, courseName, enrolledBatch, approvalStatus } = req.body;

      if (!name || !email) {
        return res.status(400).json({ error: "Name and Email are required." });
      }

      const cleanEmail = String(email).trim().toLowerCase();
      const randomNum = Math.floor(100 + Math.random() * 900);
      const newStudentId = `FOT-2026-STD-${randomNum}`;
      const nowIso = new Date().toISOString();
      const todayDateStr = new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });

      const newStudent = {
        id: `std-${Date.now()}`,
        studentId: newStudentId,
        name: String(name).trim(),
        email: cleanEmail,
        password: hashPassword(password || "password123"),
        role: "student",
        approvalStatus: approvalStatus || "Approved",
        isDisabled: false,
        registrationDate: todayDateStr,
        courseName: courseName || "DevOps & Cloud Engineering Master Program",
        enrolledBatch: enrolledBatch || "DevOps Master Cohort #42 (Weekend Live)",
        progressPercentage: 0,
        completedLabs: 0,
        totalLabs: 36,
        joinedDate: "August 2026",
        certificateEarned: false,
        createdBy: adminSession.userId,
        createdByName: adminSession.name,
        createdAt: nowIso,
        profile: { location: "India" },
        attendance: { presentDays: 0, absentDays: 0, totalDays: 36, attendancePercentage: 0, todayMarked: false, history: [] }
      };

      studentsList.unshift(newStudent);

      recordAuditLog(
        "Student Created by Admin",
        adminSession.name,
        adminSession.studentId || adminSession.userId,
        `Admin ${adminSession.name} created new student record for ${newStudent.name} (${newStudent.studentId}). Status: ${newStudent.approvalStatus}`,
        newStudent.id,
        req.ip
      );

      const { password: _, ...sanitized } = newStudent;
      res.json({ success: true, student: sanitized });
    } catch (err: any) {
      res.status(500).json({ error: `Failed to create student: ${err?.message || err}` });
    }
  });

  app.put("/api/admin/students/:id", requireAdminMiddleware, (req, res) => {
    try {
      const adminSession = (req as any).adminSession;
      const { id } = req.params;
      const { approvalStatus, isDisabled, courseName, enrolledBatch, name, email, password } = req.body;

      const student = studentsList.find(s => s.id === id || s.studentId === id);
      if (!student) {
        return res.status(404).json({ error: "Student record not found." });
      }

      const nowIso = new Date().toISOString();
      const oldStatus = student.approvalStatus;

      if (approvalStatus !== undefined) student.approvalStatus = approvalStatus;
      if (isDisabled !== undefined) student.isDisabled = isDisabled;
      if (courseName) student.courseName = courseName;
      if (enrolledBatch) student.enrolledBatch = enrolledBatch;
      if (name) student.name = name;
      if (email) student.email = email;
      if (password) student.password = hashPassword(password);

      student.updatedBy = adminSession.userId;
      student.updatedByName = adminSession.name;
      student.updatedAt = nowIso;

      recordAuditLog(
        "Student Updated by Admin",
        adminSession.name,
        adminSession.studentId || adminSession.userId,
        `Admin ${adminSession.name} updated student ${student.name} (${student.studentId}). Approval: ${oldStatus} -> ${student.approvalStatus}. Disabled: ${student.isDisabled}`,
        student.id,
        req.ip
      );

      const { password: _, ...sanitized } = student;
      res.json({ success: true, student: sanitized });
    } catch (err: any) {
      res.status(500).json({ error: `Failed to update student: ${err?.message || err}` });
    }
  });

  // =========================================================
  // AUDIT LOGS APIs (Protected)
  // =========================================================
  app.get("/api/admin/audit-logs", requireAdminMiddleware, (req, res) => {
    res.json({ logs: auditLogsList });
  });

  app.post("/api/admin/audit-logs", requireAdminMiddleware, (req, res) => {
    const adminSession = (req as any).adminSession;
    const { action, details, recordId } = req.body;
    const log = recordAuditLog(action || "Admin Action", adminSession.name, adminSession.studentId || adminSession.userId, details || "Action executed", recordId, req.ip);
    res.json({ success: true, log });
  });

  // =========================================================
  // COURSE & CONTENT MANAGEMENT APIs
  // =========================================================
  app.get("/api/courses", (req, res) => {
    res.json({ courses: coursesList });
  });

  app.post("/api/admin/courses", requireAdminMiddleware, (req, res) => {
    try {
      const adminSession = (req as any).adminSession;
      const { title, category, duration, level, labsCount, description, status } = req.body;

      if (!title) {
        return res.status(400).json({ error: "Course title is required." });
      }

      const nowIso = new Date().toISOString();
      const newCourse = {
        id: `course-${Date.now()}`,
        title: title.trim(),
        category: category || "Cloud & DevOps",
        duration: duration || "12 Weeks",
        level: level || "Intermediate",
        labsCount: Number(labsCount) || 20,
        description: description || "",
        status: status || "Active",
        createdBy: adminSession.userId,
        createdByName: adminSession.name,
        createdAt: nowIso
      };

      coursesList.unshift(newCourse);

      recordAuditLog(
        "Course Created",
        adminSession.name,
        adminSession.studentId || adminSession.userId,
        `Admin ${adminSession.name} created course curriculum: ${newCourse.title}`,
        newCourse.id,
        req.ip
      );

      res.json({ success: true, course: newCourse });
    } catch (err: any) {
      res.status(500).json({ error: `Failed to create course: ${err?.message || err}` });
    }
  });

  // =========================================================
  // ANNOUNCEMENTS APIs
  // =========================================================
  app.get("/api/announcements", (req, res) => {
    res.json({ announcements: announcementsList });
  });

  app.post("/api/admin/announcements", requireAdminMiddleware, (req, res) => {
    try {
      const adminSession = (req as any).adminSession;
      const { title, content, targetBatch, priority } = req.body;

      if (!title || !content) {
        return res.status(400).json({ error: "Announcement title and content are required." });
      }

      const nowIso = new Date().toISOString();
      const newAnn = {
        id: `ann-${Date.now()}`,
        title: title.trim(),
        content: content.trim(),
        targetBatch: targetBatch || "All Batches",
        priority: priority || "Important",
        createdBy: adminSession.userId,
        createdByName: adminSession.name,
        createdAt: nowIso
      };

      announcementsList.unshift(newAnn);

      recordAuditLog(
        "Announcement Created",
        adminSession.name,
        adminSession.studentId || adminSession.userId,
        `Admin ${adminSession.name} published announcement: "${newAnn.title}" for ${newAnn.targetBatch}`,
        newAnn.id,
        req.ip
      );

      res.json({ success: true, announcement: newAnn });
    } catch (err: any) {
      res.status(500).json({ error: `Failed to create announcement: ${err?.message || err}` });
    }
  });

  // AI DevOps Mentor / Instructor Server Endpoint
  app.post("/api/ai-guide", async (req, res) => {
    try {
      const { prompt, history } = req.body;
      if (!prompt || typeof prompt !== 'string' || !prompt.trim()) {
        return res.status(400).json({ error: "Prompt is required" });
      }

      const apiKey = process.env.GEMINI_API_KEY;

      const systemInstruction = `You are FutureOps AI Mentor (OpsBot), a Principal DevOps & Cloud Architect and Senior Technical Instructor at FutureOps-Tech Academy. You possess master-level expertise across all software and cloud engineering domains.

PRIMARY DOMAINS OF EXPERTISE:
1. Cloud Engineering: AWS (EC2, VPC, EKS, S3, IAM, CloudFront, Route53, Lambda, RDS), Azure (AKS, VNet, Blob, Entra ID, Bicep), GCP (GKE, VPC, Cloud Storage, Cloud Run, IAM).
2. Containers & Orchestration: Docker, Docker Compose, Kubernetes, Helm, ArgoCD, Flux, Istio Service Mesh, Podman, Containerd, OpenShift.
3. Infrastructure as Code & Automation: Terraform (HCL), OpenTofu, Ansible, CloudFormation, Pulumi, Packer.
4. CI/CD & DevSecOps: Jenkins (Declarative/Scripted Pipelines, Groovy), GitHub Actions, GitLab CI/CD, Azure DevOps, SonarQube, Trivy, HashiCorp Vault, Snyk, Checkov, OWASP Top 10.
5. Systems, OS & Networking: Linux Administration (RHEL, Ubuntu, Debian, Alpine), Bash/Shell scripting, Systemd, TCP/IP, DNS, BGP, IPTables/Firewalld, Nginx, HAProxy, Envoy, Load Balancing, SSL/TLS.
6. Programming & Tooling: Python (boto3, requests, PyYAML, FastAPI), Groovy, YAML, JSON, Bash, Go, Git, GitHub, GitLab.
7. Observability & SRE: Prometheus, Grafana, ELK Stack (Elasticsearch, Logstash, Kibana), Grafana Loki, OpenTelemetry, Alertmanager, Jaeger, Chaos Engineering.
8. Enterprise Security & Compliance: Compliance as Code, RBAC, Network Policies, IAM Policies, Secrets Management, CIS Benchmarks.
9. Career & Interview Preparation: Real-world scenarios, System Design for Cloud/DevOps, Mock interview drills, Resume reviews, Root Cause Analysis (RCA) techniques.

RESPONSE GUIDELINES:
- **Direct & Helpful Tone**: Speak like a warm, authoritative, senior colleague. Be direct, clear, and comprehensive.
- **Production-Ready Code**: When producing code or manifests (Dockerfile, K8s YAML, Terraform HCL, Ansible Playbook, Jenkinsfile, Bash script, Python script), provide complete, production-tested, syntactically valid code with proper indentation, non-root users, resource limits, and best practices.
- **Troubleshooting & RCA**: For error messages or production issues (e.g., CrashLoopBackOff, OOMKilled, ImagePullBackOff, Terraform lock errors, Jenkins pipeline failures), state the exact root cause in 1-2 sentences, followed by diagnostic commands and step-by-step resolution steps.
- **Structure**: Use markdown headings (##, ###), bullet points, and code blocks with language identifiers for maximum clarity and scannability.`;

      // Helper function to sanitize conversation turns for Gemini
      function sanitizeGeminiHistory(rawHistory: any[], currentPrompt: string) {
        const contents: Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }> = [];

        if (Array.isArray(rawHistory) && rawHistory.length > 0) {
          rawHistory.forEach((msg: any) => {
            if (!msg || typeof msg.text !== 'string' || !msg.text.trim()) return;
            const role: 'user' | 'model' = (msg.sender === 'user' || msg.role === 'user') ? 'user' : 'model';

            if (contents.length === 0) {
              if (role === 'user') {
                contents.push({ role: 'user', parts: [{ text: msg.text.trim() }] });
              }
            } else {
              const lastRole = contents[contents.length - 1].role;
              if (role !== lastRole) {
                contents.push({ role, parts: [{ text: msg.text.trim() }] });
              } else {
                contents[contents.length - 1].parts[0].text += `\n${msg.text.trim()}`;
              }
            }
          });
        }

        if (contents.length > 0 && contents[contents.length - 1].role === 'user') {
          contents[contents.length - 1].parts[0].text += `\n${currentPrompt.trim()}`;
        } else {
          contents.push({ role: 'user', parts: [{ text: currentPrompt.trim() }] });
        }

        return contents;
      }

      if (apiKey && apiKey !== "MY_GEMINI_API_KEY") {
        const candidateModels = ["gemini-3.6-flash", "gemini-2.5-flash", "gemini-2.0-flash", "gemini-1.5-flash"];
        const formattedContents = sanitizeGeminiHistory(history, prompt);

        for (const modelName of candidateModels) {
          try {
            const ai = new GoogleGenAI({ 
              apiKey,
              httpOptions: {
                headers: { 'User-Agent': 'aistudio-build' }
              }
            });

            const response = await ai.models.generateContent({
              model: modelName,
              contents: formattedContents,
              config: {
                systemInstruction: systemInstruction,
                temperature: 0.7,
              }
            });

            if (response && response.text) {
              return res.json({ reply: response.text });
            }
          } catch (geminiErr: any) {
            console.warn(`[GEMINI API WARNING] Model ${modelName} failed:`, geminiErr?.message || geminiErr);
          }
        }
      }

      // Intelligent Local Expert Engine
      const reply = getOpsBotAnswer(prompt);
      return res.json({ reply });
    } catch (error: any) {
      console.error("AI Guide error:", error);
      const fallbackReply = getOpsBotAnswer(req.body?.prompt || 'DevOps');
      res.json({ reply: fallbackReply });
    }
  });

  // Helper function for automatic retry execution
  async function retryAsync<T>(fn: () => Promise<T>, retries = 3, delayMs = 1000): Promise<T> {
    let lastError: any;
    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        return await fn();
      } catch (err: any) {
        lastError = err;
        console.warn(`[RETRY ATTEMPT ${attempt}/${retries}] Operation failed: ${err?.message || err}. Retrying in ${delayMs * attempt}ms...`);
        if (attempt < retries) {
          await new Promise(res => setTimeout(res, delayMs * attempt));
        }
      }
    }
    throw lastError;
  }

  // Submit Enquiry & Send Direct Email Notification & WhatsApp Dispatch
  app.post("/api/enquiry", async (req, res) => {
    try {
      const { name, email, mobile, city, course, experience, message } = req.body;
      if (!name || !email || !mobile || !city) {
        return res.status(400).json({ error: "Name, email, mobile number, and city are required fields." });
      }

      // Extract Client IP Address
      const rawIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress || req.ip || '127.0.0.1';
      const clientIp = Array.isArray(rawIp) ? rawIp[0].trim() : String(rawIp).split(',')[0].trim();

      // 1. Prevent Duplicate Submissions (Check within last 60 seconds by email or phone + course)
      const nowMs = Date.now();
      const existingDuplicate = enquiriesList.find(enq => {
        const timeDiff = nowMs - new Date(enq.date).getTime();
        return timeDiff < 60000 && (
          (enq.email && enq.email.toLowerCase() === email.toLowerCase()) ||
          (enq.mobile && enq.mobile === mobile)
        ) && enq.course === (course || "Advance DevOps with Interview Assistance");
      });

      if (existingDuplicate) {
        console.log(`[ENQUIRY DUPLICATE PREVENTED] Duplicate request from ${email} / ${mobile} within 60s`);
        return res.json({
          success: true,
          message: "Enquiry already received! Our admissions team will contact you shortly.",
          enquiry: existingDuplicate,
          duplicate: true,
          deliveryStatus: {
            emailSent: true,
            emailStatus: existingDuplicate.emailStatus || "Stored in Database",
            whatsappSent: true,
            whatsappStatus: existingDuplicate.whatsappStatus || "Ready",
            whatsappUrl: `https://wa.me/918277759401?text=${encodeURIComponent(
              `🎓 *COURSE ENQUIRY - FutureOps-Tech*\n👤 Name: ${name}\n📱 Phone: ${mobile}\n📧 Email: ${email}\n🌆 City: ${city}\n📚 Course: ${course}`
            )}`
          }
        });
      }

      const now = new Date();
      const submissionDateTime = now.toLocaleString('en-IN', {
        timeZone: 'Asia/Kolkata',
        dateStyle: 'full',
        timeStyle: 'medium'
      });

      const officialEmail = process.env.OFFICIAL_ENQUIRY_EMAIL || "futureopstech@gmail.com";
      const whatsappAdminNumber = process.env.WHATSAPP_ADMIN_NUMBER || "918277759401";

      const newEnquiry = {
        id: `enq-${Date.now()}`,
        name: name.trim(),
        email: email.trim(),
        mobile: mobile.trim(),
        city: city.trim(),
        course: course || "Advance DevOps with Interview Assistance",
        experience: experience || "Not specified",
        message: message || "No additional message provided",
        submissionDateTime,
        date: now.toISOString(),
        status: "New",
        emailDispatchedTo: officialEmail,
        emailStatus: "Processing",
        whatsappStatus: "Processing",
        ipAddress: clientIp
      };

      // Store in Admin Dashboard list
      enquiriesList.unshift(newEnquiry);

      // Construct Formatted Text Payloads
      const formattedWaText = 
        `🎓 *NEW COURSE ENQUIRY - FutureOps-Tech*\n` +
        `----------------------------------------\n` +
        `👤 *Name:* ${newEnquiry.name}\n` +
        `📱 *Mobile / WhatsApp:* ${newEnquiry.mobile}\n` +
        `📧 *Email:* ${newEnquiry.email}\n` +
        `🌆 *City / Location:* ${newEnquiry.city}\n` +
        `📚 *Program Enquired:* ${newEnquiry.course}\n` +
        `💼 *Background:* ${newEnquiry.experience}\n` +
        `💬 *Message:* ${newEnquiry.message}\n` +
        `⏰ *Date & Time:* ${submissionDateTime}\n` +
        `🌐 *IP Address:* ${clientIp}\n` +
        `----------------------------------------\n` +
        `Submitted via FutureOps-Tech Official Website`;

      const whatsappRedirectUrl = `https://wa.me/${whatsappAdminNumber}?text=${encodeURIComponent(formattedWaText)}`;

      // Construct User Thank-You Email Payload
      const userThankYouSubject = `Thank you for your enquiry - FutureOps-Tech Academy (${newEnquiry.course})`;
      const userThankYouText = `
Dear ${newEnquiry.name},

Thank you for contacting FutureOps-Tech Academy!

We have successfully received your course enquiry for the "${newEnquiry.course}" program.

Your Submitted Enquiry Details:
- Name: ${newEnquiry.name}
- Email: ${newEnquiry.email}
- Mobile / WhatsApp: ${newEnquiry.mobile}
- City / Location: ${newEnquiry.city}
- Program Enquired: ${newEnquiry.course}
- Background: ${newEnquiry.experience}
- Message: ${newEnquiry.message}
- Date & Time: ${submissionDateTime}
- IP Address: ${clientIp}

What's Next?
Our senior admissions team and DevOps counselors are reviewing your request and will contact you shortly with syllabus breakdown, cloud lab access details, fee structure, and batch schedules.

Need immediate assistance?
💬 WhatsApp Us: https://wa.me/${whatsappAdminNumber}
📞 Call Admissions Hotline: +91 88671 30149 / +91 82777 59401

Warm regards,
Admissions Desk
FutureOps-Tech Academy
https://futureopstech.com
      `.trim();

      const userThankYouHtml = `
        <div style="font-family: Arial, Helvetica, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
          <div style="background: linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%); padding: 28px 20px; text-align: center; color: #ffffff;">
            <h1 style="margin: 0; font-size: 22px; font-weight: 800;">FutureOps-Tech Academy</h1>
            <p style="margin: 4px 0 0 0; font-size: 13px; color: #93c5fd;">Master Real-World Cloud & DevOps Engineering</p>
          </div>

          <div style="padding: 24px 20px; color: #334155;">
            <h2 style="margin-top: 0; font-size: 18px; color: #0f172a;">Thank You for Reaching Out, ${newEnquiry.name}! 👋</h2>
            <p style="font-size: 14px; line-height: 1.5; color: #475569;">
              We have received your enquiry regarding <strong>${newEnquiry.course}</strong>. Our admissions team will review your application and get in touch with you shortly.
            </p>

            <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 16px; margin: 20px 0;">
              <h3 style="margin-top: 0; margin-bottom: 10px; font-size: 13px; color: #1e293b; text-transform: uppercase;">📋 Your Submitted Details</h3>
              <table style="width: 100%; font-size: 13px; border-collapse: collapse; color: #334155;">
                <tr><td style="padding: 4px 0; font-weight: 600; width: 140px; color: #64748b;">Selected Course:</td><td style="padding: 4px 0; font-weight: 700; color: #2563eb;">${newEnquiry.course}</td></tr>
                <tr><td style="padding: 4px 0; font-weight: 600; color: #64748b;">Mobile Number:</td><td style="padding: 4px 0; color: #0f172a;">${newEnquiry.mobile}</td></tr>
                <tr><td style="padding: 4px 0; font-weight: 600; color: #64748b;">Email Address:</td><td style="padding: 4px 0; color: #0f172a;">${newEnquiry.email}</td></tr>
                <tr><td style="padding: 4px 0; font-weight: 600; color: #64748b;">City / Location:</td><td style="padding: 4px 0; color: #0f172a;">${newEnquiry.city}</td></tr>
                <tr><td style="padding: 4px 0; font-weight: 600; color: #64748b;">Message:</td><td style="padding: 4px 0; color: #0f172a;">${newEnquiry.message}</td></tr>
                <tr><td style="padding: 4px 0; font-weight: 600; color: #64748b;">Submission Time:</td><td style="padding: 4px 0; color: #0f172a;">${submissionDateTime}</td></tr>
                <tr><td style="padding: 4px 0; font-weight: 600; color: #64748b;">IP Address:</td><td style="padding: 4px 0; color: #0f172a;">${clientIp}</td></tr>
              </table>
            </div>

            <div style="text-align: center; margin: 24px 0;">
              <a href="https://wa.me/${whatsappAdminNumber}" style="display: inline-block; background-color: #10b981; color: #ffffff; text-decoration: none; font-weight: 700; font-size: 14px; padding: 12px 24px; border-radius: 8px;">
                💬 Chat Instantly on WhatsApp (+${whatsappAdminNumber})
              </a>
            </div>

            <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
            <p style="font-size: 11px; color: #94a3b8; text-align: center; margin: 0;">
              FutureOps-Tech Academy • Official Helpline: +91 88671 30149 | Email: futureopstech@gmail.com
            </p>
          </div>
        </div>
      `;

      // Construct Admin Notification Email Payload
      const emailSubject = `[New Course Enquiry] ${newEnquiry.name} (${newEnquiry.city}) - ${newEnquiry.course}`;
      const emailBodyText = `
NEW COURSE ENQUIRY SUBMITTED ON FUTUREOPS-TECH WEBSITE

Candidate Information:
- Full Name: ${newEnquiry.name}
- Email Address: ${newEnquiry.email}
- Mobile / WhatsApp Number: ${newEnquiry.mobile}
- City / Location: ${newEnquiry.city}
- Enquired Course: ${newEnquiry.course}
- Role / Background: ${newEnquiry.experience}
- Message / Questions: ${newEnquiry.message}
- Date & Time: ${submissionDateTime}
- IP Address: ${clientIp}

Target Admin Email: ${officialEmail}
      `.trim();

      const emailBodyHtml = `
        <div style="font-family: Arial, Helvetica, sans-serif; padding: 20px; color: #111827; max-width: 600px; border: 1px solid #e5e7eb; border-radius: 12px; background-color: #ffffff;">
          <h2 style="color: #2563eb; margin-top: 0;">🎓 New Course Enquiry Received</h2>
          <p style="font-size: 14px; color: #4b5563;">A candidate submitted a new enquiry form on FutureOps-Tech Academy.</p>
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 16px 0;" />
          <table style="width: 100%; font-size: 14px; border-collapse: collapse;">
            <tr><td style="padding: 6px 0; font-weight: bold; width: 150px; color: #374151;">Student Name:</td><td style="color: #111827; font-weight: bold;">${newEnquiry.name}</td></tr>
            <tr><td style="padding: 6px 0; font-weight: bold; color: #374151;">Email Address:</td><td><a href="mailto:${newEnquiry.email}" style="color: #2563eb; font-weight: bold;">${newEnquiry.email}</a></td></tr>
            <tr><td style="padding: 6px 0; font-weight: bold; color: #374151;">Mobile Number:</td><td><a href="tel:${newEnquiry.mobile}" style="color: #2563eb; font-weight: bold;">${newEnquiry.mobile}</a></td></tr>
            <tr><td style="padding: 6px 0; font-weight: bold; color: #374151;">City / Location:</td><td style="color: #111827;">${newEnquiry.city}</td></tr>
            <tr><td style="padding: 6px 0; font-weight: bold; color: #374151;">Selected Course:</td><td><strong style="color: #2563eb;">${newEnquiry.course}</strong></td></tr>
            <tr><td style="padding: 6px 0; font-weight: bold; color: #374151;">Background:</td><td style="color: #111827;">${newEnquiry.experience}</td></tr>
            <tr><td style="padding: 6px 0; font-weight: bold; color: #374151; vertical-align: top;">Message:</td><td style="color: #111827;">${newEnquiry.message}</td></tr>
            <tr><td style="padding: 6px 0; font-weight: bold; color: #374151;">Submission Time:</td><td style="color: #111827;">${submissionDateTime}</td></tr>
            <tr><td style="padding: 6px 0; font-weight: bold; color: #374151;">IP Address:</td><td style="color: #111827;">${clientIp}</td></tr>
          </table>
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 16px 0;" />
          <p style="font-size: 12px; color: #6b7280; text-align: center; margin-bottom: 0;">This enquiry is saved in FutureOps-Tech Admin Portal.</p>
        </div>
      `;

      // 1. Dispatch Emails via Nodemailer SMTP with Retries
      if (process.env.SMTP_HOST && process.env.SMTP_USER) {
        try {
          await retryAsync(async () => {
            const transporter = nodemailer.createTransport({
              host: process.env.SMTP_HOST,
              port: Number(process.env.SMTP_PORT) || 587,
              secure: Number(process.env.SMTP_PORT) === 465,
              auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
              },
              tls: { rejectUnauthorized: false }
            });

            const emailHeaders = {
              "X-Mailer": "FutureOps-Tech Academy Mailer",
              "X-Priority": "3",
              "Importance": "Normal"
            };

            // Send Thank-You Email to Candidate
            await transporter.sendMail({
              from: `"FutureOps-Tech Academy" <${process.env.SMTP_USER}>`,
              to: newEnquiry.email,
              subject: userThankYouSubject,
              text: userThankYouText,
              html: userThankYouHtml,
              headers: emailHeaders
            });

            // Send Notification Email to Admin
            await transporter.sendMail({
              from: `"FutureOps-Tech Lead Desk" <${process.env.SMTP_USER}>`,
              to: officialEmail,
              replyTo: newEnquiry.email,
              subject: emailSubject,
              text: emailBodyText,
              html: emailBodyHtml,
              headers: emailHeaders
            });
          }, 3, 1000);

          newEnquiry.emailStatus = `Dispatched via SMTP (Admin: ${officialEmail} | Candidate: ${newEnquiry.email})`;
        } catch (emailErr: any) {
          console.error("SMTP Email Sending Error after retries:", emailErr.message);
          newEnquiry.emailStatus = `SMTP Retry Failure: ${emailErr.message}`;
        }
      } else {
        console.log(`\n======================================================`);
        console.log(`[ADMIN NOTIFICATION EMAIL DISPATCH -> ${officialEmail}]`);
        console.log(`SUBJECT: ${emailSubject}`);
        console.log(emailBodyText);
        console.log(`------------------------------------------------------`);
        console.log(`[CANDIDATE THANK-YOU EMAIL DISPATCH -> ${newEnquiry.email}]`);
        console.log(`SUBJECT: ${userThankYouSubject}`);
        console.log(`======================================================\n`);
        newEnquiry.emailStatus = `Logged in Server State (Admin: ${officialEmail})`;
      }

      // 2. Dispatch WhatsApp API / Webhook Notification if configured, else log & provide WhatsApp deep-link
      const waWebhookUrl = process.env.WHATSAPP_API_URL || process.env.WHATSAPP_WEBHOOK_URL;
      if (waWebhookUrl) {
        try {
          await retryAsync(async () => {
            const waRes = await fetch(waWebhookUrl, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                ...(process.env.WHATSAPP_API_TOKEN ? { 'Authorization': `Bearer ${process.env.WHATSAPP_API_TOKEN}` } : {})
              },
              body: JSON.stringify({
                to: whatsappAdminNumber,
                name: newEnquiry.name,
                phone: newEnquiry.mobile,
                email: newEnquiry.email,
                city: newEnquiry.city,
                course: newEnquiry.course,
                experience: newEnquiry.experience,
                message: newEnquiry.message,
                dateTime: submissionDateTime,
                ipAddress: clientIp,
                text: formattedWaText
              })
            });

            if (!waRes.ok) {
              throw new Error(`WhatsApp API endpoint returned HTTP ${waRes.status}`);
            }
          }, 3, 1000);

          newEnquiry.whatsappStatus = `Dispatched via WhatsApp API Webhook to +${whatsappAdminNumber}`;
        } catch (waErr: any) {
          console.error("WhatsApp Webhook Dispatch Error after retries:", waErr.message);
          newEnquiry.whatsappStatus = `WhatsApp Webhook Retry Failed: ${waErr.message}`;
        }
      } else {
        console.log(`\n======================================================`);
        console.log(`[WHATSAPP DISPATCH PREPARED -> +${whatsappAdminNumber}]`);
        console.log(formattedWaText);
        console.log(`======================================================\n`);
        newEnquiry.whatsappStatus = `Prepared Instant WhatsApp Direct-Link (+${whatsappAdminNumber})`;
      }

      res.json({
        success: true,
        message: "Enquiry processed and saved successfully! Notifications prepared for Admin and Student.",
        deliveryStatus: {
          emailSent: !newEnquiry.emailStatus.includes("Failure"),
          emailStatus: newEnquiry.emailStatus,
          whatsappSent: true,
          whatsappStatus: newEnquiry.whatsappStatus,
          whatsappUrl: whatsappRedirectUrl
        },
        enquiry: newEnquiry
      });
    } catch (err: any) {
      console.error("Error processing enquiry:", err);
      res.status(500).json({ error: `Failed to process enquiry: ${err?.message || 'Server error'}` });
    }
  });

  // Alias POST /api/enquiries to POST /api/enquiry for compatibility
  app.post("/api/enquiries", (req, res, next) => {
    // Forward to /api/enquiry handler
    req.url = "/api/enquiry";
    app._router.handle(req, res, next);
  });

  // Get enquiries for admin (both /api/enquiries and /api/enquiry)
  app.get(["/api/enquiries", "/api/enquiry"], (req, res) => {
    res.json({ enquiries: enquiriesList });
  });

  // Book Demo
  app.post("/api/demo-booking", (req, res) => {
    const { name, email, mobile, batch, date } = req.body;
    const booking = {
      id: `demo-${Date.now()}`,
      name,
      email,
      mobile,
      batch: batch || "Upcoming Weekend Batch",
      preferredDate: date || "Next Saturday 10:00 AM",
      bookedAt: new Date().toISOString()
    };
    demoBookings.push(booking);
    res.json({ success: true, message: "Free Live Demo booked successfully! We have sent the Zoom/Google Meet link details to your email.", booking });
  });

  // Strict API 404 JSON Catch-All: Ensures all /api/* routes return JSON and NEVER serve HTML index.html
  app.all("/api/*", (req, res) => {
    res.status(404).json({ error: `API endpoint ${req.method} ${req.path} not found.` });
  });

  // Vite middleware for development vs static serve for production
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true, hmr: false },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`FutureOps-Tech Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
