import Navbar from "./Navbar";
import "@/assets/styles/globals.css";

export const metadata = {
  title: "Property Pulse",
  description: "Your destination to find best affordable properties",
  keywords: "rental, property, real estate",
};

const MainLayout = ({ children }) => {
  return (
    <html>
      <body>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
};

export default MainLayout;
