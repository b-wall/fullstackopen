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
    console.log(acc)
    return acc
  })
  return favourite
}

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog
}