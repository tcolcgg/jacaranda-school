export interface Riddle {
  id: number;
  question: string;
  answer: string;
  hint?: string;
}

export const riddles: Riddle[] = [
  {
    id: 1,
    question: 'Blanca por dentro, verde por fuera. Si quieres que te lo diga, espera.',
    answer: 'La pera',
    hint: 'Es una fruta',
  },
  {
    id: 2,
    question: 'Tengo agujas y no sé coser, tengo números y no sé leer.',
    answer: 'El reloj',
    hint: 'Te dice la hora',
  },
  {
    id: 3,
    question: 'Oro parece, plata no es. ¿Qué es?',
    answer: 'El plátano',
    hint: 'Es una fruta amarilla',
  },
  {
    id: 4,
    question: 'Soy redonda como el mundo, al morir me vuelvo frita.',
    answer: 'La patata',
    hint: 'Crece bajo tierra',
  },
  {
    id: 5,
    question: 'Vuelo sin alas, silbo sin boca. Azoto sin manos y tú no me tocas.',
    answer: 'El viento',
    hint: 'Está en el cielo',
  },
  {
    id: 6,
    question: 'Tiene ojos y no ve, tiene agua pero no la bebe.',
    answer: 'El coco',
    hint: 'Es una fruta tropical',
  },
  {
    id: 7,
    question: 'En la mañana me levanto, en la noche me acuesto. Doy calor y alegría, ¿sabes quién soy?',
    answer: 'El sol',
    hint: 'Está en el cielo',
  },
  {
    id: 8,
    question: 'Tengo patas y no ando, soy madera y no soy árbol.',
    answer: 'La mesa',
    hint: 'Es un mueble',
  },
  {
    id: 9,
    question: 'Tiene corona y no es rey, tiene escamas y no es pez.',
    answer: 'La piña',
    hint: 'Es una fruta tropical',
  },
  {
    id: 10,
    question: 'Salgo de la sala, voy a la cocina, meneando la cola como una gallina.',
    answer: 'La escoba',
    hint: 'Se usa para limpiar',
  },
  {
    id: 11,
    question: 'Choco entre amigos, late mi corazón. El que no sepa mi nombre es un gran... ¿qué?',
    answer: 'Chocolate',
    hint: 'Es dulce y marrón',
  },
  {
    id: 12,
    question: 'Soy roja como un rubí, y llevo pintas negras en mí. Vuelo de flor en flor y todos me quieren.',
    answer: 'La mariquita',
    hint: 'Es un insecto pequeño',
  },
];
