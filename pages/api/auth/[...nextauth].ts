import NextAuth from "next-auth";
import Providers from "next-auth/providers";

export default NextAuth({
  providers: [
    Providers.GitHub({
      clientId:     process.env.NEXT_PUBLIC_CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      scope:        "repo:status,read:user,user:email",
      profile(profile, token) {
        return {
          id:          profile.id as string,
          name:        profile.name || profile.login as string,
          email:       profile.email,
          image:       profile.avatar_url as string,
          accessToken: token.accessToken
        };
      }
    })
  ],
  pages:     { signIn: "/login" },
  callbacks: {
    async jwt(token, _, account) {
      if (account?.accessToken)
        token.accessToken = account.accessToken;

      return token;
    },
    async session(session, token) {
      session.accessToken = token.accessToken;
      return session;
    }
  }
});
