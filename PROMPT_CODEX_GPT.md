# 🚀 PROMPT POUR CURSOR / COPILOT (GPT CODEX)

**Copie-colle ce prompt dans Cursor ou ton IDE avec Copilot :**

---

Je veux déployer une application React d'analyse de catalogue sur GitHub Pages.

**Structure actuelle du projet :**
```
catalog-app/
├── package.json
├── public/
│   └── index.html
├── src/
│   ├── index.js
│   └── App.jsx (292 produits avec données complètes)
├── .gitignore
└── README.md
```

**Tâches à accomplir :**

1. **Vérifier que tous les fichiers sont présents**
   - Liste-moi les fichiers du projet

2. **Ajouter la configuration GitHub Pages dans package.json**
   - Ajoute cette ligne dans package.json : `"homepage": "https://[MON_USERNAME].github.io/catalog-analysis-summer-2026"`
   - Remplace [MON_USERNAME] par mon vrai username GitHub que je te donnerai

3. **Initialiser Git et créer le premier commit**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Catalog Analysis - Collection Été 2026"
   ```

4. **Créer un nouveau repo GitHub via gh CLI ou me donner les commandes**
   ```bash
   gh repo create catalog-analysis-summer-2026 --public --source=. --remote=origin
   git push -u origin main
   ```
   OU si je n'ai pas gh CLI, donne-moi les commandes manuelles

5. **Installer les dépendances**
   ```bash
   npm install
   ```

6. **Build et déployer sur GitHub Pages**
   ```bash
   npm run build
   npm run deploy
   ```

7. **Me donner le lien final**
   - URL : `https://[MON_USERNAME].github.io/catalog-analysis-summer-2026`

**Mon username GitHub est :** [À COMPLÉTER]

**Important :**
- L'app est déjà complète, ne modifie pas App.jsx
- Vérifie juste que package.json a bien les scripts "build" et "deploy"
- Confirme-moi chaque étape avant de l'exécuter

Commence par me lister les fichiers du projet et vérifier le contenu de package.json.

---
