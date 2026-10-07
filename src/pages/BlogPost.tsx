import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import DOMPurify from 'dompurify';
import { getPublishedPost, getVisibleFaqs, type BlogPost as Post, type Faq } from '@/lib/cms';
import Breadcrumbs from '@/components/Breadcrumbs';
import { SEO_BASE_URL, createBreadcrumbSchema } from '@/lib/seo-content';
import { usePageSeo } from '@/lib/seo';

export default function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [faqs, setFaqs] = useState<Faq[]>([]);
  const [loaded, setLoaded] = useState(false);
  const postPath = `/blog/${encodeURIComponent(slug ?? '')}`;
  const postDescription = post?.seo_description || post?.title || 'Interior design and construction insights from ABP Interior in Ahmedabad.';
  const articleSchema = post ? { '@context': 'https://schema.org', '@graph': [createBreadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Blog', path: '/blog' }, { name: post.title, path: postPath }]), { '@type': 'Article', headline: post.title, description: postDescription, ...(post.published_at ? { datePublished: post.published_at } : {}), ...(post.cover_image_url ? { image: post.cover_image_url } : {}), publisher: { '@id': `${SEO_BASE_URL}/#business` }, mainEntityOfPage: `${SEO_BASE_URL}${postPath}` }] } : null;
  usePageSeo({ title: post?.seo_title || (post ? `${post.title} | ABP Interior` : 'Article | ABP Interior'), description: postDescription, path: postPath, type: 'article', robots: post ? 'index, follow' : loaded ? 'noindex, follow' : 'index, follow', image: post?.cover_image_url, structuredData: articleSchema });

  useEffect(() => {
    if (!slug) return;
    void getPublishedPost(slug).then(async (row) => {
      setPost(row);
      if (row) {
        setFaqs(await getVisibleFaqs('blog', row.id));
      }
      setLoaded(true);
    });
  }, [slug]);

  if (!loaded) return <div className="pt-24 min-h-screen text-center">Loading article…</div>;
  if (!post) return <div className="pt-24 min-h-screen text-center"><h1 className="text-2xl font-bold">Article not found</h1><Link to="/blog" className="text-primary mt-4 inline-block">Back to Blog</Link></div>;

  return (
    <div className="pt-16 min-h-screen"><Breadcrumbs items={[{ label: 'Home', path: '/' }, { label: 'Blog', path: '/blog' }, { label: post.title }]} />
      {post.cover_image_url && <img fetchPriority="high" src={post.cover_image_url} alt={post.title} className="w-full h-[50vh] object-cover" />}
      <article className="max-w-3xl mx-auto px-4 py-12">
        <Link to="/blog" className="inline-flex items-center text-primary mb-6"><ArrowLeft className="w-4 h-4 mr-2" />Back to Blog</Link>
        <h1 className="text-4xl font-bold mb-3">{post.title}</h1>
        {post.published_at && <p className="text-gray-500 mb-8">{new Date(post.published_at).toLocaleDateString()}</p>}
        <div className="prose prose-lg max-w-none text-gray-700 space-y-4" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.content) }} />
        {faqs.length > 0 && (
          <section className="mt-12">
            <h2 className="text-2xl font-bold mb-4">Frequently asked questions</h2>
            <div className="divide-y">{faqs.map((faq) => <details key={faq.id} className="py-4"><summary className="font-semibold cursor-pointer">{faq.question}</summary><p className="mt-2 text-gray-600">{faq.answer}</p></details>)}</div>
          </section>
        )}
      </article>
    </div>
  );
}
