import { ThemeProvider } from "next-themes"

const NotFoundPage = () => {
  return (
    <>
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange>
        404 not found
      </ThemeProvider>
    </>
  )
}

export default NotFoundPage