import "./index.css";
import { useForm } from "react-hook-form";
import { Route } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input, Button, InputLabel, Paper } from "@material-ui/core";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import registerRequest from "../../Request/registerRequest";
import { FormData } from "../../data/FormData";

const UserForm = () => {
  const theme = createMuiTheme({
    palette: {
      primary: {
        main: "#282c34",
      },
      secondary: {
        main: "#f44336",
      },
    },
  });

  const schema = yup.object().shape({
    user: yup
      .string("Formato de usuário inválido.")
      .min(6, "Seu usuário deve ter no mínimo 6 caractéres.")
      .required("Campo obrigatório."),
    name: yup
      .string("Formato de nome inválido.")
      .matches(
        /\b[A-Za-zÀ-ú][A-Za-zÀ-ú]+,?\s[A-Za-zÀ-ú][A-Za-zÀ-ú]{2,19}\b/gi,
        "Informar nome e sobrenome contendo apenas letras."
      )
      .required("Campo obrigatório."),
    email: yup
      .string("Formato de e-mail inválido.")
      .email("Formato de e-mail inválido.")
      .required("Campo obrigatório."),
    password: yup
      .string("Formato de senha inválida.")
      .min(6, "Sua senha deve ter no mínimo 6 caractéres.")
      .matches(
        /(?=.*[#$@!%&*?])/i,
        "Sua senha deve ter no mínimo um caractér especial."
      )
      .required("Campo obrigatório."),
    password_confirmation: yup
      .string("Formato de senha inválida.")
      .oneOf([yup.ref("password")], "Suas senhas não correspondem.")
      .required("Campo obrigatório."),
  });

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });

  const handleForm = (data) => {
    const request = { data: { user: data }, path: "users" };
    registerRequest(request);
  };

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Paper elevation={3} square={true} className="cardSignUp">
          <form onSubmit={handleSubmit(handleForm)} className="form">
            {FormData.map((input, index) => {
              const { name, label, type } = input;
              return (
                <div key={index}>
                  <InputLabel className="inputsLabel" htmlFor={name}>
                    {label}
                  </InputLabel>
                  <Input
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
            <div>
              <Button
                variant="contained"
                type="submit"
                color="primary"
                className="requestButton"
              >
                Enviar
              </Button>
            </div>
          </form>
        </Paper>
      </ThemeProvider>
    </div>
  );
};

export default UserForm;
