import express from 'express'
import { body, param } from 'express-validator'
import { validate } from '../middleware/validator.js'
import * as tweetController from '../controller/tweet.controller.js'

const router = express.Router()

router
  .get('/', tweetController.getTweets)
  .post(
    '/',
    [
      body('text')
        .trim()
        .isLength({ min: 3 })
        .withMessage('적어도 3자 이상 입력해야 합니다.'),
      body('name')
        .trim()
        .notEmpty()
        .withMessage('작성자의 이름이 있어야 합니다.'),
      body('username')
        .trim()
        .notEmpty()
        .withMessage('사용자 이름이 있어야 합니다.'),
      validate,
    ],
    tweetController.createTweet
  )

router
  .get(
    '/:id',
    [
      param('id')
        .trim()
        .notEmpty()
        .withMessage('조회할 트윗의 id를 입력해주세요.'),
      validate,
    ],
    tweetController.getTweetById
  )
  .patch(
    '/:id',
    [
      param('id')
        .trim()
        .notEmpty()
        .withMessage('수정할 트윗의 id를 입력해주세요.'),
      body('text')
        .trim()
        .isLength({ min: 3 })
        .withMessage('적어도 3자 이상 입력해야 합니다.'),
      validate,
    ],
    tweetController.updateTweet
  )
  .delete(
    '/:id',
    [
      param('id')
        .trim()
        .notEmpty()
        .withMessage('조회할 트윗의 id를 입력해주세요.'),
      validate,
    ],
    tweetController.deleteTweet
  )

export default router
