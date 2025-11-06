export const summaryData = (data) => {
  return [
    {
      title: "Risk Score",
      value: data?.risk_score ? data?.risk_score : "0",
      change: "-12%",
      trendColor: "text-red-400",
      icon: "/Icons/executive1.png",
      backgroundColor: "blue",
    },
    {
      title: "Financial Exposure",
      value: data?.financial ? `${data?.financial / 10000000} M ` : "0 M",
      change: "-8%",
      trendColor: "text-orange-400",
      icon: "/Icons/executive2.png",
    },
    {
      title: "MTTR",
      value: `${data?.mttr ? data?.mttr : '0'} days`,
      change: "+15%",
      trendColor: "text-green-400",
      icon: "/Icons/executive3.png",
    },
  ];
};

export const firstChartDatady = (data) => {
  return [
    { label: "Open", value: data?.Open, color: "#EF4444" },
    { label: "Closed", value: data?.Closed, color: "#22C55E" },
    { label: "Exception", value: data?.exception, color: "#F97316" },
    { label: "False Positive", value: data?.False_Positive, color: "#3B82F6" },
  ];
};

export const CardsData = (tvmCardsData) => {
  return [
    {
      title: "Applications",
      value: (tvmCardsData?.businessApplication || 0).toString(),
      icon: "/Icons/TVM1.png",
      color: "#3B82F6",
      url: "/business-applications",
    },
    {
      title: "Infrastructure IPs",
      value: (tvmCardsData?.infrastructure || 0).toString(),
      icon: "/Icons/TVM2.png",
      color: "#22C55E",
      url: "/infraStructure-asset",
    },
    {
      title: "Total Vulnerabilities",
      value: (tvmCardsData?.vulnerableData || 0).toString(),
      icon: "/Icons/TVM3.png",
      color: "#EF4444",
    },
    {
      title: "Remediated",
      value: (tvmCardsData?.Remediated || 0).toString(),
      icon: "/Icons/TVM4.png",
      color: "#10B981",
    },
    {
      title: "Exceptions",
      value: (tvmCardsData?.expections || 0).toString(),
      icon: "/Icons/TVM5.png",
      color: "#F59E0B",
      url: "/pending-exception",
    },
  ];
};

export const SecondChartDatady = (data) => {
  return {
    labels: data?.label,
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
};

export const assetData = (asset) => {
  return [
    {
      color: "bg-blue-500",
      name: "Infrastructure Asset",
      total: asset?.infrastructor?.totalCount?.count || 0,
      critical: asset?.infrastructor?.critical?.count || 0,
    },
    {
      color: "bg-red-500",
      name: "Business Application",
      total: asset?.businessApplication?.totalCount?.count || 0,
      critical: asset?.businessApplication?.critical?.count || 0,
    },
  ];
};

export const FinancialExposure = (data) => {
  if (data) {
    const keys = Object.keys(data);
    return [
      {
        label: keys[0],
        value: `${(data[keys[0]] / 1000000).toFixed(5) || 0}M`,
        color: "#FF5C5C",
        width: "100%",
      },
      {
        label: keys[1],
        value: `${(data[keys[1]] / 1000000).toFixed(5) || 0}M`,
        color: "#FFA93B",
        width: "33%",
      },
      {
        label: keys[2],
        value: `${(data[keys[2]] / 1000000).toFixed(5) || 0}M`,
        color: "#FFD233",
        width: "20%",
      },
    ]
  } else {
    return []
  }
};

export const TopFiveRiskIndicator = (data) => {
  return data ?  data.map((item)=> ({title:item?.title,score:`${item?.RAS}`,level:item?.severity,exposure:`${item?.exposure} M`})) : [];

}



export const RemidationWorkflowDynomic = (data) => {

  const color = ['#4D9EFF','#FFA93B','#27D27D']
  if(!data){
    return [];
  }else {
    return data?.data?.map((item,i) => ({
                  label: item.name,
                  value: item.count,
                  color: color[i],
                  width: `${  item.count / data.total  * 100}%`,
            }))
  }

}

