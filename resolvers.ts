import { getCharacterData, getHouseData } from "./utils.ts";
import { Character, House } from "./types.ts";

export const resolvers = {
  Query: {
    getCharacter: async (_: unknown, { id }: { id: string }): Promise<Character> => {
      return await getCharacterData(id);
    },

    getCharacters: async (_: unknown, { ids }: { ids: string[] }): Promise<Character[]> => {
      return await Promise.all(ids.map((id) => getCharacterData(id)));
    },
  },

  Character: {
    house: async (parent: Character): Promise<House | null> => {
      if (!parent.house || typeof parent.house !== "string" || parent.house.trim() === "") {
        return null;
      }
      return await getHouseData(parent.house);
    },
  },

  House: {
    characters: (parent: House): Character[] => {
      return parent.characters;
    },
  },
};
