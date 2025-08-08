import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const chartData = {
  riskScoreDetail: {
    title: 'Enterprise Risk Score Details',
    type: 'line',
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    data: [620, 630, 640, 655, 670, 682],
    color: '#1c73e8',
    info: 'Trend shows a gradual increase in overall risk score driven by new vulnerabilities.',
  },
  riskExposureDetail: {
    title: 'Risk Exposure Breakdown',
    type: 'bar',
    labels: ['Cloud', 'Network', 'Apps', 'Users'],
    data: [3.5, 2.8, 2.1, 1.6],
    color: ['#e63946', '#f4a261', '#e9c46a', '#2a9d8f'],
    info: 'Cloud and Network layers have the highest exposure, requiring immediate attention.',
  },
  complianceDetail: {
    title: 'Compliance Posture Detail',
    type: 'doughnut',
    labels: ['Compliant', 'Non-Compliant'],
    data: [82, 18],
    color: ['#2a9d8f', '#e63946'],
    info: '18% of assets are non-compliant; prioritize remediation for critical policies.',
  },
  heatmapDetail: {
    title: 'Risk Heatmap Detail',
    type: 'bar',
    labels: ['Asset A', 'Asset B', 'Asset C'],
    data: [10, 15, 12],
    color: '#1c73e8',
    info: 'Clusters show high-risk assets concentrated in X=4-6, Y=4-6 segment.',
  },
  vulnerabilityDetail: {
    title: 'Top Exploitable Vulnerabilities',
    type: 'bar',
    labels: ['V1', 'V2', 'V3', 'V4', 'V5'],
    data: [95, 90, 85, 80, 75],
    color: '#e63946',
    info: 'Critical vulnerabilities include V1-V3; patching required immediately.',
  },
  kevDetail: {
    title: 'KEV Coverage Detail',
    type: 'doughnut',
    labels: ['Covered', 'Uncovered'],
    data: [65, 35],
    color: ['#264653', '#e9c46a'],
    info: '65% of Known Exploited Vulnerabilities are covered; improve gap coverage.',
  },
};

const DemoDashboard = () => {
  const chartRefs = useRef({});

  useEffect(() => {
    Object.entries(chartData).forEach(([key, config]) => {
      const ctx = chartRefs.current[key];
      if (ctx) {
        if (ctx.chartInstance) {
          ctx.chartInstance.destroy();
        }

        ctx.chartInstance = new Chart(ctx, {
          type: config.type,
          data: {
            labels: config.labels,
            datasets: [
              {
                label: config.title,
                data: config.data,
                backgroundColor: config.color,
                borderColor: typeof config.color === 'string' ? config.color : undefined,
                tension: 0.3,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                labels: { color: 'white' },
              },
            },
            scales: {
              x: {
                ticks: { color: 'white' },
              },
              y: {
                ticks: { color: 'white' },
              },
            },
          },
        });
      }
    });
  }, []);

  return (
    <div className="dark bg-gray-900 text-white min-h-screen">
      <header className="bg-modalBg p-4 flex justify-between items-center text-white">
        <span className="text-xl font-semibold">Risk Operations Center Dashboard</span>
        <button className="bg-blue-800 hover:bg-blue-700 px-4 py-2 rounded">Apply Filters</button>
      </header>

      <main className="p-6 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(chartData).map(([key, { title, info }]) => (
            <div
              key={key}
              className="bg-gray-800 p-4 rounded-xl shadow-lg transition flex flex-col"
            >
              <h3 className="text-blue-400 text-lg font-semibold mb-2">{title}</h3>
              <div className="h-64 mb-3">
                <canvas ref={(el) => (chartRefs.current[key] = el)} />
              </div>
              <p className="text-sm text-gray-300">{info}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default DemoDashboard;
