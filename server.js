// server.js
const app = require("./app");
require("./config/db"); // This will automatically connect to the database

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
