import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

export function AreaChart() {
  const options = {
    chart: {
      type: "spline",
      height: 180,
      width: 520,
    },
    title: {
      text: "My chart",
    },
    series: [
      {
        data: [1, 2, 1, 4, 3, 6],
      },
    ],
    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 600,
          },
          chartOptions: {
            chart: { width: 300 },
          },
        },
      ],
    },
  } as Highcharts.Options;
  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
}
