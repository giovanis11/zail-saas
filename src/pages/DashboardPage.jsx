// src/pages/DashboardPage.jsx
import DashboardMenu from "../components/DashboardMenu";

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen">
      <DashboardMenu />
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
        <p>Welcome to your dashboard! 👋</p>
      </div>
    </div>
  );
}


