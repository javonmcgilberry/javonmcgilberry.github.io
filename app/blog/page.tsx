import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/app/components/header";
import { siteConfig } from "@/app/site-config";
import { formatLongDate, getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
  description: "Thoughts, notes, and occasional essays.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: `Blog | ${siteConfig.name}`,
    description: "Thoughts, notes, and occasional essays.",
    url: `${siteConfig.url}/blog`,
    type: "website",
    images: [
      {
        url: siteConfig.ogImage,
        alt: `${siteConfig.name} blog preview`,
      },
    ],
  },
  twitter: {
    title: `Blog | ${siteConfig.name}`,
    description: "Thoughts, notes, and occasional essays.",
    images: [siteConfig.ogImage],
  },
};

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <>
      <Header />
      <main className="container mx-auto pb-16">
        <section className="mx-auto w-full max-w-[960px] border border-[#e5e7eb] bg-[#fafaf9] p-8 sm:p-12">
          <p className="text-sm uppercase tracking-[0.24em] text-[#6b7280]">
            Blog
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-medium tracking-[-0.05em] text-[#111827] sm:text-6xl">
            Thoughts, notes, and things worth sharing.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[#4b5563]">
            Just a blog. A place for ideas, observations, and whatever feels
            worth writing down.
          </p>
        </section>

        <section
          className="mx-auto mt-10 grid w-full max-w-[960px] gap-6"
          aria-label="Posts"
        >
          {posts.map((post) => (
            <article
              key={post.slug}
              className="w-full border border-[#e5e7eb] bg-white p-6 sm:p-8"
            >
              <p className="text-sm text-[#6b7280]">
                {formatLongDate(post.publishedAt)} · {post.readingTime}
              </p>
              <h2 className="mt-3 text-3xl font-medium tracking-[-0.04em] text-[#111827]">
                <Link href={`/blog/${post.slug}`}>{post.title}</Link>
              </h2>
              <p className="mt-4 max-w-3xl text-base leading-7 text-[#4b5563]">
                {post.description}
              </p>
              <Link
                href={`/blog/${post.slug}`}
                className="mt-6 inline-flex text-sm font-medium text-[#111827] underline decoration-[#c7c7c7] underline-offset-4 transition-colors hover:decoration-[#111827]"
              >
                Read post
              </Link>
            </article>
          ))}
        </section>
      </main>
    </>
  );
}
