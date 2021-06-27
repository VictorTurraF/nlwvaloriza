import { RequestHandler } from 'express'
import { CreateTagUseCase } from '../use_cases/CrateTagUseCase'
import { ListTagsUseCase } from '../use_cases/ListTagsUseCase'

class TagController {
  index: RequestHandler = async (request, response) => {
    const useCase = new ListTagsUseCase()

    const tags = await useCase.listAllTags()

    return response.json(tags)
  }

  store: RequestHandler = async (request, response) => {
    const { name } = request.body

    const useCase = new CreateTagUseCase()

    const tag = await useCase.createTag({ name })

    return response.json(tag)
  }
}

export const tagController = new TagController()
