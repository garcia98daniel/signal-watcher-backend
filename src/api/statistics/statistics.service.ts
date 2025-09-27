import { PrismaClient, SeverityLevel, EventStatus } from '@prisma/client';

const prisma = new PrismaClient();

export const getAppStatistics = async () => {
  const totalWatchlists = await prisma.watchlist.count();
  const totalTerms = await prisma.watchlistTerm.count();
  const totalEvents = await prisma.securityEvent.count();

  const eventsBySeverity = await prisma.securityEvent.groupBy({
    by: ['severity'],
    _count: {
      id: true,
    },
    where: {
      severity: {
        not: null,
      },
    },
  });

  const eventsByStatus = await prisma.securityEvent.groupBy({
    by: ['status'],
    _count: {
      id: true,
    },
  });

  const analyzedEvents = await prisma.aIAnalysis.count();

  return {
    totalWatchlists,
    totalTerms,
    totalEvents,
    analyzedEvents,
    eventsBySeverity: eventsBySeverity.reduce((acc, current) => {
      acc[current.severity as SeverityLevel] = current._count.id;
      return acc;
    }, {} as Record<SeverityLevel, number>),
    eventsByStatus: eventsByStatus.reduce((acc, current) => {
        acc[current.status] = current._count.id;
        return acc;
      }, {} as Record<EventStatus, number>),
  };
};
