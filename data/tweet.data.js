import * as userRepository from './user.data.js'

const tweets = [
  {
    id: 1,
    text: '숭재 화이팅!!',
    createdAt: Date.now().toString(),
    updatedAt: Date.now().toString(),
    userId: 1,
  },
  {
    id: 2,
    text: '드림코더 화이팅!!',
    createdAt: Date.now().toString(),
    updatedAt: Date.now().toString(),
    userId: 2,
  },
]

let uniqueId = tweets.slice(-1)[0].id + 1

export async function getUniqueId() {
  return uniqueId
}

function increaseUniqueId() {
  uniqueId++
}

export async function getAll() {
  return await Promise.all(
    tweets.map(async (tweet) => {
      const { username, name, url } = await userRepository.findById(
        tweet.userId
      )
      return { ...tweet, username, name, url }
    })
  )
}

export async function getAllByUsername(username) {
  const tweets = await getAll()
  return tweets.filter((tweet) => tweet.username === username)
}

export async function getById(id) {
  const tweet = tweets.find((t) => t.id === id)
  if (!tweet) {
    return null
  }
  const { username, name, url } = await userRepository.findById(tweet.userId)
  return { ...tweet, username, name, url }
}

export async function create(text, userId) {
  const tweet = {
    id: await getUniqueId(),
    text,
    createdAt: Date.now().toString(),
    updatedAt: Date.now().toString(),
    userId,
  }
  tweets.push(tweet)
  increaseUniqueId()
  const { username, name, url } = await userRepository.findById(userId)
  return { ...tweet, username, name, url }
}

export async function remove(id) {
  const idx = tweets.findIndex((tweet) => tweet.id === id)
  if (idx !== -1) {
    tweets.splice(idx, 1)
    return true
  } else {
    return false
  }
}

export async function update(id, text) {
  const tweet = await getById(id)
  if (tweet) {
    tweet.text = text
    tweet.updatedAt = Date.now().toString()
    return tweet
  } else {
    return false
  }
}
