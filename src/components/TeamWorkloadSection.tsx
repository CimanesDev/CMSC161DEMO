import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TeamWorkloadChart } from "@/components/charts/TeamWorkloadChart";
import { SprintAreaChart } from "@/components/charts/SprintAreaChart";
import { TaskProgressRing } from "@/components/charts/TaskProgressRing";
import { BurndownModal } from "@/components/BurndownModal";
import { useState } from "react";

// Team members as specified
const teamMembers = [
  { name: 'Josh', tasks: 8, completed: 6, inProgress: 1, overdue: 1 },
  { name: 'Matthew', tasks: 7, completed: 5, inProgress: 2, overdue: 0 },
  { name: 'Albert', tasks: 9, completed: 7, inProgress: 1, overdue: 1 },
  { name: 'Zedric', tasks: 5, completed: 3, inProgress: 1, overdue: 1 },
  { name: 'Kurt', tasks: 6, completed: 4, inProgress: 2, overdue: 0 },
  { name: 'Gab', tasks: 4, completed: 2, inProgress: 1, overdue: 1 },
  { name: 'Andrei', tasks: 4, completed: 2, inProgress: 1, overdue: 1 },
  { name: 'Bryan', tasks: 3, completed: 1, inProgress: 1, overdue: 1 }
];

export const TeamWorkloadSection = () => {
  const [showBurndown, setShowBurndown] = useState(false);

  // Calculate total tasks
  const totalTasks = teamMembers.reduce((sum, member) => sum + member.tasks, 0);
  const totalCompleted = teamMembers.reduce((sum, member) => sum + member.completed, 0);
  const totalRemaining = totalTasks - totalCompleted;

  return (
    <div className="space-y-4">
      {/* Section Header */}
      <div className="text-center">
        <h2 className="text-xl font-bold text-gray-900 mb-1">Team Workload (Tasks)</h2>
        <p className="text-sm text-gray-600">Comparison & Status - Visualize team efficiency and project progress</p>
      </div>

      {/* KPI Card */}
      <Card className="bg-purple-50 border-purple-200">
        <CardContent className="p-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-600">Total Tasks Remaining</p>
              <p className="text-lg font-bold text-gray-900">{totalRemaining} Tasks Left</p>
            </div>
            <div className="text-right">
              <div className="text-green-600">
                <span className="text-xs font-medium">{totalCompleted} Completed</span>
              </div>
              <p className="text-xs text-gray-500">out of {totalTasks} total</p>
            </div>
          </div>
        </CardContent>
      </Card>


      {/* Charts Grid */}
      <div className="grid lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Individual Workload Comparison</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <TeamWorkloadChart teamMembers={teamMembers} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Cumulative Project Progress</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <SprintAreaChart teamMembers={teamMembers} />
          </CardContent>
        </Card>
      </div>

      {/* Progress Rings Grid */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Individual Task Completion</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {teamMembers.map((member) => {
              const completionRate = (member.completed / member.tasks) * 100;
              return (
                <div key={member.name} className="text-center space-y-2">
                  <div className="w-16 h-16 mx-auto">
                    <TaskProgressRing
                      value={completionRate}
                      size={64}
                      strokeWidth={6}
                      onClick={() => setShowBurndown(true)}
                    />
                  </div>
                  <div>
                    <p className="font-medium text-sm text-gray-900">{member.name}</p>
                    <p className="text-xs text-gray-600">{completionRate.toFixed(0)}% Complete</p>
                  </div>
                  <div className="space-y-1">
                    <div className="text-xs text-green-600">
                      <span>{member.completed} Done</span>
                    </div>
                    {member.inProgress > 0 && (
                      <div className="text-xs text-blue-600">
                        <span>{member.inProgress} In Progress</span>
                      </div>
                    )}
                    {member.overdue > 0 && (
                      <div className="text-xs text-red-600">
                        <span>{member.overdue} Overdue</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* HIG Principles */}
      <Card className="bg-slate-50 border-slate-200">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4 text-slate-900">Apple HIG Principles Demonstrated</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <span className="text-green-600 font-semibold">→</span>
                <span><strong>Glanceable Information:</strong> Progress rings show completion status at a glance</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-600 font-semibold">→</span>
                <span><strong>Analyzing Trends:</strong> Area chart tracks cumulative progress over time</span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <span className="text-purple-600 font-semibold">→</span>
                <span><strong>Comparing Items:</strong> Horizontal bars show workload distribution across team</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-teal-600 font-semibold">→</span>
                <span><strong>Consistency:</strong> Green for completed, Blue for in progress, Red for overdue</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <BurndownModal open={showBurndown} onOpenChange={setShowBurndown} />
    </div>
  );
};
