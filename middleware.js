import { NextResponse } from 'next/server';

export async function middleware(request) {
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
