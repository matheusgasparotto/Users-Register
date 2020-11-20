import { Input, InputLabel, Button, Paper } from "@material-ui/core";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FeedbackData } from "../../data/FeedbackData";
import { sendFeedback } from "../../Request/Request";

const FormFeedbacks = () => {
  const { register, handleSubmit, errors } = useForm();

  const user_id = window.localStorage.getItem("user_id");
  const token = window.localStorage.getItem("auth_token");

  const [message, setMessage] = useState();

  const handleFeedback = async (body) => {
    const data = { feedback: body };
    let result;
    try {
      result = await sendFeedback({
        token: token,
        data: data,
        user_id: user_id,
      });
      setMessage("Feedback cadastrado com sucesso");
    } catch (error) {
      setMessage("Mensagem não cadastrada, tente novamente mais tarde");
    }
  };

  return (
    <Paper>
      <form onSubmit={handleSubmit(handleFeedback)}>
        {FeedbackData.map((input, index) => {
          const { name, label, type } = input;
          return (
            <div key={index}>
              <InputLabel className="inputsLabel" htmlFor={name}>
                {label}
              </InputLabel>
              <Input
                name={name}
                inputRef={register}
                type={type}
                id={name}
                error={!!errors.name}
              />
            </div>
          );
        })}
        <Button
          variant="contained"
          type="submit"
          color="primary"
          className="requestButton"
        >
          Enviar
        </Button>
      </form>
    </Paper>
  );
};

export default FormFeedbacks;
