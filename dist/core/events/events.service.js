"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSimulatedEvent = exports.getEvents = void 0;
const prisma_1 = __importDefault(require("../../lib/prisma"));
// Lógica de simulación de IA (movida al backend)
const keywords = {
    CRITICAL: ['breach', 'leak', 'phishing', 'exploit', 'compromised', 'vulnerability', 'attack'],
    HIGH: ['suspicious', 'unauthorized', 'malware', 'threat', 'exposed'],
    MED: ['misconfigured', 'warning', 'failed login', 'anomaly', 'unusual'],
    LOW: ['mention', 'reputation', 'policy violation', 'test'],
};
const suggestedActions = {
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
const runMockAIAnalysis = (eventData) => {
    const textToAnalyze = `${eventData.title.toLowerCase()} ${eventData.description.toLowerCase()}`;
    let determinedSeverity = 'LOW';
    for (const level of ['CRITICAL', 'HIGH', 'MED']) {
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
const getEvents = async () => {
    return prisma_1.default.securityEvent.findMany({
        include: {
            aiAnalysis: true, // Incluir el análisis de IA
        },
        orderBy: {
            createdAt: 'desc',
        },
    });
};
exports.getEvents = getEvents;
const createSimulatedEvent = async (data) => {
    const aiResult = runMockAIAnalysis(data);
    return prisma_1.default.securityEvent.create({
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
exports.createSimulatedEvent = createSimulatedEvent;
