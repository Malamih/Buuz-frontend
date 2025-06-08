import { Sidebar } from "./components/Sidebar";
import { Header } from "./components/Header";

export const metadata = {
  title: "Dashboard",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="dashboardLayout">
      <Sidebar />
      <Header />
      {children}
    </div>
  );
}
