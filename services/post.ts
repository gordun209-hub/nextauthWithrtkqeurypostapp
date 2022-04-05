import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

type Post = {
  title: string
  content: string
  id?: number
}
export const postApi = createApi({
  reducerPath: 'postService',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api/' }),

  tagTypes: ['Posts'],
  endpoints: builder => ({
    getPosts: builder.query<Post[], void>({
      query: () => 'post',
      providesTags: [{ type: 'Posts', id: 'Posts' }]
    }),
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
      }),
      invalidatesTags: [{ type: 'Posts', id: 'Posts' }]
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
      }),
      invalidatesTags: [{ type: 'Posts', id: 'Posts' }]
    })
  })
})

export const {
  useEditPostMutation,
  useAddPostMutation,
  useDeletePostMutation,
  usePublishPostMutation,
  useGetPostsQuery
} = postApi
