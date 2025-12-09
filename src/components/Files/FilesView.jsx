import { useState, useEffect } from 'react';
import { ref, uploadBytesResumable, getDownloadURL, deleteObject, listAll } from 'firebase/storage';
import { doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { storage, db } from '../../config/firebase';
import { Upload, File, Image, Map, Trash2, Download, Eye, X } from 'lucide-react';
import Modal from '../Modal';
import './FilesView.css';

export default function FilesView({ campaign, isDM }) {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);
  const [viewingFile, setViewingFile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFiles();
  }, [campaign.id]);

  const loadFiles = async () => {
    try {
      const filesRef = ref(storage, `campaigns/${campaign.id}/files`);
      const fileList = await listAll(filesRef);

      const filePromises = fileList.items.map(async (item) => {
        const url = await getDownloadURL(item);
        const metadata = await item.getMetadata();

        return {
          name: item.name,
          url: url,
          fullPath: item.fullPath,
          size: metadata.size,
          contentType: metadata.contentType,
          timeCreated: metadata.timeCreated,
          uploadedBy: metadata.customMetadata?.uploadedBy || 'Unknown'
        };
      });

      const filesData = await Promise.all(filePromises);
      setFiles(filesData.sort((a, b) => new Date(b.timeCreated) - new Date(a.timeCreated)));
    } catch (error) {
      console.error('Error loading files:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        alert('File size must be less than 10MB');
        return;
      }
      setSelectedFile(file);
      handleUpload(file);
    }
  };

  const handleUpload = async (file) => {
    if (!isDM) {
      alert('Only DMs can upload files');
      return;
    }

    setUploading(true);
    setUploadProgress(0);

    try {
      const timestamp = Date.now();
      const fileName = `${timestamp}_${file.name}`;
      const storageRef = ref(storage, `campaigns/${campaign.id}/files/${fileName}`);

      const metadata = {
        customMetadata: {
          uploadedBy: campaign.members?.[campaign.dmId]?.displayName || 'DM',
          campaignId: campaign.id
        }
      };

      const uploadTask = uploadBytesResumable(storageRef, file, metadata);

      uploadTask.on('state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(progress);
        },
        (error) => {
          console.error('Upload error:', error);
          alert('Failed to upload file');
          setUploading(false);
        },
        async () => {
          // Upload completed successfully
          await loadFiles();
          setUploading(false);
          setUploadProgress(0);
          setSelectedFile(null);

          // Update campaign updated timestamp
          const campaignRef = doc(db, `campaigns/${campaign.id}`);
          await updateDoc(campaignRef, {
            updatedAt: serverTimestamp()
          });
        }
      );
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Failed to upload file');
      setUploading(false);
    }
  };

  const handleDelete = async (file) => {
    if (!isDM) {
      alert('Only DMs can delete files');
      return;
    }

    if (!confirm(`Are you sure you want to delete "${file.name}"?`)) {
      return;
    }

    try {
      const fileRef = ref(storage, file.fullPath);
      await deleteObject(fileRef);
      await loadFiles();
    } catch (error) {
      console.error('Error deleting file:', error);
      alert('Failed to delete file');
    }
  };

  const getFileIcon = (contentType) => {
    if (contentType?.startsWith('image/')) {
      return <Image size={24} />;
    }
    return <File size={24} />;
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  const isImage = (contentType) => {
    return contentType?.startsWith('image/');
  };

  if (loading) {
    return (
      <div className="files-view">
        <div className="loading-view">
          <div className="loading-spinner"></div>
          <p>Loading files...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="files-view">
      <div className="view-header">
        <div>
          <h2>Maps & Files</h2>
          <p className="view-subtitle">{files.length} file{files.length !== 1 ? 's' : ''} uploaded</p>
        </div>
        {isDM && (
          <label className="btn btn-primary upload-btn">
            <Upload size={20} />
            Upload File
            <input
              type="file"
              accept="image/*,.pdf,.txt,.doc,.docx"
              onChange={handleFileSelect}
              disabled={uploading}
              style={{ display: 'none' }}
            />
          </label>
        )}
      </div>

      {uploading && (
        <div className="upload-progress card">
          <div className="progress-info">
            <Upload size={20} />
            <span>Uploading {selectedFile?.name}...</span>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${uploadProgress}%` }}></div>
          </div>
          <span className="progress-text">{Math.round(uploadProgress)}%</span>
        </div>
      )}

      {files.length === 0 && !uploading ? (
        <div className="empty-state card">
          <Map size={64} />
          <p>No files uploaded yet</p>
          {isDM && (
            <label className="btn btn-primary">
              <Upload size={20} />
              Upload First File
              <input
                type="file"
                accept="image/*,.pdf,.txt,.doc,.docx"
                onChange={handleFileSelect}
                style={{ display: 'none' }}
              />
            </label>
          )}
        </div>
      ) : (
        <div className="files-grid">
          {files.map((file) => (
            <div key={file.fullPath} className="file-card card">
              <div className="file-preview">
                {isImage(file.contentType) ? (
                  <img src={file.url} alt={file.name} />
                ) : (
                  <div className="file-icon-large">
                    {getFileIcon(file.contentType)}
                  </div>
                )}
              </div>
              <div className="file-info">
                <h4 className="file-name">{file.name}</h4>
                <div className="file-meta">
                  <span className="file-size">{formatFileSize(file.size)}</span>
                  <span className="file-uploader">by {file.uploadedBy}</span>
                </div>
              </div>
              <div className="file-actions">
                {isImage(file.contentType) && (
                  <button
                    className="btn btn-icon"
                    onClick={() => setViewingFile(file)}
                    title="View full size"
                  >
                    <Eye size={18} />
                  </button>
                )}
                <a
                  href={file.url}
                  download={file.name}
                  className="btn btn-icon"
                  title="Download"
                >
                  <Download size={18} />
                </a>
                {isDM && (
                  <button
                    className="btn btn-icon btn-danger"
                    onClick={() => handleDelete(file)}
                    title="Delete"
                  >
                    <Trash2 size={18} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {viewingFile && (
        <Modal
          isOpen={!!viewingFile}
          onClose={() => setViewingFile(null)}
          title={viewingFile.name}
          size="large"
        >
          <div className="file-viewer">
            <img src={viewingFile.url} alt={viewingFile.name} />
          </div>
        </Modal>
      )}
    </div>
  );
}
