import { getCustomRepository } from "typeorm";
import { User } from "../entities/User";
import { UserRepository } from "../repositories/UserRepository";
import { classToClass } from 'class-transformer'

export class ListUsersUseCase {
  async listAllUsers(): Promise<User[]> {
    const userRepository = getCustomRepository(UserRepository)

    const users = await userRepository.find()

    return classToClass(users);
  }
}