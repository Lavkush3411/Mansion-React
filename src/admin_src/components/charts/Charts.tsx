import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
  ChartData,
  ArcElement,
} from "chart.js";
import { Bar, Doughnut } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const months = ["January", "February", "March", "April", "May", "June", "July"];

interface BarChartProps {
  title: string;
  horizontal?: boolean;
  bar_data: number[];
  bgcolor: string;
  labels?: string[];
}

export function BarChart({
  title,
  horizontal = false,
  bar_data,
  bgcolor,
  labels = months,
}: BarChartProps) {
  const options: ChartOptions<"bar"> = {
    responsive: true,
    indexAxis: horizontal ? "y" : "x",
    plugins: {
      legend: {
        display: false,
        position: "top" as const,
      },
      title: {
        display: true,
        text: title,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          display: false,
        },
      },
      x: {
        beginAtZero: true,
        grid: {
          display: false,
        },
      },
    },
  };

  const data: ChartData<"bar", number[], string> = {
    labels,
    datasets: [
      {
        label: title,
        data: bar_data,
        backgroundColor: bgcolor,
        barThickness: 30,
      },
    ],
  };

  return <Bar options={options} data={data} />;
}

// Doughnut Chart Section

interface DoughnutChartProps {
  labels?: string[];
  doghnut_data: number[];
  colors: string[];
  title: string;
  offsets?: number[];
}

export function DoughnutChart({
  labels = months,
  doghnut_data,
  colors,
  title,
  offsets = [0, 40],
}: DoughnutChartProps) {
  const data: ChartData<"doughnut"> = {
    labels,
    datasets: [
      {
        data: doghnut_data,
        label: title,
        backgroundColor: colors,
        borderColor: ["rgb(228, 225, 221)"],
        offset: offsets,
      },
    ],
  };
  const options: ChartOptions<"doughnut"> = {
    plugins: {
      legend: {
        display: true,
        position: "bottom" as const,
      },
    },
  };
  return <Doughnut options={options} data={data} />;
}
