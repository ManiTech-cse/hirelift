import React, { useRef, useState } from 'react';
import { Upload, FileText, X } from 'lucide-react';

interface FileUploadProps {
  label: string;
  onFileSelect: (file: File | null) => void;
  onTextExtract?: (text: string) => void;
  acceptedTypes?: string;
  maxSizeMB?: number;
}

export const FileUpload: React.FC<FileUploadProps> = ({ 
  label, 
  onFileSelect, 
  onTextExtract,
  acceptedTypes = '.pdf,.doc,.docx,.txt',
  maxSizeMB = 10
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    setError(null);
    
    // Validate file size
    const fileSizeMB = selectedFile.size / (1024 * 1024);
    if (fileSizeMB > maxSizeMB) {
      setError(`File size exceeds ${maxSizeMB}MB limit`);
      return;
    }

    // Validate file type
    const fileExtension = selectedFile.name.split('.').pop()?.toLowerCase();
    if (!acceptedTypes.includes(`.${fileExtension}`)) {
      setError(`File type not supported. Accepted: ${acceptedTypes}`);
      return;
    }

    setFile(selectedFile);
    onFileSelect(selectedFile);

    // For now, we'll just show the filename. In production, you'd want to:
    // 1. Parse PDF/DOCX content
    // 2. Extract text
    // 3. Use NLP to extract skills and experience
    if (onTextExtract && (fileExtension === 'txt' || selectedFile.type === 'text/plain')) {
      setIsProcessing(true);
      try {
        const text = await selectedFile.text();
        onTextExtract(text);
      } catch (err) {
        setError('Failed to read file');
      } finally {
        setIsProcessing(false);
      }
    }
  };

  const handleClear = () => {
    setFile(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    onFileSelect(null);
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      <label className="text-sm font-medium text-slate-700">{label}</label>
      
      <div
        onClick={() => fileInputRef.current?.click()}
        className="relative border-2 border-dashed border-slate-300 rounded-lg p-6 sm:p-8 text-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all bg-slate-50"
      >
        <input
          ref={fileInputRef}
          type="file"
          onChange={handleFileChange}
          accept={acceptedTypes}
          className="hidden"
        />
        
        {!file ? (
          <div className="flex flex-col items-center gap-2">
            <Upload size={28} className="text-slate-400" />
            <div>
              <p className="text-sm font-medium text-slate-700">Click to upload resume</p>
              <p className="text-xs text-slate-500 mt-1">PDF, DOC, DOCX or TXT up to {maxSizeMB}MB</p>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FileText size={24} className="text-blue-500" />
              <div className="text-left">
                <p className="text-sm font-medium text-slate-900 truncate">{file.name}</p>
                <p className="text-xs text-slate-500">{(file.size / 1024).toFixed(1)} KB</p>
              </div>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleClear();
              }}
              className="p-1 hover:bg-slate-200 rounded transition-colors"
            >
              <X size={18} className="text-slate-500" />
            </button>
          </div>
        )}

        {isProcessing && (
          <p className="text-xs text-blue-600 mt-2">Processing file...</p>
        )}
      </div>

      {error && (
        <p className="text-xs text-red-600 bg-red-50 p-2 rounded">{error}</p>
      )}
    </div>
  );
};

export default FileUpload;
