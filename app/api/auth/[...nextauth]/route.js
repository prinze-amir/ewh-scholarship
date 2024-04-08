import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcrypt";

const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: {  label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const { email, password } = credentials;
        const user = { id: 1, name: "Amir A", email: "amirarnett@yahoo.com", password: "password"};
        if (user.email !== email) {
          throw new Error("No user found");
        }
       if (user.password !== password) {
          throw new Error("Password does not match");
        }

        return user;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],

  session: {
    strategy: "jwt",
  },
  secret: process.env.AUTH_SECRET,

  pages: {
      signIn: '/login',
      signOut: '/auth/signout',
       error: '/auth/error', // Error code passed in query string as ?error=
       verifyRequest: '/auth/verify-request', // (used for check email message)
      // newUser: null // If set, new users will be directed here on first sign in
  },
};
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
