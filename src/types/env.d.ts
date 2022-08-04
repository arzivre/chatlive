declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DATABASE_URL: string
      APP_URL: string
      WS_URL: string
      NEXTAUTH_SECRET: string
      NEXTAUTH_URL: string
    }
  }
}

export {}
