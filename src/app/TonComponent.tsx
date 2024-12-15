
"use client"
import React, { ReactNode } from 'react'
import dynamic from 'next/dynamic';
const TonComponent = ({children}: {children:ReactNode}) => {
  
  const TonConnectUIProvider = dynamic(() =>
    import('@tonconnect/ui-react').then((mod) => mod.TonConnectUIProvider),
    { ssr: false }
  );
  const manifestUrl =
    "https://vocongbinh.github.io/food-delivery-TMA/tonconnect-manifest.json";
  return (
    <TonConnectUIProvider manifestUrl={manifestUrl}>
    {children}
     </TonConnectUIProvider>
  )
}

export default TonComponent