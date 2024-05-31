const peliculas = [
  {
    id: 20,
    titulo: "El Padrino",
    año: 1972,
    actores: ["Marlon Brando", "Al Pacino", "James Caan"],
    director: "Francis Ford Coppola",
    genero: ["Drama", "Crimen"],
    descripcion:
      "La película sigue a la poderosa familia mafiosa de los Corleone, liderada por Don Vito Corleone, en el Nueva York de los años 40.",
    imagen:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvfyF0xefWMnAZIYI52MkJmhwh1WRsDT66giZNuZg8sg&s",
    link: "https://www.youtube.com/watch?v=AkUG8wCk5o0",
  },
  {
    id: 2,
    titulo: "Titanic",
    año: 1997,
    actores: ["Leonardo DiCaprio", "Kate Winslet", "Billy Zane"],
    director: "James Cameron",
    genero: ["Drama", "Romance"],
    descripcion:
      "La historia de amor épica entre Jack y Rose a bordo del Titanic, el barco de pasajeros más grande del mundo que se hundió trágicamente en su viaje inaugural.",
    imagen:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvfyF0xefWMnAZIYI52MkJmhwh1WRsDT66giZNuZg8sg&s",
    link: "https://www.youtube.com/watch?v=AkUG8wCk5o0",
  },
  {
    id: 3,
    titulo: "Forrest Gump",
    año: 1994,
    actores: ["Tom Hanks", "Robin Wright", "Gary Sinise"],
    director: "Robert Zemeckis",
    genero: ["Drama", "Comedia"],
    descripcion:
      "La vida de Forrest Gump, un hombre con un coeficiente intelectual por debajo del promedio, que participa en varios eventos importantes de la historia de Estados Unidos.",
    imagen:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvfyF0xefWMnAZIYI52MkJmhwh1WRsDT66giZNuZg8sg&s",
    link: "https://www.youtube.com/watch?v=AkUG8wCk5o0",
  },
  {
    id: 4,
    titulo: "Inception",
    año: 2010,
    actores: ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Ellen Page"],
    director: "Christopher Nolan",
    genero: ["Ciencia ficción", "Aventura", "Acción"],
    descripcion:
      "Un ladrón habilidoso roba secretos valiosos del subconsciente durante el estado de sueño de las personas. Su habilidad le ha costado todo, pero ahora tiene una oportunidad de redención.",
    imagen:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvfyF0xefWMnAZIYI52MkJmhwh1WRsDT66giZNuZg8sg&s",
    link: "https://www.youtube.com/watch?v=AkUG8wCk5o0",
  },
  {
    id: 15,
    titulo: "Matrix",
    año: 1999,
    actores: ["Keanu Reeves", "Laurence Fishburne", "Carrie-Anne Moss"],
    director: "Lana & Lilly Wachowski",
    genero: ["Ciencia ficción", "Acción"],
    descripcion:
      "Un programador descubre la verdad sobre su realidad y su papel en la guerra contra las máquinas que han esclavizado a la humanidad.",
    imagen:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvfyF0xefWMnAZIYI52MkJmhwh1WRsDT66giZNuZg8sg&s",
    link: "https://www.youtube.com/watch?v=AkUG8wCk5o0",
  },
  {
    id: 1,
    titulo: "Interstellar",
    año: 2014,
    actores: ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain"],
    director: "Christopher Nolan",
    genero: ["Ciencia ficción", "Drama"],
    descripcion:
      "Un grupo de exploradores viaja a través de un agujero de gusano en busca de un nuevo hogar para la humanidad, mientras luchan por comprender el tiempo y el espacio en su viaje.",
    imagen:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvfyF0xefWMnAZIYI52MkJmhwh1WRsDT66giZNuZg8sg&s",
    link: "https://www.youtube.com/watch?v=AkUG8wCk5o0",
  },
  {
    id: 30,
    titulo: "El club de la pelea",
    año: 1999,
    actores: ["Brad Pitt", "Edward Norton", "Helena Bonham Carter"],
    director: "David Fincher",
    genero: ["Drama", "Thriller"],
    descripcion:
      "Un hombre insomne y un vendedor de jabón descontento forman un club de lucha clandestino que se convierte en algo mucho más grande de lo que esperaban.",
    imagen:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvfyF0xefWMnAZIYI52MkJmhwh1WRsDT66giZNuZg8sg&s",
    link: "https://www.youtube.com/watch?v=AkUG8wCk5o0",
  },
  {
    id: 24,
    titulo: "El Resplandor",
    año: 1980,
    actores: ["Jack Nicholson", "Shelley Duvall", "Danny Lloyd"],
    director: "Stanley Kubrick",
    genero: ["Terror", "Drama"],
    descripcion:
      "Un escritor y su familia se convierten en los cuidadores de un hotel aislado, pero la presencia de fuerzas malignas comienza a afectar la cordura del escritor.",
    imagen:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvfyF0xefWMnAZIYI52MkJmhwh1WRsDT66giZNuZg8sg&s",
    link: "https://www.youtube.com/watch?v=AkUG8wCk5o0",
  },
  {
    id: 28,
    titulo: "Pulp Fiction",
    año: 1994,
    actores: ["John Travolta", "Uma Thurman", "Samuel L. Jackson"],
    director: "Quentin Tarantino",
    genero: ["Drama", "Crimen"],
    descripcion:
      "Las vidas entrelazadas de dos gángsters, un boxeador, un matón y la esposa de un matón en una serie de historias violentas y cómicas.",
    imagen:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvfyF0xefWMnAZIYI52MkJmhwh1WRsDT66giZNuZg8sg&s",
    link: "https://www.youtube.com/watch?v=AkUG8wCk5o0",
  },
  {
    id: 25,
    titulo: "El señor de los anillos: La comunidad del anillo",
    año: 2001,
    actores: ["Elijah Wood", "Ian McKellen", "Orlando Bloom"],
    director: "Peter Jackson",
    genero: ["Fantasía", "Aventura"],
    descripcion:
      "Un hobbit llamado Frodo recibe un anillo que le otorga un gran poder, pero que también atrae la atención de Sauron, el Señor Oscuro.",
    imagen:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvfyF0xefWMnAZIYI52MkJmhwh1WRsDT66giZNuZg8sg&s",
    link: "https://www.youtube.com/watch?v=AkUG8wCk5o0",
  },
  {
    id: 11,
    titulo: "El rey león",
    año: 1994,
    actores: ["Matthew Broderick", "Jeremy Irons", "James Earl Jones"],
    director: "Roger Allers, Rob Minkoff",
    genero: ["Animación", "Aventura", "Drama"],
    descripcion:
      "Simba, un joven león destinado a ser rey, es injustamente acusado de la muerte de su padre y se exilia, solo para regresar y reclamar lo que es suyo.",
    imagen:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvfyF0xefWMnAZIYI52MkJmhwh1WRsDT66giZNuZg8sg&s",
    link: "https://www.youtube.com/watch?v=AkUG8wCk5o0",
  },
  {
    id: 8,
    titulo: "El caballero de la noche",
    año: 2008,
    actores: ["Christian Bale", "Heath Ledger", "Aaron Eckhart"],
    director: "Christopher Nolan",
    genero: ["Acción", "Crimen", "Drama"],
    descripcion:
      "Batman, Gordon y Harvey Dent están en la cúspide de llevar el crimen organizado de Gotham City a su fin, pero un nuevo villano, el Joker, amenaza con sumir la ciudad en el caos.",
    imagen:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvfyF0xefWMnAZIYI52MkJmhwh1WRsDT66giZNuZg8sg&s",
    link: "https://www.youtube.com/watch?v=AkUG8wCk5o0",
  },
  {
    id: 15,
    titulo: "El exorcista",
    año: 1973,
    actores: ["Ellen Burstyn", "Max von Sydow", "Linda Blair"],
    director: "William Friedkin",
    genero: ["Terror"],
    descripcion:
      "Una actriz nota un comportamiento inquietante en su hija y busca la ayuda de dos sacerdotes para salvarla de una posesión demoníaca.",
    imagen:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvfyF0xefWMnAZIYI52MkJmhwh1WRsDT66giZNuZg8sg&s",
    link: "https://www.youtube.com/watch?v=AkUG8wCk5o0",
  },
  {
    id: 40,
    titulo: "El silencio de los corderos",
    año: 1991,
    actores: ["Jodie Foster", "Anthony Hopkins", "Lawrence A. Bonney"],
    director: "Jonathan Demme",
    genero: ["Drama", "Suspenso", "Crimen"],
    descripcion:
      "Una joven agente del FBI busca la ayuda de un asesino en serie encarcelado y brillante para capturar a otro asesino en serie que está acechando a sus víctimas.",
    imagen:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvfyF0xefWMnAZIYI52MkJmhwh1WRsDT66giZNuZg8sg&s",
    link: "https://www.youtube.com/watch?v=AkUG8wCk5o0",
  },
  {
    id: 44,
    titulo: "Gladiador",
    año: 2000,
    actores: ["Russell Crowe", "Joaquin Phoenix", "Connie Nielsen"],
    director: "Ridley Scott",
    genero: ["Acción", "Drama"],
    descripcion:
      "Un general romano traicionado por el hijo del emperador es sentenciado a muerte y se convierte en gladiador, buscando venganza contra el hombre que lo traicionó.",
    imagen:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvfyF0xefWMnAZIYI52MkJmhwh1WRsDT66giZNuZg8sg&s",
    link: "https://www.youtube.com/watch?v=AkUG8wCk5o0",
  },
  {
    id: 48,
    titulo: "Forest Gump",
    año: 1994,
    actores: ["Tom Hanks", "Robin Wright", "Gary Sinise"],
    director: "Robert Zemeckis",
    genero: ["Drama", "Romance"],
    descripcion:
      "La vida de Forrest Gump, un hombre con un coeficiente intelectual por debajo del promedio, que participa en varios eventos importantes de la historia de Estados Unidos.",
    imagen:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvfyF0xefWMnAZIYI52MkJmhwh1WRsDT66giZNuZg8sg&s",
    link: "https://www.youtube.com/watch?v=AkUG8wCk5o0",
  },
];

export default peliculas;
