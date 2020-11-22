/* eslint-disable react-hooks/exhaustive-deps */
import FeedbackCard from "../../components/FeedbackCard";
import { CardsContainer } from "../../globalStyles";
import { useState, useEffect } from "react";
import { usersRequest } from "../../Request/Request";
import { token, user_id } from "../../helpers";
import { useParams, useLocation } from "react-router-dom";

const FeedbacksList = () => {
  const [list, setList] = useState([]);

  const [path, setPath] = useState();

  const { id } = useParams();

  const requestFeedback = async () => {
    console.log(path);
    setList(await usersRequest(token(), path));
  };

  useEffect(() => {
    setPath(id ? `/users/${id}/feedbacks/` : `/users/${user_id()}/feedbacks`);
  }, []);

  useEffect(async () => {
    console.log(path);
    requestFeedback();
  }, [path]);

  return (
    <CardsContainer>
      {list.map((feedback, index) => {
        return <FeedbackCard key={index} feedback={feedback} />;
      })}
    </CardsContainer>
  );
};

export default FeedbacksList;
