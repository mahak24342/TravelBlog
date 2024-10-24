import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from 'next-auth/providers/google';
 const AuthOptions=NextAuth({
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
        clientId:'Ov23licxyOxGMmBrWr6j',
        clientSecret:'75ba7aa136bc404ee3bec99ffa614e9d0749a419'
    }),
    // ...add more providers here

    GoogleProvider({
        clientId: '675564386966-a7t0r0ksp5v419rqjnrm59ig894dd19d.apps.googleusercontent.com',
        clientSecret: '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',
      }),
  ],
});


export {AuthOptions as GET, AuthOptions as POST};














