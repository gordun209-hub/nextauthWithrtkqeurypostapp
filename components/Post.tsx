import React from 'react'
import Router from 'next/router'
import ReactMarkdown from 'react-markdown'
import {
  Box,
  chakra,
  Flex,
  Link,
  Image,
  useColorModeValue,
} from '@chakra-ui/react'
import { useSession } from 'next-auth/react'
export type PostProps = {
  id: number
  title: string
  author: {
    name: string
    email: string
  } | null
  content: string
  published: boolean
}

const Post: React.FC<{ post: PostProps }> = ({ post }) => {
  const { data: session, status } = useSession()

  const authorName = post.author ? post.author.name : 'Unknown author'
  return (
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
          onClick={() => Router.push(`/p/${post.id}`)}
          px={8}
          py={4}
          rounded='lg'
          shadow='lg'
          bg={useColorModeValue('white', 'gray.800')}
          maxW='2xl'>
          <Flex justifyContent='space-between' alignItems='center'>
            <Link
              px={3}
              py={1}
              bg='gray.600'
              color='gray.100'
              fontSize='sm'
              fontWeight='700'
              rounded='md'
              _hover={{ bg: 'gray.500' }}>
              view post
            </Link>
          </Flex>

          <Box mt={2}>
            <Link
              fontSize='2xl'
              color={useColorModeValue('gray.700', 'white')}
              fontWeight='700'
              _hover={{
                color: useColorModeValue('gray.600', 'gray.200'),
                textDecor: 'underline',
              }}>
              {post.title}
            </Link>
            <chakra.p mt={2} color={useColorModeValue('gray.600', 'gray.300')}>
              {post.content}
            </chakra.p>
          </Box>

          <Flex justifyContent='space-between' alignItems='center' mt={4}>
            <Flex alignItems='center'>
              <Image
                mx={4}
                w={10}
                h={10}
                rounded='full'
                fit='cover'
                display={{ base: 'none', sm: 'block' }}
                src={session?.user?.image}
                alt='avatar'
              />
              <Link
                color={useColorModeValue('gray.700', 'gray.200')}
                fontWeight='700'
                cursor='pointer'>
                {session?.user?.name}
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
