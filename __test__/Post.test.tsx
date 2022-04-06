import { render, screen } from '@testing-library/react'
import Post from '../components/Post'

describe('post', () => {
  it('should render given post data', () => {
    render(
      <Post
        post={{
          id: 1,
          title: 'test title',
          author: {
            name: 'test author',
            email: 'uioh',
            image: 'https://example.com/image.jpg'
          },
          content: 'test content',
          published: true
        }}
      />
    )
    expect(screen.getByText('test content')).toBeInTheDocument()
    expect(screen.getByText('test author')).toBeInTheDocument()
    expect(screen.getByText('test title')).toBeInTheDocument()
  })
  it('should not render name if name doesnt exist', () => {
    render(
      <Post
        post={{
          id: 1,
          title: 'test title',
          author: {
            email: 'uioh',
            image: 'https://example.com/image.jpg'
          },
          content: 'test content',
          published: true
        }}
      />
    )
    expect(screen.queryByText('test author')).not.toBeInTheDocument()
  })
})
