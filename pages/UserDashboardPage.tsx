import React, { useState } from 'react';
import { UserIcon } from '../components/icons/UserIcon';
import { DocumentCheckIcon } from '../components/icons/DocumentCheckIcon';
import { UploadCloudIcon } from '../components/icons/UploadCloudIcon';
import { MapPinIcon } from '../components/icons/MapPinIcon';
import { XMarkIcon } from '../components/icons/XMarkIcon';
import { IdentificationIcon } from '../components/icons/IdentificationIcon';
import { SearchIcon } from '../components/icons/SearchIcon';
import { processDocument } from '../services/documentProcessor';
import type { DocumentData } from '../types';

const UserDashboardPage: React.FC = () => {
  const [userData, setUserData] = useState({
    name: 'Rani Gaidinliu',
    plotArea: '15.2 acres',
    pattaStatus: 'Verified',
    eligibleSchemes: [
      "Pradhan Mantri Fasal Bima Yojana (PMFBY)",
      "Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)",
      "Mahatma Gandhi National Rural Employment Guarantee Act (MGNREGA)",
      "Jal Jeevan Mission",
      "Kisan Credit Card (KCC)",
      "National Mission for Sustainable Agriculture (NMSA)",
    ],
    email: 'rani.gaidinliu@example.com',
    phone: '+91-XXXXX-XXXXX',
    address: 'Forest Village, Jharkhand',
    verificationStatus: 'Verified' as 'Verified' | 'Pending' | 'Rejected',
  });
  
  const [searchTerm, setSearchTerm] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStatus, setProcessingStatus] = useState('');
  const [error, setError] = useState<string | null>(null);


  const handleFileUpload = async (files: File[]) => {
      if (files.length === 0) return;
      const file = files[0];
      setIsProcessing(true);
      setError(null);
      setProcessingStatus(`Uploading ${file.name}...`);
      
      try {
        await new Promise(resolve => setTimeout(resolve, 500)); // simulate upload
        setProcessingStatus(`Analyzing document with AI...`);
        
        const result: DocumentData = await processDocument(file);

        // Update user profile with extracted data
        setUserData(prev => ({
          ...prev,
          name: result.lessee?.name || prev.name,
          address: result.lessee?.address || prev.address,
          plotArea: result.stamp_details?.value ? `${result.stamp_details.value} Stamp Value` : prev.plotArea,
          pattaStatus: result.signatures_present === 'yes' ? 'Verified' : 'Pending',
        }));
        
        setProcessingStatus(`Success! Profile updated with data from ${file.name}.`);

      } catch (err) {
          setError(err instanceof Error ? err.message : 'An unknown error occurred.');
          setProcessingStatus('');
      } finally {
          setIsProcessing(false);
      }
  };

  const statusStyles = {
    Verified: 'bg-green-100 text-green-800',
    Pending: 'bg-yellow-100 text-yellow-800',
    Rejected: 'bg-red-100 text-red-800',
  };

  const filteredSchemes = userData.eligibleSchemes.filter(scheme =>
    scheme.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-slate-100 min-h-full p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8 flex items-center space-x-4">
          <UserIcon className="w-16 h-16 text-slate-600" />
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Welcome, {userData.name}</h1>
            <p className="text-slate-600 mt-1">Your FRA Land and Schemes Dashboard</p>
          </div>
        </header>

        <div className="space-y-6">
          {/* My Profile Section */}
          <div className="bg-white p-6 rounded-lg shadow-md">
             <h2 className="text-xl font-semibold text-slate-700 mb-4 flex items-center">
              <IdentificationIcon className="w-6 h-6 mr-3 text-orange-500" />
              My Profile
            </h2>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <InfoItem label="Full Name" value={userData.name} />
               <InfoItem label="Email Address" value={userData.email} />
               <InfoItem label="Phone Number" value={userData.phone} />
               <InfoItem label="Address" value={userData.address} />
               <InfoItem label="Verification Status">
                 <span className={`px-3 py-1 text-sm font-semibold rounded-full ${statusStyles[userData.verificationStatus]}`}>
                   {userData.verificationStatus}
                 </span>
               </InfoItem>
            </div>
          </div>

          {/* My Land Section */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-slate-700 mb-4 flex items-center">
              <MapPinIcon className="w-6 h-6 mr-3 text-orange-500" />
              My FRA Patta Land
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InfoItem label="Patta Holder" value={userData.name} />
              <InfoItem label="Plot Area" value={userData.plotArea} />
              <InfoItem label="Patta Status">
                <span className="px-3 py-1 text-sm font-semibold rounded-full bg-green-100 text-green-800">{userData.pattaStatus}</span>
              </InfoItem>
            </div>
          </div>

          {/* Eligible Schemes Section */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
              <h2 className="text-xl font-semibold text-slate-700 flex items-center mb-3 sm:mb-0">
                <DocumentCheckIcon className="w-6 h-6 mr-3 text-orange-500" />
                Eligible Government Schemes
              </h2>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <SearchIcon className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search schemes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full sm:w-64 pl-10 pr-3 py-2 border border-slate-300 rounded-md leading-5 bg-white placeholder-slate-500 focus:outline-none focus:placeholder-slate-400 focus:ring-1 focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                />
              </div>
            </div>
            
            <ul className="space-y-3">
              {filteredSchemes.length > 0 ? (
                filteredSchemes.map((scheme, index) => (
                  <li key={index} className="flex items-start p-3 bg-slate-50 rounded-md">
                    <span className="text-green-500 mr-3 mt-1">&#10003;</span>
                    <div className="flex-1">
                      <p className="font-semibold text-slate-800">{scheme}</p>
                      <a href="#" className="text-sm text-orange-600 hover:underline">Learn More & Apply</a>
                    </div>
                  </li>
                ))
              ) : (
                <p className="text-center text-slate-500 py-4">No schemes match your search.</p>
              )}
            </ul>
          </div>
          
          {/* Document Upload Section */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-slate-700 mb-4 flex items-center">
              <UploadCloudIcon className="w-6 h-6 mr-3 text-orange-500" />
              Update Profile via Document
            </h2>
            <p className="text-slate-600 mb-4">
              Upload your land patta document. Our AI will extract the relevant information and update your profile automatically.
            </p>
            <FileUpload onFileUpload={handleFileUpload} isProcessing={isProcessing} />
            { (isProcessing || processingStatus || error) && (
              <div className="mt-4 text-center p-3 rounded-md bg-slate-100">
                {isProcessing && <div className="animate-pulse text-blue-600">{processingStatus}</div>}
                {!isProcessing && processingStatus && <div className="text-green-600">{processingStatus}</div>}
                {error && <div className="text-red-600 font-semibold">{error}</div>}
              </div>
            )}
          </div>
        </div>
      </div>
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
            <span>{isProcessing ? 'Processing...' : 'Upload your document'}</span>
            <input ref={inputRef} id="file-upload" name="file-upload" type="file" disabled={isProcessing} className="sr-only" onChange={handleFileChange} />
          </label>
          <p className="pl-1">or drag and drop</p>
        </div>
        <p className="text-xs text-slate-500">PNG, JPG, PDF up to 10MB</p>
      </div>
    </div>
  );
};

interface InfoItemProps {
  label: string;
  value?: string;
  children?: React.ReactNode;
}

const InfoItem: React.FC<InfoItemProps> = ({ label, value, children }) => (
  <div>
    <p className="text-sm font-medium text-slate-500">{label}</p>
    {value && <p className="text-lg font-semibold text-slate-800">{value}</p>}
    {children}
  </div>
);

export default UserDashboardPage;
