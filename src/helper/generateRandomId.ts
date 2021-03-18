import adjectives from './adjectives.json';
import nouns from './nouns.json';

function getRandomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min)) + min;
}
export function generateRandomId(): string {
  return `${adjectives[getRandomNumber(0, adjectives.length)]} ${nouns[getRandomNumber(0, nouns.length)]}`;
}
