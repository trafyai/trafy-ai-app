import '@styles/globals.css';
import { AuthContextProvider } from '@context/AuthContext';
import ClientOnlyContent from './ClientOnlyContent';
import Navbar from '@components/navbar/Navbar';
export const metadata = {
  title: "trafy",
  description: "trafy",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthContextProvider>
        <ClientOnlyContent>{children}</ClientOnlyContent>
        {/* {children} */}
        </AuthContextProvider>
      </body>
    </html>
  );
}
