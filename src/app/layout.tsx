import "./globals.css";
import Head from "next/head";
import "@/styles/index.scss";
import { Poppins } from "next/font/google";
import Footer from "@/components/Footer/Footer";
import SiteHeader from "./SiteHeader";
import { Providers } from "./providers";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider } from "antd";
import SessionProviders from "@/components/SessionProvider/SessionProvider";
import DefaultHeader from "@/components/Header/DefaultHeader";
import AuthProvider from "@/contexts/auth/auth-context";
import "react-toastify/dist/ReactToastify.css";
import dynamic from "next/dynamic";
import Toastify from "@/components/Toastify/Toastify";
import AddressProvider from "@/contexts/address/address-context";

import Script from "next/script";
export const metadata = {
  title: "DFood - Food Delivery App",
  description: "Help you to find and order food from your favorite restaurants",
};

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const TonComponent = dynamic(() => import("./TonComponent"), { ssr: false });
  return (
    <html lang="en" className={poppins.className}>
      <Head>
        <link
          href="https://api.mapbox.com/mapbox-gl-js/v2.8.1/mapbox-gl.css"
          rel="stylesheet"
        />
      </Head>

      <body className="">
        <Script src="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-directions/v4.3.1/mapbox-gl-directions.js" />
        <link
          rel="stylesheet"
          href="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-directions/v4.3.1/mapbox-gl-directions.css"
          type="text/css"
        />
        <ConfigProvider
          theme={{
            token: {
              fontFamily: "Poppins, sans-serif",
            },
            components: {
              Switch: {
                colorPrimary: "#2B52FF",
              },
            },
          }}
        >
          <AntdRegistry>
            <div className="bg-[#f8f8f8] text-base dark:bg-neutral-900/95 text-neutral-900 dark:text-neutral-200">
              <Providers>
                <TonComponent>
                  <SessionProviders>
                    <AuthProvider>
                      <AddressProvider>
                        <DefaultHeader />
                        {children}
                        <Footer />
                        <Toastify />
                      </AddressProvider>
                    </AuthProvider>
                  </SessionProviders>
                </TonComponent>
              </Providers>
            </div>
          </AntdRegistry>
        </ConfigProvider>
      </body>
    </html>
  );
}
