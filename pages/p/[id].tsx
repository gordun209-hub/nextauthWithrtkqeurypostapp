import React from 'react'
import { GetServerSideProps } from 'next'
import ReactMarkdown from 'react-markdown'
import Layout from '../../components/Layout'
import Router from 'next/router'
import { PostProps } from '../../components/Post'
import prisma from '../../lib/prisma'
import { useSession } from 'next-auth/react'
import {
  Box,
  Button,
  chakra,
  Flex,
  Link,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const post = await prisma.post.findUnique({
    where: {
      id: Number(params?.id) || -1,
    },
    include: {
      author: {
        select: { name: true, email: true },
      },
    },
  })
  return {
    props: post,
  }
}

async function publishPost(id: number): Promise<void> {
  await fetch(`http://localhost:3000/api/publish/${id}`, {
    method: 'PUT',
  })
  await Router.push('/')
}

async function deletePost(id: number): Promise<void> {
  await fetch(`http://localhost:3000/api/post/${id}`, {
    method: 'DELETE',
  })
  await Router.push('/')
}

const Post: React.FC<PostProps> = props => {
  const { data: session, status } = useSession()
  if (status === 'loading') {
    return <div>Authenticating ...</div>
  }
  const userHasValidSession = Boolean(session)
  const postBelongsToUser = session?.user?.email === props.author?.email
  let title = props.title
  if (!props.published) {
    title = `${title} (Draft)`
  }

  return (
    <Layout>
      <Box
        as='article'
        borderStyle='solid'
        borderColor='gray.200'
        p={4}
        mb={4}
        cursor='pointer'>
        <Flex
          h='100%'
          align='center'
          justify='space-between'
          flexDir='column'
          bg={useColorModeValue('#F9FAFB', 'gray.600')}
          p={30}
          borderRadius='md'
          boxShadow='lg'
          mb={30}>
          <Box
            px={8}
            py={4}
            rounded='lg'
            shadow='lg'
            bg={useColorModeValue('white', 'gray.800')}
            maxW='2xl'>
            <Flex justifyContent='space-between' alignItems='center'></Flex>

            <Box mt={2}>
              <Link
                fontSize='2xl'
                color={useColorModeValue('gray.700', 'white')}
                fontWeight='700'
                _hover={{
                  color: useColorModeValue('gray.600', 'gray.200'),
                  textDecor: 'underline',
                }}>
                {title}
              </Link>
              <chakra.p
                mt={2}
                color={useColorModeValue('gray.600', 'gray.300')}>
                {props.content}
              </chakra.p>
            </Box>

            <Flex justifyContent='space-between' alignItems='center' mt={4}>
              <Text fontSize='sm' color='gray.500'>
                {props.author?.name}
              </Text>
              <Text fontSize='sm' color='gray.500'></Text>
            </Flex>
            <Stack isInline mt={4} spacing={4} align='center'>
              {!props.published && userHasValidSession && postBelongsToUser && (
                <Button onClick={() => publishPost(props.id)}>Publish</Button>
              )}
              {userHasValidSession && postBelongsToUser && (
                <Button onClick={() => deletePost(props.id)}>Delete</Button>
              )}
            </Stack>
          </Box>
        </Flex>
      </Box>
    </Layout>
  )
}

export default Post
