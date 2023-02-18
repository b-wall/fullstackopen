const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const result = blogs.reduce((acc, blog) => acc += blog.likes || 0, 0)
  return result
}

module.exports = {
  dummy,
  totalLikes
}