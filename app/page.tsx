import { auth } from "@/lib/auth";
import { getMonthlyLogs, getUserSettings, getAllTimeStats } from "@/app/actions/overtime";
import { LoginCard } from "@/components/login-card";
import { Dashboard } from "@/components/dashboard";

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function Home(props: PageProps) {
  const searchParams = await props.searchParams;
  const session = await auth();

  if (!session?.user) {
    return <LoginCard />;
  }

  const targetMonth = typeof searchParams.month === "string" ? searchParams.month : undefined;

  const [logs, settings, historicalStats] = await Promise.all([
    getMonthlyLogs(targetMonth),
    getUserSettings(),
    getAllTimeStats(),
  ]);

  const currentMonth = targetMonth || new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Taipei",
    year: "numeric",
    month: "2-digit",
  }).format(new Date());

  return (
    <Dashboard
      user={{
        name: session.user.name,
        image: session.user.image,
      }}
      settings={settings}
      logs={logs}
      currentMonth={currentMonth}
      historicalStats={historicalStats}
    />
  );
}
