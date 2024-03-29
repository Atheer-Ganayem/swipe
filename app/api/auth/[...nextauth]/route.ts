import CredentialsProvider from "next-auth/providers/credentials";
import { connectMongoDB } from "@/libs/connectDB";
import User from "@/models/mongodb/user";
import bcrypt from "bcryptjs";
import NextAuth, { AuthOptions } from "next-auth";

const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials): Promise<any> {
        try {
          if (!credentials || !credentials.email || !credentials.password) {
            return null;
          }

          await connectMongoDB();

          const user = await User.findOne({ email: credentials.email }).select(
            "name email password avatar"
          );

          if (!user) {
            return null;
          }

          const isPwMatch = await bcrypt.compare(credentials.password, user.password);

          if (!isPwMatch) {
            return null;
          }

          return {
            email: user.email,
            name: user.name,
            image: user.avatar,
          };
        } catch (error) {
          console.log(error);
        }
      },
    }),
  ],
  session: {
    strategy: "jwt" as any,
  },
  secret: process.env.authSecret,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
