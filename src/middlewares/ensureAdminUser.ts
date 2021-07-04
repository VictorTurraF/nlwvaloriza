import { RequestHandler } from 'express'
import { getCustomRepository } from 'typeorm'
import { UserRepository } from '../repositories/UserRepository'

export const ensureAdminUser: RequestHandler = async (request, response, next) => {
  const { user_id } = request

  const userRepository = getCustomRepository(UserRepository)

  const { admin } = await userRepository.findOne(user_id)

  if (admin) {
    return next()
  }

  return response.status(401).json({
    error: "User don't have right permissions"
  })
}
