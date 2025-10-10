import React from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

// Gradient background utility for charts
const createGradient = (ctx, chartArea) => {
  const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
  gradient.addColorStop(0, 'rgba(255, 99, 132, 0.8)');
  gradient.addColorStop(1, 'rgba(255, 99, 132, 0.3)');
  return gradient;
};

// Mock data for all charts with consistent dark theme colors
const chartColors = {
  primary: 'rgba(255, 99, 132, 0.8)', // Red for critical
  secondary: 'rgba(54, 162, 235, 0.8)', // Blue for assets
  tertiary: 'rgba(75, 192, 192, 0.8)', // Teal for high value
  quaternary: 'rgba(153, 102, 255, 0.8)', // Purple for vulnerabilities
  quinary: 'rgba(255, 159, 64, 0.8)', // Orange for closed/exploitable
};

const mockTop5Risks = {
  labels: ['Risk A', 'Risk B', 'Risk C', 'Risk D', 'Risk E'],
  datasets: [{
    label: 'Risk Score',
    data: [95, 85, 75, 65, 55],
    backgroundColor: chartColors.primary,
    borderColor: 'rgba(255, 99, 132, 1)',
    borderWidth: 1,
  }],
};

const mockTop5VulnerableAssets = {
  labels: ['Asset 1', 'Asset 2', 'Asset 3', 'Asset 4', 'Asset 5'],
  datasets: [{
    label: 'Vulnerability Count',
    data: [50, 45, 40, 35, 30],
    backgroundColor: chartColors.secondary,
    borderColor: 'rgba(54, 162, 235, 1)',
    borderWidth: 1,
  }],
};

const mockTop5HighValueAssets = {
  labels: ['Asset X', 'Asset Y', 'Asset Z', 'Asset W', 'Asset V'],
  datasets: [{
    label: 'Value Score',
    data: [100, 90, 80, 70, 60],
    backgroundColor: chartColors.tertiary,
    borderColor: 'rgba(75, 192, 192, 1)',
    borderWidth: 1,
  }],
};

const mockTop5OpenVulnerabilities = {
  labels: ['Vuln-001', 'Vuln-002', 'Vuln-003', 'Vuln-004', 'Vuln-005'],
  datasets: [{
    label: 'Severity',
    data: [9.8, 8.5, 7.2, 6.9, 5.4],
    backgroundColor: chartColors.quaternary,
    borderColor: 'rgba(153, 102, 255, 1)',
    borderWidth: 1,
  }],
};

const mockTop5ClosedVulnerabilities = {
  labels: ['Vuln-006', 'Vuln-007', 'Vuln-008', 'Vuln-009', 'Vuln-010'],
  datasets: [{
    label: 'Severity',
    data: [9.0, 8.0, 7.0, 6.0, 5.0],
    backgroundColor: chartColors.quinary,
    borderColor: 'rgba(255, 159, 64, 1)',
    borderWidth: 1,
  }],
};

const mockTop5UniqueVulnerabilities = {
  labels: ['Unique-1', 'Unique-2', 'Unique-3', 'Unique-4', 'Unique-5'],
  datasets: [{
    label: 'Occurrences',
    data: [20, 18, 15, 12, 10],
    backgroundColor: chartColors.quaternary,
    borderColor: 'rgba(153, 102, 255, 1)',
    borderWidth: 1,
  }],
};

const mockCriticalVulnerabilities = {
  labels: ['Critical'],
  datasets: [{
    label: 'Count',
    data: [42],
    backgroundColor: [chartColors.primary],
    borderColor: ['rgba(255, 99, 132, 1)'],
    borderWidth: 1,
  }],
};

const mockHighVulnerabilities = {
  labels: ['High'],
  datasets: [{
    label: 'Count',
    data: [120],
    backgroundColor: [chartColors.quinary],
    borderColor: ['rgba(255, 159, 64, 1)'],
    borderWidth: 1,
  }],
};

const mockSLABreachedCount = {
  labels: ['SLA Breached'],
  datasets: [{
    label: 'Count',
    data: [15],
    backgroundColor: [chartColors.primary],
    borderColor: ['rgba(255, 99, 132, 1)'],
    borderWidth: 1,
  }],
};

const mockExceptionCount = {
  labels: ['Exceptions'],
  datasets: [{
    label: 'Count',
    data: [8],
    backgroundColor: [chartColors.tertiary],
    borderColor: ['rgba(75, 192, 192, 1)'],
    borderWidth: 1,
  }],
};

const mockBreachVulnerabilities = {
  labels: ['Breach-1', 'Breach-2', 'Breach-3', 'Breach-4', 'Breach-5'],
  datasets: [{
    label: 'Severity',
    data: [9.5, 8.8, 7.9, 6.5, 5.2],
    backgroundColor: chartColors.primary,
    borderColor: 'rgba(255, 99, 132, 1)',
    borderWidth: 1,
  }],
};

