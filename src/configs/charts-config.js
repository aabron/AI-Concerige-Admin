export const chartsConfig = {
  chart: {
    toolbar: {
      show: false,
    },
  },
  title: {
    show: "",
  },
  dataLabels: {
    enabled: false,
  },
  xaxis: {
    axisTicks: {
      show: false,
    },
    axisBorder: {
      show: false,
    },
    labels: {
      style: {
        colors: "#D3D3D3",
        fontSize: "13px",
        fontFamily: "inherit",
        fontWeight: 300,
      },
      rotate: -45,
      rotateAlways: true,
      formatter: function (value) {
        return new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      },
    },
  },
  yaxis: {
    labels: {
      style: {
        colors: "#D3D3D3",
        fontSize: "13px",
        fontFamily: "inherit",
        fontWeight: 300,
      },
    },
    min: 0,
    tickAmount: 5,
    forceNiceScale: true,
  },
  grid: {
    show: true,
    borderColor: "#D3D3D3",
    strokeDashArray: 5,
    xaxis: {
      lines: {
        show: true,
      },
    },
    padding: {
      top: 5,
      right: 20,
    },
  },
  fill: {
    opacity: 0.8,
  },
  tooltip: {
    theme: "dark",
  },
};

export default chartsConfig;
