import { getCustomRepository } from 'typeorm'
import { TagRepository } from '../repositories/TagRepository'
import { classToClass } from 'class-transformer'
import { Tag } from '../entities/Tag'

export class ListTagsUseCase {
  async listAllTags (): Promise<Tag[]> {
    const tagRepository = getCustomRepository(TagRepository)

    const tags = await tagRepository.find()

    return classToClass(tags)
  }
}
