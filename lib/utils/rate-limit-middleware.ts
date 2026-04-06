import { NextRequest, NextResponse } from 'next/server';
import { checkRateLimit, getClientIP } from './security';

export function withRateLimit(
  handler: (request: NextRequest) => Promise<NextResponse>,
  maxRequests: number = 30,
  windowMs: number = 60000
) {
  return async (request: NextRequest) => {
    const ip = getClientIP(request.headers);
    const key = `${request.nextUrl.pathname}:${ip}`;
    const result = checkRateLimit(key, maxRequests, windowMs);

    if (!result.allowed) {
      return NextResponse.json(
        { error: 'Trop de requêtes. Veuillez réessayer.' },
        { status: 429, headers: { 'Retry-After': String(Math.ceil(result.resetIn / 1000)) } }
      );
    }

    return handler(request);
  };
}