const mockExceptionVulnerabilities = {
  labels: ['Except-1', 'Except-2', 'Except-3', 'Except-4', 'Except-5'],
  datasets: [{
    label: 'Severity',
    data: [8.0, 7.5, 6.8, 5.9, 4.7],
    backgroundColor: chartColors.tertiary,
    borderColor: 'rgba(75, 192, 192, 1)',
    borderWidth: 1,
  }],
};

const mockTop5ExploitableVulnerabilities = {
  labels: ['Exploit-1', 'Exploit-2', 'Exploit-3', 'Exploit-4', 'Exploit-5'],
  datasets: [{
    label: 'Exploitability Score',
    data: [9.9, 9.2, 8.5, 7.8, 7.0],
    backgroundColor: chartColors.quinary,
    borderColor: 'rgba(255, 159, 64, 1)',
    borderWidth: 1,
  }],
};

// Chart options for Bar charts
const barOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top',
      labels: { color: '#e5e7eb' }, // Light gray for legend text
    },
    title: { display: false },
    tooltip: {
      backgroundColor: 'rgba(31, 41, 55, 0.9)', // Dark tooltip background
      titleColor: '#e5e7eb',
      bodyColor: '#e5e7eb',
    },
  },
  scales: {
    x: { ticks: { color: '#e5e7eb' }, grid: { display: false } },
    y: {
      beginAtZero: true,
      ticks: { color: '#e5e7eb' },
      grid: { color: 'rgba(255, 255, 255, 0.1)' },
    },
  },
  animation: {
    duration: 1000,
    easing: 'easeOutQuart',
  },
};

// Chart options for Doughnut charts
const doughnutOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top',
      labels: { color: '#e5e7eb' },
    },
    title: { display: false },
    tooltip: {
      backgroundColor: 'rgba(31, 41, 55, 0.9)',
      titleColor: '#e5e7eb',
      bodyColor: '#e5e7eb',
    },
  },
  animation: {
    duration: 1000,
    easing: 'easeOutQuart',
  },
};

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-white">Vulnerability Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-gray-800 p-6 rounded-lg shadow-xl">
          <h2 className="text-xl font-semibold mb-4 text-white">Top 5 Risks</h2>
          <div className="h-64">
            <Bar data={mockTop5Risks} options={barOptions} />
          </div>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg shadow-xl">
          <h2 className="text-xl font-semibold mb-4 text-white">Top 5 Vulnerable Assets</h2>
          <div className="h-64">
            <Bar data={mockTop5VulnerableAssets} options={barOptions} />
          </div>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg shadow-xl">
          <h2 className="text-xl font-semibold mb-4 text-white">Top 5 High Value Assets</h2>
          <div className="h-64">
            <Bar data={mockTop5HighValueAssets} options={barOptions} />
          </div>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg shadow-xl">
          <h2 className="text-xl font-semibold mb-4 text-white">Top 5 Open Vulnerabilities</h2>
          <div className="h-64">
            <Bar data={mockTop5OpenVulnerabilities} options={barOptions} />
          </div>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg shadow-xl">
          <h2 className="text-xl font-semibold mb-4 text-white">Top 5 Closed Vulnerabilities</h2>
          <div className="h-64">
            <Bar data={mockTop5ClosedVulnerabilities} options={barOptions} />
          </div>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg shadow-xl">
          <h2 className="text-xl font-semibold mb-4 text-white">Top 5 Unique Vulnerabilities</h2>
          <div className="h-64">
            <Bar data={mockTop5UniqueVulnerabilities} options={barOptions} />
          </div>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg shadow-xl">
          <h2 className="text-xl font-semibold mb-4 text-white">Critical Vulnerabilities</h2>
          <div className="h-64">
            <Doughnut data={mockCriticalVulnerabilities} options={doughnutOptions} />
          </div>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg shadow-xl">
          <h2 className="text-xl font-semibold mb-4 text-white">High Vulnerabilities</h2>
          <div className="h-64">
            <Doughnut data={mockHighVulnerabilities} options={doughnutOptions} />
          </div>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg shadow-xl">
          <h2 className="text-xl font-semibold mb-4 text-white">SLA Breached Vulnerabilities Count</h2>
          <div className="h-64">
            <Doughnut data={mockSLABreachedCount} options={doughnutOptions} />
          </div>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg shadow-xl">
          <h2 className="text-xl font-semibold mb-4 text-white">Exception Vulnerabilities Count</h2>
          <div className="h-64">
            <Doughnut data={mockExceptionCount} options={doughnutOptions} />
          </div>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg shadow-xl">
          <h2 className="text-xl font-semibold mb-4 text-white">Breach Vulnerabilities List</h2>
          <div className="h-64">
            <Bar data={mockBreachVulnerabilities} options={barOptions} />
          </div>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg shadow-xl">
          <h2 className="text-xl font-semibold mb-4 text-white">Exception Vulnerabilities List</h2>
          <div className="h-64">
            <Bar data={mockExceptionVulnerabilities} options={barOptions} />
          </div>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg shadow-xl">
          <h2 className="text-xl font-semibold mb-4 text-white">Top 5 Exploitable Vulnerabilities</h2>
          <div className="h-64">
            <Bar data={mockTop5ExploitableVulnerabilities} options={barOptions} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;