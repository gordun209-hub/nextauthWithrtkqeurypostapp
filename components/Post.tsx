import {
  Box,
  chakra,
  Flex,
  Image,
  Link,
  useColorModeValue
} from '@chakra-ui/react'
// eslint-disable-next-line import/no-named-as-default
import Router from 'next/router'
import React from 'react'

export type PostProps = {
  id: number
  title: string
  author: {
    name?: string
    email: string
    image: string
  } | null
  content: string
  published: boolean
}

const Post: React.FC<{ post: PostProps }> = ({ post }) => {
  const authorName = post.author ? post?.author?.name : 'Unknown author'
  return (
    <Box
      as='article'
      borderStyle='solid'
      borderColor='gray.200'
      p={4}
      mb={4}
      cursor='pointer'
    >
      <div>laa</div>
      <Flex
        h='100%'
        align='center'
        justify='space-between'
        flexDir='column'
        p={10}
        borderRadius='md'
        boxShadow='lg'
      >
        <Box
          px={8}
          py={4}
          rounded='lg'
          shadow='lg'
          maxW='100vw'
          maxH='100vh'
          onClick={() => Router.push(`/p/${post.id}`)}
        >
          <Flex justifyContent='space-between' alignItems='center'>
            <Link
              px={3}
              py={1}
              bg='gray.600'
              color='gray.100'
              fontSize='sm'
              fontWeight='700'
              rounded='md'
              _hover={{ bg: 'gray.500' }}
            >
              view post
            </Link>
          </Flex>

          <Box mt={2}>
            <Link
              fontSize='2xl'
              fontWeight='700'
              _hover={{
                color: useColorModeValue('gray.600', 'gray.200'),
                textDecor: 'underline'
              }}
            >
              {post.title}
            </Link>
            <chakra.p mt={2}>{post.content}</chakra.p>
          </Box>

          <Flex justifyContent='space-between' alignItems='center' mt={10}>
            <Flex alignItems='center'>
              <Image
                mx={6}
                w={10}
                h={10}
                rounded='full'
                fit='cover'
                display={{ base: 'none', sm: 'block' }}
                src={
                  post?.author?.image ||
                  'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.fpaUV35ECaGkz-YNCrBSwQHaHa%26pid%3DApi&f=1'
                }
                alt='avatar'
              />
              <Link fontWeight='700' cursor='pointer'>
                {authorName}
              </Link>
            </Flex>
          </Flex>
        </Box>
      </Flex>
    </Box>
  )
}

export default Post

{
  /* <ReactMarkdown children={post.content} /> */
}
