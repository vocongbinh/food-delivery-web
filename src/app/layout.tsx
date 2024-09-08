import "./globals.css";
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
export const metadata = {
  title: "Ton station",
  description: "Generated by create next app",
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
  return (
    <html lang="en" className={poppins.className}>
      <body className="">
        <ConfigProvider
          theme={{
            token: {
              fontFamily: "Poppins, sans-serif"
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
                <SessionProviders>
                  {/* <AuthProvider> */}
                    <DefaultHeader />
                    {children}
                    <Footer />
                  {/* </AuthProvider> */}
                </SessionProviders>

              </Providers>
            </div>
          </AntdRegistry>

        </ConfigProvider>

      </body>
    </html>
  );
}
