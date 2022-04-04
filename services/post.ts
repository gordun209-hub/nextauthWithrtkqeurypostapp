import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
type Post = {
  title: string
  content: string
}
export const postApi = createApi({
  reducerPath: 'postService',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api/' }),
  endpoints: builder => ({
    addPost: builder.mutation<Post, Post>({
      query: post => ({
        url: 'post',
        method: 'POST',
        body: post,
      }),
    }),
  }),
})

export const { useAddPostMutation } = postApi
