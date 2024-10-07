import { Metric, MetricTypes, Prisma, prisma } from "@pertrack/database";
import Repository from "../interfaces/repository";

export default class MetricRepository implements Repository<Metric> {
  async getAll(): Promise<Metric[]> {
    return prisma.metric.findMany();
  }

  async getById(id: number): Promise<Metric> {
    return prisma.metric.findFirstOrThrow({
      where: { id },
    });
  }

  async getFilteredByAthleteId(
    athleteId: number,
    metricType?: MetricTypes
  ): Promise<Metric[]> {
    let whereClause: Prisma.MetricWhereInput = { athleteId };
    if (metricType) {
      whereClause.AND = {
        metricType,
      };
    }

    return prisma.metric.findMany({
      where: whereClause,
    });
  }

  async edit(id: number, item: Metric): Promise<Metric> {
    return prisma.metric.update({
      data: {
        ...item,
        value: Number(item.value),
        athleteId: Number(item.athleteId),
      },
      where: { id },
    });
  }

  async remove(id: number): Promise<void> {
    await prisma.metric.delete({
      where: { id },
    });
  }

  async add(item: Metric): Promise<Metric> {
    return prisma.metric.create({
      data: {
        ...item,
        value: Number(item.value),
        athleteId: Number(item.athleteId),
      },
    });
  }
}
