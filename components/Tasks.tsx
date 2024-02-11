import getTasks from "@/lib/getTasks";

const Tasks = async () => {
  const allTasks = await getTasks();

  return (
    <section className="flex justify-center items-start flex-wrap gap-4">
      {allTasks.map((item) => (
        <div
          key={item.id}
          className="flex flex-col p-4 bg-gray-600 min-w-[300px] rounded-md"
        >
          <h2 className="text-xl font-bold">{item.title}</h2>
          <p>{item.description}</p>
        </div>
      ))}
    </section>
  );
};

export default Tasks;
