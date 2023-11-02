const express = require("express");
const axios = require("axios");
const app = express();

app.use(express.json());

app.get("/pineValley/doctors/:doctorType", async (req, res) => {
  try {
    const { doctorType } = req.params;
    const { data } = await axios.post(
      "http://localhost:9090/pineValley/doctors",
      {
        doctorType: doctorType,
      }
    );
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).send("Something went wrong");
  }
});

// Start the server on port 9092
app.listen(9092, () => {
  console.log("Server is running on port 9092");
});
