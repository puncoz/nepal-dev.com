"use client"

import { ReactNode } from "react"
import Header from "./header"

interface LayoutProps {
  children: ReactNode;
  isAuthenticated?: boolean;
  user?: {
    name: string;
    email: string;
    avatar?: string;
  };
  showHeader?: boolean;
}

export default function Layout({
                                 children,
                                 isAuthenticated = false,
                                 user,
                                 showHeader = true,
                               }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {showHeader && (
        <Header isAuthenticated={isAuthenticated} user={user}/>
      )}
      <main className={showHeader ? "" : "min-h-screen"}>
        {children}
      </main>
    </div>
  )
}
