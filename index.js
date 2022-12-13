const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const UserModel = require("./models/User.Schema");
const app = express();
const PORT=process.env.PORT||8080
app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.send("<h1>Hello world</h1>");
});
app.post("/signup", async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    const user = new UserModel({ fullName, email, password });
    await user.save();
    res.status(200).send("Sign Up successfully");
  } catch (e) {
    res.status(404).send("Email already");
  }
});
//mongodb+srv://sharun:<password>@atlascluster.rujptme.mongodb.net/?retryWrites=true&w=majority
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const Login = await UserModel.findOne({ email });
  if (!Login) {
    return res.status(404).send("Invalid user");
  } else {
    res.status(200).send(Login);
  }
});

app.post("/emi", (req, res) => {
  const { principalAmount, intrestRate, time } = req.body;
  let p = principalAmount;
  let r = intrestRate;
  let n = time;
  let EMI = ((p * r * (1 + r)) ^n) / ((1 + r) ^ (n - 1));
  let obj = {
    emi: (EMI).toFixed(2),
    intrest: Math.abs(EMI - EMI * n).toFixed(2),
    total: (EMI * n).toFixed(2),
  };
  res.status(200).send(obj)
});
mongoose
  .connect(
    "mongodb+srv://sharun:123@atlascluster.rujptme.mongodb.net/mock10database?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(PORT, () => {
      console.log("Hello your server is running");
    });
  });
