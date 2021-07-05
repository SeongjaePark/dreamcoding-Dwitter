const users = []

let uniqueId = users.length > 0 ? users.slice(-1)[0].id + 1 : 1

export async function create(userInfo) {
  const user = { ...userInfo, id: uniqueId }
  users.push(user)
  uniqueId++
  return user
}

export async function findByUsername(username) {
  const user = users.find((u) => u.username === username)
  return user
}
