import { useEffect, useState } from "react";
import MeetupList from "../components/meetups/MeetupList";

const MEETUP = [
  {
    id: "m1",
    title: "A First Meetup",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg",
    address: "Some address 5, 12345 Some City",
    description: "This is a first meetup!",
  },
  {
    id: "m2",
    title: "A Second Meetup",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg",
    address: "Some address 10, 12345 Some City",
    description: "This is a second meetup!",
  },
];

const HomePage = () => {
  const [loadedMeetup, setLoadedMeetup] = useState([]);

  useEffect(() => {
    setLoadedMeetup(MEETUP);
  }, []);

  return <MeetupList meetups={loadedMeetup} />;
};

//* The cool thing about this function is that instead of rendering the component function first we'll execute the getStaticProps function get our data and then render that data into the HomPage component.

export default HomePage;

//! How pre-rendering works ?
//? Well, if we wanna send a HTTP request once this page is rendered, we would typically use the "useEffect" hook to control this. then execute "useEffect" here and have an empty dependencies array, probably, which means that this affect function runs whenever the component is first rendered, but never thereafter. And then in here we could fetch our data and we could manage some state for this component with the "useState" hook, which we therefore, also need to import from React. And then here, we could manage our list of meetups. Let's say the "loadedMeetups" and we have our "setLoadedMeetups()" state updating function and in "useEffect", we would send that HTTP request and fetch data. And then once that's done, it would be an asynchronous task, of course, but once that's done, we would call "setLoadedMeetups"  and set the meetups that we fetched from a server has the meetups for this component. And for the moment, let's just simulate that we fetched the meetups. Of course, but let's assume we just fetched them from a server. So some promise completed here and we got back the response. And now I set my dummy meetups as the "loadedmeetups" and in the JSX code, we passed the "loadedmeetups", so our state into "<MeetupList/>". If we do all of that, if we visit the starting page with all the meetups, we don't see any difference there. When I reload, all the meetups are there, right from the start because we never really send a HTTP request. But technically there is a difference because it is important to note that "useEffect" works such that it executes this function AFTER the component function was executed. So that means that, the first time this <homepage> component is rendered, "loadedMeetups" will be an empty array. Then this effect function will execute, it will then update the state and then this component function will execute again because the state changed and it will then re-render the list with the actual data but we'll have two component renders cycles. And in the first render cycle, the first time this component renders, "loadedMeetups" state will be this initial state, this empty array. Now, why am I emphasizing this? Because if we would fetch this from a backend, our users might see a loading spinner briefly, which could or could not be the user experience we wanna offer. But in addition, even here where we don't really send the request and where the response arrives basically instantly even in this case. Because of these two render cycles, we have a problem with search engine optimization (SEO). If I viewed a page source, you will notice that in there, the actual meetup data is missing. I got my unordered list here and this unordered list is empty. So the items which we see on the screen here, these items are missing in the HTML content. In the HTML page we fetched from the server and they are missing because they are only rendered in the second component execution cycle. But the pre-rendered HTML page generated by NextJS automatically does not wait for this second cycle. It always takes the result of the first render cycle and return stat as the pre-rendered HTML code. And there, this data is missing. Now, of course, here, with the dummy data, it's is redundant to do it like this. But as I said, we are basically just simulating that we do fetch this data from a server and then we'll face the problem that NextJS does not wait for that data to be fetched, to then return the fully pre-rendered page, but it returns the result of the first component rendered cycle. And that might be a pretty empty page.
