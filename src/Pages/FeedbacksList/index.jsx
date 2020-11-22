/* eslint-disable react-hooks/exhaustive-deps */
import FeedbackCard from "../../components/FeedbackCard";
import { CardsContainer } from "../../globalStyles";
import { useState, useEffect } from "react";
import { usersRequest } from "../../Request/Request";

import { token, user_id } from "../../helpers";

const FeedbacksList = () => {
  const [list, setList] = useState([]);

  const requestFeedback = async () => {
    const path = `/users/${user_id}/feedbacks`;
    setList(await usersRequest(token, path));
  };

  useEffect(() => {
    requestFeedback();
  }, []);

  return (
    <CardsContainer>
      {list.map((feedback, index) => {
        return <FeedbackCard key={index} feedback={feedback} />;
      })}
    </CardsContainer>
  );
};

export default FeedbacksList;
