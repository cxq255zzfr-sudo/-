export default function middleware(request) {
  const { pathname } = new URL(request.url);
  if (pathname !== '/dashboard' && pathname !== '/dashboard.html') {
    return;
  }

  const expectedUser = process.env.DASHBOARD_USER || 'admin';
  const expectedPass = process.env.DASHBOARD_PASS || '123456';
  const authorization = request.headers.get('authorization');

  if (authorization) {
    const [scheme, encoded] = authorization.split(' ');
    if (scheme === 'Basic' && encoded) {
      const decoded = atob(encoded);
      const [user, pass] = decoded.split(':');
      if (user === expectedUser && pass === expectedPass) {
        return;
      }
    }
  }

  return new Response('Authentication required', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Dashboard"'
    }
  });
}

export const config = {
  matcher: ['/dashboard', '/dashboard.html']
};
