import Tasks from "@/components/Tasks";

export default function Home() {
  return (
    <main className="flex flex-col items-start ">
      <header className="mb-8">
        <h1 className="text-4xl font-bold">Task Manager</h1>
      </header>

      <Tasks />
    </main>
  );
}
