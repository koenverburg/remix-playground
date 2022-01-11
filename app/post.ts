import path from 'path'
import fs from 'fs/promises'
import parser from 'front-matter'
import invariant from 'tiny-invariant'
import { marked } from 'marked'

export type FrontMatter = {
  title: string
}

export type Post = {
  slug: string
  title: string
  body?: string
}

function isValidPostAttributes(attributes: any): attributes is FrontMatter {
  return attributes?.title;
}

const postsDir = path.join(__dirname,  '..', '..', 'posts')

export const getPost = async (slug: string): Promise<Post> => {
 const filepath = path.join(postsDir, slug + '.mdx' )
  const filename = await fs.readFile(filepath)
  const { attributes, body } = parser(filename.toString())

  // const post = await import(`file://${filepath}`)
  // console.log( post )

  invariant(isValidPostAttributes(attributes), `Post ${filepath} is missing attributes`)

  const markdown = marked(body)
  return { slug, body: markdown, title: attributes.title }
}

export const getPosts = async (): Promise<Post[]> => {
  const contentDir = await fs.readdir(postsDir)

  return Promise.all(contentDir.map(async filename => {
    const file = await fs.readFile(path.join(postsDir, filename))
    const { attributes } = parser<{ title: string }>(file.toString())

    invariant(isValidPostAttributes(attributes), `${filename} has bad meta data!`)

    return {
      slug: filename.replace(/\.mdx$/, ""),
      title: attributes.title
    }
  }))
}
