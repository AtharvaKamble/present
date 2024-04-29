import dbConnect from '@/server/lib/dbConnect'
import User from '@/server/models/User'
import type { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcrypt'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const {
    query: { id },
    method,
    body,
  } = req

  await dbConnect()

  switch (method) {
    case 'POST':
      const { email, password } = body

      const user = await User.findOne({ email })

      if (!user) {
        res
          .status(403)
          .json({ success: false, body: null, error: 'user_not_exist' })
        break
      }

      const ismatch = await bcrypt.compare(password, user.password)
      // const ismatch = password === user.password

      if (!ismatch) {
        res
          .status(403)
          .json({ success: false, body: null, error: 'password_not_match' })
      }

      res.status(200).json({ success: true, body: user, error: null })

      break
    default:
      res.status(400).json({ success: false })
      break
  }
}
