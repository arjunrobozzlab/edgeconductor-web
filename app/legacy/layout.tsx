import { cookies } from 'next/headers'
import PasswordGate from './PasswordGate'

export default async function LegacyLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies()
  const stored = cookieStore.get('legacy_auth')?.value
  const expected = process.env.LEGACY_PASSWORD ?? 'ec-legacy-2024'

  if (stored !== expected) {
    return <PasswordGate />
  }

  return <>{children}</>
}
