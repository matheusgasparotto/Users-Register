import "./index.css";
import { useForm } from "react-hook-form";
import { Route } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input, Button, InputLabel, Paper } from "@material-ui/core";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import registerRequest from "../../Request/registerRequest";

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
        "Seu nome deve conter apenas letras."
      )
      .required("Campo obrigatório."),
    email: yup
      .string("Formato de e-mail inválido.")
      .email("Formato de e-mail inválido.")
      .required("Campo obrigotóri."),
    password: yup
      .string("Formato de senha inválida.")
      .min(6, "Sua senha deve ter no mínimo 6 caractéres.")
      .matches(
        /(?=.*[#$@!%&*?])/i,
        "Sua senha deve ter no mínimo um caractér especial."
      ),
    password_confirmation: yup
      .string("Formato de senha inválida.")
      .oneOf([yup.ref("password")], "Senhas não correspondem."),
  });

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });

  const handleForm = (data) => {
    const request = { data: { user: data }, path: "users" };
    registerRequest(request);
  };

  return (
    <Route exact path="/signup">
      <div>
        <ThemeProvider theme={theme}>
          <Paper elevation={3} square={true} className="cardSignUp">
            <form onSubmit={handleSubmit(handleForm)} className="form">
              <InputLabel className="inputsLabel" htmlFor="user">
                Usuário
              </InputLabel>
              <Input name="user" inputRef={register} error={!!errors.user} />
              <InputLabel className="inputsLabel" htmlFor="name">
                Nome Completo
              </InputLabel>
              <Input name="name" inputRef={register} error={!!errors.name} />
              <InputLabel className="inputsLabel" htmlFor="email">
                E-mail
              </InputLabel>
              <Input name="email" inputRef={register} error={!!errors.email} />
              <InputLabel className="inputsLabel" htmlFor="password">
                Senha
              </InputLabel>
              <Input
                name="password"
                inputRef={register}
                error={!!errors.password}
                type="password"
              />
              <InputLabel
                className="inputsLabel"
                htmlFor="password_confirmation"
              >
                Confirmar senha
              </InputLabel>
              <Input
                name="password_confirmation"
                inputRef={register}
                error={!!errors.password_confirmation}
                type="password"
              />
              <br></br>
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
    </Route>
  );
};

export default UserForm;
