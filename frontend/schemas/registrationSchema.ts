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
    .default("")
    .notRequired(),
  telefone: yup
    .string()
    .required("Telefone é obrigatório")
    .matches(/^(\(?\d{2}\)?\s?)?9\d{4}-?\d{4}$/, "Telefone inválido"),
  dataNascimento: yup
    .date()
    .required("Data de nascimento é obrigatória")
    .typeError("Insira uma data válida")
    .transform((value, originalValue) => (originalValue === "" ? null : value))
    .max(new Date(), "Insira uma data válida")
    .min(new Date("1900-01-01"), "Data muito antiga"),
  cpf: yup
    .string()
    .required("CPF é obrigatório")
    .matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, "CPF inválido"),
  rg: yup
    .string()
    .notRequired(),
  nacionalidade: yup
    .string()
    .notRequired(),

  // Guardian Validation 
  responsavelNome: yup
    .string()
    .required("Nome do responsável é obrigatório")
    .when("dataNascimento", {
      is: (value: Date) => value && !calculateAge(value),
      then: schema => schema.required("Obrigatório para menor de idade"),
      otherwise: schema => schema.notRequired()
    })
    .min(3, "Nome do responsável deve ter pelo menos 3 caracteres")
    .max(100, "Nome do responsável deve ter no máximo 100 caracteres"),
  responsavelCpf: yup
    .string()
    .when("dataNascimento", {
      is: (value: Date) => value && !calculateAge(value),
      then: schema =>
        schema
          .required("Obrigatório para menor de idade")
          .matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, "CPF inválido"),
      otherwise: schema => schema.notRequired()
    }),
  responsavelRg: yup
    .string()
    .notRequired(),
  responsavelEmail: yup
    .string()
    .email("Email inválido")
    .default("")
    .notRequired(),
  responsavelTelefone: yup
    .string()
    .required("Telefone é obrigatório")
    .matches(/^(\(?\d{2}\)?\s?)?9\d{4}-?\d{4}$/, "Telefone inválido"),
  responsavelDataNascimento: yup
    .date()
    .required("Data de nascimento do responsável é obrigatória")
    .typeError("Insira uma data válida")
    .transform((value, originalValue) => (originalValue === "" ? null : value))
    .max(new Date(), "Insira uma data válida")
    .min(new Date("1900-01-01"), "Data muito antiga"),
  responsavelNacionalidade: yup
    .string()
    .notRequired(),
});

export type RegistrationFormData = yup.InferType<typeof schema>;