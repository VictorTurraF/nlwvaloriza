import { RequestHandler } from 'express'
import { CreateUserUseCase } from '../use_cases/CreateUserUseCase'
import { ListUsersUseCase } from '../use_cases/ListUsersUseCase'

class UserController {
  index: RequestHandler = async function (request, response) {
    const useCase = new ListUsersUseCase()

    const users = await useCase.listAllUsers()

    return response.json(users)
  }

  store: RequestHandler = async function (request, response) {
    const { name, email, password, admin } = request.body

    const useCase = new CreateUserUseCase()

    const user = await useCase.createUser({ name, email, password, admin })

    return response.status(201).send(user)
  }
}

export const userController = new UserController()
