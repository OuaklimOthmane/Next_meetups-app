import MeetupDetail from "../../components/meetups/MeetupDetail";

const MeetupDetails = () => {
  return (
    <MeetupDetail
      image={
        "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg"
      }
      title={"the first meetup"}
      address={"Some address 10, 12345 Some City"}
      description={"this is the first meetup"}
    />
  );
};

export async function getStaticPaths() {
  return {
    fallback: false,
    paths: [
      {
        params: {
          meetupId: "m1",
        },
      },
      {
        params: {
          meetupId: "m2",
        },
      },
    ],
  };
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;
  console.log(meetupId);

  return {
    props: {
      meetupData: {
        id: meetupId,
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg",
        title: "the first meetup",
        adress: "Some address 10, 12345 Some City",
        decription: "this is the first meetup",
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
