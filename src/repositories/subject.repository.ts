import { Subject } from "../models/Subject";

export class SubjectRepository {
  async create(data: any) {
    return Subject.create(data);
  }

  async findByUser(userId: string) {
    return Subject.find({ userId });
  }

  async delete(id: string) {
    return Subject.findByIdAndDelete(id);
  }
}
