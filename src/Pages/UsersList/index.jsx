import UserCard from "../../components/UserCard";
import { UsersContainer } from "./styles";
import TextField from "@material-ui/core/TextField";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";

const UsersList = ({ list }) => {
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
  return (
    <>
      <ThemeProvider theme={theme}>
        <TextField
          id="outlined-search"
          label="Buscar usuário"
          type="search"
          variant="outlined"
          color="primary"
          style={{ marginLeft: "700px" }}
        />
      </ThemeProvider>
      <UsersContainer>
        {list.map((user, index) => (
          <UserCard key={index} user={user} />
        ))}
      </UsersContainer>
    </>
  );
};

export default UsersList;
