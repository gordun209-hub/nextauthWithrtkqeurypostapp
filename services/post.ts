import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

type Post = {
  title: string
  content: string
  id?: number
}
export const postApi = createApi({
  reducerPath: 'postService',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api/' }),
  endpoints: builder => ({
    addPost: builder.mutation<Post, Post>({
      query: post => ({
        url: 'post',
        method: 'POST',
        body: post
      })
    }),
    publishPost: builder.mutation<void, number>({
      query: id => ({
        url: `publish/${id}`,
        method: 'PUT',
        body: id
      })
    }),
    deletePost: builder.mutation<void, number>({
      query: id => ({
        url: `post/${id}`,
        method: 'DELETE',
        body: id
      })
    }),
    editPost: builder.mutation<Post, Post>({
      query: post => ({
        url: `post/${post.id}`,
        method: 'PUT',
        body: post
      })
    })
  })
})

export const {
  useEditPostMutation,
  useAddPostMutation,
  useDeletePostMutation,
  usePublishPostMutation
} = postApi
