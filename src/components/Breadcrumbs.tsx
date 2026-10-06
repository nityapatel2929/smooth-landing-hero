import { Link } from 'react-router-dom';

export type Crumb = { label: string; path?: string };

export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mx-auto w-full max-w-7xl px-4 pt-5 text-sm text-gray-600">
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, index) => (
          <li key={`${item.label}-${index}`} className="flex items-center gap-2">
            {index > 0 && <span aria-hidden="true">/</span>}
            {item.path && index < items.length - 1 ? (
              <Link className="underline-offset-4 hover:underline" to={item.path}>{item.label}</Link>
            ) : (
              <span aria-current="page">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}