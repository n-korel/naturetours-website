import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';

const authConfig = {
	providers: [
		Google({
			clientId: process.env.AUTH_GOOGLE_ID,
			clientSecret: process.env.AUTH_GOOGLE_SECRET,
		}),
	],
	callbacks: {
		authorized({ auth }) {
			return !!auth?.user;
		},

		async jwt({ token, user, account }) {
			if (account && user) {
				token.role = 'user';
				token.accessToken = account.access_token;
			}
			return token;
		},

		async session({ session, token }) {
			session.user.role = token.role;
			session.user.accessToken = token.accessToken;
			return session;
		},
	},
};

export const {
	auth,
	signIn,
	signOut,
	handlers: { GET, POST },
} = NextAuth(authConfig);
