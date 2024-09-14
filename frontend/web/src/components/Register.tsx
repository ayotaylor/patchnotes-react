import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {

    const token = localStorage.getItem('token');

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg">
            <h3 className="text-2xl font-bold text-center">Dashboard</h3>
            <div>{token}</div>
          </div>
        </div>
    );
};

export default Dashboard;