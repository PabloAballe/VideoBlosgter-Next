/**
 *
 * This file contains the the phraseGenerator.ts file
 */

export const phraseGenerator = () => {
  const phrases = [
    "Animales Divertidos",
    "Guías de Videojuegos",
    "Guías Prácticas y Tutoriales",
    "Reseña de Productos",
    "Vídeos de Chismes de Famosos",
    "Vlogs",
    "Vídeos de Comedia / Sketch",
    "Compras Compulsivas / Hauls",
    "Vídeos de Unboxing",
    "Vídeos Educativos,",
  ];

  return phrases[Math.floor(Math.random() * phrases.length)];
};
