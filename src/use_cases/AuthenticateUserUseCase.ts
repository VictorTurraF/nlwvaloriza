import { getCustomRepository } from "typeorm";
import { UserRepository } from "../repositories/UserRepository";
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import { response } from "express";

interface UserCredentials {
  email: string,
  password: string,
}

export class AuthenticateUserUseCase {
  public async authenticateUser({ email, password }: UserCredentials ) {
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
      "b996e7eaf8a2b199279360a76b18ab92c4191d84b37e1243c90cd1d7bb966567",
      {
        subject: user.id,
        expiresIn: "1d"
      }
    )

    return token
  }
}