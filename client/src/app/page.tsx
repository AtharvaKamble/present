import { ChakraProvider, Button, Stack } from '@chakra-ui/react'
// import { Button } from '@/shadcn/ui/button'
import { ThemeProvider } from '@/shadcn/themeProvider'

export default function Home() {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
    >
      <ChakraProvider>
        Please redirect to{' '}
        <a className="font-bold" href="http://present-self.vercel.app/landing">
          http://present-self.vercel.app/landing
        </a>
      </ChakraProvider>
    </ThemeProvider>
  )
}
