import { Button, Input, Paper, InputLabel, Link } from "@material-ui/core";
import { ThemeProvider, CircularProgress } from "@material-ui/core";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import "./index.css";
import { useState, useEffect } from "react";
import { Request } from "../../Request/Request";
import { LoginData, theme, schema_Login } from "../../helpers";
import { useHistory } from "react-router-dom";

const Login = ({ setAuthenticated }) => {
  const [loading, setLoading] = useState(false);
  const [errorsServer, setErrorsServer] = useState();
  const history = useHistory();

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema_Login),
  });

  const Authenticate = (auth_token, user_id) => {
    window.localStorage.setItem("auth_token", auth_token);
    window.localStorage.setItem("user_id", user_id);
    setAuthenticated(window.localStorage.getItem("auth_token"));
    setLoading(false);
    history.push("/authenticated");
  };

  const handleLogin = async (data) => {
    setLoading(true);
    const request = { data: data, path: "authenticate" };
    let result;
    try {
      result = await Request(request);
      const { auth_token } = result.data;
      const { id } = result.data.user;
      Authenticate(auth_token, id);
    } catch (error) {
      setLoading(false);
      setErrorsServer({ message: "Usuário ou senha invalidos" });
    }

    console.log(result);
  };

  const [loginClass, setLoginClass] = useState("cardLogin-off ");

  useEffect(() => {
    setLoginClass("cardLogin-on ");
  }, []);

  return (
    <div className={loginClass}>
      <ThemeProvider theme={theme}>
        {loading ? (
          <CircularProgress />
        ) : (
          <Paper elevation={3} square={true} className="cardLogin">
            <form onSubmit={handleSubmit(handleLogin)}>
              {LoginData.map((input, index) => {
                const { name, type, label } = input;

                return (
                  <div key={index}>
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
                {errors.user?.message ||
                  errors.password?.message ||
                  errorsServer?.message}
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
        )}
      </ThemeProvider>
    </div>
  );
};

export default Login;
