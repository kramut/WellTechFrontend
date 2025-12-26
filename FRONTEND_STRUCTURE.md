# 🎨 Struttura Frontend WellTech Hub

## Architettura Consigliata (Next.js App Router)

```
app/
├── (public)/                    # Route pubbliche (SEO-optimized)
│   ├── page.tsx                  # Homepage pubblica
│   ├── articles/
│   │   ├── page.tsx              # Lista articoli (SSG)
│   │   └── [slug]/
│   │       └── page.tsx          # Articolo singolo (SSG con slug)
│   └── products/
│       └── page.tsx              # Lista prodotti pubblici
│
├── (dashboard)/                   # Dashboard admin (protetta)
│   ├── dashboard/
│   │   └── page.tsx              # Dashboard analytics
│   ├── products/
│   │   ├── page.tsx              # Gestione prodotti
│   │   ├── new/
│   │   │   └── page.tsx          # Nuovo prodotto
│   │   └── [id]/
│   │       └── page.tsx          # Modifica prodotto
│   ├── articles/
│   │   ├── page.tsx              # Gestione articoli
│   │   ├── new/
│   │   │   └── page.tsx          # Nuovo articolo
│   │   └── [id]/
│   │       └── page.tsx          # Editor articolo
│   ├── videos/
│   │   └── page.tsx              # Gestione video
│   └── earnings/
│       └── page.tsx              # Report guadagni
│
├── api/                           # API Routes (se servono)
│   └── ...
│
├── components/
│   ├── ui/                        # Componenti base (shadcn/ui style)
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Table.tsx
│   │   └── ...
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   ├── Sidebar.tsx
│   │   └── Footer.tsx
│   ├── dashboard/
│   │   ├── StatsCard.tsx
│   │   ├── RevenueChart.tsx
│   │   └── TopProducts.tsx
│   └── articles/
│       ├── ArticleCard.tsx
│       └── ArticleEditor.tsx
│
├── lib/
│   ├── api.ts                     # Client API (axios/fetch)
│   ├── utils.ts                   # Utility functions
│   └── constants.ts               # Costanti
│
└── types/
    └── index.ts                   # TypeScript types (da API)
```

## Strategia SEO

### Articoli Pubblici (SSG)
```typescript
// app/(public)/articles/[slug]/page.tsx
export async function generateStaticParams() {
  // Pre-renderizza tutti gli articoli pubblicati
  const articles = await fetchArticles();
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }) {
  const article = await fetchArticleBySlug(params.slug);
  return {
    title: article.seoMetaTitle || article.title,
    description: article.seoMetaDescription,
    openGraph: {
      images: [article.featuredImageUrl],
    },
  };
}
```

### Dashboard (Client-side)
- Route protette con middleware
- Client components per interattività
- Server components per dati iniziali

## Componenti Chiave

### 1. API Client
```typescript
// lib/api.ts
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export const api = {
  products: {
    getAll: () => fetch(`${API_URL}/api/products`),
    getById: (id) => fetch(`${API_URL}/api/products/${id}`),
    // ...
  },
  // ...
};
```

### 2. Dashboard Analytics
- Server component per fetch dati
- Client component per charts (Recharts/Chart.js)
- Real-time updates con SWR o React Query

### 3. Article Editor
- Rich text editor (Tiptap o similar)
- Preview live
- Auto-save
- SEO preview

## Deploy Strategy

### Railway Deploy
1. **Build Command:** `npm run build`
2. **Start Command:** `npm start`
3. **Environment Variables:**
   - `NEXT_PUBLIC_API_URL` - URL backend Railway
   - `DATABASE_URL` - (se usi database diretto)

### Ottimizzazioni
- Static generation per articoli pubblici
- ISR (Incremental Static Regeneration) per contenuti dinamici
- Image optimization con Next.js Image
- Font optimization già configurato

## Stack Frontend Consigliato

```json
{
  "dependencies": {
    "next": "16.0.10",
    "react": "19.2.1",
    "axios": "^1.6.0",           // API calls
    "swr": "^2.2.0",             // Data fetching
    "recharts": "^2.10.0",        // Charts
    "@tiptap/react": "^2.1.0",    // Rich text editor
    "date-fns": "^2.30.0",        // Date formatting
    "zod": "^3.22.0"              // Validation
  }
}
```

## Prossimi Step

1. ✅ Setup API client
2. ✅ Creare layout dashboard
3. ✅ Implementare dashboard analytics
4. ✅ CRUD prodotti
5. ✅ Editor articoli
6. ✅ Pagine pubbliche articoli (SSG)





