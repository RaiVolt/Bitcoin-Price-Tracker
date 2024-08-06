import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
} from "chart.js";

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  CategoryScale
);

export interface LineChartData {
  rate_float: number;
  createdAt: string;
}

interface LineChartProps {
  prices: LineChartData[];
}

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Last 10 Bitcoin Prices",
    },
  },
};

export const LineChart: React.FC<LineChartProps> = ({ prices }) => {
  const data = {
    labels: prices.map((price) =>
      new Date(price.createdAt).toLocaleTimeString()
    ),
    datasets: [
      {
        label: "Bitcoin Price",
        data: prices.map((price) => price.rate_float),
        fill: false,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
      },
    ],
  };

  return <Line data={data} options={options} />;
};
