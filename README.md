# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# Spot On Innovation Applicatie - House of Manufacturing

Deze applicatie is ontwikkeld om verschillende projecten en cases te tonen aan de buitenwereld.

---

## 🚀 Applicatie starten

Om de applicatie lokaal te draaien, gebruik je het volgende commando in de terminal:

```bash
npm run start
```

## ⚙️ Data aanpassen

De applicatie haalt alle getoonde data uit JSON-bestanden. Hieronder staat hoe je nieuwe items kunt toevoegen of bestaande kunt aanpassen.

### 📁 Cases toevoegen

Wanneer er een nieuwe case of bedrijf moet worden toegevoegd, voeg je deze toe aan `companies.json` in het volgende formaat:

```json
{
  "id": "",
  "name": "",
  "color": "",
  "title": "",
  "description": "",
  "caseDescription": "",
  "website": "",
  "iframeUrl": "",
  "image": ""
}
```

Tip: Zorg ervoor dat de id uniek is en dat URLs correct zijn.

### 👤 Users toevoegen

Als er een nieuwe gebruiker moet toegevoegd (bv om events toe te voegen), doe dit dan in `user.json`:

```json
{
  "username": "",
  "password": ""
}
```

## 📁 Structuur

- `companies.json` - bevat alle cases/bedrijven die getoond worden.
- `users.json` - bevat alle gebruikers die toegang hebben om events toe te voegen.
- `public` - statische bestanden zoals afbeeldingen
- `src` - broncode van de applicatie
