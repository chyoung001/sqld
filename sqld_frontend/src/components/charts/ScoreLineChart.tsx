import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  ResponsiveContainer,
} from 'recharts';
import type { DashboardOverview } from '@/types';

interface Props {
  data: DashboardOverview['scoreProgression'];
}

export function ScoreLineChart({ data }: Props) {
  // x축 라벨을 1회, 2회 ... 형식으로
  const chartData = data.map((d, i) => ({
    label: `${i + 1}회`,
    score: d.score,
    movingAvg: d.movingAvg3,
  }));

  return (
    <div className="w-full h-[200px]">
      <ResponsiveContainer>
        <LineChart data={chartData} margin={{ top: 8, right: 12, bottom: 4, left: -12 }}>
          <CartesianGrid stroke="#E0E0D9" strokeDasharray="2 2" vertical={false} />
          <XAxis
            dataKey="label"
            tickLine={false}
            axisLine={{ stroke: '#E0E0D9' }}
            tick={{ fontSize: 11, fill: '#8B8B86' }}
          />
          <YAxis
            domain={[40, 100]}
            ticks={[40, 60, 80, 100]}
            tickLine={false}
            axisLine={false}
            tick={{ fontSize: 11, fill: '#8B8B86' }}
            tickFormatter={(v) => `${v}점`}
          />
          <ReferenceLine
            y={60}
            stroke="#9B6F11"
            strokeDasharray="4 4"
            strokeWidth={1.5}
            label={{ value: '합격선', position: 'right', fontSize: 10, fill: '#9B6F11' }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#FAFAF7',
              border: '1px solid #E0E0D9',
              borderRadius: 6,
              fontSize: 12,
            }}
            formatter={(v: number) => [`${Math.round(v)}점`, '점수']}
            labelStyle={{ color: '#5A5A56' }}
          />
          <Line
            type="monotone"
            dataKey="score"
            stroke="#1F5BAA"
            strokeWidth={2}
            dot={{ r: 3.5, fill: '#1F5BAA', strokeWidth: 0 }}
            activeDot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
