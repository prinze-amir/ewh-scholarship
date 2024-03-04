import { Inter } from 'next/font/google'
import './globals.css'
import {Header} from '@/components/Headers/header'
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'EWH Scholarships',
  description: 'Private scholarships for students in the Earline and William Hall Family Tree',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        {children}
        </body>
    </html>
  )
}
