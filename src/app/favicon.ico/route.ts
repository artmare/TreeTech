import {NextResponse} from 'next/server';

export function GET(request: Request) {
  return NextResponse.redirect(new URL('/icon.svg', request.url), 308);
}

export function HEAD(request: Request) {
  return new Response(null, {
    status: 308,
    headers: {
      Location: new URL('/icon.svg', request.url).toString()
    }
  });
}
