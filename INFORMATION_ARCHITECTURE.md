# 🏗️ WellTech Hub - Information Architecture

## Struttura Navigazione

### Top Navigation
```
[Logo] | Articoli | Prodotti | Guide | Temi ▼ | [Search] | Newsletter
```

**Temi Dropdown:**
- Wellbeing
- Nutrition
- Fitness
- Mindset
- Productivity
- Wealth

## 📄 Pagine Principali

### 1. Homepage (`/`)
**Obiettivo**: Prima impressione, discovery, navigazione per categoria

**Sezioni:**
1. **Hero Section**
   - Titolo principale + tagline
   - CTA "Esplora" o "Inizia il percorso"
   - Immagine lifestyle (opzionale)

2. **Featured Articles** (3-4 articoli)
   - Card grandi, immagini prominenti
   - Badge "Editor's Pick"

3. **Categories Grid**
   - 6 card categoria (Wellbeing, Nutrition, Fitness, Mindset, Productivity, Wealth)
   - Icona + nome + breve descrizione
   - Link a pagina categoria

4. **Featured Products** (4-6 prodotti)
   - Card prodotti curati
   - Badge "Top Rated" o "Editor's Pick"

5. **Latest Articles** (6-8 articoli)
   - Grid più compatta
   - Mostra categoria, titolo, excerpt, data

6. **Newsletter CTA**
   - Form semplice
   - Benefit chiari

### 2. Pagina Categoria Articoli (`/articoli/[categoria]`)
**Esempio**: `/articoli/wellbeing`, `/articoli/nutrition`

**Layout:**
- **Header**: Nome categoria + descrizione breve
- **Filtri**: Per data, popolarità, tempo lettura
- **Grid Articoli**: 3 colonne desktop, 2 tablet, 1 mobile
- **Pagination**: Bottom

**Card Articolo:**
- Immagine featured (16:9)
- Categoria (badge)
- Titolo
- Excerpt (2 righe)
- Meta: data, tempo lettura, views
- Link "Leggi" discreto

### 3. Pagina Articolo Singolo (`/articoli/[slug]`)
**Obiettivo**: Leggibilità ottimale + integrazione prodotti

**Layout:**
1. **Hero Section**
   - Immagine featured full-width (opzionale)
   - Titolo grande
   - Meta: categoria, data, tempo lettura, autore (futuro)

2. **Content Area** (max-width: 800px, centrato)
   - Intro/lead (evidenziato)
   - Contenuto con:
     - Sottotitoli ben spaziati
     - Paragrafi ariosi
     - Box evidenziati per info importanti
     - Immagini intercalate
     - List items ben formattati

3. **Product Recommendations** (2-3 blocchi nel contenuto)
   - Card prodotto integrata
   - Testo contestuale ("Per questo problema, consigliamo...")
   - CTA "Vedi offerta" discreto

4. **Related Articles** (bottom)
   - 3-4 articoli correlati
   - Grid orizzontale

5. **Share/Bookmark** (sticky o bottom)
   - Social share
   - Salva articolo (futuro)

### 4. Listing Prodotti (`/prodotti`)
**Obiettivo**: Discovery e filtri efficaci

**Layout:**
- **Header**: "Prodotti Curati" + descrizione
- **Sidebar Filtri** (desktop) / **Drawer Filtri** (mobile):
  - Categoria (Wellbeing, Nutrition, Fitness, etc.)
  - Brand
  - Tipo prodotto (Integratori, Equipment, etc.)
  - Obiettivo (Energia, Focus, Sonno, etc.)
  - Prezzo range
- **Grid Prodotti**: 4 colonne desktop, 3 tablet, 2 mobile
- **Sort**: Popolarità, Prezzo, Nome

**Card Prodotto:**
- Immagine prodotto (1:1)
- Badge categoria
- Nome prodotto
- 1-2 benefit sintetici
- Prezzo (se disponibile)
- Badge "Editor's Pick" o "Top Rated" (se applicabile)
- CTA "Vedi dettagli"

### 5. Scheda Prodotto (`/prodotti/[slug]`)
**Obiettivo**: Informazione completa + conversione

**Layout:**
1. **Hero Section**
   - Immagine prodotto grande (lato sinistro o sopra)
   - Info principali (lato destro o sotto):
     - Nome
     - Categoria + badge
     - Prezzo
     - CTA "Vai all'offerta" (prominente ma non aggressivo)
     - Badge "Editor's Pick" se applicabile

2. **Tabs o Sezioni:**
   - **Descrizione**: Testo completo, storytelling
   - **Benefici**: Lista chiara con icona
   - **Modalità d'uso**: Istruzioni
   - **Ingredienti** (se applicabile)
   - **Avvertenze**: Box evidenziato
   - **Recensioni** (futuro)

3. **Articoli Correlati**
   - Articoli che menzionano questo prodotto
   - Grid orizzontale

4. **Prodotti Simili**
   - 4-6 prodotti stessa categoria
   - Grid

### 6. Pagina Guide (`/guide`)
**Obiettivo**: Percorsi guidati tematici

**Layout:**
- Grid guide per tema
- Card con: titolo, descrizione, durata, difficoltà
- Esempio: "Migliora il sonno in 7 giorni"

### 7. Pagina Temi (`/temi/[tema]`)
**Obiettivo**: Hub tematico (Wellbeing, Wealth, etc.)

**Layout:**
- Hero tematico
- Articoli del tema (grid)
- Prodotti del tema (grid)
- Guide del tema (grid)

### 8. Search (`/cerca?q=...`)
**Obiettivo**: Ricerca globale articoli + prodotti

**Layout:**
- Barra ricerca prominente
- Risultati divisi:
  - Articoli (primi 5)
  - Prodotti (primi 5)
  - "Vedi tutti i risultati" per categoria

## 🔄 Flussi Utente Principali

### Flusso 1: Discovery da Google
```
Google → Articolo → Legge → Vede prodotti consigliati → Clicca prodotto → Vede dettaglio → CTA affiliazione
```

### Flusso 2: Navigazione per Ispirazione
```
Home → Categoria → Articoli categoria → Articolo → Prodotti correlati → Salva (futuro)
```

### Flusso 3: Ricerca Prodotto
```
Home → Prodotti → Filtri → Prodotto → Dettaglio → CTA affiliazione
```

### Flusso 4: Percorso Guidato
```
Home → Guide → Sceglie guida → Segue step → Prodotti consigliati per step
```

## 📱 Responsive Breakpoints

```css
--mobile: 640px
--tablet: 768px
--desktop: 1024px
--wide: 1280px
```

## 🎯 Principi UX

1. **Leggibilità Prima**: Spazio bianco, tipografia chiara
2. **Non Aggressivo**: CTA affiliazione chiare ma discrete
3. **Credibilità**: Design curato, non "blog spam"
4. **Scansionabile**: Liste e grid facili da percorrere
5. **Mobile-First**: Esperienza ottimale su mobile





