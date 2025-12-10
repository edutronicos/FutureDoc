import React from 'react';
import { LegalAnalysisResult } from '../types';

interface AnalysisResultsProps {
  result: LegalAnalysisResult | null;
}

const AnalysisResults: React.FC<AnalysisResultsProps> = ({ result }) => {
  if (!result) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fade-in mt-12">
      {/* Executive Summary Card */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden border border-slate-200 hover:shadow-lg transition-shadow duration-300">
        <div className="bg-navy-900 px-6 py-4 border-b border-navy-800 flex justify-between items-center">
          <h3 className="font-serif text-lg font-semibold text-white">Resumo Executivo</h3>
          <svg className="w-5 h-5 text-gold-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
        </div>
        <div className="p-6">
          <p className="text-slate-700 leading-relaxed font-sans text-base text-justify">
            {result.resumo}
          </p>
        </div>
      </div>

      {/* Relevant Facts Card */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden border border-slate-200 hover:shadow-lg transition-shadow duration-300">
        <div className="bg-white px-6 py-4 border-b border-slate-200 flex justify-between items-center">
          <h3 className="font-serif text-lg font-semibold text-navy-900">Fatos Relevantes</h3>
          <svg className="w-5 h-5 text-navy-900" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path></svg>
        </div>
        <div className="p-6 bg-slate-50 h-full">
          <ul className="space-y-3">
            {result.lista_fatos.map((fato, index) => (
              <li key={index} className="flex items-start">
                <span className="flex-shrink-0 h-5 w-5 rounded-full border border-gold-500 flex items-center justify-center mt-0.5 mr-3">
                  <span className="h-2 w-2 rounded-full bg-gold-500"></span>
                </span>
                <span className="text-slate-700 font-sans text-sm">{fato}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AnalysisResults;