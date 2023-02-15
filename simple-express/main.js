const dotenv = require("dotenv");
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const app = express();
const port = 3001;

dotenv.config({ path: "../.env" });

app.use(express.json());
app.use(
  cors({
    origin: process.env.VITE_CLIENT_URL,
  })
);

const axiosAPI = axios.create({
  baseURL: process.env.NETZWELT_API,
});

app.get("/territories", async (req, res) => {
  let data = {};
  let statusCode = 200;
  try {
    const response = await axiosAPI.get("/Territories/All");
    data = response.data;
  } catch (e) {
    const { status } = e.response;
    statusCode = status;
  }
  res.status(statusCode).send(data);
});

app.post("/login", async (req, res) => {
  let data = {};
  let statusCode = 200;
  try {
    const response = await axiosAPI.post("/Account/SignIn", req.body);
    data = response.data;
  } catch (e) {
    const { status } = e.response;
    statusCode = status;
  }
  res.status(statusCode).send(data);
});

app.listen(port, () => {
  console.log(`Netzwelt exercise middleman api listening on port ${port}`);
});
