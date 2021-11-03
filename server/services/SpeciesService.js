import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from '../utils/Errors'

class PlanetsService {
  async getAll(query = {}) {
    const planets = await dbContext.Planets.find({}).populate('creator', 'name picture')
    return planets
  }

  async getById(id) {
    const found = await dbContext.Planets.findById(id).populate('creator', 'name picture')
    if (!found) {
      throw new BadRequest('Invalid Id')
    }
    return found
  }
  // async getByStudentId(id) {
  //   // get by the many to many relationship
  //   const classes = await dbContext.Enrollments.find({ studentId: id }).populate('class')
  //   // STUB Version 2.0
  //   // const clean = classes.map(result => {
  //   //   return {
  //   //     enrollmentId: result.id,
  //   //     ...JSON.parse(JSON.stringify(result.class))
  //   //   }
  //   // })
  //   return classes
  //   // STUB 2.0
  //   // return clean
  // }

  async create(body) {
    const newPlanet = await dbContext.Planets.create(body)
    return await this.getById(newPlanet.id)
  }

  async edit(body) {
    const found = await this.getById(body.id)
    if (found.creatorId.toString() !== body.creatorId) {
      throw new Forbidden('You do not have permission to make that change')
    }
    const updated = await dbContext.Classes.findByIdAndUpdate(body.id, body, { new: true })
    return updated
  }

  async remove(id, userId) {
    const found = await this.getById(id)
    if (found.creatorId.toString() !== userId) {
      throw new Forbidden('You do not have permission to make that change')
    }
    await dbContext.Classes.findByIdAndDelete(id)
  }
}

export const planetsService = new PlanetsService()
