import UserCard from "../../components/UserCard";
import { CardsContainer } from "../../globalStyles";
import TextField from "@material-ui/core/TextField";
import { ThemeProvider } from "@material-ui/core";
import { useEffect, useState } from "react";
import { theme } from "../../helpers";
import { usersRequest } from "../../Request/Request";
import { token } from "../../helpers";

const UsersList = () => {
  const [list, setList] = useState([]);

  const requestFeedback = async () => {
    const path = `/users`;
    setList(await usersRequest(token, path));
    console.log(list);
  };

  useEffect(() => {
    requestFeedback();
  }, []);

  return (
    <>
      <ThemeProvider theme={theme}>
        <TextField
          id="standard-search"
          helperText="Buscar usuário"
          type="search"
          color="primary"
          style={{ marginLeft: "700px" }}
        />
      </ThemeProvider>
      <CardsContainer>
        {list.map((user, index) => (
          <UserCard key={index} user={user} />
        ))}
      </CardsContainer>
    </>
  );
};

export default UsersList;
