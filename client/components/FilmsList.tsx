"use client";

import Films from "./Films";

interface Film {
  id: string;
  title: string;
  imageSrc: string;
  redirectTo: string;
  description?: string;
}

interface FilmsListProps {
  films: Film[];
  className?: string;
}

export default function FilmsList({ films, className = "" }: FilmsListProps) {
  return (
    <div className={`space-y-4 ${className}`}>
      {films.map((film, index) => (
        <Films
          key={film.id}
          imageSide={index % 2 === 0 ? "left" : "right"} // Alternating sides
          title={film.title}
          imageSrc={film.imageSrc}
          redirectTo={film.redirectTo}
          description={film.description}
        />
      ))}
    </div>
  );
}
