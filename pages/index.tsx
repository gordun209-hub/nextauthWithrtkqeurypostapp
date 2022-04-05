import { Box, SimpleGrid } from '@chakra-ui/react'
import { GetStaticProps } from 'next'
import React from 'react'

import Layout from '../components/Layout'
import Post, { PostProps } from '../components/Post'
import { useGetPostsQuery } from '../services/post'

const Blog: React.FC = () => {
  const { data } = useGetPostsQuery()
  console.log(data)
  return (
    <>
      <Layout>
        <Box>
          <div className='page'>
            <h1>Public Feed</h1>
            <SimpleGrid
              columns={[1, 1, 4]}
              spacing={8}
              px={4}
              py={2}
              borderBottomWidth='1px'
              borderBottomColor='gray.200'
              borderBottomStyle='solid'
            >
              {data?.map(post => (
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
