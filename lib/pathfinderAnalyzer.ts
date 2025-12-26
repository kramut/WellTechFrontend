/**
 * Pathfinder Analyzer - Analisi testo utente per suggerire percorsi
 */

import { UserGoal, goalOptions, getPathForGoal, PersonalizedPath } from './pathfinder';

export interface KeywordMatch {
  goal: UserGoal;
  keywords: string[];
  weight: number;
}

export interface AnalysisResult {
  primaryGoal: UserGoal;
  secondaryGoals: UserGoal[];
  confidence: number;
  matchedKeywords: string[];
  suggestedPath: PersonalizedPath;
}

// Mappa keyword → obiettivi
const keywordMap: KeywordMatch[] = [
  {
    goal: 'inner-peace',
    keywords: [
      'fiducia', 'sicurezza', 'autostima', 'pace', 'serenità', 'equilibrio',
      'tranquillità', 'calma', 'rilassamento', 'meditazione', 'mindfulness',
      'consapevolezza', 'benessere mentale', 'stress', 'ansia', 'tensione',
      'confidenza', 'sicurezza in sé'
    ],
    weight: 1.0,
  },
  {
    goal: 'find-motivation',
    keywords: [
      'motivazione', 'determinazione', 'spinta', 'energia mentale', 'volontà',
      'forza di volontà', 'disciplina', 'obiettivi', 'sogni', 'aspirazioni',
      'ambizione', 'riscatto', 'cambiare vita', 'trasformazione'
    ],
    weight: 0.9,
  },
  {
    goal: 'feel-better',
    keywords: [
      'sentirsi meglio', 'benessere', 'vitalità', 'salute', 'energia',
      'forza', 'stare bene', 'qualità della vita', 'equilibrio', 'armonia'
    ],
    weight: 0.8,
  },
  {
    goal: 'energy',
    keywords: [
      'energia', 'stanchezza', 'affaticamento', 'spossatezza', 'vitalità',
      'forza', 'resistenza', 'endurance', 'svegliarsi', 'mattina'
    ],
    weight: 0.9,
  },
  {
    goal: 'sleep',
    keywords: [
      'sonno', 'dormire', 'riposo', 'insonnia', 'svegliarsi riposati',
      'qualità del sonno', 'notte', 'riposare', 'stanco'
    ],
    weight: 1.0,
  },
  {
    goal: 'focus',
    keywords: [
      'concentrazione', 'focus', 'attenzione', 'distrazione', 'produttività',
      'lavoro', 'studio', 'deep work', 'mental clarity', 'chiarezza mentale'
    ],
    weight: 0.9,
  },
  {
    goal: 'fitness',
    keywords: [
      'forma fisica', 'allenamento', 'palestra', 'fitness', 'muscoli',
      'forza fisica', 'resistenza', 'atletico', 'sport', 'esercizio'
    ],
    weight: 1.0,
  },
  {
    goal: 'make-money',
    keywords: [
      'soldi', 'denaro', 'guadagnare', 'entrate', 'finanza', 'investimenti',
      'ricchezza', 'indipendenza finanziaria', 'libertà finanziaria', 'FIRE',
      'side hustle', 'lavoro', 'carriera', 'business'
    ],
    weight: 1.0,
  },
  {
    goal: 'detox-physical',
    keywords: [
      'depurare', 'detox', 'pulizia', 'disintossicare', 'purificare',
      'eliminare tossine', 'digestione', 'intestino', 'metabolismo'
    ],
    weight: 0.9,
  },
  {
    goal: 'detox-mental',
    keywords: [
      'depurare mente', 'pulizia mentale', 'liberarsi', 'tossine mentali',
      'stress', 'negatività', 'pensieri negativi', 'ruminazione'
    ],
    weight: 0.9,
  },
  {
    goal: 'sustainability',
    keywords: [
      'sostenibilità', 'sostenibile', 'ambiente', 'ambientale', 'impatto ambientale',
      'ridurre impatto', 'ecologico', 'green', 'energia rinnovabile', 'fotovoltaico',
      'solare', 'risparmio energetico', 'zero waste', 'plastica', 'emissioni',
      'carbon footprint', 'clima', 'cambiamento climatico', 'pianeta', 'terra'
    ],
    weight: 1.0,
  },
  {
    goal: 'sexual-wellbeing',
    keywords: [
      'benessere sessuale', 'salute sessuale', 'vitalità sessuale', 'performance sessuale',
      'libido', 'desiderio', 'vigore', 'potenza', 'intimità', 'sessualità',
      'soddisfazione sessuale', 'vita sessuale', 'energia sessuale', 'forza sessuale'
    ],
    weight: 1.0,
  },
];

