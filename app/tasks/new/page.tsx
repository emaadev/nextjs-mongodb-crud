"use client";

import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";

const Page = () => {
  const router = useRouter();
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/tasks", {
        method: "POST",
        body: JSON.stringify(newTask),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res) {
        console.log("Something went wrong.");
        return null;
      }

      setNewTask({
        title: "",
        description: "",
      });

      console.log("The task was created successfully!");

      router.refresh();
      router.push("/");
    } catch (error) {
      console.log("Something went wrong.");
    }
  };

  return (
    <div className="h-full m-auto flex-col w-[50%] flex justify-center items-start">
      <a
        href="/"
        className="bg-transparent-700 font-semibold px-4 py-2 text-white rounded-md hover:bg-gray-700 mb-10 border border-white text-sm"
      >
        ← Return to home
      </a>

      <h1 className="text-3xl font-semibold mb-4">Create a new task</h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-full justify-center items-start"
      >
        <input
          type="text"
          name="title"
          placeholder="Title"
          className="w-full p-2 rounded-md text-gray-800"
          value={newTask.title}
          onChange={handleChange}
        />
        <textarea
          name="description"
          placeholder="Description..."
          className="w-full p-2 rounded-md text-gray-800"
          value={newTask.description}
          onChange={handleChange}
        />
        <button className="bg-green-700 font-semibold px-4 py-2 text-white rounded-md hover:bg-green-600">
          Create Task
        </button>
      </form>
    </div>
  );
};

export default Page;
