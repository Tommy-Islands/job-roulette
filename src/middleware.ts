import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// パスワードは環境変数で管理することを推奨
// const CORRECT_PASSWORD = 'your-password';

export function middleware(request: NextRequest) {
  const hasValidPassword = request.cookies.get('auth');
  
  // パスワードが正しくない場合はログインページにリダイレクト
  if (!hasValidPassword && request.nextUrl.pathname !== '/login') {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/login']
}; 