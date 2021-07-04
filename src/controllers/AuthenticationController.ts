import { RequestHandler } from 'express'
import { AuthenticateUserUseCase } from '../use_cases/AuthenticateUserUseCase'

export class AuthenticationController {
  handle: RequestHandler = async (request, response) => {
    const { email, password } = request.body

    const useCase = new AuthenticateUserUseCase()

    const token = await useCase.authenticateUser({ email, password })

    return response.json({ token })
  }
}

export const authenticationController = new AuthenticationController()
