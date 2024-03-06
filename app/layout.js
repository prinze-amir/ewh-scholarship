import { Inter } from 'next/font/google'
import './globals.css'
import {TransparentHeader} from '@/components/Headers/transparentHeader'
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'EWH Scholarships',
  description: 'Private scholarships for students in the Earline and William Hall Family Tree',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <TransparentHeader />
        {children}
        </body>
    </html>
  )
}
