import React from 'react';
import { XMarkIcon } from '../icons/XMarkIcon';
import { ProcessedRecord } from '../../types';

interface RecordDetailModalProps {
  record: ProcessedRecord;
  onClose: () => void;
}

const RecordDetailModal: React.FC<RecordDetailModalProps> = ({ record, onClose }) => {
  const { structured_data: data } = record;

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/60 z-40 transition-opacity duration-300 animate-[fadeIn_0.3s_ease-out]"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl bg-white rounded-lg shadow-2xl z-50 transform transition-transform duration-300 animate-[fadeIn_0.3s_ease-out_scale-95_to-100]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="record-modal-title"
      >
        <div className="p-6">
          <div className="flex justify-between items-center border-b pb-3 mb-4">
            <h2 id="record-modal-title" className="text-2xl font-bold text-slate-800">
              {data.document_type || 'Document Details'}
            </h2>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-slate-200 transition-colors"
              aria-label="Close modal"
            >
              <XMarkIcon className="w-6 h-6 text-slate-600" />
            </button>
          </div>

          <div className="max-h-[70vh] overflow-y-auto pr-4 space-y-6">
            <DetailSection title="General Information">
              <DetailItem label="File Name" value={record.file_name} />
              <DetailItem label="Document Type" value={data.document_type} />
              <DetailItem label="Date Issued" value={data.date_issued} />
              <DetailItem label="Place of Execution" value={data.place_of_execution} />
              <DetailItem label="Signatures Present" value={data.signatures_present} />
            </DetailSection>

            {data.lessor && (
              <DetailSection title="Lessor Information (First Party)">
                <DetailItem label="Name" value={data.lessor.name} />
                <DetailItem label="Father's Name" value={data.lessor.father_name} />
                <DetailItem label="Address" value={data.lessor.address} />
              </DetailSection>
            )}
            
            {data.lessee && (
              <DetailSection title="Lessee Information (Second Party)">
                <DetailItem label="Name" value={data.lessee.name} />
                <DetailItem label="Father's Name" value={data.lessee.father_name} />
                <DetailItem label="Address" value={data.lessee.address} />
              </DetailSection>
            )}

            <DetailSection title="Stamp Details">
                <DetailItem label="Value" value={data.stamp_details.value} />
                <DetailItem label="Serial Number" value={data.stamp_details.serial_number} />
                <DetailItem label="State" value={data.stamp_details.state} />
            </DetailSection>

            <DetailSection title="Raw Excerpt">
                <p className="text-sm text-slate-600 bg-slate-100 p-3 rounded-md italic">
                    "{data.raw_excerpt || 'No excerpt available.'}"
                </p>
            </DetailSection>
          </div>
        </div>
      </div>
    </>
  );
};

const DetailSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div>
        <h3 className="text-lg font-semibold text-orange-600 border-b border-slate-200 pb-2 mb-3">{title}</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
            {children}
        </div>
    </div>
);

const DetailItem: React.FC<{ label: string; value: string | null | undefined }> = ({ label, value }) => (
    value ? (
        <div className="py-1">
            <p className="text-xs font-medium text-slate-500">{label}</p>
            <p className="text-md font-semibold text-slate-800">{value}</p>
        </div>
    ) : null
);

export default RecordDetailModal;
