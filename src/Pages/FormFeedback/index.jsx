import { useState } from "react";
import { useForm } from "react-hook-form";
import { FeedbackData } from "../../helpers";
import { sendFeedback } from "../../Request/Request";
import { user_id, token } from "../../helpers";
import Rating from "@material-ui/lab/Rating";
import { Alert } from "@material-ui/lab";
import {
  StyledPaper,
  FormContainer,
  StyledInputLabel,
  StyledInput,
  ButtonsContainer,
  StyledButton,
} from "../../globalStyles";

const FormFeedbacks = () => {
  const { register, handleSubmit, unregister } = useForm();

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
        <FormContainer activate height={50}>
          <StyledPaper height={45}>
            <form onSubmit={handleSubmit(handleFeedback)}>
              {FeedbackData.map((input, index) => {
                const { name, label, type } = input;
                return (
                  <div key={index}>
                    <StyledInputLabel className="inputsLabel" htmlFor={name}>
                      {label}
                    </StyledInputLabel>
                    <StyledInput
                      name={name}
                      inputRef={register}
                      type={type}
                      id={name}
                    />
                  </div>
                );
              })}
              <StyledInputLabel className="inputsLabel" htmlFor="grade">
                Nota
              </StyledInputLabel>
              <Rating
                id="grade"
                precision={0.5}
                onChange={(e) => {
                  setGrade(e.target.value * 2);
                }}
                name="grade"
                max={5}
              />
              <ButtonsContainer>
                <StyledButton
                  variant="contained"
                  type="submit"
                  color="primary"
                  className="requestButton"
                >
                  Enviar
                </StyledButton>
              </ButtonsContainer>
            </form>
          </StyledPaper>
        </FormContainer>
      )}
    </>
  );
};

export default FormFeedbacks;
