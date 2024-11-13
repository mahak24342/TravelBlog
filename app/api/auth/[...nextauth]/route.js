import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from 'next-auth/providers/google';
 const AuthOptions=NextAuth({
  // Configure one or more authentication providers 
  providers: [
    GithubProvider({
        clientId:process.env.GITHUB_URI,
        clientSecret:process.env.GITHUB_CLIENT,
    }),
    // ...add more providers here

    GoogleProvider({
        clientId: process.env.GOOGLEURI,
        clientSecret:process.env.GOOGLE_CLIENT,
      }),
  ],
});


export {AuthOptions as GET, AuthOptions as POST};














