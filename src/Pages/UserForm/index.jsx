import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input, Button } from "@material-ui/core";

const UserForm = () => {
  const schema = yup.object().shape({
    user: yup
      .string("Formato de usuário inválido.")
      .min(6, "Seu usuário deve ter no mínimo 6 caractéres.")
      .required("Defina um nome de usuário."),
    fullName: yup
      .string()
      .matches(/^[a-zA-Z](\w.+\s).+/i)
      .required(),
    email: yup.string().email().required(),
  });

  const { register, unregister, handleSubmit, setValue, errors } = useForm({
    resolver: yupResolver(schema),
  });

  const handleForm = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(handleForm)}>
      <Input name="user" inputRef={register} />
      <Input name="fullName" inputRef={register} />
      <Input name="email" inputRef={register} />
      <Input name="password" inputRef={register} />
      <Input name="confirmPassword" inputRef={register} />
      <Button />
    </form>
  );
};

export default UserForm;
