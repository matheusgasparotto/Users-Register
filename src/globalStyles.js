import { Paper, InputLabel, Input, Button } from "@material-ui/core";
import styled, { css } from "styled-components";

export const FormContainer = styled.div`
  overflow: hidden;
  opacity: 0;

  ${({ activate }) =>
    activate &&
    css`
      transition: 2s;
      opacity: 1;
      display: flex;
      align-items: center;
      justify-content: space-around;
    `};
  ${({ height }) => css`
    height: ${height}vh;
  `}
`;

export const StyledPaper = styled(Paper)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 25vw;
  border-radius: 20px;
  transition: 2s;
  margin: 0;

  ${({ height }) => css`
    height: ${height}vh;
  `}
`;

export const StyledInputLabel = styled(InputLabel)`
  margin-top: 10px;
`;

export const StyledInput = styled(Input)`
  margin: 2%;
`;

export const ButtonsContainer = styled.div`
  width: 100%;
  margin: 10px;
  display: flex;
  justify-content: space-around;
  height: 30%;
  align-items: center;
`;

export const StyledButton = styled(Button)`
  ${({ height, width }) => css`
    height: ${height}vh;
    width: ${width}vw;
  `}
`;

export const IconContainer = styled.div`
  width: 50%;
  overflow: hidden;
  ${({ home }) =>
    home &&
    css`
      margin: 0 auto;
      height: 80vh;
      margin-top: 5%;
    `}
  svg {
    width: 100%;
    height: 100%;
  }
`;

export const Container = styled.div`
  width: 80%;
  margin: 0 auto;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
  margin-top: 30px;
  margin-left: 175px;
`;
