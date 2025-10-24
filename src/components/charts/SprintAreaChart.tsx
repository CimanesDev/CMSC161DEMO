import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { workData } from "@/data/mockData";

interface TeamMember {
  name: string;
  tasks: number;
  completed: number;
  inProgress: number;
  overdue: number;
}

interface SprintAreaChartProps {
  teamMembers: TeamMember[];
}

export const SprintAreaChart = ({ teamMembers }: SprintAreaChartProps) => {
  // Calculate cumulative progress based on team data
  const totalTasks = teamMembers.reduce((sum, member) => sum + member.tasks, 0);
  const totalCompleted = teamMembers.reduce((sum, member) => sum + member.completed, 0);

  // Create sprint progress data based on actual team progress
  const sprintData = workData.sprintProgress.map((day, index) => {
    // Calculate progress percentage for this day
    const progressPercentage = Math.min((index + 1) / 14, totalCompleted / totalTasks);
    const completed = Math.floor(totalTasks * progressPercentage);
    const remaining = totalTasks - completed;
    
    return {
      day: day.day,
      completed,
      remaining
    };
  });

  return (
    <div className="space-y-3">
      <div>
        <h3 className="text-base font-semibold text-gray-900">Cumulative Project Progress</h3>
        <p className="text-xs text-gray-600">14-Day Sprint Trend</p>
      </div>

      <ResponsiveContainer width="100%" height={200}>
        <AreaChart data={sprintData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis 
            dataKey="day" 
            stroke="#64748b"
            fontSize={12}
            tickFormatter={(value) => value.replace('Day ', 'D')}
          />
          <YAxis 
            stroke="#64748b"
            fontSize={12}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
            }}
            formatter={(value: number, name: string) => [
              value,
              name === 'completed' ? 'Completed Tasks' : 'Remaining Tasks'
            ]}
          />
          <Area 
            type="monotone" 
            dataKey="completed" 
            stroke="#10b981" 
            fill="#10b981"
            fillOpacity={0.3}
            strokeWidth={2}
            name="completed"
          />
          <Area 
            type="monotone" 
            dataKey="remaining" 
            stroke="#64748b" 
            fill="#64748b"
            fillOpacity={0.1}
            strokeWidth={2}
            name="remaining"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
