import * as trpc from '@trpc/server'
import { randomUUID } from 'crypto'
import z from 'zod'
import { createRouter } from './context'

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

export enum Events {
  SEND_MESSAGE = 'SEND_MESSAGE',
}

export const roomRouter = createRouter()
  .mutation('send-message', {
    input: sendMessageSchema,
    resolve({ ctx, input }) {
      const message: Message = {
        ...input,
        id: randomUUID(),
        sentAt: new Date(),
        sender: {
          name: ctx.session?.user?.name || 'unknown',
        },
      }

      ctx.ee.emit(Events.SEND_MESSAGE, message)
      return true
    },
  })
  .subscription('onSendMessage', {
    input: messageSubSchema,
    resolve({ ctx, input }) {
      return new trpc.Subscription<Message>((emit) => {
        function onMessage(data: Message) {
          if (input.roomId === data.roomId) {
            emit.data(data)
          }
        }
        ctx.ee.on(Events.SEND_MESSAGE, onMessage)
        return () => {
          ctx.ee.off(Events.SEND_MESSAGE, onMessage)
        }
      })
    },
  })
