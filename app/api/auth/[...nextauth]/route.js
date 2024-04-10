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
        email: { label: "Email", type: "email", placeholder: "Enter your email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const { email, password } = credentials;

          await connectMongoDB();
          const user = await User.findOne({ email: email });
          console.log(user, "user")
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
      clientId: process.env.AUTH_GOOGLE_CLIENT,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],

  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({token, user}) {
      console.log(token, 'token', user, 'user')
      if (user) {
        token.password = user.password;
        token.role = user.role;
      }
      console.log(token, 'token')
      return token;
    },
    async session({session}) {
      console.log(session, 'session', 'user')
     
      return session;
    },

    async authorized(auth, request) {
      const isLoggedIn = auth?.user;
      const isOnAdminPage = request.nextUrl.pathname.includes("/admin");
      console.log(isLoggedIn, isOnAdminPage, "auth and request");
      if (!isLoggedIn && isOnAdminPage) {
        return Response.redirect(new URL("/login", request.nextUrl));
      }
      if (isLoggedIn) {
        //return Response.redirect('/admin');
        return Response.redirect(new URL("/admin", request.nextUrl));
      }
      return true;
    },
  },

  secret: process.env.AUTH_SECRET,

  pages: {
    // signIn: "/login",
    // signOut: "/auth/signout",
    // error: "/login", // Error code passed in query string as ?error=
    // verifyRequest: "/auth/verify-request", // (used for check email message)
    // newUser: null // If set, new users will be directed here on first sign in
  },
};
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
