import { Input, InputLabel, Button, Paper } from "@material-ui/core";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FeedbackData } from "../../helpers";
import { sendFeedback } from "../../Request/Request";
import { user_id, token } from "../../helpers";
import Rating from "@material-ui/lab/Rating";
import { Alert } from "@material-ui/lab";

const FormFeedbacks = () => {
  const { register, handleSubmit, errors, unregister } = useForm();

  const [alert, setAlert] = useState();
  const [response, setResponse] = useState();

  const feedbackResponse = (result, alert, message) => {
    unregister("name");
    unregister("commit");
    unregister("grade");
    result.status === 201 &&
      setAlert({
        result: alert,
        message: message,
      });
    setResponse(true);
    setTimeout(() => setResponse(false), 4000);
  };

  const handleFeedback = async (body) => {
    const data = { feedback: { ...body, grade: grade } };
    let result;
    try {
      result = await sendFeedback({
        token: token(),
        data: data,
        user_id: user_id(),
      });
      feedbackResponse(result, "success", '"Feedback cadastrado com sucesso"');
    } catch (error) {
      feedbackResponse(
        result,
        "error",
        "Mensagem não cadastrada, tente novamente mais tarde"
      );
    }
  };

  const [grade, setGrade] = useState();

  return (
    <>
      {response ? (
        <Alert severity={alert.result}>{alert.message}</Alert>
      ) : (
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
      )}
    </>
  );
};

export default FormFeedbacks;
