
import { Loader2 } from 'lucide-react';

const variants = {
  primary: 'bg-emerald-500 hover:bg-emerald-600 text-white',
  secondary: 'bg-gray-100 hover:bg-gray-200 text-gray-700',
  danger: 'bg-red-500 hover:bg-red-600 text-white',
  outline: 'border border-gray-200 hover:bg-gray-50 text-gray-700',
  ghost: 'hover:bg-gray-100 text-gray-600',
};

const sizes = {
  sm: 'text-xs px-3 py-1.5',
  md: 'text-sm px-4 py-2.5',
  lg: 'text-sm px-6 py-3',
};

/**
 * Shared button used across the app.
 *
 * <Button onClick={...}>Save changes</Button>
 * <Button variant="danger" size="sm" onClick={...}>Delete</Button>
 * <Button loading icon={Sparkles}>Generate quiz</Button>
 */
const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  loading = false,
  disabled = false,
  type = 'button',
  className = '',
  onClick,
  ...rest
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-colors disabled:opacity-60 disabled:cursor-not-allowed ${variants[variant]} ${sizes[size]} ${className}`}
      {...rest}
    >
      {loading ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : Icon ? (
        <Icon className="w-4 h-4" />
      ) : null}
      {children}
    </button>
  );
};

export default Button;