"use client";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

const FormPage = () => {
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

  const handleAction = async (e: FormEvent) => {
    e.preventDefault();

    if (!params.id) {
      await handleSubmit(e);
    } else {
      await handleUpdate();
    }
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
    } catch (error) {
      console.log("Something went wrong.");
    }

    router.push("/");
    router.refresh();
  };

  const handleUpdate = async () => {
    try {
      const res = await fetch(`/api/tasks/${params.id}`, {
        method: "PUT",
        body: JSON.stringify(newTask),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res) {
        alert("Something went wrong.");
      }

      alert("Tarea actualizada correctamente!");
    } catch (error) {
      alert("Something went wrong");
    }

    router.push("/");
    router.refresh();
  };

  const handleDelete = async () => {
    if (!window.confirm("Do you really want to delete this task?")) {
      return;
    }

    try {
      const res = await fetch(`/api/tasks/${params.id}`, {
        method: "DELETE",
      });

      if (!res) {
        console.log("Something went wrong.");
        return null;
      }

      alert("Tarea eliminada correctamente");
    } catch (error) {
      console.log("Something went wrong.");
    }

    router.push("/");
    router.refresh();
  };

  useEffect(() => {
    const getTask = async () => {
      const res = await fetch(`/api/tasks/${params.id}`);
      const data = await res.json();

      setNewTask({
        title: data.title,
        description: data.description,
      });
    };

    if (params.id) {
      getTask();
    }
  }, [params.id]);

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
            Delete
          </button>
        )}
      </div>

      <h1 className="text-3xl font-semibold mb-4">
        {params.id ? "Update task" : "Create a new task"}
      </h1>

      <form
        onSubmit={handleAction}
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

export default FormPage;
