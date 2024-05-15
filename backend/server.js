require("dotenv").config();
const express = require("express");
const eventRoutes = require("./routes/eventRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use("/api", eventRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
