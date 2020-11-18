import {
  FormControl,
  Button,
  Input,
  Paper,
  InputLabel,
  Link,
} from "@material-ui/core";
import { Route } from "react-router-dom";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import "./index.css";

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

  const { register, unregister, handleSubmit, setValue, errors } = useForm({
    resolver: yupResolver(schema),
  });

  const handleLogin = (data) => {
    console.log(data);
  };

  return (
    <div>
      <Route exact path="/login">
        <ThemeProvider theme={theme}>
          <Paper className="cardLogin" elevation={3}>
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
      </Route>
    </div>
  );
};

export default Login;
