import { MongoClient } from "mongodb";

const url = process.env.MONGODB_ALASKACLAVE;
const client = new MongoClient(url);

export default async function handler(req, res) {
  let body;

  try {
    body = JSON.parse(req.body);
  } catch (error) {
    res.status(400).send("Body is not a valid JSON string");
    return;
  }

  if (!body.name) {
    res.status(400).send("No name in request body");
    return;
  }
  if (!body.email) {
    res.status(400).send("No email in request body");
    return;
  }
  if (!body.phone) {
    res.status(400).send("No phone number in request body");
    return;
  }
  if (!body.cart) {
    res.status(400).send("No cart in request body");
    return;
  }

  try {
    const db = client.db("shop");
    const collection = db.collection("preorders");

    await client.connect();
    await collection.insertOne(body);
  } catch (error) {
    console.log(error);
    res.status(400).send("Error writing to database")
  }

  res.status(200).send();
}