"use client";

import { ChangeEvent, FormEvent, useState } from "react";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

const CreateTask = () => {
  const router = useRouter();
  const params = useParams();

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

      router.push("/");
      router.refresh();
    } catch (error) {
      console.log("Something went wrong.");
    }
  };

  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/tasks/${params.id}`, {
        method: "DELETE",
      });

      if (!res) {
        console.log("Something went wrong.");
        return null;
      }

      setNewTask({
        title: "",
        description: "",
      });

      alert("Tarea eliminada correctamente");

      router.push("/");
      router.refresh();
    } catch (error) {
      console.log("Something went wrong.");
    }
  };

  return (
    <section className="h-full m-auto flex-col w-[70%] flex justify-center items-start">
      <div className="w-full mb-10 flex justify-between">
        <Link
          href="/"
          className="bg-transparent-700 font-semibold px-4 py-2 text-white rounded-md hover:bg-gray-700 border border-white text-sm"
        >
          ← Return to home
        </Link>

        {params.id && (
          <button
            type="button"
            onClick={handleDelete}
            className="bg-transparent-700 font-semibold px-4 py-2 bg-red-700 text-white rounded-md hover:bg-gray-700 border border-white text-sm"
          >
            Delete task
          </button>
        )}
      </div>

      <h1 className="text-3xl font-semibold mb-4">
        {params.id ? "Update task" : "Create a new task"}
      </h1>

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
        <button
          type="submit"
          className="bg-green-700 font-semibold px-4 py-2 text-white rounded-md hover:bg-green-600"
        >
          {params.id ? "Update" : "Create Task"}
        </button>
      </form>
    </section>
  );
};

export default CreateTask;
