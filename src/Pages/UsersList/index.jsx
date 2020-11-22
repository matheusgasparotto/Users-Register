import UserCard from "../../components/UserCard";
import { CardsContainer } from "../../globalStyles";
import TextField from "@material-ui/core/TextField";
import { ThemeProvider } from "@material-ui/core";
import { useEffect, useState } from "react";
import { theme } from "../../helpers";

const UsersList = () => {
  const [list, setList] = useState([]);
  const [input, setInput] = useState("");

  const requestFeedback = async () => {
    const path = `/users`;
    setList(await usersRequest(token, path));
    console.log(list);
  };

  const handleInput = (e) => {
    setInput(e.target.value);
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
          onChange={handleInput}
          value={input}
        />
      </ThemeProvider>
      <CardsContainer>
        {input
          ? list
              .filter((user, index) => input.toLowerCase().includes(user.name))
              .map((user, index) => <UserCard key={index} user={user} />)
          : list.map((user, index) => <UserCard key={index} user={user} />)}
      </CardsContainer>
    </>
  );
};

export default UsersList;
