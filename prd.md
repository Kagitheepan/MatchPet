1. Vision du ProduitUne application mobile-first de mise en relation intelligente entre humains et animaux. L'expérience repose sur deux piliers : la compatibilité de mode de vie (via un questionnaire) et la proximité géographique (via la localisation des refuges), pour favoriser l'adoption et le bénévolat de proximité (promenades).

2. Piliers StratégiquesPertinence : Aucun animal n'est affiché s'il ne correspond pas au profil de l'utilisateur.Proximité : Priorisation des animaux locaux pour faciliter les rencontres réelles.Efficacité : Réduction du travail administratif des refuges grâce à la pré-qualification.3. Spécifications Fonctionnelles (Features)3.1. Onboarding & Profilage (Moteur de Matching)Formulaire Obligatoire : Questionnaire interactif (type d'habitat, présence d'enfants/animaux, temps libre).Algorithme de Filtrage : Croisement des réponses avec les caractéristiques des animaux issus de l'API RescueGroups.org.Accès Conditionnel : Le flux de "Swipe" ne se débloque qu'après validation du profil.3.2. Recherche Géographique (Localisation)Sélecteur de Zone : Rayon de recherche ajustable (ex: 5 km, 20 km, 50 km) ou par département/ville.Géolocalisation Morédbile : Option "Autour de moi" pour identifier les refuges et animaux à proximité immédiate.Cartographie : Visualisation des refuges partenaires sur une carte interactive (intégration via Mapbox ou Google Maps).
3.3. Expérience "Swipe" Mobile-FirstCartes Profils : Affichage des animaux compatibles ET proches géographiquement.Tags Visuels : Distance en km, type d'interaction (Adoption / Promenade).Actions Rapides : Swipe droite (Like), Swipe gauche (Suivant), Tap (Détails/Photos).
4. Architecture Logicielle (Stack Technique)ComposantTechnologieRôle & Performance MobileFrontendNext.js (Tailwind CSS)PWA : Responsive, fluide, optimisée pour le SEO (SSR).BackendNode.js Traitement des requêtes de filtrage complexe et géolocalisation.BBDDMySQL Indexation spatiale pour les recherches par coordonnées/CP.HébergementPlanetHosterServeur LiteSpeed : Latence minimale pour les recherches locales.DonnéesRescueGroups APISource de données sécurisée et mise à jour.5. Modèle de Données (Schéma Prisma)Extrait de codemodel UserProfile {
  id              Int      @id @default(autoincrement())
  location        String   // Code postal ou Ville
  latitude        Float?
  longitude       Float?
  searchRadius    Int      @default(30) // Rayon en KM
  hasGarden       Boolean
  hasChildren     Boolean
  // ... autres critères de matching
}

model Refuge {
  id              Int      @id @default(autoincrement())
  name            String
  address         String
  latitude        Float
  longitude       Float
  animals         Animal[]
}
6. Exigences Non-Fonctionnelles6.1. Performance & RéseauLazy Loading : Chargement progressif des images pour économiser le forfait data mobile.Mise en cache : Stockage local des résultats de recherche pour une navigation fluide.6.2. Souveraineté & Sécurité (RGPD)Données Géographiques : Utilisation des coordonnées uniquement pour le calcul de distance, pas de traçage permanent.Hébergement : Serveurs à Paris (PlanetHoster) pour garantir la protection des données personnelles des adoptants.7. Indicateurs de Succès (KPIs)Taux de complétion du formulaire : % d'utilisateurs allant au bout du questionnaire.Distance Moyenne : Distance entre l'adoptant et le refuge pour les "matches".Volume de Promenades : Nombre de réservations effectuées via la géolocalisation.