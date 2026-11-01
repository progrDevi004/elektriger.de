import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, CalendarDays, Clock, User } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO, { SITE_URL, DEFAULT_IMAGE } from "@/components/SEO";
import {
  getAllPosts,
  getPostBySlug,
  formatDate,
  DEFAULT_CATEGORY,
} from "@/data/blog";
import { SITE_NAME } from "@/data/brand";

const BlogArtikel = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = useMemo(() => (slug ? getPostBySlug(slug) : undefined), [slug]);

  const relatedPosts = useMemo(() => {
    if (!post) return [];
    return getAllPosts()
      .filter((p) => p.slug !== post.slug)
      .slice(0, 3);
  }, [post]);

  if (!post) {
    return (
      <div className="min-h-screen bg-background text-foreground antialiased">
        <SEO
          title="Beitrag nicht gefunden"
          description="Der angeforderte Blogbeitrag existiert nicht."
          path={`/blog/${slug ?? ""}`}
          noindex
        />
        <Navigation />
        <main className="pt-32 pb-24">
          <div className="max-w-2xl mx-auto px-6 text-center">
            <h1 className="text-3xl font-semibold text-primary mb-4">
              Beitrag nicht gefunden
            </h1>
            <p className="text-muted-foreground mb-8">
              Dieser Blogbeitrag existiert nicht oder wurde verschoben.
            </p>
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-teal to-green text-white text-sm font-medium rounded-full hover:shadow-xl hover:shadow-teal/25 transition-all duration-300"
            >
              <ArrowLeft className="w-4 h-4" /> Zur Blogübersicht
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    articleSection: post.subcategory
      ? [post.category, post.subcategory]
      : post.category,
    datePublished: post.date,
    dateModified: post.date,
    author: { "@type": "Person", name: post.author },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: { "@type": "ImageObject", url: DEFAULT_IMAGE },
    },
    image: post.coverImage
      ? `${SITE_URL}${post.coverImage}`
      : DEFAULT_IMAGE,
    mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
  };

  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <SEO
        title={post.title}
        description={post.excerpt}
        path={`/blog/${post.slug}`}
        type="article"
        image={post.coverImage ? `${SITE_URL}${post.coverImage}` : DEFAULT_IMAGE}
        jsonLd={jsonLd}
      />
      <Navigation />

      <main className="pt-32 pb-24">
        <article className="max-w-3xl mx-auto px-6">
          <Link
            to="/blog"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-teal transition-colors mb-8 focus:outline-none focus:text-teal"
          >
            <ArrowLeft className="w-4 h-4" /> Alle Beiträge
          </Link>

          <motion.header
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-10"
          >
            <div className="flex flex-wrap items-center gap-2 mb-5">
              <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-teal/10 border border-teal/20 text-teal text-xs font-medium">
                {post.category || DEFAULT_CATEGORY}
              </span>
              {post.subcategory && (
                <span className="inline-flex items-center px-2.5 py-1 rounded-full border border-border text-muted-foreground text-xs font-medium">
                  {post.subcategory}
                </span>
              )}
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-primary leading-[1.15] mb-6">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <User className="w-4 h-4" /> {post.author}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CalendarDays className="w-4 h-4" /> {formatDate(post.date)}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="w-4 h-4" /> {post.readingTime} Min. Lesezeit
              </span>
            </div>
          </motion.header>

          {post.coverImage && (
            <div className="relative aspect-[16/9] rounded-3xl overflow-hidden border border-border bg-secondary mb-12">
              <img
                src={post.coverImage}
                alt={post.title}
                decoding="async"
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div
            className="prose prose-neutral dark:prose-invert max-w-none prose-headings:text-primary prose-headings:font-semibold prose-a:text-teal prose-a:no-underline hover:prose-a:underline prose-img:rounded-2xl prose-strong:text-primary"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <div className="mt-14 pt-10 border-t border-border">
            <div className="rounded-3xl border border-border bg-card p-8 text-center">
              <h2 className="text-xl font-medium text-primary mb-3">
                Fragen zu Ihrem Projekt?
              </h2>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                Wir beraten Sie gerne unverbindlich rund um Smart Home und
                Elektrotechnik.
              </p>
              <a
                href="/kontakt"
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-teal to-green text-white text-sm font-medium rounded-full hover:shadow-xl hover:shadow-teal/25 transition-all duration-300"
              >
                Kontakt aufnehmen <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </article>

        {relatedPosts.length > 0 && (
          <section className="max-w-7xl mx-auto px-6 mt-20">
            <h2 className="text-2xl font-medium text-primary mb-8">
              Weitere Beiträge
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedPosts.map((related) => (
                <Link
                  key={related.slug}
                  to={`/blog/${related.slug}`}
                  className="group flex flex-col rounded-2xl border border-border bg-card p-6 hover:border-teal/30 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-teal"
                >
                  <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                    <span>{related.category || DEFAULT_CATEGORY}</span>
                    <span>·</span>
                    <span>{formatDate(related.date)}</span>
                  </div>
                  <h3 className="text-base font-medium text-primary mb-2 leading-snug group-hover:text-teal transition-colors">
                    {related.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">
                    {related.excerpt}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default BlogArtikel;
