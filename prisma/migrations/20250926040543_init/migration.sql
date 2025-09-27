-- CreateEnum
CREATE TYPE "public"."SeverityLevel" AS ENUM ('LOW', 'MED', 'HIGH', 'CRITICAL');

-- CreateEnum
CREATE TYPE "public"."EventStatus" AS ENUM ('PENDING', 'ANALYZED', 'RESOLVED', 'DISMISSED');

-- CreateEnum
CREATE TYPE "public"."TermType" AS ENUM ('BRAND', 'DOMAIN', 'KEYWORD', 'OTHER');

-- CreateTable
CREATE TABLE "public"."Watchlist" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Watchlist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."WatchlistTerm" (
    "id" TEXT NOT NULL,
    "term" TEXT NOT NULL,
    "type" "public"."TermType" NOT NULL DEFAULT 'KEYWORD',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "watchlistId" TEXT NOT NULL,

    CONSTRAINT "WatchlistTerm_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."SecurityEvent" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "source" TEXT NOT NULL,
    "matchedTerms" TEXT[],
    "severity" "public"."SeverityLevel",
    "status" "public"."EventStatus" NOT NULL DEFAULT 'PENDING',
    "rawData" JSONB DEFAULT '{}',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "watchlistId" TEXT NOT NULL,

    CONSTRAINT "SecurityEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."AIAnalysis" (
    "id" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "severity" "public"."SeverityLevel" NOT NULL,
    "confidence" DOUBLE PRECISION NOT NULL,
    "suggestedActions" TEXT[],
    "reasoning" TEXT NOT NULL,
    "processedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "correlationId" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,

    CONSTRAINT "AIAnalysis_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AIAnalysis_correlationId_key" ON "public"."AIAnalysis"("correlationId");

-- CreateIndex
CREATE UNIQUE INDEX "AIAnalysis_eventId_key" ON "public"."AIAnalysis"("eventId");

-- AddForeignKey
ALTER TABLE "public"."WatchlistTerm" ADD CONSTRAINT "WatchlistTerm_watchlistId_fkey" FOREIGN KEY ("watchlistId") REFERENCES "public"."Watchlist"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."SecurityEvent" ADD CONSTRAINT "SecurityEvent_watchlistId_fkey" FOREIGN KEY ("watchlistId") REFERENCES "public"."Watchlist"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."AIAnalysis" ADD CONSTRAINT "AIAnalysis_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "public"."SecurityEvent"("id") ON DELETE CASCADE ON UPDATE CASCADE;
