import { auth } from "@/lib/auth";
import { getMonthlyLogs, getUserSettings } from "@/app/actions/overtime";
import { LoginCard } from "@/components/login-card";
import { Dashboard } from "@/components/dashboard";

export default async function Home() {
  const session = await auth();

  if (!session?.user) {
    return <LoginCard />;
  }

  const [logs, settings] = await Promise.all([
    getMonthlyLogs(),
    getUserSettings(),
  ]);

  return (
    <Dashboard
      user={{
        name: session.user.name,
        image: session.user.image,
      }}
      settings={settings}
      logs={logs}
    />
  );
}
