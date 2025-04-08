import { getPostBySlug, getAllPosts } from "../../lib/posts";
import { remark } from "remark";
import html from "remark-html";

export async function getStaticPaths() {
  const posts = getAllPosts();
  const paths = posts.map((post) => ({ params: { slug: post.slug } }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const { slug, metadata, content } = getPostBySlug(params.slug);
  const processed = await remark().use(html).process(content);
  const contentHtml = processed.toString();
  return { props: { slug, metadata, contentHtml } };
}

export default function Post({ metadata, contentHtml }) {
  return (
    <div>
      <h1>{metadata.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
    </div>
  );
}
