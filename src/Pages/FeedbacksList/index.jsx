import FeedbackCard from "../../components/FeedbackCard";
import { CardsContainer } from "../../globalStyles";
import { useState, useEffect } from "react";
import { feedbackRequest } from "../../Request/Request";
import { token, user_id } from "../../helpers";

const FeedbacksList = () => {
  const [list, setList] = useState([]);

  const requestFeedback = async () => {
    setList(await feedbackRequest(token, user_id));
    console.log(list);
  };

  useEffect(() => {
    requestFeedback();
  }, []);

  return (
    <CardsContainer>
      {list.map((feedback, index) => (
        <FeedbackCard key={index} feedback={feedback} />
      ))}
    </CardsContainer>
  );
};

export default FeedbacksList;
