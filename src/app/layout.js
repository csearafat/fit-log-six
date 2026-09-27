import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

import { PlanProvider } from '@/context/PlanContext'; 

export const metadata = {
  title: 'FitLog - Gym Companion',
  description: 'Train with intent. Log every set.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[#0b0c0e] text-white antialiased flex flex-col min-h-screen">
        <PlanProvider>
          <Navbar />
          <div className="flex-grow">
            {children}
          </div>
          <Footer />
        </PlanProvider>
      </body>
    </html>
  );
}