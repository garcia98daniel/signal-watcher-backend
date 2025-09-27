"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteWatchlist = exports.createWatchlist = exports.getWatchlists = void 0;
const prisma_1 = __importDefault(require("../../lib/prisma"));
const getWatchlists = async () => {
    return prisma_1.default.watchlist.findMany({
        include: {
            terms: true, // Incluir los términos asociados
        },
        orderBy: {
            createdAt: 'desc',
        },
    });
};
exports.getWatchlists = getWatchlists;
const createWatchlist = async (data) => {
    return prisma_1.default.watchlist.create({
        data: {
            name: data.name,
            description: data.description,
            terms: {
                create: data.terms.map(term => ({
                    term: term.term,
                    type: term.type.toUpperCase()
                })),
            },
        },
        include: {
            terms: true,
        },
    });
};
exports.createWatchlist = createWatchlist;
const deleteWatchlist = async (id) => {
    // La eliminación en cascada (onDelete: Cascade) se encargará de los términos
    return prisma_1.default.watchlist.delete({
        where: { id },
    });
};
exports.deleteWatchlist = deleteWatchlist;
