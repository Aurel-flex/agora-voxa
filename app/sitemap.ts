import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  // Remplace par le nom de domaine que tu auras choisi !
  const baseUrl = 'https://agoravoxa.app'; 

  return [
    {
      url: `${baseUrl}`, // Page d'accueil
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0, // La page la plus importante
    },
    {
      url: `${baseUrl}/tarifs`, // Page des tarifs
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/inscription`, // Page d'inscription
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/connexion`, // Page de connexion
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    // 💡 Astuce : Tu pourras ajouter ici tes futures pages de contenu public
    // comme /exercices-eloquence, /blog, etc.
  ];
}