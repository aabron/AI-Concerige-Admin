import { chartsConfig } from "@/configs";

export const prepareChartData = (data, eventType) => {
  const filteredData = data.filter(item => item.event_type === eventType);
  const countsByDate = {};
  const countsByName = {};

  filteredData.forEach(item => {
    const date = new Date(item.timestamp).toLocaleDateString('en-US');
    if (!countsByDate[date]) {
      countsByDate[date] = 0;
    }
    countsByDate[date] += item.count;
    // console.log(item)

    if (!countsByName[item.business__name]) {
      countsByName[item.business__name] = 0;
    }
    countsByName[item.business__name] += item.count;
  });

  const series = [
    {
      name: eventType,
      data: Object.values(countsByDate),
    },
  ];

  const categories = Object.keys(countsByDate);

  return {
    type: "line",
    height: 220,
    series,
    options: {
      ...chartsConfig,
      colors: ["#0288d1"],
      stroke: {
        lineCap: "round",
      },
      markers: {
        size: 5,
      },
      xaxis: {
        ...chartsConfig.xaxis,
        categories: categories,
      },
    },
  };
};

  