import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { password } = await req.json()
  const expected = process.env.LEGACY_PASSWORD ?? 'ec-legacy-2024'

  if (password !== expected) {
    return NextResponse.json({ error: 'Incorrect password' }, { status: 401 })
  }

  const res = NextResponse.json({ success: true })
  res.cookies.set('legacy_auth', expected, {
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 30,
    path: '/',
    sameSite: 'lax',
  })
  return res
}
