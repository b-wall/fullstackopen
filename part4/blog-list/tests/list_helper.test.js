const listHelper = require('../utils/list_helper')

// Test Data
const listWithOneBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  }
]

const blogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0
  },
]

const favouriteBlogResult = {
  title: "Canonical string reduction",
  author: "Edsger W. Dijkstra",
  likes: 12
}

const mostBlogsResult = {
  author: "Robert C. Martin",
  blogs: 3
}

const mostLikedAuthor = {
  author: "Edsger W. Dijkstra",
  likes: 17
}

// Tests

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  test('when list has only one blog, equal the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })
  
  test('when list has multiple blogs, equal the likes of all blog likes', () => {
    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(36)
  })
})

describe('most likes', () => {
  test('returns the blog object with the most likes from multiple blogs', () => {
    const result = listHelper.favouriteBlog(blogs)
    expect(result).toEqual(favouriteBlogResult)
  })
})

describe('most blogs', () => {
  test('return the blog author with the most blogs in a list', () => {
    const result = listHelper.mostBlogs(blogs)
    expect(result).toEqual(mostBlogsResult)
  })
})

describe('most liked', () => {
  test('return the blog author with the most likes, as well as their total like count', () => {
    const result = listHelper.mostLikes(blogs)
    expect(result).toEqual(mostLikedAuthor)
  })
})