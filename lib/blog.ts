import fs from "node:fs";
import path from "node:path";
import { cache, type ReactNode } from "react";
import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";

const POSTS_DIRECTORY = path.join(process.cwd(), "content/posts");

type PostFrontmatter = {
  title: string;
  description: string;
  publishedAt: string;
};

export type PostSummary = PostFrontmatter & {
  slug: string;
  readingTime: string;
};

export type Post = PostSummary & {
  content: ReactNode;
};

function ensurePostsDirectory() {
  if (!fs.existsSync(POSTS_DIRECTORY)) {
    return [];
  }

  return fs
    .readdirSync(POSTS_DIRECTORY)
    .filter((fileName) => fileName.endsWith(".mdx"));
}

function readPostFile(slug: string) {
  const filePath = path.join(POSTS_DIRECTORY, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  return fs.readFileSync(filePath, "utf8");
}

function getReadingTime(content: string) {
  const wordCount = content.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(wordCount / 220));

  return `${minutes} min read`;
}

function sortPosts<T extends { publishedAt: string }>(posts: T[]) {
  return posts.toSorted(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
}

export const getPostSlugs = cache(() =>
  ensurePostsDirectory().map((fileName) => fileName.replace(/\.mdx$/, "")),
);

export const getAllPosts = cache((): PostSummary[] => {
  const posts = getPostSlugs().flatMap((slug) => {
    const source = readPostFile(slug);

    if (!source) {
      return [];
    }

    const { data, content } = matter(source);
    const frontmatter = data as Partial<PostFrontmatter>;

    if (
      !frontmatter.title ||
      !frontmatter.publishedAt
    ) {
      throw new Error(`Post "${slug}" is missing required frontmatter.`);
    }

    if (!frontmatter.description?.trim()) {
      throw new Error(`Post "${slug}" is missing required frontmatter.`);
    }

    return [
      {
        slug,
        title: frontmatter.title,
        description: frontmatter.description,
        publishedAt: frontmatter.publishedAt,
        readingTime: getReadingTime(content),
      },
    ];
  });

  return sortPosts(posts);
});

export const getPostBySlug = cache(async (slug: string): Promise<Post | null> => {
  const source = readPostFile(slug);

  if (!source) {
    return null;
  }

  const { content, frontmatter } = await compileMDX<PostFrontmatter>({
    source,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
      },
    },
  });

  return {
    slug,
    title: frontmatter.title,
    description: frontmatter.description,
    publishedAt: frontmatter.publishedAt,
    readingTime: getReadingTime(matter(source).content),
    content,
  };
});

export function formatLongDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}
