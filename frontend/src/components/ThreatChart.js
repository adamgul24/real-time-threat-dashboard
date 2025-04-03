
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, ArcElement, Tooltip, Legend);

const ThreatChart = () => {
  const [threats, setThreats] = useState([]);

  useEffect(() => {
    fetchThreats();
    const interval = setInterval(fetchThreats, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchThreats = async () => {
    const response = await axios.get('https://real-time-threat-dashboard.onrender.com/api/threats');
    setThreats(response.data);
  };

  const barData = {
    labels: threats.map(t => t.threat),
    datasets: [{
      label: 'Threat Counts',
      data: threats.map(t => t.count),
      backgroundColor: 'rgba(75, 192, 192, 0.6)'
    }]
  };

  const pieData = {
    labels: threats.map(t => t.threat),
    datasets: [{
      label: 'Threat Distribution',
      data: threats.map(t => t.count),
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF']
    }]
  };

  return (
    <div className="charts">
      <Bar data={barData} />
      <Pie data={pieData} />
    </div>
  );
};

export default ThreatChart;
