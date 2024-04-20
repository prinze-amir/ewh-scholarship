import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcrypt";
import connectMongoDB from "@/lib/mongo/mongoosedb";
import User from "@/models/userModel";
import { signIn } from "next-auth/react";

const loginAuth = async (credentials) => {
    const { email, password } = credentials;
    
    await connectMongoDB();
    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error("No user found");
    }

    const passwordsMatch = await bcrypt.compare(password, user.password);

    if (passwordsMatch === false) {
      throw new Error("Password does not match");
    }

    return user;
}

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Enter your email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        try {
          const user = await loginAuth(credentials);
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
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL,

  session: {
    strategy: "jwt",
    maxAge: 1* 60 * 60,// 1 hours
  },
  callbacks: {
    async jwt({token, user}) {
      if (user) {
        console.log(user, 'user in jwt callback')
        token.password = user.password;
        token.role = user.role;
        token.id = user._id;
        token.image = user.image;
    //    console.log(token, 'token', user, 'user in callback jwt')
      }
      return token;
    },
    async session({session, token}) {
        if(token){
            session.user.role = token.role;
            session.user.id = token.id;
            session.user.image = token.image;
     //      console.log(session, 'session', token, 'token in session callback')
        }
       
      return session;
    },
    
    // async signIn(user, account, profile) {
    //  // if (account.provider === "google") {
    //  // console.log(user, 'user', account, 'account', profile, 'profile')
    //     return true;
    // //  }
    //  // return true;
    // },
    // async redirect({ url, baseUrl }) {
    //   // You can use a conditional statement to customize the redirect based on the user role or other parameters
    //     console.log(url, 'url', baseUrl, 'baseUrl')
    //     return baseUrl+'/admin'; 
    //    // Redirecting to a custom page after login
    // }

  },
  jwt: {
    maxAge: 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,

  pages: {
     signIn: "/login",
     signOut: "/api/auth/signout",
    // error: "/login", // Error code passed in query string as ?error=
    // verifyRequest: "/auth/verify-request", // (used for check email message)
    // newUser: null // If set, new users will be directed here on first sign in
  },
  // theme: {
  //   colorScheme: "light",
  //   brandColor: "#ffba12",//not working
  //   logo: "/next.svg",
  // },
 // debug:true,
};
export const handlers = NextAuth(authOptions);

