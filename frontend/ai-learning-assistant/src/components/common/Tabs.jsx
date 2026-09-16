export default function Tabs({ tabs, activeTab, onChange }) {
    return (
        <div className="flex gap-1 border-b border-gray-200">
            {tabs.map((tab) => {
                const isActive = tab.value === activeTab;
                return (
                    <button
                        key={tab.value}
                        onClick={() => onChange(tab.value)}
                        className={`
                            relative px-4 py-2.5 text-sm font-medium transition-colors
                            ${isActive ? 'text-primary' : 'text-gray-500 hover:text-gray-800'}
                        `}
                    >
                        {tab.label}
                        {isActive && (
                            <span className="absolute left-0 right-0 -bottom-px h-0.5 bg-primary rounded-full" />
                        )}
                    </button>
                );
            })}
        </div>
    );
}