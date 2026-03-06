import Link from "next/link";
import { formatLongDate, getAllPosts } from "@/lib/blog";

export default function LatestWriting() {
  const posts = getAllPosts().slice(0, 2);

  if (posts.length === 0) {
    return null;
  }

  return (
    <section className="container mx-auto" aria-labelledby="latest-writing-title">
      <div className="w-full border border-[#e5e7eb] bg-[#fafaf9] p-8 sm:p-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm uppercase tracking-[0.24em] text-[#6b7280]">
              Latest Writing
            </p>
            <h2
              id="latest-writing-title"
              className="mt-3 text-3xl font-medium tracking-[-0.04em] text-[#111827] sm:text-4xl"
            >
              Notes on engineering, product thinking, and building on the web.
            </h2>
          </div>
          <Link
            href="/blog"
            className="text-sm font-medium text-[#111827] underline decoration-[#c7c7c7] underline-offset-4 transition-colors hover:decoration-[#111827]"
          >
            View all posts
          </Link>
        </div>
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="border border-[#e5e7eb] bg-white p-6 transition-transform duration-300 hover:-translate-y-1"
            >
              <p className="text-sm text-[#6b7280]">
                {formatLongDate(post.publishedAt)} · {post.readingTime}
              </p>
              <h3 className="mt-3 text-2xl font-medium tracking-[-0.03em] text-[#111827]">
                <Link href={`/blog/${post.slug}`}>{post.title}</Link>
              </h3>
              <p className="mt-4 text-base leading-7 text-[#4b5563]">
                {post.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
