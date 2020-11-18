import { Button, Input, Paper, InputLabel, Link } from "@material-ui/core";
import { Route } from "react-router-dom";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import "./index.css";
import { useState, useEffect } from "react";
import registerRequest from "../../Request/registerRequest";

const Login = () => {
  const schema = yup.object().shape({
    user: yup
      .string("Formato de usuário inválido.")
      .min(6, "Seu usuário deve ter no mínimo 6 caractéres.")
      .required("Campo obrigatório."),
    password: yup
      .string("Formato de senha inválida.")
      .min(6, "Sua senha deve ter no mínimo 6 caractéres.")
      .matches(
        /(?=.*[#$@!%&*?])/i,
        "Sua senha deve ter no mínimo um caractér especial."
      ),
  });

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

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });

  const handleLogin = (data) => {
    console.log(data);
    const request = { data: data, path: "authenticate" };
    registerRequest(request);
  };

  const [loginClass, setLoginClass] = useState("cardLogin-off ");

  useEffect(() => {
    setLoginClass("cardLogin-on ");
  }, []);

  return (
    <Route exact path="/login">
      <div className={loginClass}>
        <ThemeProvider theme={theme}>
          <Paper elevation={3} square={true} className="cardLogin">
            <form onSubmit={handleSubmit(handleLogin)}>
              <InputLabel className="inputsLabel" htmlFor="user">
                Usuário
              </InputLabel>
              <Input
                className="inputs"
                id="user"
                name="user"
                label="Usuário"
                inputRef={register}
              />
              <InputLabel className="inputsLabel" htmlFor="password">
                Senha
              </InputLabel>
              <Input
                className="inputs"
                id="password"
                name="password"
                label="Senha"
                inputRef={register}
              />
              <div className="buttons">
                <Button
                  color="primary"
                  variant="contained"
                  className="sendButton"
                  type="submit"
                >
                  entrar
                </Button>
                <Link className="forgotPass" href="#">
                  Esqueceu a senha?
                </Link>
              </div>
            </form>
          </Paper>
        </ThemeProvider>
      </div>
    </Route>
  );
};

export default Login;
