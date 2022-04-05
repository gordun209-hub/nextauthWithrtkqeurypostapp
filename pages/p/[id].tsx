/* eslint-disable import/no-named-as-default */
import { Box, Button, chakra, Flex, Link, Stack, Text } from '@chakra-ui/react'
import { GetServerSideProps } from 'next'
import Router from 'next/router'
import { useSession } from 'next-auth/react'
import React, { SyntheticEvent } from 'react'

import Layout from '../../components/Layout'
import { PostProps } from '../../components/Post'
import prisma from '../../lib/prisma'
import {
  useDeletePostMutation,
  useEditPostMutation,
  usePublishPostMutation
} from '../../services/post'

//TODO bunu oren
export const getServerSideProps: GetServerSideProps<any> = async ({
  params
}) => {
  const post = await prisma.post.findUnique({
    where: {
      id: Number(params?.id) || -1
    },
    include: {
      author: {
        select: { name: true, email: true, id: true }
      }
    }
  })
  return {
    props: post
  }
}

const Post: React.FC<PostProps> = ({
  content,
  title,
  author,
  id,
  published
}) => {
  const [publishPosts] = usePublishPostMutation()
  const [deletePosts] = useDeletePostMutation()
  const [editPost] = useEditPostMutation()
  async function publishPost(id: number): Promise<void> {
    await publishPosts(id)
    await Router.push('/')
  }

  async function deletePost(id: number): Promise<void> {
    await deletePosts(id)
    await Router.push('/')
  }
  const [editing, setEditing] = React.useState(false)
  const [editContent, setEditContent] = React.useState(content)
  const [editTitle, setEditTitle] = React.useState(title)
  const { data: session, status } = useSession()
  if (status === 'loading') {
    return <div>Authenticating ...</div>
  }
  const userHasValidSession = Boolean(session)
  const postBelongsToUser = session?.user?.email === author?.email

  async function handleSubmit(e: SyntheticEvent) {
    e.preventDefault()

    await editPost({
      id,
      title: editTitle,
      content: editTitle
    })
    setEditing(false)
    Router.push('/drafts')
  }
  return (
    <Layout>
      {editing ? (
        <form>
          <h1>New Draft</h1>
          <input
            autoFocus
            placeholder='Title'
            type='text'
            value={editTitle}
            onChange={e => setEditTitle(e.target.value)}
          />
          <textarea
            cols={50}
            placeholder='Content'
            rows={8}
            value={editContent}
            onChange={e => {
              setEditContent(e.target.value)
              console.log(e.target.value)
            }}
          />
          <input
            disabled={!editContent || !editTitle}
            type='button'
            value='edit'
            onClick={e => handleSubmit(e)}
          />
          <a className='back' href='#' onClick={() => Router.push('/')}>
            or Cancel
          </a>
          <style jsx>{`
            .page {
              background: white;
              padding: 3rem;
              display: flex;
              justify-content: center;
              align-items: center;
            }

            input[type='text'],
            textarea {
              width: 100%;
              padding: 0.5rem;
              margin: 0.5rem 0;
              border-radius: 0.25rem;
              border: 0.125rem solid rgba(0, 0, 0, 0.2);
            }

            input[type='submit'] {
              background: #ececec;
              border: 0;
              padding: 1rem 2rem;
            }

            .back {
              margin-left: 1rem;
            }
          `}</style>
        </form>
      ) : (
        <Box
          as='article'
          borderStyle='solid'
          borderColor='gray.200'
          p={4}
          mb={4}
          cursor='pointer'
        >
          <Flex
            h='100%'
            align='center'
            justify='space-between'
            flexDir='column'
            p={15}
            borderRadius='md'
            boxShadow='lg'
            mb={30}
          >
            <Box px={8} py={4} rounded='lg' shadow='lg' maxW='2xl'>
              <Box mt={2}>
                <Link
                  fontSize='2xl '
                  fontWeight='700'
                  _hover={{
                    textDecor: 'underline'
                  }}
                >
                  {title}
                </Link>
                <chakra.p mt={2}>{content}</chakra.p>
              </Box>

              <Flex justifyContent='space-between' alignItems='center' mt={4}>
                <Text fontSize='sm' color='gray.500'>
                  {author?.name}
                </Text>
                <Text fontSize='sm' color='gray.500'></Text>
              </Flex>
              <Stack isInline mt={4} spacing={4} align='center'>
                {!published && userHasValidSession && postBelongsToUser && (
                  <Button onClick={() => publishPost(id)}>Publish</Button>
                )}
                {userHasValidSession && postBelongsToUser && (
                  <Button onClick={() => deletePost(id)}>Delete</Button>
                )}
                {userHasValidSession && postBelongsToUser && (
                  <Button onClick={() => setEditing(true)}>Edit</Button>
                )}
              </Stack>
            </Box>
          </Flex>
        </Box>
      )}
    </Layout>
  )
}

export default Post
