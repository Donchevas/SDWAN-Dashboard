
import React from 'react';

interface KPICardProps {
  title: string;
  value: string | number;
  description: string;
  icon: React.ReactNode;
}

const KPICard: React.FC<KPICardProps> = ({ title, value, description, icon }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
      <div className="bg-corporate-blue-light text-white p-4 rounded-full mr-6">
        {icon}
      </div>
      <div>
        <h3 className="text-sm font-medium text-corporate-gray-dark uppercase">{title}</h3>
        <p className="text-3xl font-bold text-corporate-blue-dark">{value}</p>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
    </div>
  );
};

export default KPICard;
