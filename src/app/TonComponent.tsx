
"use client"
import React, { ReactNode } from 'react'
import {TonConnectUIProvider} from "@tonconnect/ui-react"
const TonComponent = ({children}: {children:ReactNode}) => {
    const manifestUrl =
    "https://vocongbinh.github.io/food-delivery-TMA/tonconnect-manifest.json";
  return (
    <TonConnectUIProvider manifestUrl={manifestUrl}>
        {children}
    </TonConnectUIProvider>
  )
}

export default TonComponent