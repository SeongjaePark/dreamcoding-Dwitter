const users = [
  {
    id: 1,
    username: 'soong',
    password: '1234',
    name: 'Seongjae',
    email: 'gndan4@gmail.com',
    url: 'https://widgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-1.png',
  },
]

let uniqueId = users.slice(-1)[0].id + 1

export async function create(userInfo) {
  const user = { ...userInfo, id: uniqueId }
  users.push(user)
  uniqueId++
  return user
}
