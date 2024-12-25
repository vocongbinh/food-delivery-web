"use client"
import { createTheme, ThemeProvider } from '@mui/material/styles'
import React from 'react'

export default function MUIThemeProvider({ children }: { children: React.ReactNode }) {
  const muitheme = createTheme(
    {
      typography: {
        fontFamily: "__Poppins_559008",
      }
    }
  )
  return (
    <ThemeProvider theme={muitheme}>
      {children}
    </ThemeProvider>
  )
}
