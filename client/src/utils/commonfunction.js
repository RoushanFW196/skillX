export const fetchUserInfo = async (userId) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/user/profile/${userId}`,
      { method: "GET", credentials: "include" },
    );
    const respdata = await response.json();
    console.log("User info response:", respdata);
    if (response.ok) {
      return respdata.data; // Return user info for local use if needed
    } else {
      console.error("Failed to fetch user info");
      throw new Error(respdata.message || "Failed to fetch user info");
    }
  } catch (error) {
    console.error("Error fetching user info:", error);
  }
};
