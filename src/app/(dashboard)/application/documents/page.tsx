'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Upload,
  FileText,
  CheckCircle2,
  Trash2,
  Download
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Document {
  id: string;
  name: string;
  type: string;
  size: string;
  status: 'uploaded' | 'verified' | 'processing';
  uploadDate: string;
}

const mockDocuments: Document[] = [
  {
    id: '1',
    name: 'Transcript.pdf',
    type: 'Transcript',
    size: '2.3 MB',
    status: 'verified',
    uploadDate: '2025-11-15'
  },
  {
    id: '2',
    name: 'Passport.jpg',
    type: 'Passport',
    size: '1.1 MB',
    status: 'uploaded',
    uploadDate: '2025-11-14'
  }
];

export default function DocumentsPage() {
  const [documents] = useState<Document[]>(mockDocuments);
  const [isDragging, setIsDragging] = useState(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    // Handle file upload logic here
  };

  const getStatusBadge = (status: Document['status']) => {
    switch (status) {
      case 'verified':
        return <Badge className="bg-green-100 text-green-700">Verified</Badge>;
      case 'processing':
        return <Badge className="bg-yellow-100 text-yellow-700">Processing</Badge>;
      default:
        return <Badge className="bg-blue-100 text-blue-700">Uploaded</Badge>;
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold mb-2">Documents</h1>
        <p className="text-gray-600">Upload and manage your application documents</p>
      </motion.div>

      {/* Upload Area */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
            }`}
          >
            <Upload className="w-10 h-10 mx-auto mb-4 text-gray-400" />
            <p className="text-gray-600 mb-2">
              Drag and drop files here, or{' '}
              <button className="text-blue-600 hover:underline">browse</button>
            </p>
            <p className="text-sm text-gray-500">
              Accepted formats: PDF, JPG, PNG (Max 10MB)
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Document List */}
      <Card>
        <CardHeader>
          <CardTitle>Uploaded Documents</CardTitle>
        </CardHeader>
        <CardContent>
          {documents.length === 0 ? (
            <p className="text-center text-gray-500 py-8">
              No documents uploaded yet
            </p>
          ) : (
            <ul className="divide-y">
              {documents.map((doc) => (
                <li key={doc.id} className="py-4 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                    <FileText className="w-5 h-5 text-gray-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{doc.name}</p>
                    <p className="text-sm text-gray-500">
                      {doc.type} • {doc.size} • {doc.uploadDate}
                    </p>
                  </div>
                  {getStatusBadge(doc.status)}
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon">
                      <Download className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>

      {/* Required Documents */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Required Documents</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {[
              { name: 'Official Transcript', uploaded: true },
              { name: 'Passport Copy', uploaded: true },
              { name: 'English Proficiency Test', uploaded: false },
              { name: 'Recommendation Letter', uploaded: false },
              { name: 'Financial Statement', uploaded: false }
            ].map((doc) => (
              <li key={doc.name} className="flex items-center gap-3">
                {doc.uploaded ? (
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                ) : (
                  <div className="w-5 h-5 rounded-full border-2 border-gray-300" />
                )}
                <span className={doc.uploaded ? 'text-gray-900' : 'text-gray-500'}>
                  {doc.name}
                </span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
