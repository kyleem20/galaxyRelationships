import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const SpecieSchema = new Schema(
  {
    name: { type: String, required: true },
    planetId: { type: Schema.Types.ObjectId, required: true, ref: 'Planet' },
    creatorId: { type: Schema.Types.ObjectId, ref: 'Profile', required: true }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

SpecieSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  justOne: true,
  ref: 'Profile'
})

SpecieSchema.virtual('planet', {
  localField: 'planetId',
  foreignField: '_id',
  justOne: true,
  ref: 'Planet'
})
