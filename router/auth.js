import express from 'express'
import { body } from 'express-validator'
import * as authContoller from '../controller/auth.controller.js'
import { isAuth } from '../middleware/auth.js'
import { validate } from '../middleware/validator.js'

const router = express.Router()

const validateCredential = [
  body('username')
    .trim()
    .notEmpty()
    .withMessage('사용자 이름(아이디)를 입력하세요'),
  body('password')
    .trim()
    .isLength({ min: 8 })
    .withMessage('비밀번호는 최소 8자 이상이어야 합니다.'),
  validate,
]

const validateSignup = [
  ...validateCredential,
  body('name').trim().notEmpty().withMessage('이름을 입력하세요'),
  body('email').trim().isEmail().withMessage('올바른 이메일 주소를 입력하세요'),
  body('url')
    .trim()
    .isURL()
    .withMessage('올바른 URL을 입력해주세요')
    .optional({ nullable: true, checkFalsy: true }),
  validate,
]

router.post('/signup', validateSignup, authContoller.signup)

router.post('/login', validateCredential, authContoller.login)

router.get('/me', isAuth, authContoller.me)

export default router
