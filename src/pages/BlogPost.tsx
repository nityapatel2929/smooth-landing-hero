import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import DOMPurify from 'dompurify';
import { getPublishedPost, getVisibleFaqs, type BlogPost as Post, type Faq } from '@/lib/cms';

export default function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [faqs, setFaqs] = useState<Faq[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!slug) return;
    void getPublishedPost(slug).then(async (row) => {
      setPost(row);
      if (row) {
        setFaqs(await getVisibleFaqs('blog', row.id));
        document.title = row.seo_title || row.title;
        const meta = document.querySelector('meta[name="description"]');
        if (meta && row.seo_description) meta.setAttribute('content', row.seo_description);
      }
      setLoaded(true);
    });
  }, [slug]);

  if (!loaded) return <div className="pt-24 min-h-screen text-center">Loading article…</div>;
  if (!post) return <div className="pt-24 min-h-screen text-center"><h1 className="text-2xl font-bold">Article not found</h1><Link to="/blog" className="text-primary mt-4 inline-block">Back to Blog</Link></div>;

  return (
    <div className="pt-16 min-h-screen">
      {post.cover_image_url && <img src={post.cover_image_url} alt={post.title} className="w-full h-[50vh] object-cover" />}
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
