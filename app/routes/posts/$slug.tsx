import { useLoaderData } from "remix"
import type { LoaderFunction } from "remix"
import invariant from "tiny-invariant"
import { getPost } from '~/post'
import { MDXProvider } from '@mdx-js/react'

const components = {}

export const loader: LoaderFunction = async ({ params }) => {
  invariant(params.slug, 'expected params.slug')

  return getPost(params.slug)
}

export default function Post() {
  const { slug, title, body }= useLoaderData()

  return (
    <>
      <p>{title}</p>

      <MDXProvider components={components}>
        {body}
      </MDXProvider>
    </>
  )
}
