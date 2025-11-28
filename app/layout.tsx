import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { UserStoreProvider } from "@/context/userStore"
import { AdminStoreProvider } from "@/context/adminStore"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "PlanHub - Community Portal",
  description: "Connect, share, and organize community events with PlanHub",
  generator: "Emmanuel",
  icons: {
    icon: [
      {
        url: "/logo.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/logo.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/logo.png",
        type: "image/svg+xml",
      },
    ],
    apple: "/logo.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        <UserStoreProvider>
          <AdminStoreProvider>
            {children}
          </AdminStoreProvider>
        </UserStoreProvider>
        <Analytics />
      </body>
    </html>
  )
}


















// import type React from "react"
// import type { Metadata } from "next"
// import { Geist, Geist_Mono } from "next/font/google"
// import { Analytics } from "@vercel/analytics/next"
// import { UserStoreProvider } from "@/context/"
// import "./globals.css"

// const _geist = Geist({ subsets: ["latin"] })
// const _geistMono = Geist_Mono({ subsets: ["latin"] })

// export const metadata: Metadata = {
//   title: "PlanHub - Community Portal",
//   description: "Connect, share, and organize community events with PlanHub",
//   generator: "Emmanuel",
//   icons: {
//     icon: [
//       {
//         url: "/logo.png",
//         media: "(prefers-color-scheme: light)",
//       },
//       {
//         url: "/logo.png",
//         media: "(prefers-color-scheme: dark)",
//       },
//       {
//         url: "/logo.png",
//         type: "image/svg+xml",
//       },
//     ],
//     apple: "/logo.png",
//   },
// }

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode
// }>) {
//   return (
//     <html lang="en">
//       <body className={`font-sans antialiased`}>
//         <UserStoreProvider>
//           {children}
//         </UserStoreProvider>
//         <Analytics />
//       </body>
//     </html>
//   )
// }