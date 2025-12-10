import React, { useCallback, useState } from 'react';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  isLoading: boolean;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileSelect, isLoading }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (isLoading) return;

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      validateAndUpload(file);
    }
  }, [isLoading]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      validateAndUpload(e.target.files[0]);
    }
  }, []);

  const validateAndUpload = (file: File) => {
    const validTypes = ['application/pdf', 'text/plain', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    // Gemini supports many types, but let's restrict to prompt requirements (PDF, DOCX via plain text if needed, TXT)
    // Note: Browser cannot easily parse DOCX client side without heavy libs. 
    // We will accept PDF and Text for this demo as they are native/easy.
    
    if (file.type === 'application/pdf' || file.type === 'text/plain') {
         onFileSelect(file);
    } else {
        alert("Por favor, envie um arquivo PDF ou TXT válido.");
    }
  };

  return (
    <div 
      className={`relative rounded-xl border-2 border-dashed transition-all duration-300 ease-in-out
        ${isDragging ? 'border-gold-500 bg-blue-50' : 'border-slate-300 bg-white'}
        ${isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:border-navy-900 hover:bg-slate-50'}
        h-80 flex flex-col items-center justify-center text-center p-8 shadow-sm`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input 
        type="file" 
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
        onChange={handleFileInput}
        disabled={isLoading}
        accept=".pdf,.txt"
      />
      
      <div className="bg-slate-100 p-4 rounded-full mb-4">
        <svg className="h-10 w-10 text-navy-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      </div>

      <h3 className="text-xl font-serif font-semibold text-navy-900 mb-2">
        {isLoading ? 'Analisando Documento...' : 'Envie o Documento Processual'}
      </h3>
      
      <p className="text-slate-500 max-w-sm font-sans">
        {isLoading 
          ? 'Nossa IA está lendo e extraindo os fatos relevantes. Por favor, aguarde.'
          : 'Arraste e solte seu arquivo PDF ou TXT aqui, ou clique para selecionar.'}
      </p>

      {!isLoading && (
        <button className="mt-6 px-6 py-2 bg-navy-900 text-white rounded-md font-medium text-sm hover:bg-navy-800 transition-colors shadow-md">
          Selecionar Arquivo
        </button>
      )}
    </div>
  );
};

export default FileUpload;