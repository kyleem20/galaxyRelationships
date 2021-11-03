import { Auth0Provider } from '@bcwdev/auth0provider'
import { speciesService } from '../services/SpeciesService'
import BaseController from '../utils/BaseController'

export class SpeciesController extends BaseController {
  constructor() {
    super('api/species')
    this.router
      .get('', this.getAll)
      .get('/:id', this.getById)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
  }

  async getAll(req, res, next) {
    try {
      const query = req.query
      const species = await speciesService.getAll(query)
      return res.send(species)
    } catch (error) {
      next(error)
    }
  }

  async getById(req, res, next) {
    try {
      const specieResult = await speciesService.getById(req.params.id)
      return res.send(specieResult)
    } catch (error) {
      next(error)
    }
  }

  // async getAllBooks(req, res, next) {
  //   try {
  //     // using the same find method I can pass a query to determine what comes back
  //     const books = await booksService.getAll({ classId: req.params.id })
  //     return res.send(books)
  //   } catch (error) {
  //     next(error)
  //   }
  // }

  async create(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const newSpecie = await speciesService.create(req.body)
      return res.send(newSpecie)
    } catch (error) {
      next(error)
    }
  }

  async edit(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      req.body.id = req.params.id
      const update = await speciesService.edit(req.body)
      return res.send(update)
    } catch (error) {
      next(error)
    }
  }

  async remove(req, res, next) {
    try {
      await speciesService.remove(req.params.id, req.userInfo.id)
      return res.send('deleted')
    } catch (error) {
      next(error)
    }
  }
}
