export interface RescueGroupsAnimal {
  id: string;
  attributes: {
    name: string;
    descriptionText?: string;
    sex?: string;
    ageGroup?: string;
    sizeGroup?: string;
    breedPrimary?: string;
    type?: string;
    speciesString?: string;
    pictureThumbnailUrl?: string;
    distance?: number;
  };
  relationships?: {
    org?: {
      data: { id: string; type: string };
    };
    pictures?: {
      data: { id: string; type: string }[];
    };
  };
}

const API_BASE_URL = 'https://api.rescuegroups.org/v5/public';

export async function fetchAnimalsFromRescueGroups(zipCode?: string, radius: number = 50, limit: number = 25, species?: string) {
  const apiKey = process.env.API_RESCUE_GROUPS;

  if (!apiKey) {
    console.error('Missing API_RESCUE_GROUPS in environment variables');
    return [];
  }

  try {
    const payloadData: any = { limit };
    if (zipCode) {
      payloadData.filterRadius = {
        postalcode: zipCode,
        miles: radius,
      };
    }
    
    if (species) {
      payloadData.filters = [
        {
          fieldName: "species.singular",
          operation: "equals",
          criteria: species,
        }
      ];
    }

    const response = await fetch(`${API_BASE_URL}/animals/search/available/`, {
      method: 'POST',
      headers: {
        'Authorization': apiKey,
        'Content-Type': 'application/vnd.api+json',
      },
      body: JSON.stringify({
        data: payloadData,
        include: ['species']
      }),
    });

    if (!response.ok) {
      throw new Error(`RescueGroups API error: ${response.statusText}`);
    }

    const json = await response.json();
    
    // Map species from included data into attributes
    if (json.data && Array.isArray(json.data) && json.included) {
      const speciesMap = new Map();
      json.included.forEach((inc: any) => {
        if (inc.type === 'species' && inc.attributes?.singular) {
          speciesMap.set(inc.id, inc.attributes.singular);
        }
      });

      json.data.forEach((animal: any) => {
        const speciesId = animal.relationships?.species?.data?.[0]?.id;
        if (speciesId && speciesMap.has(speciesId)) {
          animal.attributes = animal.attributes || {};
          animal.attributes.speciesString = speciesMap.get(speciesId);
        }
      });
    }

    return json.data as RescueGroupsAnimal[];
  } catch (error) {
    console.error('Error fetching from RescueGroups:', error);
    return [];
  }
}
