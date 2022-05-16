import Head from "next/head";
import { Fragment } from "react";
// import { MongoClient, ObjectId } from "mongodb";
import MeetupDetail from "../../components/meetups/MeetupDetail";

const MeetupDetails = (props) => {
  return (
    <Fragment>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta name="description" content={props.meetupData.description} />
      </Head>

      <MeetupDetail
        image={props.meetupData.image}
        title={props.meetupData.title}
        address={props.meetupData.address}
        description={props.meetupData.description}
      />
    </Fragment>
  );
};

export async function getStaticPaths() {
  //! Setting Ids using data from MongoDb :
  // const client = await MongoClient.connect(
  //   "mongodb+srv://maximilian:arlAapzPqFyo4xUk@cluster0.ntrwp.mongodb.net/meetups?retryWrites=true&w=majority"
  // );
  // const db = client.db();

  // const meetupsCollection = db.collection("meetups");

  // const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

  // client.close();

  //! Setting Ids using data from Firebase :
  const response = await fetch(
    "https://next-meetups-app-default-rtdb.firebaseio.com/meetup.json"
  );
  const data = await response.json();

  const newMeetups = [];
  for (const key in data) {
    const meetup = {
      id: key,
      ...data[key],
    };
    newMeetups.push(meetup);
  }

  return {
    fallback: "blocking",
    // paths: meetups.map((meetup) => ({
    //   params: { meetupId: meetup._id.toString() },
    // })),
    paths: newMeetups.map((meetup) => {
      return { params: { meetupId: meetup.id } };
    }),
  };
}

export async function getStaticProps(context) {
  //* fetch data for a single meetup

  const meetupId = context.params.meetupId;

  //! Getting meetup details from MongoDb :
  // const client = await MongoClient.connect(
  //   "mongodb+srv://maximilian:arlAapzPqFyo4xUk@cluster0.ntrwp.mongodb.net/meetups?retryWrites=true&w=majority"
  // );
  // const db = client.db();

  // const meetupsCollection = db.collection("meetups");

  // const selectedMeetup = await meetupsCollection.findOne({
  //   _id: ObjectId(meetupId),
  // });

  // client.close();

  //! Getting meetup details from Firebase :
  const response = await fetch(
    "https://next-meetups-app-default-rtdb.firebaseio.com/meetup.json"
  );
  const data = await response.json();

  const newMeetups = [];
  for (const key in data) {
    const meetup = {
      id: key,
      ...data[key],
    };
    newMeetups.push(meetup);
  }
  const selectedMeetup = newMeetups.find((meetup) => meetup.id === meetupId);
  console.log(selectedMeetup);

  return {
    props: {
      meetupData: {
        id: selectedMeetup.id,
        title: selectedMeetup.title,
        address: selectedMeetup.address,
        image: selectedMeetup.image,
        description: selectedMeetup.description,
      },
    },
  };
}

export default MeetupDetails;

//! params :
//? "params" is a parameter object that can be destructured from the "context" prop. It gives you access to the route, but in the "getStaticProps" function it only works for a default route. In order for it to work for a dynamic route, the "getStaticPaths" function has to come into play. It must return an object which includes two keys, a ‘paths’ key with an array that gives pre-generated route instances to be pre-rendered ahead of time and a ‘fallback’ key that can be set to false if all possible route instances are provided. The other option is to set the ""fallback"" to true if not all possible page routes are provided, which means it can have a "fallback" to render rarely visited pages. In case of the latter, a "fallback" state is needed (as in the condition below) so it can show a loading indicator before the data is fetched. Alternatively, you can set the "fallback" to a value in a string “blocking”, in this case your app will wait until the page gets fully generated before rendering data without any loading signs.

//* Problem : We can pre-render a page in Next.js throughout the build process. We create all of the HTML code and data ahead of time. The server then caches the information. This method works great for static pathways; however, it fails when rendering pages for dynamic paths. It's also logical. Let's pretend there's a blog with several articles on it. We defined dynamic paths like "[blogId].js" in next.js. This path is valid for blog ids 1, 2, 3, 4, and so on, as we already know. Next.js has no method of knowing how many pages it needs to render. that's why we use "getStaticPaths()" to accomplish this, further exploring in this blog.

//! getStaticPaths() :
//? The "getStaticPaths()" function should return an object with the following required properties:
// "paths" : The paths key determines which paths will be pre-rendered.
// "fallback" : ==> if it is false, then any paths not returned by "getStaticPaths" will result in a 404 page.  it will then build only the paths returned by "getStaticPaths". ==> The paths returned from "getStaticPaths" will be rendered to HTML at build time by "getStaticProps".
