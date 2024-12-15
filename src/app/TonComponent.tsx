
"use client"
import React, { ReactNode } from 'react'
import * as TonUI from "@tonconnect/ui-react"
const TonComponent = ({children}: {children:ReactNode}) => {
  const manifestUrl =
    "https://vocongbinh.github.io/food-delivery-TMA/tonconnect-manifest.json";
  return (
    <TonUI.TonConnectUIProvider manifestUrl={manifestUrl}>
    {children}
     </TonUI.TonConnectUIProvider>
  )
}

export default TonComponent