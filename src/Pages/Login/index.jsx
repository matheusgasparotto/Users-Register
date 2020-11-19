import { Button, Input, Paper, InputLabel, Link } from "@material-ui/core";
import { Route } from "react-router-dom";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import "./index.css";
import { useState, useEffect } from "react";
import Request from "../../Request/Request";
import { LoginData } from "../../data/LoginData";

const Login = ({ setAutorized, authorized }) => {
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

  const { register, handleSubmit, errors, setValue } = useForm({
    resolver: yupResolver(schema),
  });

  const handleLogin = (data) => {
    console.log(data);
    const request = { data: data, path: "authenticate" };
    const result = Request(request);
    const { status } = result;
  };

  const [loginClass, setLoginClass] = useState("cardLogin-off ");

  useEffect(() => {
    setLoginClass("cardLogin-on ");
  }, []);

  return (
    <div className={loginClass}>
      <ThemeProvider theme={theme}>
        <Paper elevation={3} square={true} className="cardLogin">
          <form onSubmit={handleSubmit(handleLogin)}>
            {LoginData.map((input, index) => {
              const { name, type, label } = input;

              return (
                <div>
                  <InputLabel className="inputsLabel" htmlFor={name}>
                    {label}
                  </InputLabel>
                  <Input
                    className="inputs"
                    id={name}
                    name={name}
                    label={label}
                    inputRef={register}
                    type={type}
                  />
                </div>
              );
            })}
            <p className="errors">
              {errors.user?.message || errors.password?.message || errors.Not}
            </p>
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
  );
};

export default Login;