// Keywords speciali per percorsi ibridi
const hybridKeywords = {
  relazione: ['relazione', 'ragazza', 'ragazzo', 'partner', 'coppia', 'amore', 'sentimenti', 'tornare insieme', 'riconquistare'],
  sensualità: ['sensualità', 'passione', 'intimità', 'sesso', 'desiderio', 'attrazione', 'soddisfazione sessuale', 'vita sessuale'],
  vigore: ['vigore', 'potenza', 'performance', 'mascolinità', 'forza sessuale', 'libido', 'energia sessuale', 'vitalità sessuale', 'performance sessuale'],
  autostima: ['autostima', 'fiducia in sé', 'sicurezza', 'valore personale', 'confidenza'],
  benessereSessuale: ['benessere sessuale', 'salute sessuale', 'vitalità intima', 'soddisfazione intima', 'intimità', 'sessualità'],
};

/**
 * Analizza il testo dell'utente e suggerisce il percorso più adatto
 */
export function analyzeUserGoal(userText: string): AnalysisResult {
  const normalizedText = userText.toLowerCase().trim();
  
  if (!normalizedText) {
    // Default: percorso benessere generale
    const defaultGoal: UserGoal = 'feel-better';
    return {
      primaryGoal: defaultGoal,
      secondaryGoals: [],
      confidence: 0.5,
      matchedKeywords: [],
      suggestedPath: getPathForGoal(defaultGoal),
    };
  }

  // Calcola score per ogni obiettivo
  const scores: Map<UserGoal, { score: number; keywords: string[] }> = new Map();

  keywordMap.forEach((match) => {
    let score = 0;
    const matchedKeywords: string[] = [];

    match.keywords.forEach((keyword) => {
      if (normalizedText.includes(keyword)) {
        score += match.weight;
        matchedKeywords.push(keyword);
      }
    });

    if (score > 0) {
      const current = scores.get(match.goal) || { score: 0, keywords: [] };
      scores.set(match.goal, {
        score: current.score + score,
        keywords: [...current.keywords, ...matchedKeywords],
      });
    }
  });

  // Rileva keywords per percorsi ibridi
  const hasRelazione = hybridKeywords.relazione.some(k => normalizedText.includes(k));
  const hasSensualità = hybridKeywords.sensualità.some(k => normalizedText.includes(k));
  const hasVigore = hybridKeywords.vigore.some(k => normalizedText.includes(k));
  const hasAutostima = hybridKeywords.autostima.some(k => normalizedText.includes(k));
  const hasBenessereSessuale = hybridKeywords.benessereSessuale.some(k => normalizedText.includes(k));

  // Se rileva combinazione relazione + autostima + sensualità/vigore/benessere sessuale → percorso ibrido
  if ((hasRelazione || hasAutostima) && (hasSensualità || hasVigore || hasBenessereSessuale)) {
    return createHybridPath('confidence-relationship', normalizedText, scores);
  }
  
  // Se rileva solo benessere sessuale/vigore senza relazione esplicita, aumenta score per energia/feel-better
  if (hasVigore || hasBenessereSessuale || hasSensualità) {
    const energyScore = scores.get('energy') || { score: 0, keywords: [] };
    scores.set('energy', { score: energyScore.score + 0.5, keywords: energyScore.keywords });
    
    const feelBetterScore = scores.get('feel-better') || { score: 0, keywords: [] };
    scores.set('feel-better', { score: feelBetterScore.score + 0.4, keywords: feelBetterScore.keywords });
  }

  // Trova obiettivo primario (score più alto)
  let primaryGoal: UserGoal = 'feel-better';
  let maxScore = 0;
  let allMatchedKeywords: string[] = [];

  scores.forEach((data, goal) => {
    if (data.score > maxScore) {
      maxScore = data.score;
      primaryGoal = goal;
      allMatchedKeywords = data.keywords;
    }
  });

  // Trova obiettivi secondari (score > 50% del primario)
  const secondaryGoals: UserGoal[] = [];
  scores.forEach((data, goal) => {
    if (goal !== primaryGoal && data.score > maxScore * 0.5) {
      secondaryGoals.push(goal);
    }
  });

  // Calcola confidence (0-1)
  const confidence = Math.min(maxScore / 3, 1); // Normalizza a max 1

  return {
    primaryGoal,
    secondaryGoals,
    confidence,
    matchedKeywords: allMatchedKeywords,
    suggestedPath: getPathForGoal(primaryGoal),
  };
}

