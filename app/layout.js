import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'FleetPulse - AI-Powered Fleet Management for Indian SMEs',
  description: 'Save costs, improve safety, and automate compliance with FleetPulse - the leading fleet management solution for Indian SME fleet operators.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}