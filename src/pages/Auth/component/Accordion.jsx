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
      title: 'Scanning Tools',
      content: 'Our advanced scanning tools provide comprehensive vulnerability assessment capabilities, including port scanning, service detection, and vulnerability identification. We use industry-leading tools combined with custom scripts to ensure thorough coverage of your systems.',
    },
    {
      title: 'CISO as a Service',
      content: 'Get expert security leadership without the full-time cost. Our CISO as a Service offering provides strategic guidance, security program development, and ongoing advisory services to help you build and maintain a robust security posture.',
    },
    {
      title: 'Social Engineering',
      content: 'Test your organization\'s human security awareness through sophisticated social engineering campaigns. We simulate real-world attack scenarios including phishing, vishing, and physical security tests to identify potential vulnerabilities in your security awareness program.',
    },
    {
      title: 'Network Security',
      content: 'Comprehensive network security assessment including internal and external penetration testing, wireless network security analysis, and infrastructure vulnerability assessment. We help identify and remediate security gaps in your network architecture.',
    },
    {
      title: 'Application Security',
      content: 'In-depth security testing of web applications, mobile apps, and APIs. Our approach combines automated scanning with manual testing to uncover security flaws that automated tools might miss, including business logic vulnerabilities.',
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