import React from 'react';
import { FileText } from 'lucide-react';
import Card from '../../components/ui/Card';

const DocumentsPage = () => {
  return (
    <div className="p-6">
      <div className="flex items-center gap-3 mb-6">
        <FileText className="w-6 h-6 text-blue-600" />
        <h1 className="text-2xl font-semibold text-gray-900">Documents</h1>
      </div>

      <Card className="p-6">
        <div className="flex flex-col items-center justify-center min-h-[400px] text-gray-500">
          <FileText className="w-16 h-16 mb-4 text-gray-400" />
          <p className="text-lg">No documents available</p>
          <p className="text-sm">Upload documents to get started</p>
        </div>
      </Card>
    </div>
  );
};

export default DocumentsPage;