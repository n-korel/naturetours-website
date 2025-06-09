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
				token.id = user.id;
				token.role = 'user';
				token.accessToken = account.access_token;
			}
			return token;
		},

		async session({ session, token }) {
			if (session?.user) {
				session.user.id = token.id;
				session.user.role = token.role;
				session.user.accessToken = token.accessToken;
			}
			return session;
		},
	},
	session: {
		strategy: 'jwt',
	},
};

export const {
	auth,
	signIn,
	signOut,
	handlers: { GET, POST },
} = NextAuth(authConfig);
