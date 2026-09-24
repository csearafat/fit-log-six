import './globals.css';
import { PlanProvider } from '@/context/PlanContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Fit Log - Track Your Workouts',
  description: 'Log and organize your workout plans effortlessly.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased bg-gray-50 text-gray-900 min-h-screen flex flex-col">
        <PlanProvider>
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
          <ToastContainer position="top-right" autoClose={3000} />
        </PlanProvider>
      </body>
    </html>
  );
}