import { Paper, InputLabel, Input, Button } from "@material-ui/core";
import styled, { css } from "styled-components";

export const StyledPaper = styled(Paper)`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 25vw;
  border-radius: 20px;
  transition: 2s;
  margin: 0;

  ${({ height }) => css`
    height: ${height}vh;
  `}
`;

export const StyledInputLabel = styled(InputLabel)`
  margin-top: 15px;
`;

export const StyledInput = styled(Input)`
  margin: 3%;
`;

export const ButtonsContainer = styled.div`
  margin: 10px;
  display: flex;
  justify-content: space-around;
  height: 30%;
  align-items: center;
  padding: 10px;
`;

export const StyledButton = styled(Button)`
  height: 50%;
  width: 60%;
`;
