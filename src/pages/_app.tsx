// src/pages/_app.tsx
import { httpBatchLink } from '@trpc/client/links/httpBatchLink'
import { createWSClient, wsLink } from '@trpc/client/links/wsLink'
import { withTRPC } from '@trpc/next'
import { SessionProvider } from 'next-auth/react'
import type { AppType } from 'next/dist/shared/lib/utils'
import type { AppRouter } from 'src/server/router'
import 'src/styles/globals.css'
import superjson from 'superjson'

const MyApp: AppType = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  )
}

const getBaseUrl = () => {
  if (typeof window !== 'undefined') {
    return ''
  }
  if (process.browser) return '' // Browser should use current path
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}` // SSR should use vercel url

  return `http://localhost:${process.env.PORT ?? 3000}` // dev SSR should use localhost
}

const url = `${getBaseUrl()}/api/trpc`

function getEndingLink() {
  if (typeof window === 'undefined') {
    return httpBatchLink({
      url,
    })
  }

  const client = createWSClient({
    url: process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:3001',
  })

  return wsLink<AppRouter>({
    client,
  })
}

export default withTRPC<AppRouter>({
  config({ ctx }) {
    /**
     * If you want to use SSR, you need to use the server's full URL
     * @link https://trpc.io/docs/ssr
     */

    return {
      links: [
        // pass logger link in here
        getEndingLink(),
      ],
      transformer: superjson,
      /**
       * @link https://react-query.tanstack.com/reference/QueryClient
       */
      // queryClientConfig: { defaultOptions: { queries: { staleTime: 60 } } },
      headers: () => {
        if (ctx?.req) {
          return {
            ...ctx.req.headers,
          }
        }
        return {}
      },
    }
  },
  /**
   * @link https://trpc.io/docs/ssr
   */
  ssr: false,
})(MyApp)
