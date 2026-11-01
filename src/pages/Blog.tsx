import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, CalendarDays, Clock, Newspaper, PenLine } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { SITE_URL } from "@/components/SEO";
import {
  getAllPosts,
  getSubcategories,
  formatDate,
  DEFAULT_CATEGORY,
  CATEGORY_B2B,
  CATEGORY_B2C,
  type BlogPost,
} from "@/data/blog";

const ALL = "Alle";

// Feste Zielgruppen-Auswahl – so kann sich jeder Besucher direkt zuordnen,
// auch wenn (noch) nicht für jede Zielgruppe Beiträge vorhanden sind.
const CATEGORIES = [ALL, CATEGORY_B2C, CATEGORY_B2B];

const Blog = () => {
  const posts = useMemo(() => getAllPosts(), []);
  const [activeCategory, setActiveCategory] = useState<string>(ALL);
  const [activeSub, setActiveSub] = useState<string>(ALL);

  // Unterkategorien der aktuell gewählten Hauptkategorie (nur bei konkreter Auswahl).
  const subcategories = useMemo(() => {
    if (activeCategory === ALL) return [] as string[];
    const subs = getSubcategories(activeCategory);
    return subs.length > 0 ? [ALL, ...subs] : [];
  }, [activeCategory]);

  const selectCategory = (category: string) => {
    setActiveCategory(category);
    setActiveSub(ALL);
  };

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const category = post.category || DEFAULT_CATEGORY;
      if (activeCategory !== ALL && category !== activeCategory) return false;
      if (activeSub !== ALL && post.subcategory !== activeSub) return false;
      return true;
    });
  }, [posts, activeCategory, activeSub]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Blog – Elektiger",
    description:
      "Ratgeber und Fachwissen zu Elektrik, Energie, Smart Home und Elektrosicherheit.",
    url: `${SITE_URL}/blog`,
    blogPost: posts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      datePublished: post.date,
      author: { "@type": "Person", name: post.author },
      url: `${SITE_URL}/blog/${post.slug}`,
    })),
  };

  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <SEO
        title="Blog – Tipps zu Elektrik, Energie & Smart Home in Peine"
        description="Ratgeber und Tipps zu Elektrik, Energie, Smart Home und Elektrosicherheit – vom Elektriker Elektiger aus Peine."
        path="/blog"
        keywords="Elektriker Peine Blog, Elektrik Tipps, Smart Home Ratgeber, Photovoltaik Tipps, Elektrosicherheit, Energieeffizienz"
        jsonLd={jsonLd}
      />
      <Navigation />

      <main className="pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6">
          {/* Hero */}
          <div className="relative mb-16 overflow-hidden rounded-3xl bg-card border border-border">
            <div className="absolute inset-0 opacity-[0.04]">
              <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-teal blur-3xl" />
              <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-green blur-3xl" />
            </div>
            <div className="relative p-8 md:p-14 max-w-2xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-teal/20 bg-teal/10 text-teal text-xs font-medium mb-6 w-fit">
                  <Newspaper className="w-3 h-3" />
                  Blog
                </div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-primary leading-[1.1] mb-6">
                  Fachwissen rund um <span className="text-gradient-silver">Elektrotechnik & Smart Home.</span>
                </h1>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Ratgeber, Tipps und Neuigkeiten rund um Smart Home,
                  Elektroinstallation, Energieeffizienz und Sicherheit.
                </p>
              </motion.div>
            </div>
          </div>

          {/* Zielgruppen- und Themenfilter */}
          {posts.length > 0 && (
            <div className="mb-12 space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs uppercase tracking-wide text-muted-foreground/70 mr-1">
                  Für wen?
                </span>
                {CATEGORIES.map((category) => (
                  <button
                    key={category}
                    onClick={() => selectCategory(category)}
                    className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-teal ${activeCategory === category
                      ? "bg-gradient-to-r from-teal to-green text-white border-transparent"
                      : "border-border text-muted-foreground hover:text-primary hover:border-teal/30"
                      }`}
                  >
                    {category}
                  </button>
                ))}
              </div>

              {/* Unterkategorie-Filter (Thema) */}
              {subcategories.length > 1 && (
                <div className="flex flex-wrap items-center gap-2 pl-0.5">
                  <span className="text-xs uppercase tracking-wide text-muted-foreground/70 mr-1">
                    Thema:
                  </span>
                  {subcategories.map((sub) => (
                    <button
                      key={sub}
                      onClick={() => setActiveSub(sub)}
                      className={`px-3 py-1 rounded-full text-xs font-medium border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-teal ${activeSub === sub
                        ? "bg-teal/10 text-teal border-teal/30"
                        : "border-border text-muted-foreground hover:text-primary hover:border-teal/30"
                        }`}
                    >
                      {sub}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Beitragsliste oder leerer Zustand */}
          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map((post, index) => (
                <PostCard key={post.slug} post={post} index={index} />
              ))}
            </div>
          ) : (
            <EmptyState hasPosts={posts.length > 0} />
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

const PostCard = ({ post, index }: { post: BlogPost; index: number }) => (
  <motion.article
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.3) }}
  >
    <Link
      to={`/blog/${post.slug}`}
      className="group flex flex-col h-full rounded-2xl border border-border bg-card overflow-hidden hover:border-teal/30 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-teal"
    >
      <div className="relative aspect-[16/9] overflow-hidden bg-secondary">
        {post.coverImage ? (
          <img
            src={post.coverImage}
            alt={post.title}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Newspaper className="w-10 h-10 text-muted-foreground/30" strokeWidth={1.5} />
          </div>
        )}
        <div className="absolute top-3 left-3 flex flex-wrap items-center gap-1.5">
          <span className="px-2.5 py-1 rounded-full bg-background/80 backdrop-blur-sm border border-border text-[11px] font-medium text-primary">
            {post.category || DEFAULT_CATEGORY}
          </span>
          {post.subcategory && (
            <span className="px-2.5 py-1 rounded-full bg-teal/10 backdrop-blur-sm border border-teal/20 text-[11px] font-medium text-teal">
              {post.subcategory}
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-col flex-1 p-6">
        <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays className="w-3.5 h-3.5" />
            {formatDate(post.date)}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            {post.readingTime} Min.
          </span>
        </div>
        <h2 className="text-lg font-medium text-primary mb-2 leading-snug group-hover:text-teal transition-colors">
          {post.title}
        </h2>
        <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3 mb-4">
          {post.excerpt}
        </p>
        <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-medium text-teal">
          Weiterlesen
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  </motion.article>
);

const EmptyState = ({ hasPosts }: { hasPosts: boolean }) => (
  <div className="text-center p-12 md:p-16 rounded-3xl border border-dashed border-border bg-card">
    <div className="w-14 h-14 rounded-2xl bg-teal/10 flex items-center justify-center mx-auto mb-6">
      <PenLine className="w-6 h-6 text-teal" strokeWidth={1.5} />
    </div>
    <h2 className="text-xl font-medium text-primary mb-3">
      {hasPosts ? "Keine Beiträge in dieser Kategorie" : "Bald geht es los"}
    </h2>
    <p className="text-muted-foreground max-w-md mx-auto mb-8">
      {hasPosts
        ? "In dieser Kategorie gibt es aktuell noch keine Beiträge. Schauen Sie bald wieder vorbei."
        : "Wir arbeiten an den ersten Beiträgen rund um Smart Home und Elektrotechnik. Bis dahin beraten wir Sie gerne persönlich."}
    </p>
    <a
      href="/kontakt"
      className="inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-teal to-green text-white text-sm font-medium rounded-full hover:shadow-xl hover:shadow-teal/25 transition-all duration-300"
    >
      Kontakt aufnehmen <ArrowRight className="w-4 h-4" />
    </a>
  </div>
);

export default Blog;
