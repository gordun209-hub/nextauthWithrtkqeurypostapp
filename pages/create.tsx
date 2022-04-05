// eslint-disable-next-line import/no-named-as-default
import Router from 'next/router'
import React, { useState } from 'react'

import Layout from '../components/Layout'
import { useAddPostMutation } from '../services/post'

const Draft: React.FC = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const [addPost] = useAddPostMutation()
  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    await addPost({ title, content })
  }

  return (
    <Layout>
      <div>
        <form onSubmit={submitData}>
          <h1>New Draft</h1>
          <input
            autoFocus
            placeholder='Title'
            type='text'
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <textarea
            cols={50}
            placeholder='Content'
            rows={8}
            value={content}
            onChange={e => setContent(e.target.value)}
          />
          <input disabled={!content || !title} type='submit' value='Create' />
          <a className='back' href='#' onClick={() => Router.push('/')}>
            or Cancel
          </a>
        </form>
      </div>
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
    </Layout>
  )
}

export default Draft
