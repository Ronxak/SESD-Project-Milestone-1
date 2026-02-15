import { SubjectRepository } from "../repositories/subject.repository";

export class SubjectService {
  repo = new SubjectRepository();

  async create(name: string, userId: string) {
    return this.repo.create({ name, userId });
  }

  async getAll(userId: string) {
    return this.repo.findByUser(userId);
  }

  async delete(id: string) {
    return this.repo.delete(id);
  }
}

