import Tasks from "@/components/Tasks";

export default function Home() {
  return (
    <main className="flex flex-col items-start ">
      <header className="mb-8">
        <h1 className="text-4xl font-bold">Task Manager</h1>
      </header>

      <Tasks />

      <a
        href="/tasks/new"
        className="bg-blue-700 font-semibold px-4 py-2 text-white rounded-md hover:bg-blue-600 mt-10 text-sm"
      >
        Create new task
      </a>
    </main>
  );
}
