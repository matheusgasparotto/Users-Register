import UserCard from "../../components/UserCard";
import { CardsContainer } from "../../globalStyles";
import TextField from "@material-ui/core/TextField";
import { ThemeProvider, CircularProgress } from "@material-ui/core";
import { useState, useEffect } from "react";
import { theme, token } from "../../helpers";
import { usersRequest } from "../../Request/Request";

const UsersList = () => {
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");

  const handleInput = (e) => {
    setInput(e.target.value.toLowerCase());
  };

  const [list, setList] = useState([]);

  const requestUsers = async () => {
    const path = `/users`;
    setList(await usersRequest(token(), path));
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    requestUsers();
  }, []);

  return (
    <>
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <h2>Usuários cadastrados</h2>
          <ThemeProvider theme={theme}>
            <TextField
              id="standard-search"
              helperText="Buscar usuário"
              type="search"
              color="primary"
              style={{ marginLeft: "700px" }}
              onChange={handleInput}
              value={input}
            />
          </ThemeProvider>
          <CardsContainer>
            {input
              ? list
                  .filter((user) => user.name?.toLowerCase().includes(input))
                  .map((user, index) => <UserCard key={index} user={user} />)
              : list.map((user, index) => <UserCard key={index} user={user} />)}
          </CardsContainer>
        </>
      )}
    </>
  );
};

export default UsersList;
