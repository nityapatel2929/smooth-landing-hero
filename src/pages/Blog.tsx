import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { getPublishedPosts, type BlogPost } from '@/lib/cms';

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { void getPublishedPosts().then((rows) => { setPosts(rows); setLoaded(true); }); }, []);
  return (
    <div className="pt-16 min-h-screen">
      <section className="bg-gray-900 py-20 text-center text-white px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Blog</h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">Ideas, tips, and stories from our interior projects</p>
      </section>
      <section className="max-w-7xl mx-auto px-4 py-16">
        {!loaded && <p className="text-center text-gray-500">Loading posts…</p>}
        {loaded && posts.length === 0 && <p className="text-center text-gray-500">No articles published yet. Check back soon.</p>}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article key={post.id} className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col">
              {post.cover_image_url && <img src={post.cover_image_url} alt={post.title} className="w-full h-52 object-cover" />}
              <div className="p-6 flex flex-col flex-1">
                {post.published_at && <p className="text-sm text-gray-500 mb-2">{new Date(post.published_at).toLocaleDateString()}</p>}
                <h2 className="text-xl font-bold mb-3">{post.title}</h2>
                {post.seo_description && <p className="text-gray-600 mb-4 line-clamp-3">{post.seo_description}</p>}
                <Link to={`/blog/${post.slug}`} className="mt-auto inline-flex items-center text-primary font-semibold">Read article <ArrowRight className="ml-2 w-4 h-4" /></Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
