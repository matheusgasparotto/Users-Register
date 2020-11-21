import { Link } from "@material-ui/core";
import { ThemeProvider, CircularProgress } from "@material-ui/core";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState, useEffect } from "react";
import { Request } from "../../Request/Request";
import { LoginData, theme, schema_Login } from "../../helpers";
import { useHistory } from "react-router-dom";
import {
  StyledPaper,
  StyledInputLabel,
  StyledInput,
  StyledButton,
  ButtonsContainer,
  LoginContainer,
} from "./styles";
import LoginIcon from "../../components/LoginIcon";

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

  const [activate, setActivate] = useState(false);

  useEffect(() => {
    setActivate(true);
  }, []);

  return (
    <LoginContainer activate={activate}>
      <ThemeProvider theme={theme}>
        {loading ? (
          <CircularProgress />
        ) : (
          <StyledPaper elevation={3} square={true} className="cardLogin">
            <form onSubmit={handleSubmit(handleLogin)}>
              {LoginData.map((input, index) => {
                const { name, type, label } = input;

                return (
                  <div key={index}>
                    <StyledInputLabel htmlFor={name}>{label}</StyledInputLabel>
                    <StyledInput
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
              <ButtonsContainer>
                <StyledButton color="primary" variant="contained" type="submit">
                  entrar
                </StyledButton>
                <Link href="#">Esqueceu a senha?</Link>
              </ButtonsContainer>
            </form>
          </StyledPaper>
        )}
      </ThemeProvider>
      <div>
        <LoginIcon />
      </div>
    </LoginContainer>
  );
};

export default Login;
