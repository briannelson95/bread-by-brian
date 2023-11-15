import QuickAdd from "@/components/admin/QuickAdd";

export default function AdminPage() {
  return (
    <main className="p-4 w-full space-y-2">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <QuickAdd />
    </main>
  )
}