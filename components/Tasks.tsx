import Link from "next/link";

import getTasks from "@/lib/getTasks";

const Tasks = async () => {
  const allTasks = await getTasks();

  return (
    <>
      <section className="flex justify-start items-start flex-wrap gap-4">
        {allTasks.length > 0
          ? allTasks.map((item) => (
              <Link key={item.id} href={`/tasks/${item.id}`}>
                <div className="flex flex-col p-4 bg-gray-600 min-w-[300px] rounded-md">
                  <h2 className="text-xl font-bold">{item.title}</h2>
                  <p>{item.description}</p>
                </div>
              </Link>
            ))
          : "No tasks found."}
      </section>

      <Link
        href="/tasks/new"
        className="bg-blue-700 font-semibold px-4 py-2 text-white rounded-md hover:bg-blue-600 mt-10 text-sm"
      >
        Create new task
      </Link>
    </>
  );
};

export default Tasks;
