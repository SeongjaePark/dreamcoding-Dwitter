import * as bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import * as userRepository from '../data/user.data.js'

const secret = 'q3CoYoF9jAgwomxhH2DINYHJHASEmYsQ'

export async function signup(req, res) {
  const body = req.body
  const userInfo = { ...body, password: await bcrypt.hash(body.password, 10) }
  const result = await userRepository.create(userInfo)
  const { password, ...user } = { ...result }
  res.status(201).send(user)
}

export async function login(req, res) {
  const username = req.body.username
  const user = await userRepository.findOne(username)
  if (user == null) {
    res
      .status(404)
      .send({ message: `${username}이라는 이름의 사용자가 존재하지 않습니다` })
  }
  const result = await bcrypt.compare(req.body.password, user.password)
  if (result === false) {
    res.status(400).send('유효하지 않은 비밀번호입니다')
  }
  const token = jwt.sign({ sub: user.id, username: user.username }, secret)
  res.status(200).send({ token })
}
