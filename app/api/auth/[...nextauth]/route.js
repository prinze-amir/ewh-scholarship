import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcrypt";
import connectMongoDB from "@/lib/mongo/mongoosedb";
import User from "@/models/userModel";


const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const { email, password } = credentials;
         
          await connectMongoDB();
          const user = await User.findOne({ email: email })
          if (!user) {
            throw new Error("No user found");
          }
         
          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (passwordsMatch === false) {
            throw new Error("Password does not match");
          }

          return user;

        } catch (e) {
          console.error(e);
          throw new Error(e.message);
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_CLIENT_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],

  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({token, user}) {
      console.log(token, user, 'token and user')
      if (user) {
        token.password = user.password;
      }
      return token;
    },
    
  },
  secret: process.env.AUTH_SECRET,

  pages: {
    signIn: "/login",
    signOut: "/auth/signout",
    error: "/login", // Error code passed in query string as ?error=
    verifyRequest: "/auth/verify-request", // (used for check email message)
    // newUser: null // If set, new users will be directed here on first sign in
  },
};
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
