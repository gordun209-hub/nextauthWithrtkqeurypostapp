import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'

import prisma from '../../../lib/prisma'

// POST /api/post
// Required fields in body: title
// Optional fields in body: content
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { title, content } = req.body

    const session = await getSession({ req })
    if (session?.user?.email) {
      const result = await prisma.post.create({
        data: {
          title: title,
          content: content,
          author: {
            connect: {
              email: session?.user?.email
            }
          }
        }
      })
      res.json(result)
    }
  } else if (req.method === 'GET') {
    const posts = await prisma.post.findMany({
      where: {
        published: true
      },
      include: {
        author: {
          select: {
            name: true,
            email: true
          }
        }
      }
    })
    res.json(posts)
  } else {
    res.status(401).send({ message: 'Unauthorized' })
  }
}
