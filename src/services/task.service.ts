import { TaskRepository } from "../repositories/task.repository";

export class TaskService {
  repo = new TaskRepository();

  async create(data: any) {
    return this.repo.create(data);
  }

  async getAll(userId: string) {
    return this.repo.findByUser(userId);
  }

  async update(id: string, data: any) {
    return this.repo.update(id, data);
  }

  async delete(id: string) {
    return this.repo.delete(id);
  }
}
