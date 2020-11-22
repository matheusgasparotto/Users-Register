import { Input, InputLabel, Button, Paper } from "@material-ui/core";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FeedbackData } from "../../helpers";
import { sendFeedback } from "../../Request/Request";
import { user_id, token } from "../../helpers";
import Rating from "@material-ui/lab/Rating";

const FormFeedbacks = () => {
  const { register, handleSubmit, errors } = useForm();

  const [message, setMessage] = useState();

  const handleFeedback = async (body) => {
    const data = { feedback: { ...body, grade: grade } };
    let result;
    try {
      result = await sendFeedback({
        token: token(),
        data: data,
        user_id: user_id(),
      });
      setMessage("Feedback cadastrado com sucesso");
    } catch (error) {
      setMessage("Mensagem não cadastrada, tente novamente mais tarde");
    }
  };

  const [grade, setGrade] = useState();

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
        <InputLabel className="inputsLabel" htmlFor="grade">
          Nota
        </InputLabel>
        <Rating
          id="grade"
          precision={0.5}
          onChange={(e) => {
            setGrade(e.target.value * 2);
          }}
          name="grade"
          max={5}
        />
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
