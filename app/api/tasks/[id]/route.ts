import { NextResponse } from "next/server";

import { connectDB } from "@/utils/mongodb";
import Task from "@/models/Task";

export interface TaskIdProps {
  id: string;
}

export async function GET(req: Request, { params }: { params: TaskIdProps }) {
  try {
    connectDB();
    const taksFound = await Task.findOne({ _id: params.id });

    if (!taksFound) {
      return NextResponse.json({ message: "Task not found." }, { status: 400 });
    }

    return NextResponse.json(taksFound);
  } catch (error: any) {
    return NextResponse.json(error.message, { status: 400 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: TaskIdProps }
) {
  try {
    const deletedTask = await Task.findByIdAndDelete(params.id);

    if (!deletedTask) {
      return NextResponse.json({ message: "Task not found." }, { status: 400 });
    }

    return NextResponse.json(deletedTask);
  } catch (error: any) {
    return NextResponse.json(error.message, { status: 400 });
  }
}

export async function PUT(req: Request, { params }: { params: TaskIdProps }) {
  try {
    const data = await req.json();
    const updatedTask = await Task.findByIdAndUpdate(params.id, data, {
      new: true,
    });

    return NextResponse.json(updatedTask);
  } catch (error: any) {
    return NextResponse.json(error.message, { status: 400 });
  }
}
