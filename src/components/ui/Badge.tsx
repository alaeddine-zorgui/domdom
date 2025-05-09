import { cn } from '../../utils/cn';

interface BadgeProps {
  children: React.ReactNode;
  color?: 'gray' | 'red' | 'yellow' | 'green' | 'blue' | 'indigo' | 'purple' | 'orange';
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

const Badge = ({ 
  children, 
  color = 'gray', 
  size = 'medium', 
  className 
}: BadgeProps) => {
  const colorStyles = {
    gray: 'bg-gray-100 text-gray-800',
    red: 'bg-red-100 text-red-800',
    yellow: 'bg-yellow-100 text-yellow-800',
    green: 'bg-green-100 text-green-800',
    blue: 'bg-blue-100 text-blue-800',
    indigo: 'bg-indigo-100 text-indigo-800',
    purple: 'bg-purple-100 text-purple-800',
    orange: 'bg-orange-100 text-orange-800',
  };

  const sizeStyles = {
    small: 'text-xs px-2 py-0.5',
    medium: 'text-xs px-2.5 py-0.5',
    large: 'text-sm px-3 py-0.5',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full font-medium',
        colorStyles[color],
        sizeStyles[size],
        className
      )}
    >
      {children}
    </span>
  );
};

export default Badge;