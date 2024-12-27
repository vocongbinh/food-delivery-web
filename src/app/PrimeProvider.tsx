"use client"
import React, { ReactNode } from 'react'
import { PrimeReactProvider } from 'primereact/api';
export default function PrimeProvider({ children }: { children: ReactNode }) {
    return (
        <PrimeReactProvider>
            {children}
        </PrimeReactProvider>
    )
}
