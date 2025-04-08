import Link from "next/link";
import { getAllPosts } from "../lib/posts";

export async function getStaticProps() {
  const posts = getAllPosts();
  return { props: { posts } };
}

export default function Home({ posts }) {
  return (
    <div>
      <h1>My Blog</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`/posts/${post.slug}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
