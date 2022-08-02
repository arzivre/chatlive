import z from 'zod'

const sendMessageSchema = z.object({
  roomId: z.string(),
  message: z.string(),
})

const messageSchema = z.object({
  id: z.string(),
  message: z.string(),
  roomId: z.string(),
  sentAt: z.date(),
  sender: z.object({
    name: z.string(),
  }),
})

type Message = z.TypeOf<typeof messageSchema>

const messageSubSchema = z.object({
  roomId: z.string(),
})

export type { Message }
export { sendMessageSchema, messageSchema, messageSubSchema }
