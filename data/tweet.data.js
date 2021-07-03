const tweets = [
  {
    id: 1,
    text: '숭재 화이팅!!',
    createdAt: Date.now().toString(),
    updatedAt: Date.now().toString(),
    name: 'Bob',
    username: 'bob',
    url: 'https://widgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-1.png',
  },
  {
    id: 2,
    text: '드림코더 화이팅!!',
    createdAt: Date.now().toString(),
    updatedAt: Date.now().toString(),
    name: 'Ellie',
    username: 'ellie',
    url: 'https://widgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-1.png',
  },
]

let uniqueId = tweets.slice(-1)[0].id + 1

export async function getUniqueId() {
  return uniqueId
}

export async function increaseUniqueId() {
  uniqueId++
}

export async function getAll() {
  return tweets
}

export async function getAllByUsername(username) {
  return tweets.filter((t) => t.username === username)
}

export async function getById(id) {
  return tweets.find((t) => t.id === id)
}

export async function create(tweet) {
  tweets.push(tweet)
  increaseUniqueId()
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
