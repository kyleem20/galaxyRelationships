import { Auth0Provider } from '@bcwdev/auth0provider'
import { planetsService } from '../services/PlanetsService'
import BaseController from '../utils/BaseController'

export class PlanetsController extends BaseController {
  constructor() {
    super('api/planets')
    this.router
      .get('', this.getAll)
      .get('/:id', this.getById)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
  }

  async getAll(req, res, next) {
    try {
      const query = req.query
      const planets = await planetsService.getAll(query)
      return res.send(planets)
    } catch (error) {
      next(error)
    }
  }

  async getById(req, res, next) {
    try {
      const planetResult = await planetsService.getById(req.params.id)
      return res.send(planetResult)
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
      const newPlanet = await planetsService.create(req.body)
      return res.send(newPlanet)
    } catch (error) {
      next(error)
    }
  }

  async edit(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      req.body.id = req.params.id
      const update = await planetsService.edit(req.body)
      return res.send(update)
    } catch (error) {
      next(error)
    }
  }

  async remove(req, res, next) {
    try {
      await planetsService.remove(req.params.id, req.userInfo.id)
      return res.send('deleted')
    } catch (error) {
      next(error)
    }
  }
}
