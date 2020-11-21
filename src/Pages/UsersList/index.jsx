import UserCard from "../../components/UserCard";
import { UsersContainer } from "./styles";
import TextField from "@material-ui/core/TextField";
import { ThemeProvider } from "@material-ui/core";
import { theme } from "../../helpers";

const UsersList = ({ list }) => {
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
