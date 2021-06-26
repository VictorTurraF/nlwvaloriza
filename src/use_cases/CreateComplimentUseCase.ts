import { getCustomRepository } from "typeorm";
import { ComplimentRepository } from "../repositories/ComplimentRepository";
import { UserRepository } from "../repositories/UserRepository";

interface ComplimentDTO {
  tag_id: string,
  user_sender: string,
  user_receiver: string,
  message: string
}

export class CreateComplimentUseCase {
  private complimentRepository: ComplimentRepository;
  private userRepository: UserRepository;

  public constructor() {
    this.complimentRepository = getCustomRepository(ComplimentRepository)
    this.userRepository = getCustomRepository(UserRepository)
  }

  async createCompliment ({ tag_id, user_sender, user_receiver, message }: ComplimentDTO) {
    if (user_sender === user_receiver) {
      throw new Error('Icorrect user receiver')
    }

    const userReceiverExists = await this.userRepository.findOne(user_receiver)

    if (!userReceiverExists) {
      throw new Error('User receiver does not exists!')
    }

    const compliment = this.complimentRepository.create({
      tag_id,
      user_sender,
      user_receiver,
      message
    })

    await this.complimentRepository.save(compliment)

    return compliment
  }
}