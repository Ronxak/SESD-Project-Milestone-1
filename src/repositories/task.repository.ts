import { Task } from "../models/Task";

export class TaskRepository {
  async create(data: any) {
    return Task.create(data);
  }

  async findByUser(userId: string) {
    return Task.find({ userId });
  }

  async update(id: string, data: any) {
    return Task.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id: string) {
    return Task.findByIdAndDelete(id);
  }
}
