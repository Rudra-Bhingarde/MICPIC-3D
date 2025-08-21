export const fetchData = async (tablename, objx, objxid) => {
    try {
      const response = await fetch(`http://localhost:3000/getdata?tablename=${tablename}&objx=${objx}&objxid=${objxid}`);
      const data = await response.json();
      console.log("Raw fetched data:", data);
      return data;  // Returns the fetched data
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;  // Returns null in case of error
    }
  };

export const updatePreference = async (tablename, objx, objy, objxval, objyval, prefval) => {
    try {
        const response = await fetch(`http://localhost:3000/updateData`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ tablename, objx, objy, objxval, objyval, prefval }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Failed to update preference");
        }

        return data;
    } catch (error) {
        console.error("API Error:", error);
        return { error: error.message };
    }
};

export const updatePreferencestep2 = async (tablename, objx, objy, objxval, objyval, prefval) => {
  try {
      const response = await fetch(`http://localhost:3000/updateDatastep2`, {
          method: "PUT",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify({ tablename, objx, objy, objxval, objyval, prefval }),
      });

      const data = await response.json();

      if (!response.ok) {
          throw new Error(data.error || "Failed to update preference");
      }

      return data;
  } catch (error) {
      console.error("API Error:", error);
      return { error: error.message };
  }
};
