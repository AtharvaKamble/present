import dbConnect from '@/server/lib/dbConnect'
import Presentation from '@/server/models/Presentation'
import type { NextApiRequest, NextApiResponse } from 'next'

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
    case 'PATCH':
      const { pid, user_uid, name } = body

      const updatedData = await Presentation.findOneAndUpdate(
        { _id: pid },
        { name },
      )

      console.log(updatedData, body)

      try {
        res.status(200).json({ success: true, body: updatedData, error: null })
      } catch (e) {
        res.status(400).json({
          success: false,
          body: null,
          error: 'There was an issue updating presentation name',
        })
      }

      break
    default:
      res.status(400).json({ success: false, body: 'PATCH requests only' })
      break
  }
}
