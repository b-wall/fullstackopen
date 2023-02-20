const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const result = blogs.reduce((acc, blog) => acc += blog.likes || 0, 0)
  return result
}

const favouriteBlog = (blogs) => {
  const favourite = blogs.reduce((acc, blog) => {
    if (blog.likes > acc.likes) {
      acc = {
        title: blog.title,
        author: blog.author,
        likes: blog.likes
      }
    }
    return acc
  })
  return favourite
}

const mostBlogs = (blogs) => {
  const authorPosts = blogs.reduce((acc, blog) => {
    const key = blog.author
    const value = acc[key] || 0 

    return {...acc, [key] : value + 1}
  }, {})
  const formattedAuthors = Object.entries(authorPosts).map(([key, value]) => {
    return {
      author: key,
      blogs: value
    }
  })
  const topAuthor = formattedAuthors.reduce((acc, post) => post.blogs > acc.blogs ? post : acc)
  return topAuthor
}

const mostLikes = (blogs) => {
  const cleanedAuthors = blogs.reduce((acc, blog) => {
    const key = blog.author
    const value = acc[key] || 0
    return {...acc, [key]: value + blog.likes}
  }, {})

  const formattedAuthors = Object.entries(cleanedAuthors).map(([key, value]) => ({author: key, likes: value}))
  .reduce((acc, author) => author.likes > acc.likes ? author : acc)
  return formattedAuthors
}

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes
}