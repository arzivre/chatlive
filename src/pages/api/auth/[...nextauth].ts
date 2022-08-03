import NextAuth from 'next-auth'
import { AppProviders } from 'next-auth/providers'
import CredentialsProvider from 'next-auth/providers/credentials'
import GithubProvider from 'next-auth/providers/github'

const providers: AppProviders = []
providers.push(
  CredentialsProvider({
    id: 'github',
    name: 'Mocked GitHub',
    async authorize(credentials) {
      const user = {
        id: credentials?.name,
        name: credentials?.name,
        email: credentials?.name,
      }
      return user
    },
    credentials: {
      name: { type: 'test' },
    },
  })
)
export default NextAuth({
  // Configure one or more authentication providers
  providers,
})
