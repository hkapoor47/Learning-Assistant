import { Loader2 } from 'lucide-react';

const SIZES = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-10 h-10',
};

export default function Spinner({ size = 'md', className = '', label }) {
    return (
        <div className="flex flex-col items-center justify-center gap-2 text-primary">
            <Loader2 className={`${SIZES[size]} animate-spin ${className}`} />
            {label && <span className="text-sm text-gray-500">{label}</span>}
        </div>
    );
}