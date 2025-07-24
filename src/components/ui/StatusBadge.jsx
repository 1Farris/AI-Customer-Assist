import React from 'react';

const StatusBadge = ({ status, children }) => {
  const statusStyles = {
    online: 'bg-green-100 text-green-800 border-green-200',
    offline: 'bg-red-100 text-red-800 border-red-200',
    processing: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    escalated: 'bg-orange-100 text-orange-800 border-orange-200',
    resolved: 'bg-blue-100 text-blue-800 border-blue-200'
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${statusStyles[status] || statusStyles.offline}`}>
      {children}
    </span>
  );
};

export default StatusBadge;

