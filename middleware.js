import { NextResponse } from 'next/server';
import { auth } from './app/_lib/auth';

export async function middleware(request) {
	const session = await auth();

	const token = request.cookies.get('token')?.value;
	const role = request.cookies.get('role')?.value;

	if (!token && !role) {
		return NextResponse.redirect(new URL('/login', request.url));
	}

	if (request.nextUrl.pathname.startsWith('/booking') && role !== 'user') {
		return NextResponse.redirect(new URL('/', request.url));
	}

	if (request.nextUrl.pathname.startsWith('/reviews') && !token && !role) {
		return NextResponse.redirect(new URL('/login', request.url));
	}

	if (request.nextUrl.pathname.startsWith('/profile') && !token) {
		return NextResponse.redirect(new URL('/', request.url));
	}

	if (
		request.nextUrl.pathname.startsWith('/management') &&
		!(role === 'admin' || role === 'lead-guide')
	) {
		return NextResponse.redirect(new URL('/', request.url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: ['/profile', '/tours/:slug/booking', '/booking', '/management', '/reviews'],
};
