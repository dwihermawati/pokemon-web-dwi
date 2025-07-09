export const capitalize = (name: string): string => {
  return name
    .trim()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

const specialStatNames: Record<string, string> = {
  hp: 'HP',
  'special-attack': 'Sp. Attack',
  'special-defense': 'Sp. Defense',
  attack: 'Attack',
  defense: 'Defense',
  speed: 'Speed',
};

const formatStatName = (name: string): string => {
  return specialStatNames[name.toLowerCase()] || capitalize(name);
};
export default formatStatName;
