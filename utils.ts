import { Character, House } from "./types.ts";

export const getCharacterData = async (id: string): Promise<Character> => {
  const url = `https://hp-api.onrender.com/api/character/${id}`;
  const response = await fetch(url);
  if (!response.ok) throw new Error("Error fetching character data");

  const data = await response.json();

  const character = data[0]; 
  if (!character || !character.name) throw new Error("Invalid character data");

  return character;
};

export const getHouseData = async (name: string): Promise<House> => {
  const url = `https://hp-api.onrender.com/api/characters/house/${name}`;
  const response = await fetch(url);
  if (!response.ok) throw new Error("Error fetching house data");

  const data = await response.json();
  if (!Array.isArray(data)) throw new Error("House data is not an array");

  return {
    name,
    characters: data,
  };
};
