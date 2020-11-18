import { useForm } from "react-hook-form";
import { Route } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input, Button, InputLabel } from "@material-ui/core";
import { useEffect } from "react";

const UserForm = () => {
  const schema = yup.object().shape({
    user: yup
      .string("Formato de usuário inválido.")
      .min(6, "Seu usuário deve ter no mínimo 6 caractéres.")
      .required("Campo obrigatório."),
    fullName: yup
      .string("Formato de nome inválido.")
      .matches(/(\w.+\s).+/i, "Seu nome deve conter apenas letras.")
      .required("Campo obrigatório."),
    email: yup
      .string("Formato de e-mail inválido.")
      .email("Formato de e-mail inválido.")
      .required("Campo obrigotóri."),
    password: yup
      .string("Formato de senha inválida.")
      .min(6, "Sua senha deve ter no mínimo 6 caractéres.")
      .matches(
        /(?=.*[#$@!%&*?])/i,
        "Sua senha deve ter no mínimo um caractér especial."
      ),
    confirmPassword: yup
      .string("Formato de senha inválida.")
      .oneOf([yup.ref("password")], "Senhas não correspondem."),
  });

  const { register, unregister, handleSubmit, setValue, errors } = useForm({
    resolver: yupResolver(schema),
  });

  const handleForm = (data) => {
    console.log(data);
  };

  return (
    <Route exact path="/signup">
      <form onSubmit={handleSubmit(handleForm)}>
        <InputLabel className="inputsLabel" htmlFor="user">
          Usuário
        </InputLabel>
        <Input name="user" inputRef={register} error={!!errors.user} />
        <InputLabel className="inputsLabel" htmlFor="fullName">
          Nome Completo
        </InputLabel>
        <Input name="fullName" inputRef={register} error={!!errors.fullName} />
        <InputLabel className="inputsLabel" htmlFor="email">
          E-mail
        </InputLabel>
        <Input name="email" inputRef={register} error={!!errors.email} />
        <InputLabel className="inputsLabel" htmlFor="password">
          Senha
        </InputLabel>
        <Input
          name="password"
          inputRef={register}
          error={!!errors.password}
          type="password"
        />
        <InputLabel className="inputsLabel" htmlFor="confirmPassword">
          Confirmar senha
        </InputLabel>
        <Input
          name="confirmPassword"
          inputRef={register}
          error={!!errors.confirmPassword}
          type="password"
        />
        <Button type="submit">Enviar</Button>
        <p>
          {errors.user?.message ||
            errors.fullName?.message ||
            errors.email?.message ||
            errors.password?.message ||
            errors.confirmPassword?.message}
        </p>
      </form>
    </Route>
  );
};

export default UserForm;