/**
 * Crea un percorso ibrido personalizzato
 */
function createHybridPath(
  type: 'confidence-relationship',
  userText: string,
  scores: Map<UserGoal, { score: number; keywords: string[] }>
): AnalysisResult {
  // Percorso ibrido: Fiducia + Relazione + Vigore/Sensualità
  const basePath = getPathForGoal('inner-peace'); // Base: pace interiore/autostima
  
  const hybridPath: PersonalizedPath = {
    ...basePath,
    goal: 'inner-peace' as UserGoal, // Usa inner-peace come base
    title: 'Percorso: Fiducia in Te Stesso e Relazione',
    description: 'Un percorso personalizzato per riconquistare la fiducia in te stesso, migliorare la tua autostima e rafforzare la tua relazione attraverso mindfulness, energia, vitalità e benessere sessuale.',
    estimatedDuration: '6-8 settimane',
    steps: [
      {
        order: 1,
        title: 'Fondamenta: Autostima e Mindfulness',
        description: 'Costruisci le basi della fiducia in te stesso attraverso meditazione e crescita personale.',
        articles: [2, 10], // Meditazione, Growth Mindset
        products: [3, 18], // Cuscino meditazione, Ashwagandha
        icon: '🧘',
      },
      {
        order: 2,
        title: 'Energia e Vitalità',
        description: 'Aumenta la tua energia fisica e mentale per sentirti più forte e sicuro.',
        articles: [1, 4], // Abitudini mattutine, Superfood
        products: [1, 6], // Multivitaminico, Superfood mix
        icon: '⚡',
      },
      {
        order: 3,
        title: 'Benessere Sessuale e Vigore',
        description: 'Migliora la tua vitalità sessuale, performance e confidenza attraverso nutrizione mirata e benessere intimo.',
        articles: [19, 20, 23], // Benessere sessuale, Integratori vigore, Performance maschile
        products: [26, 27, 28, 29], // Integratori vigore maschile/femminile, Zinco+Magnesio, Maca
        icon: '💑',
      },
      {
        order: 4,
        title: 'Intimità e Comunicazione',
        description: 'Coltiva una connessione più profonda con il partner attraverso comunicazione aperta e tecniche di intimità.',
        articles: [21, 24], // Sessuologia tantrica, Comunicazione e intimità
        products: [30, 31, 35], // Corso tantrico, Guida comunicazione, Corso comunicazione
        icon: '💕',
      },
      {
        order: 5,
        title: 'Forza e Performance Fisica',
        description: 'Migliora la tua forma fisica e la tua resistenza per sentirti più potente e sicuro.',
        articles: [7, 8], // Home workout, Recupero
        products: [11, 13, 14, 34], // Pesi, Foam roller, BCAA, Esercizi pelvici
        icon: '💪',
      },
    ],
  };

  return {
    primaryGoal: 'inner-peace',
    secondaryGoals: ['find-motivation', 'energy', 'fitness'],
    confidence: 0.85,
    matchedKeywords: ['fiducia', 'relazione', 'autostima'],
    suggestedPath: hybridPath,
  };
}

/**
 * Suggerisce il percorso più adatto basato su testo libero
 */
export function suggestPathFromText(userText: string): {
  path: PersonalizedPath;
  reason: string;
  confidence: number;
} {
  const analysis = analyzeUserGoal(userText);
  
  let reason = `Abbiamo rilevato che il tuo obiettivo principale è "${goalOptions.find(g => g.id === analysis.primaryGoal)?.title}". `;
  
  if (analysis.matchedKeywords.length > 0) {
    reason += `Parole chiave rilevate: ${analysis.matchedKeywords.slice(0, 3).join(', ')}. `;
  }
  
  if (analysis.secondaryGoals.length > 0) {
    const secondaryNames = analysis.secondaryGoals
      .map(g => goalOptions.find(go => go.id === g)?.title)
      .filter(Boolean)
      .join(', ');
    reason += `Abbiamo anche rilevato interesse per: ${secondaryNames}.`;
  }

  return {
    path: analysis.suggestedPath,
    reason,
    confidence: analysis.confidence,
  };
}

