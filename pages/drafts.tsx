import { GetServerSideProps } from 'next'
import { getSession, useSession } from 'next-auth/react'
import React from 'react'

import Layout from '../components/Layout'
import Post, { PostProps } from '../components/Post'

type Props = {
  drafts: PostProps[]
}

const Drafts: React.FC<Props> = ({ drafts }) => {
  const { data: session } = useSession()
  console.log(drafts)
  if (!session) {
    return (
      <Layout>
        <h1>My Drafts</h1>
        <div>You need to be authenticated to view this page.</div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className='page'>
        <h1>My Drafts</h1>
        <main>
          {drafts?.map(post => (
            <div key={post.id} className='post'>
              <Post post={post} />
            </div>
          ))}
        </main>
      </div>
      <style jsx>{`
        .post {
          background: white;
          transition: box-shadow 0.1s ease-in;
        }

        .post:hover {
          box-shadow: 1px 1px 3px #aaa;
        }

        .post + .post {
          margin-top: 2rem;
        }
      `}</style>
    </Layout>
  )
}

export default Drafts

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  //! This is the only place where we can get the session
  const session = await getSession({ req })
  if (!session) {
    res.statusCode = 403
    return { props: { drafts: [] } }
  }
  //! find drafts of user

  const drafts = await prisma?.post.findMany({
    where: {
      author: { email: session?.user?.email },
      published: false
    },
    include: {
      author: {
        select: { name: true }
      }
    }
  })
  return {
    props: { drafts }
  }
}
