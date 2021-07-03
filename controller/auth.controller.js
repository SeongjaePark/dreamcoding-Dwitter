import * as bcrypt from 'bcrypt'
import * as userRepository from '../data/user.data.js'

const secret = 'q3CoYoF9jAgwomxhH2DINYHJHASEmYsQ'

export async function signup(req, res) {
  const body = req.body
  const userInfo = { ...body, password: await bcrypt.hash(body.password, 10) }
  const result = await userRepository.create(userInfo)
  const { password, ...user } = { ...result }
  res.status(201).send(user)
}

export async function findOne(req, res) {
  const user = userRepository.findOne()
}
