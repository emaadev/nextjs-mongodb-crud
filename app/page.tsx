import Tasks from "@/components/Tasks";

export default function Home() {
  return (
    <main className="bg-gray-900 text-white h-screen w-full px-6 py-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold">Task Manager</h1>
      </header>

      <Tasks />
    </main>
  );
}
