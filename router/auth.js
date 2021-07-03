import express from 'express'
import { body } from 'express-validator'
import * as authContoller from '../controller/auth.controller.js'
import { validate } from '../middleware/validator.js'

const router = express.Router()

router.post(
  '/signup',
  [
    body('username')
      .trim()
      .notEmpty()
      .withMessage('사용자 이름(아이디)을 입력하세요'),
    body('name').trim().notEmpty().withMessage('이름을 입력하세요'),
    body('password')
      .trim()
      .isLength({ min: 8 })
      .withMessage('비밀번호는 최소 8자 이상이어야 합니다.'),
    body('email')
      .trim()
      .isEmail()
      .withMessage('올바른 이메일 주소를 입력하세요'),
  ],
  validate,
  authContoller.signup
)

router.post(
  '/login',
  [
    body('username')
      .trim()
      .notEmpty()
      .withMessage('사용자 이름(아이디)를 입력하세요'),
    body('password').trim().notEmpty().withMessage('패스워드를 입력하세요'),
  ],
  validate,
  authContoller.login
)

export default router
