import { StudySession } from "../models/StudySession";

export class SessionRepository {
  async create(data: any) {
    return StudySession.create(data);
  }

  async findByUser(userId: string) {
    return StudySession.find({ userId });
  }

  async findById(id: string) {
    return StudySession.findById(id);
  }

  async update(id: string, data: any) {
    return StudySession.findByIdAndUpdate(id, data, { new: true });
  }
}
