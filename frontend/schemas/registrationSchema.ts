import * as yup from "yup";

export const calculateAge = (birthday: Date) => {
  if (!birthday) return false;

  const birthdayDate = new Date(birthday);

  const today = new Date();
  let age = today.getFullYear() - birthdayDate.getFullYear();
  const month = today.getMonth() - birthdayDate.getMonth();

  if (month < 0 || (month === 0 && today.getDate() < birthdayDate.getDate())) {
    age--;
  }
  return age >= 18;
};

export const schema = yup.object({
  nome: yup
    .string()
    .required("Nome é obrigatório")
    .min(3)
    .max(100),
  email: yup
    .string()
    .email("Email inválido")
    .default(""),
  telefone: yup
    .string()
    .required("Telefone é obrigatório")
    .matches(/^(\(?\d{2}\)?\s?)?9\d{4}-?\d{4}$/, "Telefone inválido"),
  dataNascimento: yup
    .date()
    .required("Data de nascimento é obrigatória")
    .typeError("Insira uma data válida")
    .transform((value, originalValue) => (originalValue === "" ? undefined : value))
    .max(new Date(), "Insira uma data válida")
    .min(new Date('1900-01-01'), 'Data muito antiga'),
  cpf: yup
    .string()
    .required("CPF é obrigatório")
    .matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, "CPF inválido"),
  rg: yup
    .string(),
  nacionalidade: yup
    .string(),
  responsavelNome: yup
    .string()
    .when("dataNascimento", {
      is: (value: Date) => value && !calculateAge(value),
      then: schema => schema.required("Obrigatório para menor de idade"),
      otherwise: schema => schema.notRequired()
    }),
});
