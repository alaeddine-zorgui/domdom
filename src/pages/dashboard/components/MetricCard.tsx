import { ReactNode } from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { cn } from '../../../utils/cn';
import Card from '../../../components/ui/Card';

interface MetricCardProps {
  title: string;
  value: string;
  subtitle?: string;
  change?: number;
  trend?: 'up' | 'down' | 'neutral';
  isNegativeTrendGood?: boolean;
  icon?: ReactNode;
}

const MetricCard = ({
  title,
  value,
  subtitle,
  change,
  trend = 'neutral',
  isNegativeTrendGood = false,
  icon,
}: MetricCardProps) => {
  const getTrendColor = () => {
    if (trend === 'neutral') return 'text-gray-500';
    
    const isPositive = trend === 'up';
    const isGood = isNegativeTrendGood ? !isPositive : isPositive;
    
    return isGood ? 'text-success-500' : 'text-error-500';
  };

  const getTrendIcon = () => {
    if (trend === 'up') return <TrendingUp size={16} className={getTrendColor()} />;
    if (trend === 'down') return <TrendingDown size={16} className={getTrendColor()} />;
    return <Minus size={16} className={getTrendColor()} />;
  };

  return (
    <Card className="animate-fade-in">
      <div className="p-6">
        <div className="flex items-center">
          {icon && <div className="mr-4">{icon}</div>}
          <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        </div>
        <div className="mt-2">
          <p className="text-3xl font-semibold text-gray-900">{value}</p>
          {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
          {change !== undefined && (
            <div className="flex items-center mt-2">
              {getTrendIcon()}
              <span className={cn('text-sm ml-1', getTrendColor())}>
                {Math.abs(change)}%
              </span>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default MetricCard;