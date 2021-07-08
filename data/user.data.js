const users = [
  {
    username: 'bob',
    password: '$2b$10$62f8UNj4knYmR95aQXAIJ.r8SpOuaFDFr8GwrowiYoWAf/g.BAt4O', // 12341234
    name: 'Bob',
    email: 'bob@gmail.com',
    id: 1,
  },
  {
    username: 'ellie',
    password: '$2b$10$62f8UNj4knYmR95aQXAIJ.r8SpOuaFDFr8GwrowiYoWAf/g.BAt4O', // 12341234
    name: 'Ellie',
    email: 'elliegmail.com',
    id: 2,
  },
]

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

export async function findById(id) {
  const user = users.find((u) => u.id === id)
  return user
}
