import { Athlete, Prisma, prisma } from "@pertrack/database";
import Repository from "../interfaces/repository";

export default class AthleteRepository implements Repository<Athlete> {
  async getAll(searchText?: string): Promise<Athlete[]> {
    let whereClause: Prisma.AthleteWhereInput = {};

    if (searchText) {
      whereClause.OR = [
        {
          name: { contains: searchText, mode: "insensitive" },
        },
        {
          team: { contains: searchText, mode: "insensitive" },
        },
      ];
    }

    return prisma.athlete.findMany({
      where: whereClause,
    });
  }

  async getById(id: number): Promise<Athlete> {
    return prisma.athlete.findFirstOrThrow({
      where: { id },
      include: { metrics: true },
    });
  }

  async update(id: number, item: Athlete): Promise<Athlete> {
    return prisma.athlete.update({
      data: {
        ...item,
        age: Number(item.age),
      },
      where: { id },
    });
  }

  async delete(id: number): Promise<void> {
    await prisma.athlete.delete({
      where: { id },
    });
  }

  async create(item: Athlete): Promise<Athlete> {
    return prisma.athlete.create({
      data: {
        ...item,
        age: Number(item.age),
      },
    });
  }
}
