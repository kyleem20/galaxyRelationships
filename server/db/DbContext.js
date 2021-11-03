import mongoose from 'mongoose'
import { AccountSchema, ProfileSchema } from '../models/Account'
import { PlanetSchema } from '../models/Planet'

class DbContext {
  Planets = mongoose.model('Planet', PlanetSchema);

  Account = mongoose.model('Account', AccountSchema);
  Profiles = mongoose.model('Profile', ProfileSchema, 'accounts');
}

export const dbContext = new DbContext()
