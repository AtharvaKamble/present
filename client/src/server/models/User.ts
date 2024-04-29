import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

export interface TUser extends mongoose.Document {
  firstName: string
  lastName: string
  email: string
  password: string
}

const UserSchema = new mongoose.Schema<TUser>({
  firstName: {
    type: String,
    required: [true, 'Please provide a first name'],
    maxlength: [60, 'User name cannot be more than 60 characters'],
  },
  lastName: {
    type: String,
    required: [true, 'Please provide a last name'],
    maxlength: [60, 'User name cannot be more than 60 characters'],
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
  },
})

UserSchema.pre('save', async function (next) {
  const user = this

  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8)
  }

  next()
})

export default mongoose.models.Users ||
  mongoose.model<TUser>('Users', UserSchema)
