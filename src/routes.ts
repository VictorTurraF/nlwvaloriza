import { Router } from 'express'
import { authenticationController } from './controllers/AuthenticationController'
import { complimentController } from './controllers/ComplimentController'
import { tagController } from './controllers/TagController'
import { userController } from './controllers/UserController'
import { userReceivedComplimentController } from './controllers/UserReceivedComplimentController'
import { userSentComplimentController } from './controllers/UserSentComplimentController'
import { ensureAdminUser } from './middlewares/ensureAdminUser'
import { ensureAuthenticated } from './middlewares/ensureAuthenticated'

const router = Router()

/* Tag routes */
router.post(
  '/tags',
  ensureAuthenticated,
  ensureAdminUser,
  tagController.store
)
router.get('/tags', ensureAuthenticated, tagController.index)

/* User routes */
router.post('/users', userController.store)
router.get('/users', ensureAuthenticated, ensureAdminUser, userController.index)
router.get('/users/compliments/receive', ensureAuthenticated, userReceivedComplimentController.index)
router.get('/users/compliments/send', ensureAuthenticated, userSentComplimentController.index)

/* Auth routes */
router.post('/auth', authenticationController.handle)

/* Compliment routes */
router.post(
  '/compliments',
  ensureAuthenticated,
  complimentController.store
)

export { router }
