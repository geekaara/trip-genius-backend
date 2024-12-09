const pool = require("../config/db");

const getUserDetails = async (req, res) => {
  const email = req.user; // Assuming `req.user` is set by the authentication middleware

  try {
    // Fetch user details from the user_details table based on the user's email
    const result = await pool.query(
      "SELECT * FROM user_details WHERE user_email = $1",
      [email]
    );

    if (result.rows.length === 0) {
      // If no user details are found
      return res.status(404).json({ message: "User details not found" });
    }

    // Return the fetched user details
    res.json(result.rows[0]);
  } catch (err) {
    // Handle error
    console.error(err);
    res.status(500).json({ message: "Error fetching user details" });
  }
};

// Update user details
const updateUserDetails = async (req, res) => {
  const email = req.user; // Assuming `req.user` is set by the authentication middleware
  const {
    full_name,
    preferred_name,
    phone,
    dob,
    nationality,
    gender,
    country,
    address,
    town_city,
    postcode,
  } = req.body;

  try {
    // Update the user details in the database
    const result = await pool.query(
      "UPDATE user_details SET full_name = $1, preferred_name = $2, phone = $3, dob = $4, nationality = $5, gender = $6, country = $7, address = $8, town_city = $9, postcode = $10 WHERE user_email = $11 RETURNING *",
      [
        full_name,
        preferred_name,
        phone,
        dob,
        nationality,
        gender,
        country,
        address,
        town_city,
        postcode,
        email, // Ensure email is being passed correctly
      ]
    );

    // Return the updated user details
    res.json(result.rows[0]);
  } catch (err) {
    // Handle error
    console.error(err);
    res.status(500).json({ message: "Error updating user details" });
  }
};

module.exports = { getUserDetails, updateUserDetails };
