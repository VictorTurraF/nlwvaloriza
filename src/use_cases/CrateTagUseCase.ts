import { getCustomRepository } from 'typeorm'
import { TagRepository } from '../repositories/TagRepository'

interface TagDTO {
  name: string
}

export class CreateTagUseCase {
  async createTag ({ name }: TagDTO) {
    const tagRepository = getCustomRepository(TagRepository)

    if (!name) {
      throw new Error('Incorrect name!')
    }

    const tagAlreadyExists = await tagRepository.findOne({ name })

    if (tagAlreadyExists) {
      throw new Error('Tag already exists')
    }

    const tag = tagRepository.create({ name })
    await tagRepository.save(tag)

    return tag
  }
}
