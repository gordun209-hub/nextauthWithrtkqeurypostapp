import React from 'react'
import { GetStaticProps } from 'next'
import Layout from '../components/Layout'
import Post, { PostProps } from '../components/Post'
import prisma from '../lib/prisma'
import { Box, Flex, SimpleGrid } from '@chakra-ui/react'

export const getStaticProps: GetStaticProps = async () => {
  const feed = await prisma.post.findMany({
    where: {
      published: true,
    },
    include: {
      author: {
        select: {
          name: true,
          email: true,
        },
      },
    },
  })
  return {
    props: { feed },
  }
}

type Props = {
  feed: PostProps[]
}

const Blog: React.FC<Props> = props => {
  return (
    <>
      <Layout>
        <Box>
          <div className='page'>
            <h1>Public Feed</h1>
            <SimpleGrid
              columns={[1, 2, 3]}
              spacing={8}
              px={4}
              py={2}
              borderBottomWidth='1px'
              borderBottomColor='gray.200'
              borderBottomStyle='solid'>
              {props.feed.map(post => (
                <Post key={post.id} post={post} />
              ))}
            </SimpleGrid>
          </div>
        </Box>
      </Layout>
    </>
  )
}

export default Blog
