import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';

const AccordionItem = ({ title, isSelected, onClick }) => {
  return (
    <button
      className={`w-full py-4 px-6 flex items-center justify-between text-left transition-colors ${
        isSelected ? 'bg-indigo-50 border-r-4 border-indigo-600' : 'hover:bg-gray-50'
      }`}
      onClick={onClick}
    >
      <span className={`text-lg font-medium ${isSelected ? 'text-indigo-900' : 'text-gray-900'}`}>
        {title}
      </span>
      <ChevronRight
        className={`w-5 h-5 ${isSelected ? 'text-indigo-600' : 'text-gray-500'}`}
      />
    </button>
  );
};

const Accordion = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const items = [
    {
      title: 'Scanning Tools ',
      content: 'Advanced vulnerability assessments, including port scanning and service detection.',
    },
    {
      title: 'CISO as a Service',
      content: 'Expert security leadership tailored to your business needs.',
    },
    {
      title: 'Social Engineering',
      content: 'Simulating real-world attacks to strengthen your human firewall.',
    },
    {
      title: 'Network Security',
      content: 'Comprehensive defense against network-based threats.',
    },
    {
      title: 'Application Security',
      content: '– Securing web and mobile applications with deep penetration testing.',
    },
  ];

  return (
    <div className="flex bg-white rounded-xl overflow-hidden shadow-lg">
      <div className="w-1/3 border-r border-gray-200">
        {items.map((item, index) => (
          <AccordionItem
            key={index}
            title={item.title}
            content={item.content}
            isSelected={selectedIndex === index}
            onClick={() => setSelectedIndex(index)}
          />
        ))}
      </div>
      <div className="w-2/3 p-8">
        <h3 className="text-2xl font-semibold text-gray-900 mb-4">
          {items[selectedIndex].title}
        </h3>
        <p className="text-gray-600 leading-relaxed">
          {items[selectedIndex].content}
        </p>
      </div>
    </div>
  );
};

export default Accordion;