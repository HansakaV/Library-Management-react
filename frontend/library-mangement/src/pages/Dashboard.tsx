import {Button} from "../components/Button.tsx";
import React  from "react";

const Dashboard: React.FC = () => {
  // Mock data for dashboard
  const stats = [
    { label: 'Total Books', value: 1250, icon: '📚' },
    { label: 'Registered Readers', value: 580, icon: '🧑‍🤝‍🧑' },
    { label: 'Books Currently Lent', value: 320, icon: '📖' },
    { label: 'Overdue Books', value: 15, icon: '⚠️' },
  ];

  return (
      <div className="p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Dashboard Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
              <div key={index} className="bg-indigo-50 border border-indigo-200 p-6 rounded-lg shadow-sm flex items-center space-x-4">
                <div className="text-4xl">{stat.icon}</div>
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-3xl font-bold text-indigo-700">{stat.value}</p>
                </div>
              </div>
          ))}
        </div>

        <div className="mt-10">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Button variant="primary" className="py-3 text-lg">Add New Book</Button>
            <Button variant="secondary" className="py-3 text-lg">Register New Reader</Button>
            <Button variant="primary" className="py-3 text-lg">Lend Book</Button>
          </div>
        </div>
      </div>
  );
};
export default Dashboard;