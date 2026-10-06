import { Link, useParams } from 'react-router-dom';
import Breadcrumbs from '@/components/Breadcrumbs';
import { createBreadcrumbSchema, serviceSeoPages } from '@/lib/seo-content';
import { usePageSeo } from '@/lib/seo';

export default function ServiceLanding() {
  const { slug } = useParams();
  const page = serviceSeoPages.find((item) => item.path === `/${slug}`);
  const crumbs = page ? [{ label: 'Home', path: '/' }, { label: 'Services', path: '/services' }, { label: page.category }] : [];
  usePageSeo({
    title: page?.title ?? 'Service not found | ABP Interior',
    description: page?.description ?? 'The requested service page could not be found.',
    path: page ? `${page.path}/` : '/404',
    robots: page ? 'index, follow' : 'noindex, follow',
    structuredData: page ? createBreadcrumbSchema(crumbs.map((crumb) => ({ name: crumb.label, path: crumb.path ?? page.path }))) : null,
  });

  if (!page) return <div className="mx-auto max-w-4xl px-4 py-24"><h1 className="text-3xl font-bold">Service not found</h1><Link className="mt-5 inline-block text-primary" to="/services">Browse services</Link></div>;

  return (
    <div className="pt-16 min-h-screen">
      <Breadcrumbs items={crumbs} />
      <section className="mx-auto max-w-4xl px-4 py-12 md:py-16">
        <p className="mb-3 font-semibold text-primary">{page.category} · Ahmedabad, Gujarat</p>
        <h1 className="text-4xl font-bold text-gray-900">{page.h1}</h1>
        <p className="mt-5 text-xl text-gray-700">{page.description}</p>
        <div className="prose prose-lg mt-8 max-w-none text-gray-700">
          {page.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
        <h2 className="mt-10 text-2xl font-bold text-gray-900">Related services</h2>
        <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-3">
          {page.related.map((relatedSlug) => {
            const relatedPage = serviceSeoPages.find((item) => item.path === `/${relatedSlug}`);
            return relatedPage ? <li key={relatedSlug}><Link className="font-medium text-primary underline-offset-4 hover:underline" to={relatedPage.path}>{relatedPage.h1}</Link></li> : null;
          })}
        </ul>
        <Link to="/contact" className="mt-10 inline-flex rounded-md bg-primary px-6 py-3 font-semibold text-white">Discuss your project</Link>
      </section>
    </div>
  );
}