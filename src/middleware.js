import { NextResponse } from 'next/server';

export function middleware(request) {
  // 1. Check if the user is trying to access any route inside /admin
  if (request.nextUrl.pathname.startsWith('/admin')) {
    
    // 2. Look for your secure authentication cookies (Supabase sets these automatically when logged in)
    // Note: The exact cookie name depends on your Supabase SSR setup, but typically includes 'sb-' or 'supabase'
    const hasSession = request.cookies.getAll().some(cookie => 
      cookie.name.includes('supabase') || cookie.name.includes('sb-')
    );

    // 3. If there is no secure session cookie found, intercept the request
    if (!hasSession) {
      // 4. Instantly kick the unauthorized user back to the homepage
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  // If they are not trying to access /admin, or if they have a session, let them proceed normally
  return NextResponse.next();
}

// 🌟 IMPORTANT: This config ensures the middleware ONLY runs on /admin routes. 
// This keeps the rest of your storefront running at lightning speed.
export const config = {
  matcher: ['/admin', '/admin/:path*'],
};