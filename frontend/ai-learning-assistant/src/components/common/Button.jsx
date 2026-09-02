import { Loader2 } from 'lucide-react';

const VARIANTS = {
    primary: 'bg-primary text-white hover:brightness-95 active:brightness-90',
    secondary: 'bg-gray-100 text-gray-800 hover:bg-gray-200',
    outline: 'border border-gray-300 text-gray-700 hover:bg-gray-50',
    ghost: 'text-gray-600 hover:bg-gray-100',
    danger: 'bg-red-500 text-white hover:bg-red-600',
};

const SIZES = {
    sm: 'px-3 py-1.5 text-sm gap-1.5',
    md: 'px-4 py-2.5 text-sm gap-2',
    lg: 'px-6 py-3 text-base gap-2',
};

export default function Button({
    children,
    variant = 'primary',
    size = 'md',
    icon: Icon,
    loading = false,
    disabled = false,
    className = '',
    type = 'button',
    ...props
}) {
    return (
        <button
            type={type}
            disabled={disabled || loading}
            className={`
                inline-flex items-center justify-center font-medium rounded-xl
                transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed
                ${VARIANTS[variant]} ${SIZES[size]} ${className}
            `}
            {...props}
        >
            {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
                Icon && <Icon className="w-4 h-4" />
            )}
            {children}
        </button>
    );
}