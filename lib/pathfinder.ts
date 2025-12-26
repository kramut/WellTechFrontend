/**
 * Pathfinder Logic - Mappatura obiettivi → percorsi personalizzati
 */

export type UserGoal =
  | 'feel-better'           // Sentirsi meglio
  | 'make-money'            // Fare più soldi
  | 'find-motivation'       // Ritrovare la motivazione
  | 'inner-peace'           // Ritrovare la pace interiore
  | 'detox-physical'        // Depurarsi fisicamente
  | 'detox-mental'          // Depurarsi mentalmente
  | 'energy'                // Avere più energia
  | 'focus'                 // Migliorare la concentrazione
  | 'sleep'                 // Dormire meglio
  | 'fitness'               // Mettersi in forma
  | 'sustainability'        // Ridurre impatto ambientale
  | 'sexual-wellbeing';     // Benessere sessuale

export interface PathStep {
  order: number;
  title: string;
  description: string;
  articles: number[];
  products: number[];
  icon: string;
}

export interface PersonalizedPath {
  goal: UserGoal;
  title: string;
  description: string;
  steps: PathStep[];
  estimatedDuration: string;
  color: string; // Per gradient/theme
}

export const goalOptions = [
  {
    id: 'feel-better' as UserGoal,
    title: 'Sentirmi Meglio',
    description: 'Benessere olistico e vitalità',
    icon: '🌿',
    color: 'sage',
  },
  {
    id: 'make-money' as UserGoal,
    title: 'Fare Più Soldi',
    description: 'Crescita finanziaria e indipendenza',
    icon: '💰',
    color: 'gold',
  },
  {
    id: 'find-motivation' as UserGoal,
    title: 'Ritrovare la Motivazione',
    description: 'Energia mentale e determinazione',
    icon: '⚡',
    color: 'orange',
  },
  {
    id: 'inner-peace' as UserGoal,
    title: 'Pace Interiore',
    description: 'Equilibrio mentale e serenità',
    icon: '🧘',
    color: 'teal',
  },
  {
    id: 'detox-physical' as UserGoal,
    title: 'Depurarmi Fisicamente',
    description: 'Pulizia del corpo e benessere',
    icon: '🌱',
    color: 'sage',
  },
  {
    id: 'detox-mental' as UserGoal,
    title: 'Depurarmi Mentalmente',
    description: 'Liberarsi da stress e tossine mentali',
    icon: '🧠',
    color: 'teal',
  },
  {
    id: 'energy' as UserGoal,
    title: 'Avere Più Energia',
    description: 'Vitalità e resistenza quotidiana',
    icon: '💪',
    color: 'orange',
  },
  {
    id: 'focus' as UserGoal,
    title: 'Migliorare la Concentrazione',
    description: 'Focus profondo e produttività',
    icon: '🎯',
    color: 'teal',
  },
  {
    id: 'sleep' as UserGoal,
    title: 'Dormire Meglio',
    description: 'Sonno di qualità e riposo',
    icon: '😴',
    color: 'sage',
  },
  {
    id: 'fitness' as UserGoal,
    title: 'Mettersi in Forma',
    description: 'Forza fisica e benessere',
    icon: '🏋️',
    color: 'orange',
  },
  {
    id: 'sustainability' as UserGoal,
    title: 'Ridurre l\'Impatto Ambientale',
    description: 'Sostenibilità e energia rinnovabile',
    icon: '🌱',
    color: 'sage',
  },
  {
    id: 'sexual-wellbeing' as UserGoal,
    title: 'Benessere Sessuale',
    description: 'Vitalità, performance e intimità',
    icon: '💑',
    color: 'orange',
  },
];

