import { ApolloClient, InMemoryCache } from "@apollo/client";
import { LOGIN_USER } from "lib/queries";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "aminata@fasolara.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const { email, password } = credentials;

        const client = new ApolloClient({
          uri:
            process.env.NODE_ENV === "production"
              ? process.env.NEXT_PUBLIC_CLIENT_URI
              : process.env.NEXT_PUBLIC_CLIENT_DEV,
          cache: new InMemoryCache(),
        });

        const { data } = await client.mutate({
          mutation: LOGIN_USER,
          variables: {
            loginInput: {
              email,
              password,
            },
          },
        });

        if (data) {
          return data.loginUser.token;
        } else return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/auth/login",
  },
};

export default NextAuth(authOptions);
