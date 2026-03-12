export interface EnglishWord {
  word: string;
  translation: string;
  emoji: string;
}

export interface ColorItem {
  nameEn: string;
  nameEs: string;
  hex: string;
}

export const englishWords: EnglishWord[] = [
  { word: 'cat', translation: 'gato', emoji: '🐱' },
  { word: 'dog', translation: 'perro', emoji: '🐶' },
  { word: 'bird', translation: 'pájaro', emoji: '🐦' },
  { word: 'fish', translation: 'pez', emoji: '🐟' },
  { word: 'rabbit', translation: 'conejo', emoji: '🐰' },
  { word: 'cow', translation: 'vaca', emoji: '🐮' },
  { word: 'horse', translation: 'caballo', emoji: '🐴' },
  { word: 'duck', translation: 'pato', emoji: '🦆' },
  { word: 'apple', translation: 'manzana', emoji: '🍎' },
  { word: 'banana', translation: 'plátano', emoji: '🍌' },
  { word: 'orange', translation: 'naranja', emoji: '🍊' },
  { word: 'strawberry', translation: 'fresa', emoji: '🍓' },
  { word: 'grapes', translation: 'uvas', emoji: '🍇' },
  { word: 'sun', translation: 'sol', emoji: '☀️' },
  { word: 'moon', translation: 'luna', emoji: '🌙' },
  { word: 'star', translation: 'estrella', emoji: '⭐' },
  { word: 'house', translation: 'casa', emoji: '🏠' },
  { word: 'book', translation: 'libro', emoji: '📚' },
  { word: 'ball', translation: 'pelota', emoji: '⚽' },
  { word: 'tree', translation: 'árbol', emoji: '🌳' },
];

export const colors: ColorItem[] = [
  { nameEn: 'red', nameEs: 'rojo', hex: '#ef4444' },
  { nameEn: 'blue', nameEs: 'azul', hex: '#3b82f6' },
  { nameEn: 'green', nameEs: 'verde', hex: '#22c55e' },
  { nameEn: 'yellow', nameEs: 'amarillo', hex: '#eab308' },
  { nameEn: 'orange', nameEs: 'naranja', hex: '#f97316' },
  { nameEn: 'purple', nameEs: 'morado', hex: '#a855f7' },
  { nameEn: 'pink', nameEs: 'rosa', hex: '#ec4899' },
  { nameEn: 'white', nameEs: 'blanco', hex: '#f8fafc' },
  { nameEn: 'black', nameEs: 'negro', hex: '#1e293b' },
  { nameEn: 'brown', nameEs: 'marrón', hex: '#92400e' },
];

export function getRandomNumber(): number {
  return Math.floor(Math.random() * 100) + 1;
}

export const syllables: string[] = [
  'BA', 'BE', 'BI', 'BO', 'BU',
  'CA', 'CE', 'CI', 'CO', 'CU',
  'CHA', 'CHE', 'CHI', 'CHO', 'CHU',
  'DA', 'DE', 'DI', 'DO', 'DU',
  'FA', 'FE', 'FI', 'FO', 'FU',
  'GA', 'GE', 'GI', 'GO', 'GU',
  'HA', 'HE', 'HI', 'HO', 'HU',
  'JA', 'JE', 'JI', 'JO', 'JU',
  'LA', 'LE', 'LI', 'LO', 'LU',
  'LLA', 'LLE', 'LLI', 'LLO', 'LLU',
  'MA', 'ME', 'MI', 'MO', 'MU',
  'NA', 'NE', 'NI', 'NO', 'NU',
  'ÑA', 'ÑE', 'ÑI', 'ÑO', 'ÑU',
  'PA', 'PE', 'PI', 'PO', 'PU',
  'QUE', 'QUI',
  'RA', 'RE', 'RI', 'RO', 'RU',
  'RRA', 'RRE', 'RRI', 'RRO', 'RRU',
  'SA', 'SE', 'SI', 'SO', 'SU',
  'TA', 'TE', 'TI', 'TO', 'TU',
  'VA', 'VE', 'VI', 'VO', 'VU',
  'YA', 'YE', 'YI', 'YO', 'YU',
  'ZA', 'ZE', 'ZI', 'ZO', 'ZU',
];
