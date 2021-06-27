import { getCustomRepository } from 'typeorm'
import { UserRepository } from '../repositories/UserRepository'
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'

interface UserCredentials {
  email: string,
  password: string,
}

export class AuthenticateUserUseCase {
  public async authenticateUser ({ email, password }: UserCredentials) {
    const userRepository = getCustomRepository(UserRepository)

    const user = await userRepository.findOne({
      email
    })

    if (!user) {
      throw new Error('Email/Password is incorrect')
    }

    const passwordMatch = await compare(password, user.password)

    if (!passwordMatch) {
      throw new Error('Email/Password is incorrect')
    }

    const token = sign(
      {
        email: user.email
      },
      process.env.TOKEN_SECRET,
      {
        subject: user.id,
        expiresIn: '1d'
      }
    )

    return token
  }
}
