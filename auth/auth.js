import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { authConfig } from "../authconfig";
import connectMongoDB from "@/lib/mongo/mongoosedb";
import User from "@/models/userModel";
import bcrypt from "bcrypt";

const simpleLogin = async (credentials) => {
  const user = { id: 1, name: "J Smith", email: "" };
  return user;
};

const login = async (credentials) => {
  const { email, password } = credentials;
  try {
    connectMongoDB();
    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error("No user found");
    }

    const passwordsMatch = await bcrypt.compare(password, user.password);
    if (!passwordsMatch) {
      throw new Error("Password does not match");
    }
    return user;
  } catch (e) {
    console.error(e);
    console.log("error", e.message);
    throw new Error("Invalid credentials");
  }
};

export const { signIn, singOut, auth } = NextAuth({
  ...authConfig,
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        try {
          const user = await login(credentials);
          return user;
        } catch (e) {
          console.error(e);
          return null;
        }
      },
    }),
  ],
});
