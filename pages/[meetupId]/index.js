import MeetupDetail from "../../components/meetups/MeetupDetail";

const MeetupDetails = () => {
  return (
    <MeetupDetail
      image={
        "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg"
      }
      title={"the first meetup"}
      adress={"Some address 10, 12345 Some City"}
      decription={"this is the first meetup"}
    />
  );
};

export default MeetupDetails;
