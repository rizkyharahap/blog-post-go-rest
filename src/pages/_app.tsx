import { useState } from "react";

import type { AppProps } from "next/app";
import { Kumbh_Sans } from "next/font/google";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import ProtectedRoute from "@/components/ProtectedRoute";
import { AntdProvider } from "@/providers/AntdProvider";
import "@/styles/globals.css";

const kumbhSans = Kumbh_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function App({ Component, pageProps, ...appProps }: AppProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
            retry: false,

            // With SSR, we usually want to set some default staleTime
            // above 0 to avoid refetching immediately on the client
            staleTime: 60 * 1000,
          },
        },
      }),
  );

  const isLoginPage = appProps.router.pathname === "/login";

  return (
    <AntdProvider
      theme={{
        token: {
          fontFamily: kumbhSans.style.fontFamily,
        },
      }}
    >
      <QueryClientProvider client={queryClient}>
        <main
          className={`${kumbhSans.className} mx-auto max-w-screen-sm px-4 pb-10 lg:max-w-screen-lg`}
        >
          {isLoginPage ? (
            <Component {...pageProps} />
          ) : (
            <ProtectedRoute>
              <Component {...pageProps} />
            </ProtectedRoute>
          )}
        </main>
      </QueryClientProvider>
    </AntdProvider>
  );
}
