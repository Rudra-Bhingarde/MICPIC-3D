import axios from "axios";

const BASE_URL = "http://localhost:5000"; // Backend URL

// Function to fetch max preference objects from API
export const getMaxPreferenceObjs = async (table, objy, value) => {
  try {
    const response = await axios.get(`${BASE_URL}/max-preference/${table}/${objy}/${value}`);
    console.log(`Response for table ${table}, objy ${objy}, value ${value}:`, response.data); // Log response data
    return response.data;
  } catch (error) {
    console.error("Error fetching max preference objects:", error);
    return [];
  }
};

// Function to concatenate object names for table lookup
function concatonator(objA, objB) {
  return parseInt(objA[3]) < parseInt(objB[3]) ? `${objA}${objB}` : `${objB}${objA}`;
}

// Function to get a random index in a range
const getRandomInRange = (min, max) => Math.floor(Math.random() * (max - min)) + min;

// Main function to find the best combination
export const findBestCombo = async (objstr, selected) => {
  let selectedKeys = Array.isArray(selected) ? selected.map(obj => obj.objname) : [];
  console.log("Selected keys (objnames):", selectedKeys); // Log selected object names

  let finders = objstr.filter(obj => !selectedKeys.includes(obj)); // Find remaining objects to select
  console.log("Objects to find:", finders); // Log the objects left to find

  let newSelections = [];

  for (let i = 0; i < finders.length; i++) {
    let bestMatches = [];
    let highestPreference = -Infinity;

    for (let j = 0; j < selected.length; j++) {
      let selectedKey = selected[j].objname;
      let selectedValue = selected[j].colorId;

      if (!selectedValue) {
        console.warn(`Skipping ${selectedKey} due to undefined value`);
        continue;
      }

      let tableName = concatonator(finders[i], selectedKey);
      console.log(`Looking for best match for table: ${tableName}, obj: ${selectedKey}, value: ${selectedValue}`);

      try {
        let potentialMatches = await getMaxPreferenceObjs(tableName, selectedKey, selectedValue);

        if (potentialMatches && potentialMatches.length > 0) {
          for (let match of potentialMatches) {
            if (match[finders[i]] !== undefined) {
              if (match.preference > highestPreference) {
                highestPreference = match.preference;
                bestMatches = [{ [finders[i]]: match[finders[i]], preference: match.preference }];
              } else if (match.preference === highestPreference) {
                bestMatches.push({ [finders[i]]: match[finders[i]], preference: match.preference });
              }
            } else {
              console.warn(`Undefined value found for ${finders[i]} in match object:`, match);
            }
          }
        } else {
          console.warn(`No matches found for table ${tableName}, obj: ${selectedKey}`);
        }
      } catch (error) {
        console.error(`Error fetching preference data for ${tableName}:`, error);
      }
    }

    if (bestMatches.length > 0) {
      let randomIndex = getRandomInRange(0, bestMatches.length);
      newSelections.push(bestMatches[randomIndex]);
    }
  }

  console.log("Best combination found:", newSelections); // Log the final best combination
  return newSelections;
};
