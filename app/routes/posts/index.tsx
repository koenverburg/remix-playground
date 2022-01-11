import { Link, useLoaderData } from "remix"
import { getPosts } from "~/post"
import type { Post } from "~/post"

export const loader = () => {
  return getPosts()
}

export default function Posts() {
  const posts = useLoaderData<Post[]>()

  return (
    <>
      <p>Hii from posts</p>
      <ul>
        {posts && posts.map(post => (
          <li key={post.slug}>
            <Link to={post.slug}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </>
  )
}
