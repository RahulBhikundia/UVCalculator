import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import info from "./info.js";
import { loadData, saveData } from "./cards.js";

const app = express();

const port = 3000;
const API_URL = "https://api.openuv.io/api/v1/uv?";

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

const config = {
  headers: {
    "x-access-token": "openuv-4cc78rlz10040t-io",
    "Content-Type": "application/json",
  },
};

app.get("/", (req, res) => {
  res.render("index.ejs", { currentPage: "home" });
});

app.post("/submit", async (req, res) => {
  const request = req.body;
  const Time = new Date(`${request.date}T${request.time}`).toISOString();
  var result;

  try {
    const geoRes = await axios.get(
      `https://api.opentopodata.org/v1/etopo1?locations=${request.latitude},${request.longitude}`
    );
    const altitude = geoRes.data.results[0].elevation;

    try {
      result = await axios.get(
        API_URL +
          `lat=${request.latitude}&lng=${request.longitude}&alt=${altitude}&dt=${Time}`,
        config
      );
    } catch (error) {
      console.log(error.status(500));
    }
  } catch (error) {
    console.log(error);
  }

  const response = info(result.data, request);
  const data = loadData();
  data.push(response);
  saveData(data);
  res.render("info.ejs", { currentPage: "home", content: response });
});

app.get("/history", (req, res) => {
  const data = loadData().map((user, pos) => ({ ...user, pos }));
  res.render("history.ejs", { currentPage: "history", users: data });
});

app.get("/:number", (req, res) => {
  const { number } = req.params;

  const data = loadData().map((user, pos) => ({ ...user, pos }));

  res.render("history.ejs", {
    currentPage: "history",
    users: data,
    num: number,
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});