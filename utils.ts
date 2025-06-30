import { Character, House } from "./types.ts";

export const getCharacterData = async(id: string): Promise<Character > => {
  const url = `https://hp-api.onrender.com/api/character/${id}`;
  const response = await fetch(url);
  if (!response.ok) throw new Error("Error fetching data");
  const data = await response.json();
  if (!data || !data.name) throw new Error("Character not found");

  return data;
};


export const getHouseData = async(name: string): Promise<House> => {
    const url = `https://hp-api.onrender.com/api/characters/house/${name}`
    const response = await fetch(url)
    if (!response.ok) throw new Error("Error fetching data");
    return await response.json()
}