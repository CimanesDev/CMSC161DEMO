import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface TeamMember {
  name: string;
  tasks: number;
  completed: number;
  inProgress: number;
  overdue: number;
}

interface TeamWorkloadChartProps {
  teamMembers: TeamMember[];
}

export const TeamWorkloadChart = ({ teamMembers }: TeamWorkloadChartProps) => {
  // Sort team members by task count (largest to smallest)
  const sortedMembers = [...teamMembers].sort((a, b) => b.tasks - a.tasks);
  
  const minWorkload = Math.min(...teamMembers.map(m => m.tasks));
  const memberWithMin = teamMembers.find(m => m.tasks === minWorkload);

  return (
    <div className="space-y-3">
      <div>
        <h3 className="text-base font-semibold text-gray-900">Team Workload</h3>
        <p className="text-xs text-gray-600">
          {memberWithMin?.name} has the lowest load ({minWorkload} tasks)
        </p>
      </div>

      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={sortedMembers} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis 
            type="number" 
            stroke="#64748b"
            fontSize={12}
          />
          <YAxis 
            dataKey="name" 
            type="category"
            stroke="#64748b"
            fontSize={12}
            width={80}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
            }}
            formatter={(value: number) => [`${value} tasks`, 'Assigned']}
          />
          <Bar 
            dataKey="tasks" 
            fill="#8b5cf6" 
            radius={[0, 4, 4, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
