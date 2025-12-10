import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import FileUpload from './components/FileUpload';
import AnalysisResults from './components/AnalysisResults';
import { LegalAnalysisResult, ProcessingStatus, AnalysisRecord } from './types';
import { analyzeDocument, fileToBase64 } from './services/geminiService';
import { StorageService } from './services/storageService';

const App: React.FC = () => {
  const [status, setStatus] = useState<ProcessingStatus>(ProcessingStatus.IDLE);
  const [result, setResult] = useState<LegalAnalysisResult | null>(null);
  const [history, setHistory] = useState<AnalysisRecord[]>([]);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Load history on mount
  useEffect(() => {
    const loadedHistory = StorageService.getAllRecords();
    setHistory(loadedHistory);
  }, []);

  const handleFileSelect = async (file: File) => {
    setStatus(ProcessingStatus.PROCESSING);
    setResult(null);
    setErrorMsg(null);

    try {
      const base64Data = await fileToBase64(file);
      
      // Perform AI Analysis
      const analysisResult = await analyzeDocument(base64Data, file.type);
      
      setResult(analysisResult);
      setStatus(ProcessingStatus.SUCCESS);

      // Create and persist record
      const newRecord: AnalysisRecord = {
        id: crypto.randomUUID(),
        timestamp: new Date().toISOString(),
        fileName: file.name,
        result: analysisResult
      };

      StorageService.saveRecord(newRecord);
      setHistory(prev => [newRecord, ...prev]);

    } catch (err: any) {
      console.error(err);
      setStatus(ProcessingStatus.ERROR);
      setErrorMsg(err.message || "Ocorreu um erro desconhecido durante a análise.");
    }
  };

  const handleHistoryClick = (record: AnalysisRecord) => {
    setResult(record.result);
    setStatus(ProcessingStatus.SUCCESS);
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col font-sans text-slate-900 bg-slate-50">
      <Header />

      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="max-w-5xl mx-auto">
          
          {/* Main Upload Section */}
          <section className="mb-10">
            <h1 className="text-3xl font-serif font-bold text-navy-900 mb-2 text-center">
              Análise Jurídica Inteligente
            </h1>
            <p className="text-center text-slate-500 mb-8 max-w-2xl mx-auto">
              Extraia insights, resumos e fatos processuais em segundos.
            </p>
            
            <FileUpload 
              onFileSelect={handleFileSelect} 
              isLoading={status === ProcessingStatus.PROCESSING} 
            />

            {status === ProcessingStatus.ERROR && (
              <div className="mt-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded shadow-sm">
                <p className="font-bold">Erro na Análise</p>
                <p>{errorMsg}</p>
              </div>
            )}
          </section>

          {/* Results Section */}
          <section>
             <AnalysisResults result={result} />
          </section>

          {/* Recent History Section */}
          {history.length > 0 && (
            <section className="mt-20 border-t border-slate-200 pt-10">
              <h2 className="text-2xl font-serif font-bold text-navy-900 mb-6">Histórico de Análises</h2>
              <div className="bg-white rounded-xl shadow overflow-hidden">
                <ul className="divide-y divide-slate-100">
                  {history.map((record) => (
                    <li 
                      key={record.id} 
                      onClick={() => handleHistoryClick(record)}
                      className="p-4 hover:bg-slate-50 cursor-pointer transition-colors flex justify-between items-center"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="bg-navy-900/10 p-2 rounded-lg text-navy-900">
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-navy-900">{record.fileName}</p>
                          <p className="text-xs text-slate-500">
                            {new Date(record.timestamp).toLocaleDateString('pt-BR', {
                                day: '2-digit', month: 'long', hour: '2-digit', minute: '2-digit'
                            })}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center">
                         <span className="text-xs font-semibold text-gold-600 bg-gold-50 px-2 py-1 rounded-full border border-gold-100">
                           Analisado
                         </span>
                         <svg className="w-5 h-5 text-slate-300 ml-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          )}

        </div>
      </main>

      <footer className="bg-white border-t border-slate-200 py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center text-slate-400 text-sm">
          <p>&copy; {new Date().getFullYear()} FutureDoc. Todos os direitos reservados.</p>
          <p className="mt-2 text-xs">Aviso Legal: Esta ferramenta utiliza IA para auxílio e não substitui o parecer jurídico humano.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;