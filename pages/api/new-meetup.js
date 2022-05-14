// "api/new-meetup"
import { MongoClient } from "mongodb";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const data = req.body;
    // const data = JSON.parse(req.body);
    // const { image, title, address, description } = data;

    //! Using MongoDB cluster database :
    // //* Connect the app with the database :
    // const client = await MongoClient.connect(
    //   "mongodb+srv://Othmane:WGeWqQ29INLlZrLQ@cluster0.oyb2k.mongodb.net/meetups?retryWrites=true&w=majority"
    // );

    // //* Set the database :
    // const db = client.db();

    // //* Create the collection :
    // const meetupsCollection = db.collection("meetups");

    // //* insert the document(data) in the collection :
    // const result = await meetupsCollection.insertOne(data);
    // console.log(result);

    // //* Close the database connection :
    // client.close();

    //! Using Firebase realtime database :
    const response = await fetch(
      "https://next-meetups-app-default-rtdb.firebaseio.com/meetup.json",
      {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const result = await response.json();
    console.log(result);

    //* Sending a response once we getting the request :
    res.status(201).json({ message: "Meetup inserted !!" });
  }
};

export default handler;

//! API routes :
//? "API routes" are a special routes, special pages, if you wanna call it like this which don't return HTML code, but which are instead about accepting incoming HTTP requests, also "post" "patch", "put" "delete" requests, whatever you need with JSON data attached to them and which then might do whatever you need to do.
//? API routes provide a solution to build your API with Next.js.
//? Any file inside the folder "pages/api" is mapped to "/api/*" and will be treated as an API endpoint instead of a page. They are server-side only bundles and won't increase your client-side bundle size.