export function getPathForGoal(goal: UserGoal): PersonalizedPath {
  const paths: Record<UserGoal, PersonalizedPath> = {
    'feel-better': {
      goal: 'feel-better',
      title: 'Il Tuo Percorso verso il Benessere Completo',
      description: 'Un percorso olistico di 4 settimane per migliorare energia, umore e vitalità attraverso sonno, nutrizione, movimento ed equilibrio mentale.',
      estimatedDuration: '4 settimane',
      color: 'sage',
      steps: [
        {
          order: 1,
          title: 'Fondamenta: Sonno e Riposo',
          description: 'Il sonno è la base di tutto. Impara a ottimizzare il tuo riposo per svegliarti pieno di energia.',
          articles: [3], // Sonno di Qualità
          products: [4, 5], // Melatonina, Maschera sonno
          icon: '😴',
        },
        {
          order: 2,
          title: 'Nutrizione Consapevole',
          description: 'Alimenta il tuo corpo con i nutrienti giusti per energia sostenuta e benessere duraturo.',
          articles: [4, 6], // Superfood, Digestione
          products: [1, 6, 10], // Multivitaminico, Superfood mix, Probiotici
          icon: '🥗',
        },
        {
          order: 3,
          title: 'Movimento e Vitalità',
          description: 'Riscopri il piacere del movimento e aumenta la tua energia fisica con allenamenti mirati.',
          articles: [7, 8], // Home workout, Recupero
          products: [2, 11, 13], // Tappetino, Pesi, Foam roller
          icon: '💪',
        },
        {
          order: 4,
          title: 'Equilibrio Mentale e Intimità',
          description: 'Coltiva la pace interiore, gestisci lo stress e migliora la tua intimità con pratiche di mindfulness e benessere sessuale.',
          articles: [2, 11, 19], // Meditazione, Gestione stress, Benessere sessuale
          products: [3, 17, 18, 27], // Cuscino meditazione, Diffusore, Ashwagandha, Libido femminile
          icon: '🧘',
        },
      ],
    },
    'make-money': {
      goal: 'make-money',
      title: 'Il Tuo Percorso verso l\'Indipendenza Finanziaria',
      description: 'Un percorso strutturato per costruire ricchezza attraverso investimenti consapevoli, side hustle e strategie di crescita finanziaria.',
      estimatedDuration: '3-6 mesi',
      color: 'gold',
      steps: [
        {
          order: 1,
          title: 'Fondamenta Finanziarie',
          description: 'Impara i concetti base degli investimenti e costruisci le tue fondamenta finanziarie.',
          articles: [16], // Investimenti per Principianti
          products: [23], // Corso Investimenti
          icon: '📚',
        },
        {
          order: 2,
          title: 'Strategia FIRE',
          description: 'Scopri come raggiungere l\'indipendenza finanziaria con il movimento FIRE.',
          articles: [17], // FIRE Movement
          products: [24], // Libro FIRE
          icon: '🔥',
        },
        {
          order: 3,
          title: 'Side Hustle e Entrate Aggiuntive',
          description: 'Crea entrate aggiuntive online e costruisci la tua libertà finanziaria.',
          articles: [18], // Side Hustle
          products: [25], // Corso Side Hustle
          icon: '💼',
        },
      ],
    },
    'find-motivation': {
      goal: 'find-motivation',
      title: 'Il Tuo Percorso per Ritrovare la Motivazione',
      description: 'Riscopri la tua spinta interiore attraverso mindset, produttività e abitudini che alimentano la determinazione.',
      estimatedDuration: '3 settimane',
      color: 'orange',
      steps: [
        {
          order: 1,
          title: 'Growth Mindset',
          description: 'Sviluppa una mentalità di crescita che trasforma le sfide in opportunità.',
          articles: [10], // Growth Mindset
          products: [16], // Libro Growth Mindset
          icon: '🌱',
        },
        {
          order: 2,
          title: 'Energia e Vitalità',
          description: 'Aumenta la tua energia fisica e mentale per sostenere la motivazione.',
          articles: [1, 4], // Abitudini mattutine, Superfood
          products: [1, 6], // Multivitaminico, Superfood mix
          icon: '⚡',
        },
        {
          order: 3,
          title: 'Sistemi di Produttività',
          description: 'Implementa sistemi che ti aiutano a mantenere il focus e la determinazione.',
          articles: [12, 13], // Produttività, Deep Work
          products: [19, 20], // Notebook, Cuffie
          icon: '📊',
        },
        {
          order: 4,
          title: 'Vitalità e Benessere Sessuale',
          description: 'Aumenta la tua energia sessuale e la confidenza per sentirti più attraente e sicuro.',
          articles: [19, 20], // Benessere sessuale, Integratori vigore
          products: [26, 28, 29], // Vigore maschile, Zinco+Magnesio, Maca
          icon: '💑',
        },
      ],
    },
    'inner-peace': {
      goal: 'inner-peace',
      title: 'Il Tuo Percorso verso la Pace Interiore',
      description: 'Un viaggio di consapevolezza per trovare equilibrio, serenità e benessere mentale profondo.',
      estimatedDuration: '4 settimane',
      color: 'teal',
      steps: [
        {
          order: 1,
          title: 'Meditazione e Mindfulness',
          description: 'Impara le basi della meditazione per calmare la mente e trovare pace.',
          articles: [2], // Meditazione Mindfulness
          products: [3, 17], // Cuscino meditazione, Diffusore
          icon: '🧘',
        },
        {
          order: 2,
          title: 'Gestione dello Stress',
          description: 'Tecniche pratiche per ridurre ansia e tensioni quotidiane.',
          articles: [11], // Gestione stress
          products: [18], // Ashwagandha
          icon: '🌊',
        },
        {
          order: 3,
          title: 'Digital Detox',
          description: 'Riduci il rumore digitale e riconquista tempo per te stesso.',
          articles: [15], // Digital Minimalism
          products: [22], // App Blocking Software
          icon: '📵',
        },
        {
          order: 4,
          title: 'Routine di Benessere',
          description: 'Crea abitudini quotidiane che nutrono la tua pace interiore.',
          articles: [1, 3], // Abitudini mattutine, Sonno
          products: [4, 5], // Melatonina, Maschera sonno
          icon: '✨',
        },
      ],
    },
    'detox-physical': {
      goal: 'detox-physical',
      title: 'Il Tuo Percorso di Depurazione Fisica',
      description: 'Pulisci il tuo corpo dalle tossine attraverso nutrizione, idratazione e abitudini salutari.',
      estimatedDuration: '2-3 settimane',
      color: 'sage',
      steps: [
        {
          order: 1,
          title: 'Superfood e Nutrizione Pulita',
          description: 'Integra alimenti ricchi di nutrienti che supportano la depurazione naturale.',
          articles: [4], // Superfood
          products: [6, 7], // Superfood mix, Olio di cocco
          icon: '🌱',
        },
        {
          order: 2,
          title: 'Digestione Ottimale',
          description: 'Supporta il tuo sistema digestivo con probiotici e alimenti prebiotici.',
          articles: [6], // Digestione
          products: [10], // Probiotici
          icon: '🫶',
        },
        {
          order: 3,
          title: 'Movimento e Sudore',
          description: 'Attiva la circolazione e supporta l\'eliminazione delle tossine con movimento regolare.',
          articles: [7, 9], // Home workout, HIIT
          products: [2, 12], // Tappetino, Resistance bands
          icon: '💦',
        },
      ],
    },
    'detox-mental': {
      goal: 'detox-mental',
      title: 'Il Tuo Percorso di Depurazione Mentale',
      description: 'Libera la mente da stress, ansia e pensieri tossici attraverso pratiche consapevoli.',
      estimatedDuration: '3 settimane',
      color: 'teal',
      steps: [
        {
          order: 1,
          title: 'Digital Minimalism',
          description: 'Riduci le distrazioni digitali e riconquista la tua attenzione.',
          articles: [15], // Digital Minimalism
          products: [22], // App Blocking Software
          icon: '📵',
        },
        {
          order: 2,
          title: 'Meditazione e Consapevolezza',
          description: 'Pratica la meditazione per calmare la mente e liberarla dai pensieri negativi.',
          articles: [2], // Meditazione
          products: [3, 17], // Cuscino, Diffusore
          icon: '🧘',
        },
        {
          order: 3,
          title: 'Gestione dello Stress',
          description: 'Impara tecniche per gestire ansia e tensioni mentali.',
          articles: [11], // Gestione stress
          products: [18], // Ashwagandha
          icon: '🌊',
        },
      ],
    },
    'energy': {
      goal: 'energy',
      title: 'Il Tuo Percorso verso Più Energia',
      description: 'Aumenta la tua vitalità quotidiana attraverso nutrizione, movimento e abitudini energetiche.',
      estimatedDuration: '3 settimane',
      color: 'orange',
      steps: [
        {
          order: 1,
          title: 'Nutrizione Energetica',
          description: 'Alimenta il tuo corpo con nutrienti che sostengono energia duratura.',
          articles: [4, 5], // Superfood, Integratori proteici
          products: [1, 6, 8], // Multivitaminico, Superfood, Proteine
          icon: '⚡',
        },
        {
          order: 2,
          title: 'Routine Mattutina',
          description: 'Inizia la giornata con abitudini che caricano di energia positiva.',
          articles: [1], // Abitudini mattutine
          products: [2], // Tappetino yoga
          icon: '🌅',
        },
        {
          order: 3,
          title: 'Movimento Regolare',
          description: 'Attiva il corpo con allenamenti che aumentano vitalità e resistenza.',
          articles: [7, 9], // Home workout, HIIT
          products: [11, 12, 15], // Pesi, Resistance bands, Timer
          icon: '💪',
        },
        {
          order: 4,
          title: 'Vitalità Sessuale e Performance',
          description: 'Supporta la tua energia sessuale e performance attraverso nutrizione mirata e benessere intimo.',
          articles: [20, 23], // Integratori vigore, Performance maschile
          products: [26, 28, 29], // Vigore maschile, Zinco+Magnesio, Maca
          icon: '💑',
        },
      ],
    },
    'focus': {
      goal: 'focus',
      title: 'Il Tuo Percorso verso la Concentrazione Profonda',
      description: 'Sviluppa la capacità di concentrarti senza distrazioni e aumentare la qualità del tuo lavoro.',
      estimatedDuration: '3 settimane',
      color: 'teal',
      steps: [
        {
          order: 1,
          title: 'Deep Work',
          description: 'Impara l\'arte della concentrazione profonda in un mondo distratto.',
          articles: [13], // Deep Work
          products: [20], // Cuffie Noise Cancelling
          icon: '🎯',
        },
        {
          order: 2,
          title: 'Time Blocking',
          description: 'Organizza il tuo tempo in blocchi dedicati per massimizzare il focus.',
          articles: [14], // Time Blocking
          products: [19, 21], // Notebook, Pomodoro Timer
          icon: '⏰',
        },
        {
          order: 3,
          title: 'Digital Minimalism',
          description: 'Elimina le distrazioni digitali e riconquista la tua attenzione.',
          articles: [15], // Digital Minimalism
          products: [22], // App Blocking Software
          icon: '📵',
        },
      ],
    },
    'sleep': {
      goal: 'sleep',
      title: 'Il Tuo Percorso verso un Sonno di Qualità',
      description: 'Ottimizza il tuo riposo per svegliarti pieno di energia e vitalità ogni mattina.',
      estimatedDuration: '2 settimane',
      color: 'sage',
      steps: [
        {
          order: 1,
          title: 'Fondamenta del Sonno',
          description: 'Impara le basi scientifiche per un sonno riposante e rigenerante.',
          articles: [3], // Sonno di Qualità
          products: [4, 5], // Melatonina, Maschera sonno
          icon: '😴',
        },
        {
          order: 2,
          title: 'Routine Serale',
          description: 'Crea una routine che prepara mente e corpo al riposo.',
          articles: [1], // Abitudini mattutine (contiene anche routine serale)
          products: [17], // Diffusore aromaterapia
          icon: '🌙',
        },
        {
          order: 3,
          title: 'Gestione dello Stress',
          description: 'Riduci ansia e tensioni che interferiscono con il sonno.',
          articles: [11], // Gestione stress
          products: [18], // Ashwagandha
          icon: '🧘',
        },
      ],
    },
    'fitness': {
      goal: 'fitness',
      title: 'Il Tuo Percorso verso la Forma Fisica',
      description: 'Costruisci forza, resistenza e benessere attraverso allenamenti mirati e nutrizione ottimale.',
      estimatedDuration: '6-8 settimane',
      color: 'orange',
      steps: [
        {
          order: 1,
          title: 'Fondamenta dell\'Allenamento',
          description: 'Inizia con programmi di home workout accessibili e progressivi.',
          articles: [7], // Home Workout
          products: [2, 11, 12], // Tappetino, Pesi, Resistance bands
          icon: '🏋️',
        },
        {
          order: 2,
          title: 'Nutrizione per la Performance',
          description: 'Alimenta i tuoi muscoli con proteine e nutrienti essenziali.',
          articles: [5, 8], // Integratori proteici, Recupero
          products: [8, 9, 14], // Proteine, Barrette, BCAA
          icon: '🥗',
        },
        {
          order: 3,
          title: 'Recupero e Ottimizzazione',
          description: 'Massimizza i risultati con strategie di recupero intelligente.',
          articles: [8], // Recupero muscolare
          products: [13], // Foam Roller
          icon: '💆',
        },
        {
          order: 4,
          title: 'Allenamento Avanzato',
          description: 'Progredisci con allenamenti HIIT ad alta intensità.',
          articles: [9], // HIIT Training
          products: [15], // Interval Timer
          icon: '🔥',
        },
      ],
    },
    'sustainability': {
      goal: 'sustainability',
      title: 'Il Tuo Percorso verso la Sostenibilità Ambientale',
      description: 'Un percorso completo per ridurre il tuo impatto ambientale attraverso energia rinnovabile, scelte sostenibili e investimenti green che fanno bene al pianeta e al portafoglio.',
      estimatedDuration: '2-4 mesi',
      color: 'sage',
      steps: [
        {
          order: 1,
          title: 'Fondamenta: Consapevolezza e Impatto',
          description: 'Comprendi il tuo impatto ambientale attuale e scopri le aree di miglioramento.',
          articles: [25, 27], // Ridurre impatto, 50 azioni green
          products: [40, 41, 48], // Borraccia, Borsa riutilizzabile, Corso sostenibilità
          icon: '🌍',
        },
        {
          order: 2,
          title: 'Energia Rinnovabile: Fotovoltaico',
          description: 'Investi nel fotovoltaico domestico per produrre energia pulita e ridurre le bollette.',
          articles: [26, 28], // Fotovoltaico domestico, Energia rinnovabile
          products: [36, 37, 39], // Kit fotovoltaico, Consulenza, Batteria accumulo
          icon: '☀️',
        },
        {
          order: 3,
          title: 'Risparmio Energetico Domestico',
          description: 'Ottimizza i consumi energetici della tua casa con soluzioni smart ed efficienti.',
          articles: [29], // Risparmio energetico
          products: [44, 45, 46], // Termostato smart, LED, Monitor consumi
          icon: '💡',
        },
        {
          order: 4,
          title: 'Stile di Vita Sostenibile',
          description: 'Adotta abitudini quotidiane che riducono l\'impatto ambientale e migliorano il benessere.',
          articles: [30], // Stile di vita sostenibile
          products: [42, 47], // Compostiera, Bicicletta elettrica
          icon: '🌿',
        },
        {
          order: 5,
          title: 'Investimenti Green Avanzati',
          description: 'Considera investimenti in pompe di calore e altre soluzioni avanzate per massimizzare l\'efficienza.',
          articles: [28], // Energia rinnovabile
          products: [43], // Pompa di calore
          icon: '🏡',
        },
      ],
    },
    'sexual-wellbeing': {
      goal: 'sexual-wellbeing',
      title: 'Il Tuo Percorso verso il Benessere Sessuale',
      description: 'Un percorso completo per migliorare vitalità sessuale, performance, intimità e soddisfazione attraverso nutrizione, esercizio, comunicazione e benessere olistico.',
      estimatedDuration: '6-8 settimane',
      color: 'orange',
      steps: [
        {
          order: 1,
          title: 'Fondamenta: Benessere Sessuale e Consapevolezza',
          description: 'Comprendi i fattori che influenzano il benessere sessuale e scopri come migliorare la tua vitalità intima.',
          articles: [19, 20], // Benessere sessuale, Integratori vigore
          products: [26, 27, 28], // Vigore maschile, Libido femminile, Zinco+Magnesio
          icon: '💑',
        },
        {
          order: 2,
          title: 'Energia e Vitalità',
          description: 'Aumenta la tua energia fisica e mentale per sostenere una performance sessuale ottimale.',
          articles: [1, 4], // Abitudini mattutine, Superfood
          products: [1, 6, 29], // Multivitaminico, Superfood mix, Maca
          icon: '⚡',
        },
        {
          order: 3,
          title: 'Performance e Vigore',
          description: 'Migliora la tua performance sessuale attraverso nutrizione mirata ed esercizio specifico.',
          articles: [23], // Performance maschile
          products: [26, 34], // Vigore maschile, Esercizi pelvici
          icon: '💪',
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
          title: 'Benessere Femminile e Maschile',
          description: 'Supporta il benessere sessuale specifico per uomini e donne con prodotti e strategie mirate.',
          articles: [22, 23], // Benessere femminile, Performance maschile
          products: [27, 32, 33], // Libido femminile, Lubrificante, Integratore ormonale
          icon: '🌺',
        },
      ],
    },
  };

  return paths[goal] || paths['feel-better'];
}

