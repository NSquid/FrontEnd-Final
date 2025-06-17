import './globals.css'
import { ThemeProvider } from '@/context/ThemeContext'
import { StoreProvider } from '@/context/StoreContext'
import Navbar from '@/components/Navbar'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>
          <ThemeProvider>
            <Navbar />
            {children}
          </ThemeProvider>
        </StoreProvider>
      </body>
    </html>
  )
}
