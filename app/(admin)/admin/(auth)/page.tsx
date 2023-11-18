import QuickAdd from "@/components/admin/QuickAdd";
import { redirect } from "next/navigation";

export default function AdminPage() {
  const session = true;

  if (!session) {
    redirect('/admin/login')
  }
  return (
    <main className="p-4 w-full space-y-2">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <QuickAdd />
    </main>
  )
}