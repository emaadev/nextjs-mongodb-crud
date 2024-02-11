import { connectDB } from "@/utils/mongodb";
import Task from "@/models/Task";

export async function getTasks() {
  connectDB();
  const tasks = await Task.find();

  return tasks;
}

export default getTasks;
