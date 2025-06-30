// resolvers.ts
import { getCharacterData, getHouseData } from "./utils.ts";
import { Character } from "./types.ts";

export const resolvers = {
  Query: {
    getCharacter: async (_: unknown, { id }: { id: string }): Promise<Character | null> => {
      try {
        const character = await getCharacterData(id);
        return character;
      } catch (error) {
        return null;
      }
    },

    getCharacters: async (_: unknown, { ids }: { ids?: string[] }): Promise<Character[]> => {
      try {
        if (!ids) {
          const response = await fetch("https://hp-api.onrender.com/api/characters");
          if (!response.ok) throw new Error("Error fetching all characters");
          const characters: Character[] = await response.json();
          return characters;
        }

        const characterPromises = ids.map(async (id) => {
          try {
            return await getCharacterData(id);
          } catch {
            return null; 
          }
        });

        const results = await Promise.all(characterPromises);
        return results.filter((c): c is Character => c !== null);
      } catch (error) {
        console.error("Error in getCharacters:", error);
        return [];
      }
    },
  },

  Character: {
    house: async (parent: Character) => {
      if (!parent.house) return null;
      try {
        const houseName = typeof parent.house === "string" ? parent.house : parent.house?.name;
        const houseData = await getHouseData(houseName);
        return {
          name: houseName,
          characters: houseData,
        };
      } catch {
        return null;
      }
    },
  },

  House: {
    characters: async (parent: { name: string }) => {
      try {
        const characters = await getHouseData(parent.name);
        return characters;
      } catch {
        return [];
      }
    },
  },
};
