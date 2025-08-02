

export const summaryData = (data) => {
    return  [
  {
    title: "Risk Score",
    value: data?.risk_score ? data?.risk_score : '0',
    change: "-12%",
    trendColor: "text-red-400",
    icon: "/Icons/executive1.png",
    backgroundColor: "blue",
  },
  {
    title: "Financial Exposure",
    value: data?.financial ? `${(data?.financial/10000000)} M `: '0 M',
    change: "-8%",
    trendColor: "text-orange-400",
    icon: "/Icons/executive2.png",
  },
  {
    title: "MTTR",
    value: "4.2 days",
    change: "+15%",
    trendColor: "text-green-400",
    icon: "/Icons/executive3.png",
  },
  {
    title: "Compliance Score",
    value: "94%",
    change: "+3%",
    trendColor: "text-blue-400",
    icon: "/Icons/executive4.png",
  },
];
}

export const firstChartDatady = (data) => {

  return  [
  { label: "Open", value: data?.Open, color: "#EF4444" },
  { label: "Closed", value: data?.Closed, color: "#22C55E" },
  { label: "Re Open", value: data?.Re_Open, color: "#F97316" },
  { label: "False Positive", value: data?.False_Positive, color: "#3B82F6" },
];
}

export const CardsData = (tvmCardsData) => {
return   [
    {
      title: "Applications",
      value: tvmCardsData.applications.toString(),
      icon: "/Icons/TVM1.png",
      color: "#3B82F6",
    },
    {
      title: "Infrastructure IPs",
      value: tvmCardsData.infrastructureIPs.toString(),
      icon: "/Icons/TVM2.png",
      color: "#22C55E",
    },
    {
      title: "Total Vulnerabilities",
      value: tvmCardsData.totalVulnerabilities.toString(),
      icon: "/Icons/TVM3.png",
      color: "#EF4444",
    },
    {
      title: "Remediated",
      value: tvmCardsData.remediated.toString(),
      icon: "/Icons/TVM4.png",
      color: "#10B981",
    },
    {
      title: "Exceptions",
      value: tvmCardsData.exceptions.toString(),
      icon: "/Icons/TVM5.png",
      color: "#F59E0B",
    },
  ];
};


export const SecondChartDatady = (data) => {
   
 return {
    labels:data?.label,
    datasets: [
      {
        label: "Critical",
        data: data?.Critical,
        borderColor: "#EF4444",
        backgroundColor: "rgba(239,68,68,0.3)",
        fill: true,
        tension: 0.4,
      },
      {
        label: "High",
        data: data?.High,
        borderColor: "#F97316",
        backgroundColor: "rgba(249,115,22,0.3)",
        fill: true,
        tension: 0.4,
      },
      {
        label: "Medium",
        data: data?.Medium,
        borderColor: "#FACC15",
        backgroundColor: "rgba(250,204,21,0.3)",
        fill: true,
        tension: 0.4,
      },
      {
        label: "Low",
        data: data?.Low,
        borderColor: "#22C55E",
        backgroundColor: "rgba(34,197,94,0.3)",
        fill: true,
        tension: 0.4,
      },
      {
        label: "Informational",
        data: data?.Informational,
        borderColor: "#3B82F6",
        backgroundColor: "rgba(59,130,246,0.3)",
        fill: true,
        tension: 0.4,
      },
    ],
  };
}