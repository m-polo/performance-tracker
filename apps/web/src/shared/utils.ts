import { Athlete } from "./interfaces";

export default function capitalizeText(text: string) {
  text = text.replace("_", " ");
  return text[0]?.toUpperCase() + text.substr(1).toLowerCase();
}

export const groupItemsInPairs = (
  athletes: Athlete[]
): [Athlete, Athlete | null][] => {
  const grouped: [Athlete, Athlete | null][] = [];

  for (let i = 0; i < athletes.length; i += 2) {
    const firstItem = athletes[i];
    const secondItem = athletes[i + 1] || null;
    grouped.push([firstItem, secondItem]);
  }

  return grouped;
};

export const authHeader = (token: string) => ({
  headers: { Authorization: `Bearer ${token}` },
});