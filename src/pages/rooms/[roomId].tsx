import Head from 'next/head'
import { useRouter } from 'next/router'

const RoomId = () => {
  const { query } = useRouter()
  const roomId = query.roomId as string
  return (
    <>
      <Head>
        <title>Chat Room {roomId}</title>
      </Head>
      <main className='container mxuauto flex flex-col items-center justify-center h-screen p-4'>
        <h1 className='text-5xl md:text-[5rem] leading-normal font-extrabold text-gray-700'>
          Welcome to Room {roomId}
        </h1>
      </main>
    </>
  )
}

export default RoomId
