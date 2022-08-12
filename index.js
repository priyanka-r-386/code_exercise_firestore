const express = require("express");
const app = express();
const admin = require("firebase-admin");
const credentials = require("./key.json");

admin.initializeApp({
  credential: admin.credential.cert(credentials),
});

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", async (req, res) => {
  try {
    const userDetails = {
      Name: req.body.Name,
      Place: req.body.Place,
      Phone: req.body.Phone,
    };
    const response = await db.collection("users").add(userDetails);
    res.send("User is added");
  } catch (error) {
    res.send(error);
  }
});

const db = admin.firestore();

app.get("/data", async (req, res) => {
  try {
    const userRef = db.collection("users");

    const response = await userRef.get();
    let resData = [];
    response.forEach((doc) => {
      resData.push(doc.data());
    });
    rand = Math.floor(Math.random() * resData.length);

    res.send(
      `Congratulations ${resData[rand].Name}, You have been selected as part of the Customer Rewards and Web Loyalty program and you are entitled to receive the following gift.`
    );
  } catch (error) {
    res.send(error);
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`listening to app on ${PORT}`);
});
