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
        <main>{children}</main>
      </body>
    </html>
  );
};

export default MainLayout;
