import prisma from '@/lib/prisma';
import { AIAnalysis, CreateEventForm, SeverityLevel } from '@/types/events.types'; // Usaremos los tipos del frontend para consistencia

// Lógica de simulación de IA (movida al backend)
const keywords: { [key in SeverityLevel]: string[] } = {
  CRITICAL: ['breach', 'leak', 'phishing', 'exploit', 'compromised', 'vulnerability', 'attack'],
  HIGH: ['suspicious', 'unauthorized', 'malware', 'threat', 'exposed'],
  MED: ['misconfigured', 'warning', 'failed login', 'anomaly', 'unusual'],
  LOW: ['mention', 'reputation', 'policy violation', 'test'],
};

const suggestedActions: { [key in SeverityLevel]: string[] } = {
  CRITICAL: [
    'Immediately activate incident response protocol.',
    'Isolate affected systems from the network.',
    'Notify legal and compliance departments.',
  ],
  HIGH: [
    'Investigate the source and impact of the activity.',
    'Block suspicious IP addresses or user agents.',
    'Escalate to the senior security team.',
  ],
  MED: [
    'Review the configuration or policy in question.',
    'Monitor the affected user or system for further anomalies.',
  ],
  LOW: [
    'Monitor the source for further mentions or context.',
    'Log the event for trend analysis.',
  ],
};

const runMockAIAnalysis = (eventData: CreateEventForm): Omit<AIAnalysis, 'id' | 'eventId' | 'processedAt' | 'correlationId'> => {
  const textToAnalyze = `${eventData.title.toLowerCase()} ${eventData.description.toLowerCase()}`;
  let determinedSeverity: SeverityLevel = 'LOW';

  for (const level of ['CRITICAL', 'HIGH', 'MED'] as SeverityLevel[]) {
    if (keywords[level].some(keyword => textToAnalyze.includes(keyword))) {
      determinedSeverity = level;
      break;
    }
  }

  const summary = `An event of **${determinedSeverity}** severity has been detected. The event, titled "${eventData.title}," originated from ${eventData.source}.`;

  return {
    summary,
    severity: determinedSeverity,
    confidence: Math.random() * (0.99 - 0.75) + 0.75,
    suggestedActions: suggestedActions[determinedSeverity],
    reasoning: `Severity determined based on keywords like '${keywords[determinedSeverity][0]}'.`,
  };
};

// Servicios de base de datos
export const getEvents = async () => {
  return prisma.securityEvent.findMany({
    include: {
      aiAnalysis: true, // Incluir el análisis de IA
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
};

export const createSimulatedEvent = async (data: CreateEventForm) => {
  const aiResult = runMockAIAnalysis(data);

  return prisma.securityEvent.create({
    data: {
      title: data.title,
      description: data.description,
      source: data.source,
      watchlistId: data.watchlistId,
      severity: aiResult.severity,
      status: 'ANALYZED',
      matchedTerms: [], // Simulado
      aiAnalysis: {
        create: {
          summary: aiResult.summary,
          severity: aiResult.severity,
          confidence: aiResult.confidence,
          suggestedActions: aiResult.suggestedActions,
          reasoning: aiResult.reasoning,
          correlationId: `corr_${Date.now()}`,
        },
      },
    },
    include: {
      aiAnalysis: true,
    },
  });
};
