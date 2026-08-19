import React, { useState, useEffect, useRef } from 'react';
import { 
  signInWithGoogleDrive, 
  initDriveAuth, 
  getDriveAccessToken, 
  driveLogout, 
  fetchDriveFiles, 
  uploadFileToDrive, 
  createDriveFolder, 
  deleteDriveFile, 
  DriveFile 
} from '../../lib/googleDrive';
import { User } from 'firebase/auth';
import { 
  Folder, 
  FileText, 
  UploadCloud, 
  FolderPlus, 
  Trash2, 
  ExternalLink, 
  RefreshCw, 
  Search, 
  CheckCircle2, 
  AlertCircle, 
  FileCode, 
  FileArchive, 
  Image as ImageIcon, 
  Grid, 
  List, 
  HardDrive, 
  LogOut, 
  ShieldCheck, 
  X,
  File
} from 'lucide-react';

interface GoogleDriveManagerProps {
  compact?: boolean;
  title?: string;
  subtitle?: string;
}

export const GoogleDriveManager: React.FC<GoogleDriveManagerProps> = ({
  compact = false,
  title = "Google Drive Cloud Repository",
  subtitle = "Connect your Google Drive to store course notes, lab reports, assignment submissions, and certification documents."
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [needsAuth, setNeedsAuth] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  
  const [files, setFiles] = useState<DriveFile[]>([]);
  const [loadingFiles, setLoadingFiles] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentFolderId, setCurrentFolderId] = useState<string | undefined>(undefined);
  const [folderBreadcrumbs, setFolderBreadcrumbs] = useState<Array<{ id?: string; name: string }>>([
    { name: 'My Drive' }
  ]);

  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgressMsg, setUploadProgressMsg] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Folder creation modal state
  const [isCreateFolderOpen, setIsCreateFolderOpen] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [isCreatingFolder, setIsCreatingFolder] = useState(false);

  // Confirmation modal state for destructive operations (MANDATORY in SKILL)
  const [fileToDelete, setFileToDelete] = useState<DriveFile | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Status/Error notification
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const showNotification = (type: 'success' | 'error', text: string) => {
    setStatusMessage({ type, text });
    setTimeout(() => setStatusMessage(null), 5000);
  };

  useEffect(() => {
    const unsubscribe = initDriveAuth(
      (authUser, authToken) => {
        setUser(authUser);
        setToken(authToken);
        setNeedsAuth(false);
      },
      () => {
        setUser(null);
        setToken(null);
        setNeedsAuth(true);
      }
    );
    return () => unsubscribe();
  }, []);

  const loadFiles = async (folderId?: string, query?: string) => {
    const currentToken = token || getDriveAccessToken();
    if (!currentToken) {
      setNeedsAuth(true);
      return;
    }

    setLoadingFiles(true);
    try {
      const fetched = await fetchDriveFiles(currentToken, folderId, query);
      setFiles(fetched);
    } catch (error: any) {
      console.error('Error fetching Google Drive files:', error);
      showNotification('error', error.message || 'Failed to load Google Drive files. Please check permissions.');
    } finally {
      setLoadingFiles(false);
    }
  };

  useEffect(() => {
    if (token) {
      loadFiles(currentFolderId, searchQuery);
    }
  }, [token, currentFolderId]);

  const handleSignIn = async () => {
    setIsAuthenticating(true);
    try {
      const result = await signInWithGoogleDrive();
      if (result) {
        setUser(result.user);
        setToken(result.accessToken);
        setNeedsAuth(false);
        showNotification('success', `Connected Google Drive for ${result.user.email}`);
      }
    } catch (error: any) {
      console.error('Sign in error:', error);
      showNotification('error', error.message || 'Failed to authorize Google Drive access.');
    } finally {
      setIsAuthenticating(false);
    }
  };

  const handleLogout = async () => {
    try {
      await driveLogout();
      setUser(null);
      setToken(null);
      setNeedsAuth(true);
      setFiles([]);
      showNotification('success', 'Disconnected Google Drive.');
    } catch (error: any) {
      showNotification('error', error.message || 'Failed to disconnect.');
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loadFiles(currentFolderId, searchQuery);
  };

  const handleFolderClick = (folder: DriveFile) => {
    setCurrentFolderId(folder.id);
    setFolderBreadcrumbs(prev => [...prev, { id: folder.id, name: folder.name }]);
  };

  const handleBreadcrumbClick = (index: number) => {
    const targetBreadcrumb = folderBreadcrumbs[index];
    setCurrentFolderId(targetBreadcrumb.id);
    setFolderBreadcrumbs(folderBreadcrumbs.slice(0, index + 1));
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (!selectedFiles || selectedFiles.length === 0) return;

    const currentToken = token || getDriveAccessToken();
    if (!currentToken) {
      setNeedsAuth(true);
      return;
    }

    setIsUploading(true);
    let successCount = 0;

    for (let i = 0; i < selectedFiles.length; i++) {
      const file = selectedFiles[i];
      setUploadProgressMsg(`Uploading ${file.name} (${i + 1}/${selectedFiles.length})...`);
      try {
        await uploadFileToDrive(currentToken, file, currentFolderId);
        successCount++;
      } catch (err: any) {
        console.error('Upload failed:', err);
        showNotification('error', `Failed to upload ${file.name}: ${err.message}`);
      }
    }

    setIsUploading(false);
    setUploadProgressMsg('');
    if (fileInputRef.current) fileInputRef.current.value = '';

    if (successCount > 0) {
      showNotification('success', `Successfully uploaded ${successCount} file(s) to Google Drive!`);
      loadFiles(currentFolderId, searchQuery);
    }
  };

  const handleCreateFolder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFolderName.trim()) return;

    const currentToken = token || getDriveAccessToken();
    if (!currentToken) {
      setNeedsAuth(true);
      return;
    }

    setIsCreatingFolder(true);
    try {
      await createDriveFolder(currentToken, newFolderName.trim(), currentFolderId);
      showNotification('success', `Created folder "${newFolderName.trim()}" in Google Drive`);
      setNewFolderName('');
      setIsCreateFolderOpen(false);
      loadFiles(currentFolderId, searchQuery);
    } catch (err: any) {
      showNotification('error', err.message || 'Failed to create folder.');
    } finally {
      setIsCreatingFolder(false);
    }
  };

  // Explicit confirmation dialog for deletion (MANDATORY IN SKILL)
  const confirmDeleteFile = async () => {
    if (!fileToDelete) return;

    const currentToken = token || getDriveAccessToken();
    if (!currentToken) {
      setNeedsAuth(true);
      return;
    }

    setIsDeleting(true);
    try {
      await deleteDriveFile(currentToken, fileToDelete.id);
      showNotification('success', `Deleted "${fileToDelete.name}" from Google Drive`);
      setFileToDelete(null);
      loadFiles(currentFolderId, searchQuery);
    } catch (err: any) {
      showNotification('error', err.message || 'Failed to delete file.');
    } finally {
      setIsDeleting(false);
    }
  };

  const getFileIcon = (mimeType: string) => {
    if (mimeType === 'application/vnd.google-apps.folder') {
      return <Folder className="w-6 h-6 text-amber-500 fill-amber-100" />;
    }
    if (mimeType.includes('pdf') || mimeType.includes('document') || mimeType.includes('vnd.google-apps.document')) {
      return <FileText className="w-6 h-6 text-blue-500" />;
    }
    if (mimeType.includes('image')) {
      return <ImageIcon className="w-6 h-6 text-emerald-500" />;
    }
    if (mimeType.includes('zip') || mimeType.includes('tar') || mimeType.includes('compressed')) {
      return <FileArchive className="w-6 h-6 text-purple-500" />;
    }
    if (mimeType.includes('json') || mimeType.includes('javascript') || mimeType.includes('python') || mimeType.includes('yaml')) {
      return <FileCode className="w-6 h-6 text-cyan-500" />;
    }
    return <File className="w-6 h-6 text-slate-400" />;
  };

  const formatFileSize = (sizeBytes?: string) => {
    if (!sizeBytes) return '—';
    const bytes = parseInt(sizeBytes, 10);
    if (isNaN(bytes)) return '—';
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className={`rounded-3xl bg-slate-900 border border-slate-800 text-white overflow-hidden shadow-xl font-sans ${compact ? 'p-4 sm:p-6' : 'p-6 sm:p-8'}`}>
      
      {/* HEADER SECTION */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-blue-600/20 text-blue-400 border border-blue-500/30">
            <HardDrive className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-extrabold font-poppins text-white">{title}</h2>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-mono font-bold flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" /> OAuth 2.0 Direct
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5 max-w-xl">{subtitle}</p>
          </div>
        </div>

        {/* User Account / Status */}
        {user && !needsAuth && (
          <div className="flex items-center gap-3 bg-slate-800/80 p-1.5 pr-3 rounded-2xl border border-slate-700/80">
            {user.photoURL ? (
              <img src={user.photoURL} alt={user.displayName || 'User'} className="w-8 h-8 rounded-full border border-blue-400" />
            ) : (
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
                {user.email?.charAt(0).toUpperCase() || 'U'}
              </div>
            )}
            <div className="text-left text-xs">
              <div className="font-bold text-slate-200 truncate max-w-[140px]">{user.displayName || user.email}</div>
              <div className="text-[10px] text-emerald-400 font-mono">Connected</div>
            </div>
            <button 
              onClick={handleLogout}
              title="Disconnect Google Drive"
              className="p-1.5 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* NOTIFICATION BANNER */}
      {statusMessage && (
        <div className={`mt-4 p-3 rounded-2xl border text-xs font-semibold flex items-center gap-2 animate-fadeIn ${
          statusMessage.type === 'success' 
            ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' 
            : 'bg-rose-500/10 border-rose-500/30 text-rose-300'
        }`}>
          {statusMessage.type === 'success' ? <CheckCircle2 className="w-4 h-4 shrink-0" /> : <AlertCircle className="w-4 h-4 shrink-0" />}
          <span>{statusMessage.text}</span>
        </div>
      )}

      {/* SIGN IN REQUIRED STATE */}
      {needsAuth ? (
        <div className="py-12 px-4 text-center space-y-6 max-w-md mx-auto">
          <div className="w-16 h-16 rounded-3xl bg-blue-600/10 border border-blue-500/20 text-blue-400 flex items-center justify-center mx-auto shadow-inner">
            <HardDrive className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-bold text-white font-poppins">Connect Your Google Drive Account</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Sign in with your Google account with permission to store, organize, and access your course resources, project capstones, and lab reports directly in Google Drive.
            </p>
          </div>

          {/* OFFICIAL MATERIAL GOOGLE SIGN IN BUTTON */}
          <button 
            onClick={handleSignIn}
            disabled={isAuthenticating}
            className="w-full py-3.5 px-5 rounded-2xl bg-white hover:bg-slate-100 text-slate-900 font-bold text-sm shadow-xl hover:shadow-2xl transition flex items-center justify-center gap-3 border border-slate-200 group active:scale-[0.98] disabled:opacity-50"
          >
            {isAuthenticating ? (
              <RefreshCw className="w-5 h-5 text-blue-600 animate-spin" />
            ) : (
              <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-5 h-5 shrink-0">
                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
              </svg>
            )}
            <span>{isAuthenticating ? 'Connecting Google Drive...' : 'Sign in with Google'}</span>
          </button>
          <p className="text-[11px] text-slate-500 font-mono">Secure OAuth 2.0 authentication with Firebase</p>
        </div>
      ) : (
        /* CONNECTED DRIVE EXPLORER */
        <div className="mt-6 space-y-6">
          
          {/* TOOLBAR: Breadcrumbs, Search, Upload, New Folder */}
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 bg-slate-800/50 p-4 rounded-2xl border border-slate-800">
            
            {/* Breadcrumb Navigation */}
            <div className="flex items-center gap-1 text-xs font-semibold overflow-x-auto pb-1 lg:pb-0">
              {folderBreadcrumbs.map((b, idx) => (
                <React.Fragment key={b.id || 'root'}>
                  {idx > 0 && <span className="text-slate-600">/</span>}
                  <button
                    onClick={() => handleBreadcrumbClick(idx)}
                    className={`px-2.5 py-1.5 rounded-lg transition whitespace-nowrap ${
                      idx === folderBreadcrumbs.length - 1
                        ? 'bg-blue-600/30 text-blue-300 font-bold border border-blue-500/40'
                        : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
                    }`}
                  >
                    {b.name}
                  </button>
                </React.Fragment>
              ))}
            </div>

            {/* Action Buttons & Search */}
            <div className="flex flex-wrap items-center gap-2">
              {/* Search input */}
              <form onSubmit={handleSearchSubmit} className="relative flex-1 sm:flex-none">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search Drive files..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full sm:w-48 pl-9 pr-3 py-1.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition"
                />
              </form>

              {/* View toggle */}
              <div className="flex items-center p-0.5 bg-slate-900 rounded-xl border border-slate-700">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded-lg transition ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}
                  title="Grid View"
                >
                  <Grid className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 rounded-lg transition ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}
                  title="List View"
                >
                  <List className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* New Folder Button */}
              <button
                onClick={() => setIsCreateFolderOpen(true)}
                className="px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition border border-slate-600"
              >
                <FolderPlus className="w-3.5 h-3.5 text-amber-400" />
                <span>New Folder</span>
              </button>

              {/* Upload File Button */}
              <input
                type="file"
                multiple
                ref={fileInputRef}
                onChange={handleFileUpload}
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition shadow-lg shadow-blue-600/20 active:scale-95 disabled:opacity-50"
              >
                <UploadCloud className="w-3.5 h-3.5" />
                <span>{isUploading ? 'Uploading...' : 'Upload File'}</span>
              </button>

              {/* Refresh button */}
              <button
                onClick={() => loadFiles(currentFolderId, searchQuery)}
                disabled={loadingFiles}
                className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl border border-slate-700 transition"
                title="Refresh Google Drive"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${loadingFiles ? 'animate-spin text-blue-400' : ''}`} />
              </button>
            </div>
          </div>

          {/* Uploading Status Bar */}
          {isUploading && (
            <div className="p-3 bg-blue-600/20 border border-blue-500/40 rounded-2xl flex items-center justify-between text-xs font-semibold text-blue-300 animate-pulse">
              <div className="flex items-center gap-2">
                <RefreshCw className="w-4 h-4 animate-spin text-blue-400" />
                <span>{uploadProgressMsg}</span>
              </div>
              <span className="text-[10px] text-slate-400">Saving to Google Drive</span>
            </div>
          )}

          {/* FILE LIST OR GRID */}
          {loadingFiles ? (
            <div className="py-16 text-center space-y-3">
              <RefreshCw className="w-8 h-8 text-blue-500 animate-spin mx-auto" />
              <p className="text-xs text-slate-400 font-mono">Fetching contents from Google Drive API...</p>
            </div>
          ) : files.length === 0 ? (
            <div className="py-16 text-center space-y-3 border border-dashed border-slate-800 rounded-2xl">
              <Folder className="w-12 h-12 text-slate-600 mx-auto" />
              <div className="space-y-1">
                <p className="text-sm font-bold text-slate-300">No Google Drive files found</p>
                <p className="text-xs text-slate-500">
                  {searchQuery ? `No items matched "${searchQuery}"` : 'Upload your first file or create a folder above.'}
                </p>
              </div>
            </div>
          ) : viewMode === 'grid' ? (
            /* GRID VIEW */
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {files.map((f) => {
                const isFolder = f.mimeType === 'application/vnd.google-apps.folder';
                return (
                  <div
                    key={f.id}
                    className="p-4 rounded-2xl bg-slate-800/40 border border-slate-800 hover:border-slate-700 hover:bg-slate-800/80 transition group relative flex flex-col justify-between space-y-3 shadow-sm"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="p-2 rounded-xl bg-slate-900 border border-slate-700/60 shrink-0">
                        {getFileIcon(f.mimeType)}
                      </div>
                      <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100 transition">
                        {f.webViewLink && (
                          <a
                            href={f.webViewLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1 rounded-lg text-slate-400 hover:text-blue-400 hover:bg-slate-700 transition"
                            title="Open in Google Drive"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                        <button
                          onClick={() => setFileToDelete(f)}
                          className="p-1 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition"
                          title="Delete File"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <div 
                      onClick={() => isFolder && handleFolderClick(f)}
                      className={isFolder ? 'cursor-pointer' : ''}
                    >
                      <h4 className="text-xs font-bold text-slate-200 truncate group-hover:text-blue-300 transition" title={f.name}>
                        {f.name}
                      </h4>
                      <div className="flex items-center gap-2 text-[10px] text-slate-500 mt-1 font-mono">
                        <span>{isFolder ? 'Folder' : formatFileSize(f.size)}</span>
                        {f.modifiedTime && (
                          <>
                            <span>•</span>
                            <span>{new Date(f.modifiedTime).toLocaleDateString()}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* LIST VIEW */
            <div className="border border-slate-800 rounded-2xl overflow-hidden divide-y divide-slate-800/60 bg-slate-800/20">
              {files.map((f) => {
                const isFolder = f.mimeType === 'application/vnd.google-apps.folder';
                return (
                  <div
                    key={f.id}
                    className="p-3 sm:px-4 flex items-center justify-between gap-4 hover:bg-slate-800/60 transition group text-xs"
                  >
                    <div 
                      className={`flex items-center gap-3 flex-1 min-w-0 ${isFolder ? 'cursor-pointer' : ''}`}
                      onClick={() => isFolder && handleFolderClick(f)}
                    >
                      <div className="shrink-0">{getFileIcon(f.mimeType)}</div>
                      <div className="min-w-0 flex-1">
                        <div className="font-bold text-slate-200 truncate group-hover:text-blue-300 transition" title={f.name}>
                          {f.name}
                        </div>
                        <div className="text-[10px] text-slate-500 font-mono flex items-center gap-2">
                          <span>{isFolder ? 'Google Drive Folder' : f.mimeType.split('.').pop() || 'File'}</span>
                          {f.modifiedTime && <span>• Modified {new Date(f.modifiedTime).toLocaleDateString()}</span>}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-slate-400 shrink-0 font-mono text-[11px]">
                      <span>{isFolder ? '—' : formatFileSize(f.size)}</span>
                      <div className="flex items-center gap-1">
                        {f.webViewLink && (
                          <a
                            href={f.webViewLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-lg text-slate-400 hover:text-blue-400 hover:bg-slate-700 transition"
                            title="Open in Drive"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                        <button
                          onClick={() => setFileToDelete(f)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition"
                          title="Delete File"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

        </div>
      )}

      {/* NEW FOLDER MODAL */}
      {isCreateFolderOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-sm rounded-3xl bg-slate-900 border border-slate-800 p-6 space-y-4 shadow-2xl animate-fadeIn text-white">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold font-poppins flex items-center gap-2">
                <FolderPlus className="w-5 h-5 text-amber-400" />
                <span>Create New Drive Folder</span>
              </h3>
              <button 
                onClick={() => setIsCreateFolderOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateFolder} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Folder Name</label>
                <input
                  type="text"
                  placeholder="e.g. AWS EKS Lab Reports"
                  value={newFolderName}
                  onChange={(e) => setNewFolderName(e.target.value)}
                  autoFocus
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsCreateFolderOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isCreatingFolder || !newFolderName.trim()}
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition disabled:opacity-50"
                >
                  {isCreatingFolder ? 'Creating...' : 'Create Folder'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CONFIRM DELETION MODAL (MANDATORY DESTRUCTIVE OPERATION CONFIRMATION) */}
      {fileToDelete && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-3xl bg-slate-900 border border-slate-800 p-6 space-y-4 shadow-2xl animate-fadeIn text-white">
            <div className="flex items-start gap-3">
              <div className="p-3 rounded-2xl bg-rose-500/10 text-rose-400 border border-rose-500/20 shrink-0">
                <Trash2 className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold font-poppins text-white">Confirm Google Drive File Deletion</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Are you sure you want to permanently delete <span className="font-bold text-rose-300">"{fileToDelete.name}"</span> from your Google Drive? This action cannot be undone.
                </p>
              </div>
            </div>

            <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 flex items-center gap-3 text-xs">
              {getFileIcon(fileToDelete.mimeType)}
              <div className="min-w-0 flex-1">
                <div className="font-bold text-slate-200 truncate">{fileToDelete.name}</div>
                <div className="text-[10px] text-slate-500 font-mono">{formatFileSize(fileToDelete.size)}</div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setFileToDelete(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800 transition"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDeleteFile}
                disabled={isDeleting}
                className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-lg shadow-rose-600/20 disabled:opacity-50"
              >
                {isDeleting ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Trash2 className="w-3.5 h-3.5" />}
                <span>{isDeleting ? 'Deleting...' : 'Confirm Delete'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
