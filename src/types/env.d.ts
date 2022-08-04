declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DATABASE_URL: string
      NEXT_PUBLIC_WS_URL: string
      NEXTAUTH_SECRET: string
      NEXTAUTH_URL: string
      RAILWAY_STATIC_URL: string
    }
  }
}

export {}
