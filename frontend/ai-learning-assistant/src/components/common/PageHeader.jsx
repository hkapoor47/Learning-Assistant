/**
 * Consistent title + subtitle + optional action button at the top of a page.
 *
 * <PageHeader title="Documents" subtitle="Upload study material..." />
 * <PageHeader title="Flashcards" action={<Button>New set</Button>} />
 */
const PageHeader = ({ title, subtitle, action }) => {
  return (
    <div className="flex items-start justify-between mb-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
        {subtitle && <p className="text-gray-400 mt-1">{subtitle}</p>}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
};

export default PageHeader;