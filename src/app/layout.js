import '@styles/globals.css';
import { AuthContextProvider } from '@context/AuthContext';
import ClientOnlyContent from './ClientOnlyContent';
import { ThemeProvider } from 'next-themes';

export const metadata = {
  title: "trafy AI",
  description: "Build for Easy Agent Development",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthContextProvider>
        <ThemeProvider attribute="class">
        <ClientOnlyContent>{children}</ClientOnlyContent>
        </ThemeProvider>

        {/* {children} */}
        </AuthContextProvider>
      </body>
    </html>
  );
}
