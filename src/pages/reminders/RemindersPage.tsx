import React from 'react';
import { Bell } from 'lucide-react';

const RemindersPage = () => {
  return (
    <div className="p-6">
      <div className="flex items-center gap-3 mb-6">
        <Bell className="w-6 h-6 text-blue-600" />
        <h1 className="text-2xl font-semibold text-gray-900">Reminders</h1>
      </div>
      
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-gray-600">No reminders to display.</p>
      </div>
    </div>
  );
};

export default RemindersPage;