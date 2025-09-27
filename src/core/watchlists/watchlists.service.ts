import prisma from '../../lib/prisma';
import { TermType } from '@prisma/client';

interface CreateWatchlistInput {
  name: string;
  description?: string;
  terms: Array<{ term: string; type: TermType }>;
}

export const getWatchlists = async () => {
  return prisma.watchlist.findMany({
    include: {
      terms: true, // Incluir los términos asociados
    },
    orderBy: {
      createdAt: 'desc',
    },
    });
};

export const createWatchlist = async (data: CreateWatchlistInput) => {
  return prisma.watchlist.create({
    data: {
      name: data.name,
      description: data.description,
      terms: {
                create: data.terms.map(term => ({ 
          term: term.term,
          type: term.type.toUpperCase() as TermType
        })),
      },
    },
    include: {
      terms: true,
    },
  });
};

export const deleteWatchlist = async (id: string) => {
  // La eliminación en cascada (onDelete: Cascade) se encargará de los términos
  return prisma.watchlist.delete({
    where: { id },
  });
};
