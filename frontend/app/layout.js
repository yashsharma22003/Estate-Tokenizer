'use client'
import "./globals.css";
import "@rainbow-me/rainbowkit/styles.css"
import { polygonAmoy, sepolia } from 'wagmi/chains'
import { WagmiProvider } from 'wagmi'
import { RainbowKitProvider, getDefaultConfig } from "@rainbow-me/rainbowkit";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { AuthProvider } from "./AuthContext";
import Header from "./header";


const queryClient = new QueryClient();


const config = getDefaultConfig({
  appName: 'My RainbowKit App',
  projectId: 'YOUR_PROJECT_ID',
  chains: [polygonAmoy, sepolia],
  ssr: true,
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
        <WagmiProvider config={config}>
          <QueryClientProvider client={queryClient}>
            <RainbowKitProvider>
              <Header/>
              {children}
            </RainbowKitProvider>
          </QueryClientProvider>
        </WagmiProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

