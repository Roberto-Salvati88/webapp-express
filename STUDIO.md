# webapp-express

1. In MySQL Workbench importa `../allegati/dump.sql` (crea il database movies_db)
2. Copia `.env.example` in `.env` e metti la tua password di MySQL
3. `npm install`, poi `npm run watch`

Rotte:
- GET /api/movies → lista
- GET /api/movies/1 → dettaglio con recensioni (404 se non esiste)
- POST /api/movies/1/reviews → body JSON { "name": "...", "vote": 4, "text": "..." } → 201

Questa versione comprende anche le modifiche al backend della 38 (CORS e rotta delle recensioni).
Domande d'esame: SQL injection e prepared statements, CORS (lo applica il BROWSER, Postman non ne è soggetto), perché la password va nel .env.
