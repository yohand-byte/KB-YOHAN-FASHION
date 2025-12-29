# 📘 GUIDE COMPLET DE DÉPLOIEMENT

## 🎯 Objectif
Déployer ton application d'analyse de catalogue sur GitHub Pages pour avoir un lien accessible en ligne.

---

## ✅ CE QUE TU AS DÉJÀ

Le dossier **catalog-app** contient :
- ✅ Application React complète avec 292 produits
- ✅ Tous les prix (USD, ILS, grossiste, club, détail)
- ✅ Graphiques et visualisations
- ✅ Filtres et recherche
- ✅ Export CSV
- ✅ Configuration prête pour le déploiement

---

## 🚀 OPTION 1 : Avec Cursor / Copilot (Codex GPT)

### Étape 1 : Ouvre le projet dans Cursor
```bash
cd catalog-app
cursor .
```

### Étape 2 : Copie ce prompt dans le chat Cursor/Copilot

```
Je veux déployer cette application React sur GitHub Pages.

Mon username GitHub est : [TON_USERNAME]

Peux-tu :
1. Ajouter "homepage": "https://[TON_USERNAME].github.io/catalog-analysis-summer-2026" dans package.json
2. Initialiser Git : git init && git add . && git commit -m "Initial commit"
3. Créer le repo et pousser le code
4. Installer les dépendances : npm install
5. Déployer : npm run build && npm run deploy

Confirme chaque étape avec moi avant de l'exécuter.
```

### Étape 3 : Suis les instructions
Cursor va te guider étape par étape et te donner le lien final.

---

## 🚀 OPTION 2 : Manuellement (si tu préfères)

### 1. Configure package.json
Ouvre `package.json` et ajoute cette ligne au début :
```json
"homepage": "https://TON_USERNAME.github.io/catalog-analysis-summer-2026",
```

### 2. Initialise Git
```bash
cd catalog-app
git init
git add .
git commit -m "Initial commit: Catalog Analysis"
```

### 3. Crée le repo sur GitHub
- Va sur github.com
- Clique sur "New repository"
- Nom : `catalog-analysis-summer-2026`
- Public
- Ne pas initialiser avec README
- Create repository

### 4. Lie et pousse le code
```bash
git remote add origin https://github.com/TON_USERNAME/catalog-analysis-summer-2026.git
git branch -M main
git push -u origin main
```

### 5. Installe et déploie
```bash
npm install
npm run build
npm run deploy
```

### 6. Active GitHub Pages
- Va dans Settings > Pages de ton repo
- Source : Branch `gh-pages`
- Save

**Attends 2-3 minutes**, puis va sur :
```
https://TON_USERNAME.github.io/catalog-analysis-summer-2026
```

---

## 🎉 RÉSULTAT FINAL

Tu auras une application en ligne avec :
- ✅ 292 produits du catalogue
- ✅ Prix d'achat USD/ILS avec transport
- ✅ Tous les prix de vente
- ✅ Marges calculées automatiquement  
- ✅ Graphiques interactifs
- ✅ Filtres et recherche
- ✅ Export CSV
- ✅ Accessible 24/7 via un simple lien

---

## ❓ En cas de problème

### Erreur : "gh-pages not found"
```bash
npm install gh-pages --save-dev
```

### Erreur : "Permission denied"
Configure ton token GitHub :
```bash
git config --global user.name "Ton Nom"
git config --global user.email "ton@email.com"
```

### L'app ne s'affiche pas
Attends 5 minutes après le déploiement, GitHub Pages peut prendre du temps.

---

## 💡 ASTUCE

Une fois déployé, tu peux :
- Partager le lien avec qui tu veux
- L'app est responsive (fonctionne sur mobile)
- Aucun serveur à maintenir
- Gratuit et illimité sur GitHub Pages
