import UserCard from "../../components/UserCard";
import { CardsContainer } from "../../globalStyles";
import TextField from "@material-ui/core/TextField";
import { ThemeProvider } from "@material-ui/core";
import { useState } from "react";
import { theme } from "../../helpers";

const UsersList = ({ list }) => {
  const [input, setInput] = useState("");

  const handleInput = (e) => {
    setInput(e.target.value.toLowerCase());
  };

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
              .filter((user) => user.name?.toLowerCase().includes(input))
              .map((user, index) => <UserCard key={index} user={user} />)
          : list.map((user, index) => <UserCard key={index} user={user} />)}
      </CardsContainer>
    </>
  );
};

export default UsersList;
