import React from 'react';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

export default function Layout({ children, className = '' }: LayoutProps) {

  return (
    <div className="min-h-screen flex flex-col bg-secondary-50">
      <Header />
      <main className={`flex-grow ${className}`}>{children}</main>
      <Footer />
    </div>
  );
}