import "./index.css";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input, Button, InputLabel, Paper } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core";
import { Request } from "../../Request/Request";
import { FormData, theme, schema_Signup } from "../../helpers";
import {
  FormContainer,
  StyledPaper,
  StyledInputLabel,
  StyledInput,
  StyledButton,
  ButtonsContainer,
} from "../../globalStyles";

const UserForm = () => {
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema_Signup),
  });

  const history = useHistory();

  const handleForm = async (data) => {
    const request = { data: { user: data }, path: "users" };
    const result = await Request(request);
    const { status } = result;
    console.log(result);
    status === 201 && history.push("/login");
  };

  const [activate, setActivate] = useState(false);

  useEffect(() => {
    setActivate(true);
  }, []);

  return (
    <FormContainer height={90} activate={activate}>
      <ThemeProvider theme={theme}>
        <StyledPaper
          height={73}
          elevation={3}
          square={true}
          className="cardLogin"
        >
          <form onSubmit={handleSubmit(handleForm)} className="form">
            {FormData.map((input, index) => {
              const { name, label, type } = input;
              return (
                <div key={index}>
                  <StyledInputLabel className="inputsLabel" htmlFor={name}>
                    {label}
                  </StyledInputLabel>
                  <StyledInput
                    name={name}
                    inputRef={register}
                    error={!!errors.name}
                    type={type}
                    id={name}
                  />
                </div>
              );
            })}
            <p className="errors">
              {errors.user?.message ||
                errors.name?.message ||
                errors.email?.message ||
                errors.password?.message ||
                errors.password_confirmation?.message}
            </p>
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
      </ThemeProvider>
    </FormContainer>
  );
};

export default UserForm;
