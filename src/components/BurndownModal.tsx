import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { workData } from "@/data/mockData";

interface BurndownModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const BurndownModal = ({ open, onOpenChange }: BurndownModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Sprint Burn-down Chart</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 pt-4">
          <p className="text-sm text-muted-foreground">
            Tracking remaining work vs. ideal progress. We're slightly behind schedule with 6 tasks remaining.
          </p>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={workData.burndown}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="day" 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickFormatter={(value) => value.replace('Day ', 'D')}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                label={{ value: 'Tasks Remaining', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                }}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="ideal" 
                stroke="hsl(var(--chart-blue))" 
                strokeWidth={2}
                strokeDasharray="5 5"
                name="Ideal Progress"
              />
              <Line 
                type="monotone" 
                dataKey="remaining" 
                stroke="hsl(var(--chart-orange))" 
                strokeWidth={3}
                name="Actual Remaining"
                dot={{ fill: 'hsl(var(--chart-orange))', r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </DialogContent>
    </Dialog>
  );
};
