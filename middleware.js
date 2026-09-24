export default function middleware(request) {
  const url = new URL(request.url);
  
  if (url.pathname === '/gestao-secreta-2026.html' || url.pathname === '/js/admin-blog.js') {
    const cookie = request.headers.get('cookie');
    
    if (!cookie || !cookie.includes('auth_token=')) {
      url.pathname = '/404.html';
      return Response.redirect(url, 302);
    }
  }
}

export const config = {
  matcher: ['/gestao-secreta-2026.html', '/js/admin-blog.js'],
};
