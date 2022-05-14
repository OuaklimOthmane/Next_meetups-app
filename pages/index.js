import { Fragment, useEffect, useState } from "react";
import Head from "next/head";
// import { Mongodb } from "mongodb";
import MeetupList from "../components/meetups/MeetupList";

const HomePage = (props) => {
  // const [loadedMeetup, setLoadedMeetup] = useState([]);
  // useEffect(() => {
  //   setLoadedMeetup(MEETUP);
  // }, []);

  return (
    <Fragment>
      <Head>
        <title>React Meetups</title>
        <meta
          name="description"
          content="Browse a huge list of highly active React meetups!"
        />
      </Head>
      <MeetupList meetups={props.loadedMeetup} />
    </Fragment>
  );
};

//! SSG :
export async function getStaticProps(context) {
  //! Getting data from MongoDB cluster database :
  // //* Connect the app with the database :
  // const client = await MongoClient.connect(
  //   "mongodb+srv://Othmane:WGeWqQ29INLlZrLQ@cluster0.oyb2k.mongodb.net/meetups?retryWrites=true&w=majority"
  // );
  // //* Set the database :
  // const db = client.db();

  // //* Create the collection :
  // const meetupsCollection = db.collection("meetups");

  // //* Get the collection and transform't to an array of meetups :
  // const meetups = await meetupsCollection.find().toArray();

  // //* Close the database connection :
  // client.close();

  // const newMeetups = meetups.map((meetup) => {
  //   return {
  //     title: meetup.title,
  //     address: meetup.address,
  //     image: meetup.image,
  //     description: meetup.description,
  //     id: meetup._id.toString(),
  //   };
  // });

  //! Getting data from Firebase realtime database :
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

  console.log(newMeetups);

  return {
    props: {
      loadedMeetup: newMeetups, // will be passed to the page component as props
    },
    revalidate: 1, // the amount in seconds after which a page re-generation can occur (defaults to false or no revalidation).
  };
}
//* The cool thing about this function is that instead of rendering the component function first, we'll execute the "getStaticProps" function get our data and then render that data into the HomPage component.

//! SSR :
//  export async function getServerSideProps(context) {
// const req = context.req;
// const res = context.res;

//   return {
//     props: {
//       loadedMeetup: MEETUP,
//     },
//   };
// }

export default HomePage;

//! How pre-rendering works ?
//? Well, if we wanna send a HTTP request once this page is rendered, we would typically use the "useEffect" hook to control this. then execute "useEffect" here and have an empty dependencies array, probably, which means that this affect function runs whenever the component is first rendered, but never thereafter. And then in here we could fetch our data and we could manage some state for this component with the "useState" hook, which we therefore, also need to import from React. And then here, we could manage our list of meetups. Let's say the "loadedMeetups" and we have our "setLoadedMeetups()" state updating function and in "useEffect", we would send that HTTP request and fetch data. And then once that's done, it would be an asynchronous task, of course, but once that's done, we would call "setLoadedMeetups"  and set the meetups that we fetched from a server has the meetups for this component. And for the moment, let's just simulate that we fetched the meetups. Of course, but let's assume we just fetched them from a server. So some promise completed here and we got back the response. And now I set my dummy meetups as the "loadedmeetups" and in the JSX code, we passed the "loadedmeetups", so our state into "<MeetupList/>". If we do all of that, if we visit the starting page with all the meetups, we don't see any difference there. When I reload, all the meetups are there, right from the start because we never really send a HTTP request. But technically there is a difference because it is important to note that "useEffect" works such that it executes this function AFTER the component function was executed. So that means that, the first time this <homepage> component is rendered, "loadedMeetups" will be an empty array. Then this effect function will execute, it will then update the state and then this component function will execute again because the state changed and it will then re-render the list with the actual data but we'll have two component renders cycles. And in the first render cycle, the first time this component renders, "loadedMeetups" state will be this initial state, this empty array. Now, why am I emphasizing this? Because if we would fetch this from a backend, our users might see a loading spinner briefly, which could or could not be the user experience we wanna offer. But in addition, even here where we don't really send the request and where the response arrives basically instantly even in this case. Because of these two render cycles, we have a problem with search engine optimization (SEO). If I viewed a page source, you will notice that in there, the actual meetup data is missing. I got my unordered list here and this unordered list is empty. So the items which we see on the screen here, these items are missing in the HTML content. In the HTML page we fetched from the server and they are missing because they are only rendered in the second component execution cycle. But the pre-rendered HTML page generated by NextJS automatically does not wait for this second cycle. It always takes the result of the first render cycle and return stat as the pre-rendered HTML code. And there, this data is missing. Now, of course, here, with the dummy data, it's is redundant to do it like this. But as I said, we are basically just simulating that we do fetch this data from a server and then we'll face the problem that NextJS does not wait for that data to be fetched, to then return the fully pre-rendered page, but it returns the result of the first component rendered cycle. And that might be a pretty empty page.

