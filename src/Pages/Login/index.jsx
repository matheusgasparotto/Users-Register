import { Button, Input, Paper, InputLabel, Link } from "@material-ui/core";
import "./index.css";
const Login = () => {
  return (
    <div>
      <Paper className="cardLogin" elevation={3}>
        <InputLabel className="inputsLabel" htmlFor="user">
          Usuário
        </InputLabel>
        <Input className="inputs" id="user" name="user" label="Usuário" />
        <InputLabel className="inputsLabel" htmlFor="password">
          Senha
        </InputLabel>
        <Input className="inputs" id="password" name="password" label="Senha" />
        <div className="buttons">
          <Button className="sendButton" variant="contained" color="primary">
            entrar
          </Button>
          <Link className="forgotPass" href="#">
            Esqueceu a senha?
          </Link>
        </div>
      </Paper>
    </div>
  );
};

export default Login;
