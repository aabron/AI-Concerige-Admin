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

    if (!countsByName[item.business__name]) {
      countsByName[item.business__name] = 0;
    }
    countsByName[item.business__name] += item.count;
  });

  // Sort countsByDate by date keys
  const sortedDates = Object.keys(countsByDate).sort((a, b) => new Date(a) - new Date(b));
  const sortedCountsByDate = sortedDates.reduce((acc, date) => {
    acc[date] = countsByDate[date];
    return acc;
  }, {});

  const series = [
    {
      name: eventType,
      data: Object.values(sortedCountsByDate),
    },
  ];

  const categories = Object.keys(sortedCountsByDate);

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
        labels: {
          rotate: -45,
          rotateAlways: true,
          formatter: function (value) {
            return new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
          },
        },
      },
      yaxis: {
        min: 0,
        tickAmount: 5,
        forceNiceScale: true,
      },
    },
  };
};
