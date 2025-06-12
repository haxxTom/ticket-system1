import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement } from "chart.js";
import MyPieChart from './userPie';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const data = {
  labels: ["Po", "Út", "St", "Čt", "Pá", "So", "Ne"],
  datasets: [
    {
      label: "Odpracované hodiny",
      data: [2, 4, 3, 5, 6, 0, 0],
      fill: false,
      borderColor: "#3b82f6",
      tension: 0.3,
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      display: true,
    },
  },
};

export default function Dashboard() {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">📊 Přehled práce</h1>

      <div className="bg-white rounded-xl shadow p-4 max-w-3xl">
        <Line data={data} options={options} />
      </div>
      <MyPieChart />
    </div>
  );
}
