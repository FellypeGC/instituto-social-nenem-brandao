import * as yup from "yup";

const calculateAge = (dataNasc: Date) => {
  const today = new Date();
  let age = today.getFullYear() - dataNasc.getFullYear();
  const month = today.getMonth() - dataNasc.getMonth();
  if (month < 0 || (month === 0 && today.getDate() < dataNasc.getDate())) {
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
    .test("maior-de-idade", "Menor de idade precisa do responsável", (value) => calculateAge(new Date(value)))
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
    .string()
});
