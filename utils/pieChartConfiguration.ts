export const pieChartOptions = {
  title: "",

  chart: {
    type: "pie",
    style: {
      fontFamily: "TT Commons, sans-serif",
      fontWeight: "normal",
      fontSize: "18px",
    },
    margin: 0,
    height: "90%",
  },
  plotOptions: {
    series: {
      animation: false,
      borderWidth: 0,
      enableMouseTracking: false,
    },
    pie: {
      innerSize: "70%",
      borderRadius: 0,
      startAngle: 80,
      shadow: {
        offsetX: -2,
        opacity: 0.1,
      },
    },
  },
};
