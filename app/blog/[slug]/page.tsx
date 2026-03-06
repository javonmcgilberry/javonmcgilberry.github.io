import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/app/components/header";
import { siteConfig } from "@/app/site-config";
import {
  formatLongDate,
  getAllPosts,
  getPostBySlug,
  getPostSlugs,
} from "@/lib/blog";

type BlogPostPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      title: `${post.title} | ${siteConfig.name}`,
      description: post.description,
      url: `${siteConfig.url}/blog/${post.slug}`,
      type: "article",
      publishedTime: post.publishedAt,
      images: [
        {
          url: post.heroImage ?? siteConfig.ogImage,
          alt: post.heroImageAlt ?? post.title,
        },
      ],
    },
    twitter: {
      title: `${post.title} | ${siteConfig.name}`,
      description: post.description,
      images: [post.heroImage ?? siteConfig.ogImage],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const allPosts = getAllPosts();
  const currentIndex = allPosts.findIndex((entry) => entry.slug === post.slug);
  const nextPost = allPosts[currentIndex + 1];
  const articleUrl = `${siteConfig.url}/blog/${post.slug}`;
  const articleImage = new URL(
    post.heroImage ?? siteConfig.ogImage,
    siteConfig.url,
  ).toString();
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    image: [articleImage],
    mainEntityOfPage: articleUrl,
    author: {
      "@type": "Person",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    publisher: {
      "@type": "Person",
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };

  return (
    <>
      <Header />
      <main className="container mx-auto pb-16">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(articleJsonLd),
          }}
        />
        <article className="mx-auto w-full max-w-[960px]">
          <Link
            href="/blog"
            className="text-sm font-medium text-[#4b5563] underline decoration-[#d1d5db] underline-offset-4 transition-colors hover:text-[#111827] hover:decoration-[#111827]"
          >
            Back to blog
          </Link>
          <header className="mt-8 border-b border-[#e5e7eb] pb-10">
            <p className="text-sm text-[#6b7280]">
              {formatLongDate(post.publishedAt)} · {post.readingTime}
            </p>
            <h1 className="mt-4 max-w-4xl text-4xl font-medium tracking-[-0.05em] text-[#111827] sm:text-6xl">
              {post.title}
            </h1>
            <p className="mt-6 max-w-3xl text-2xl leading-9 tracking-[-0.03em] text-[#1f2937]">
              {post.description}
            </p>
          </header>

          {post.heroImage ? (
            <figure className="mt-10 overflow-hidden rounded-[28px] border border-[#e5e7eb] bg-[#f5f5f4]">
              <div className="relative aspect-[16/9] w-full">
                <Image
                  src={post.heroImage}
                  alt={post.heroImageAlt ?? post.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 960px"
                  priority
                />
              </div>
            </figure>
          ) : null}

          <div className="blog-prose mt-10 w-full">{post.content}</div>
        </article>

        {nextPost ? (
          <aside className="mx-auto mt-16 w-full max-w-[960px] border border-[#e5e7eb] bg-[#fafaf9] p-6 sm:p-8">
            <p className="text-sm uppercase tracking-[0.24em] text-[#6b7280]">
              Continue Reading
            </p>
            <h2 className="mt-4 text-2xl font-medium tracking-[-0.03em] text-[#111827]">
              <Link href={`/blog/${nextPost.slug}`}>{nextPost.title}</Link>
            </h2>
            <p className="mt-3 max-w-2xl text-base leading-7 text-[#4b5563]">
              {nextPost.description}
            </p>
          </aside>
        ) : null}
      </main>
    </>
  );
}
