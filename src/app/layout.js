import './globals.css'
import { Inter } from 'next/font/google'
import Navbar from './components/Navbar'
import { AuthProvider } from './contexts/authContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <AuthProvider>
      <html lang="en">
        <body className={inter.className}>
          <Navbar></Navbar>
          {children}
        </body>
      </html>
    </AuthProvider>
  )
}
