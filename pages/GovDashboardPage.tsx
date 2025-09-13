import React, { useState } from 'react';
import KPICard from '../components/dashboard/KPICard';
import StackedBarChart from '../components/charts/StackedBarChart';
import DonutChart from '../components/charts/DonutChart';
import LineChart from '../components/charts/LineChart';
import IndiaMap from '../components/dashboard/IndiaMap';
import RecordDetailModal from '../components/dashboard/RecordDetailModal';
import { UploadCloudIcon } from '../components/icons/UploadCloudIcon';
import { TableCellsIcon } from '../components/icons/TableCellsIcon';
import { processDocument, getInitialRecords } from '../services/documentProcessor';
import type { ProcessedRecord } from '../types';
import HorizontalBarChart from '../components/charts/HorizontalBarChart';

const GovDashboardPage: React.FC = () => {
  const [records, setRecords] = useState<ProcessedRecord[]>(getInitialRecords());
  const [selectedRecord, setSelectedRecord] = useState<ProcessedRecord | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = async (files: File[]) => {
    if (files.length === 0) return;
    setIsProcessing(true);
    setError(null);

    const newRecords: ProcessedRecord[] = [];
    for (const file of files) {
      try {
        const result = await processDocument(file);
        newRecords.push({ file_name: file.name, structured_data: result });
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Unknown error';
        setError(`Failed to process ${file.name}: ${message}`);
        // Stop processing further files on error
        break; 
      }
    }
    
    setRecords(prev => [...newRecords, ...prev]);
    setIsProcessing(false);
  };

  return (
    <div className="bg-slate-200 min-h-full p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8 animate-[fadeIn_0.5s_ease-out]">
          <h1 className="text-3xl font-bold text-slate-800">Government Dashboard</h1>
          <p className="text-slate-600 mt-1">FRA Implementation Overview & Document Intelligence Hub</p>
        </header>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <KPICard title="Total Claims Processed" value="1.2M" change="+5.2%" delay="100ms" />
          <KPICard title="Land Recognized" value="4.2M ha" change="+2.1%" delay="200ms" />
          <KPICard title="Beneficiaries" value="3.8M" change="+8.0%" delay="300ms" />
          <KPICard title="High Priority Areas" value="1,245" change="-1.5%" delay="400ms" />
        </div>
        
        {/* Document Intelligence Hub */}
        <section className="mt-8 bg-white p-6 rounded-lg shadow-md animate-[fadeIn_0.5s_ease-out_500ms]">
          <h2 className="text-2xl font-semibold text-slate-700 mb-4 flex items-center">
            <UploadCloudIcon className="w-8 h-8 mr-3 text-orange-500" />
            Document Intelligence Hub
          </h2>
          <p className="text-slate-600 mb-4">
            Upload multiple land registry or patta documents (images or PDFs). The system will use AI to extract and structure the data automatically.
          </p>
          <FileUpload onFileUpload={handleFileUpload} isProcessing={isProcessing} />
          {isProcessing && <p className="text-center mt-4 text-blue-600 animate-pulse">Processing documents, please wait...</p>}
          {error && <p className="text-center mt-4 text-red-600 font-semibold">{error}</p>}
        </section>

        {/* Processed Records Table */}
        <section className="mt-6 bg-white p-6 rounded-lg shadow-md animate-[fadeIn_0.5s_ease-out_600ms]">
          <h2 className="text-xl font-semibold text-slate-700 mb-4 flex items-center">
            <TableCellsIcon className="w-6 h-6 mr-3 text-orange-500" />
            Processed Land Records
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="border-b-2 border-slate-200 bg-slate-50 text-sm text-slate-600">
                <tr>
                  <th className="p-3">Document Name</th>
                  <th className="p-3">Document Type</th>
                  <th className="p-3">Lessee (Holder)</th>
                  <th className="p-3">Date Issued</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {records.map((record, index) => (
                  <tr key={index} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="p-3 font-medium text-slate-800">{record.file_name}</td>
                    <td className="p-3 text-slate-600">{record.structured_data.document_type || 'N/A'}</td>
                    <td className="p-3 text-slate-600">{record.structured_data.lessee?.name || 'N/A'}</td>
                    <td className="p-3 text-slate-600">{record.structured_data.date_issued || 'N/A'}</td>
                    <td className="p-3">
                      <button 
                        onClick={() => setSelectedRecord(record)}
                        className="bg-orange-500 text-white px-3 py-1 rounded-md text-sm font-semibold hover:bg-orange-600 transition-colors"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Visualizations Grid */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md animate-[fadeIn_0.5s_ease-out_700ms]">
             <h2 className="text-xl font-semibold text-slate-700 mb-4">Scheme Beneficiaries by Priority</h2>
            <StackedBarChart />
          </div>
           <div className="bg-white p-6 rounded-lg shadow-md animate-[fadeIn_0.5s_ease-out_800ms]">
            <h2 className="text-xl font-semibold text-slate-700 mb-4">Claims Processed Over Time</h2>
            <LineChart />
          </div>
          <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md animate-[fadeIn_0.5s_ease-out_900ms]">
            <h2 className="text-xl font-semibold text-slate-700 mb-4">Development Priority Analysis</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                    <h3 className="text-lg font-semibold text-slate-600 text-center mb-2">Plot Distribution by Count</h3>
                    <DonutChart />
                </div>
                <div>
                    <h3 className="text-lg font-semibold text-slate-600 mb-2">Total Land Area by Priority (Hectares)</h3>
                    <HorizontalBarChart />
                </div>
            </div>
          </div>
          <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md animate-[fadeIn_0.5s_ease-out_1000ms]">
            <h2 className="text-xl font-semibold text-slate-700 mb-4">Geographic Claim Distribution</h2>
            <IndiaMap />
          </div>
        </div>
      </div>
      
      {selectedRecord && <RecordDetailModal record={selectedRecord} onClose={() => setSelectedRecord(null)} />}
    </div>
  );
};


const FileUpload = ({ onFileUpload, isProcessing }: { onFileUpload: (files: File[]) => void, isProcessing: boolean }) => {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      onFileUpload(Array.from(e.target.files));
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragging(true);
    } else if (e.type === "dragleave") {
      setIsDragging(false);
    }
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files) {
       onFileUpload(Array.from(e.dataTransfer.files));
    }
  };

  return (
    <div 
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
      className={`relative mt-2 flex justify-center px-6 pt-5 pb-6 border-2 ${isDragging ? 'border-orange-500 bg-orange-50' : 'border-slate-300'} border-dashed rounded-md cursor-pointer transition-colors duration-200 ${isProcessing ? 'opacity-50 pointer-events-none' : 'hover:border-orange-400'}`}
    >
      <div className="space-y-1 text-center">
        <UploadCloudIcon className="mx-auto h-12 w-12 text-slate-400" />
        <div className="flex text-sm text-slate-600">
          <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-orange-600 hover:text-orange-500 focus-within:outline-none">
            <span>{isProcessing ? 'Processing...' : 'Upload files'}</span>
            <input ref={inputRef} id="file-upload" name="file-upload" type="file" multiple disabled={isProcessing} className="sr-only" onChange={handleFileChange} />
          </label>
          <p className="pl-1">or drag and drop</p>
        </div>
        <p className="text-xs text-slate-500">PNG, JPG, PDF up to 10MB</p>
      </div>
    </div>
  );
};


export default GovDashboardPage;