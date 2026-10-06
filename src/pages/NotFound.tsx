import { Link, useLocation } from 'react-router-dom';
import { usePageSeo } from '@/lib/seo';

export default function NotFound() {
  const location = useLocation();
  usePageSeo({ title: 'Page not found | ABP Interior', description: 'This page could not be found. Browse services, projects or contact ABP Interior in Ahmedabad.', path: location.pathname, robots: 'noindex, follow' });
  return (
    <section className="mx-auto max-w-3xl px-4 py-24 text-center">
      <h1 className="text-4xl font-bold text-gray-900">Page not found</h1>
      <p className="mt-4 text-gray-600">The page may have moved or is no longer available.</p>
      <div className="mt-8 flex flex-wrap justify-center gap-5">
        <Link className="text-primary underline-offset-4 hover:underline" to="/">Home</Link>
        <Link className="text-primary underline-offset-4 hover:underline" to="/services">Services</Link>
        <Link className="text-primary underline-offset-4 hover:underline" to="/contact">Contact</Link>
      </div>
    </section>
  );
}