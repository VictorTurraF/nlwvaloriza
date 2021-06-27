import { getCustomRepository } from 'typeorm'
import { UserRepository } from '../repositories/UserRepository'
import { hash } from 'bcryptjs'

interface UserDTO {
  name: string,
  email: string,
  password: string,
  admin: boolean,
}

export class CreateUserUseCase {
  async createUser ({ name, email, password, admin = false } : UserDTO) {
    const userRepository = getCustomRepository(UserRepository)

    if (!email) {
      throw new Error('Incorrect email provided')
    }

    const passwordHash = await hash(password, 8)

    const userAlReadyExists = await userRepository.findOne({
      email
    })

    if (userAlReadyExists) {
      throw new Error('User already exists')
    }

    const user = userRepository.create({
      name,
      email,
      password: passwordHash,
      admin
    })

    await userRepository.save(user)

    return user
  }
}