//! Static Site Generation (SSR) :
//? Static Generate means that we Pre-generate a page during build time. This way, all HTML data that make up the content is already loaded into the page during the build time. By build, I mean that the app is pre-rendered during the app’s deployment.
//? "getStaticProps" can only be exported from a page. You cannot export it from non-page files.

//! getStaticProps() :
//? The "getStaticProps" function asynchronously receives our context. After fetching our data from an API, it returns our data as a serializable props object.
//? Static Site generation is optimal for pages such as landing sites that don’t require any handling of data that gets updated regularly. By rendering our HTML at build time we also improve our SEO.
//? The cool thing about this function is that instead of rendering the component function first, we'll execute the "getStaticProps" function, get our data, and then render that data into the component via props.
//? The code within this function is executed during the build process, not on the server especially in the clients, so the code will never reach the machine of the visitors or being executed there.

//! revalidate property :
//? The revalidate property is the amount in seconds after which a page re-generation can occur (defaults to false or no revalidation).

//! Static Generation (SG) :
//? The same as SSG but with no data within the page might been pre-rendered.

//! Incremental Static Generation (ISG) :
//? is a SSG rendering but with adding another key value pair, a key named “revalidate” with its value set to any time in seconds in the returned statement, it tells the page to regenerate at every given second and updates the data even after the build time without deploying it again.

//! getServerSideProps() :
//? When exporting a function called "getServerSideProps" (Server-Side Rendering) from a page, Next.js will pre-render this page on each request using the data returned by "getServerSideProps". This is useful if you want to fetch data that changes often, and have the page update to show the most current data.

//! Inner workings of ""getServerSideProps"" and ""getStaticProps""
//? Essentially, if you need to render a page at build time before making any request, then you’d use "getStaticProps". "getStaticProps" will mark the page to be statically rendered, meaning it won’t re-render until the next build. While this methodology is great for speed and SEO, it isn’t great for dynamic data that changes regularly.
//? If you want to render a page at the time of the request, you can use "getServerSideProps" to render a page on the server before responding to a request. "getServerSideProps" will mark the page to be rendered on each request. In this method, the server will have to build the page every time, which can slow down the entire process. However, this methodology still offers SEO benefits over using plain Vanilla React, which would render your content on the client.(look to the diagram).
//? The code within the function only gets executed on the server and pre-renders the page. However, "GetStaticProps" pre-renders the data at build time, whereas "getServerSideProps" runs at request time.
//? "GetStaticProps" is best suited for data that doesn’t change frequently such as blog posts or news articles because unlike "GetServerSideProps", when data is fetched, it generates a static HTML and stored in a JSON file so it can be cached and immediately available before loading. However, for less static and more dynamic pages, this can be leveraged by using an Incremental Static Generation feature. By simply adding another key value pair, a key named “revalidate” with its value set to any time in seconds in the returned statement, it tells the page to regenerate at every given second and updates the data even after the build time without deploying it again. Unlike "getStaticProps", "getServerSideProps" doesn’t cache any data. It fetches new data on every request which often results in a slower performance but it has access to incoming requests or user’s specific data.
