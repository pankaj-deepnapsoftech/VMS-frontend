

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
    value: "$8.2M",
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