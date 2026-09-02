/**
 * Simple controlled tabs.
 *
 * const [active, setActive] = useState('overview');
 * <Tabs
 *   tabs={[{ value: 'overview', label: 'Overview' }, { value: 'history', label: 'History' }]}
 *   active={active}
 *   onChange={setActive}
 * />
 */
const Tabs = ({ tabs, active, onChange }) => {
  return (
    <div className="flex items-center gap-1 border-b border-gray-100">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() => onChange(tab.value)}
          className={`px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors ${
            active === tab.value
              ? 'border-emerald-500 text-emerald-600'
              : 'border-transparent text-gray-400 hover:text-gray-600'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default Tabs;