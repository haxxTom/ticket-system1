import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const data = [
  { name: 'Červené', value: 400 },
  { name: 'Modré', value: 300 },
  { name: 'Žluté', value: 300 },
  { name: 'Zelené', value: 200 },
];

const COLORS = ['#FF6384', '#36A2EB', '#FFCE56', '#4CAF50'];

export default function MyPieChart() {
  return (
    <div className=" flex justify-end">
      <PieChart width={400} height={400}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={120}
          dataKey="value"
          label
        >
          {data.map((entry, index) => (
            <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
}