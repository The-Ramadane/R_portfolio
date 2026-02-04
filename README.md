# Portfolio de Ramadane 🚀

Bienvenue sur le dépôt de mon portfolio personnel. Ce projet est une vitrine de mes compétences en développement Full Stack, intégrant une section blog, une gestion de projets interactive et un système de newsletter automatisé.

## ✨ Fonctionnalités

- **Vitrine de Projets** : Présentation détaillée de mes réalisations (ex: Together, Smart Recycle) avec galeries interactives et modales immersives.
- **Blog Système** : Création et lecture d'articles techniques avec support Markdown.
- **Dashboard Admin** : Interface sécurisée pour rédiger et publier des articles (`/admin`).
- **Newsletter Automatisée** : 
  - Inscription des visiteurs via Firebase Firestore.
  - Notification automatique par email (via **Resend**) aux abonnés lors de la publication d'un nouvel article.
- **UI/UX Moderne** : Design soigné avec **Chakra UI**, animations fluides via **Framer Motion**, et responsive design complet.

## 🛠 Stack Technique

- **Framework** : [Next.js](https://nextjs.org/) (React)
- **Langage** : TypeScript
- **Styling** : [Chakra UI](https://chakra-ui.com/)
- **Animations** : [Framer Motion](https://www.framer.com/motion/)
- **Backend / BaaS** : 
  - [Firebase](https://firebase.google.com/) (Firestore pour la DB, Auth pour l'admin).
  - [API Routes](https://nextjs.org/docs/api-routes/introduction) (Next.js serverless functions).
- **Emailing** : [Resend](https://resend.com/) (Notifications transactionnelles).

## 🚀 Installation & Démarrage

### 1. Cloner le projet

```bash
git clone https://github.com/votre-user/R_portfolio.git
cd R_portfolio
```

### 2. Installer les dépendances

```bash
npm install
# ou
yarn
```

### 3. Configuration des Variables d'Environnement

Créez un fichier `.env` (ou `.env.local` pour le dev) à la racine du projet et ajoutez les clés suivantes :

```env
# Configuration Firebase
NEXT_PUBLIC_FIREBASE_API_KEY=votre_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=votre_projet.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=votre_projet_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=votre_bucket.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=votre_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=votre_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=votre_measurement_id

# Google Analytics (Optionnel)
NEXT_PUBLIC_ANALYTICS_ID=votre_ga_id

# Emailing (Resend)
# Nécessaire pour les notifications de newsletter
RESEND_API_KEY=re_votre_cle_resend
```

### 4. Lancer le serveur de développement

```bash
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) pour voir le résultat.

## 📦 Déploiement

Ce projet est optimisé pour un déploiement sur **Vercel**.

1. Poussez votre code sur GitHub.
2. Importez le projet dans Vercel.
3. **Important** : Ajoutez toutes les variables d'environnement ci-dessus dans les réglages du projet sur Vercel ("Settings" > "Environment Variables").

## 👤 Auteur

**Ramadane**  
Développeur Full Stack passionné par l'innovation et les interfaces utilisateurs soignées.

---
*Fait avec ❤️ et beaucoup de café.*
