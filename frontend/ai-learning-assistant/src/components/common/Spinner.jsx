const sizes = {
  sm: 'w-4 h-4 border-2',
  md: 'w-6 h-6 border-2',
  lg: 'w-10 h-10 border-[3px]',
};

/**
 * <Spinner />
 * <Spinner size="lg" />
 * <Spinner fullScreen label="Loading your dashboard..." />
 */
const Spinner = ({ size = 'md', fullScreen = false, label }) => {
  const spinner = (
    <div className="flex flex-col items-center gap-3">
      <div
        className={`${sizes[size]} rounded-full border-gray-200 border-t-emerald-500 animate-spin`}
      />
      {label && <p className="text-sm text-gray-400">{label}</p>}
    </div>
  );

  if (fullScreen) {
    return <div className="flex items-center justify-center h-screen">{spinner}</div>;
  }

  return spinner;
};

export default Spinner;