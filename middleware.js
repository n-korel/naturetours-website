import { NextResponse } from 'next/server';
import { auth } from './app/_lib/auth';

export async function middleware(request) {
	const session = await auth();

	if (session?.user) {
		return NextResponse.next();
	}

	const token = request.cookies.get('token')?.value;

	if (!token) {
		const loginUrl = new URL('/login', request.url);
		loginUrl.searchParams.set('callbackUrl', request.nextUrl.pathname);
		return NextResponse.redirect(loginUrl);
	}

	return NextResponse.next();
}

export const config = {
	matcher: ['/profile'],
};
