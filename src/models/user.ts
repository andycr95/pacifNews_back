import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, lowercase: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  phoneNumber: { type: String }
}, {
  timestamps: true
})

userSchema.methods.encriptPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10)
  const bsalt = await bcrypt.hash(password, salt)
  return bsalt
}

userSchema.methods.matchPassword = async function (password: string) {
  const bpass = await bcrypt.compare(password, this.password)
  return bpass
}

const User = mongoose.model('user', userSchema)

export default User
