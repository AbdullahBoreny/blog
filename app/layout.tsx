import "./globals.css"
import NavBar from "./components/NavBar";
import { NotificationProvider } from "./components/NotificationContext";
import AuthSessionProvider from "./components/SessionProvider";
import Notification from "./components/Notification";
import Footer from "./components/Footer";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background text-foreground">
        <AuthSessionProvider>
          <NotificationProvider>
            <NavBar />
            <Notification />
            {children}
            
          </NotificationProvider>
        </AuthSessionProvider>
      </body>
    </html>
  );
}