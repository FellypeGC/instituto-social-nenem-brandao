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
    .min(3, "Nome do aluno precisa ter pelo menos 3 caracteres")
    .max(100, "Nome pode ter no máximo 100 caracteres"),
  email: yup
    .string()
    .email("Email inválido")
    .default("")
    .notRequired(),
  telefone: yup
    .string()
    .required("Telefone é obrigatório")
    .matches(/^\(\d{2}\)\s\d{5}-\d{4}$/, "Telefone inválido"),
  dataNascimento: yup
    .date()
    .required("Data de nascimento é obrigatória")
    .typeError("Insira uma data válida")
    .transform((value, originalValue) => (originalValue === "" ? null : value))
    .max(new Date(), "Insira uma data válida")
    .min(new Date("1900-01-01"), "Data muito antiga"),
  // cpf: yup
  //   .string()
  //   .notRequired()
  //   .when("dataNascimento", {
  //     is: (value: Date) => value && !calculateAge(value),
  //     then: schema => schema.notRequired(),
  //     otherwise: schema => schema.required("CPF é obrigatório para maiores de idade")
  //     .nullable()
  //   })
  //   .matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, "CPF inválido"),
  cpf: yup
    .string()
    .ensure()
    .when("dataNascimento", {
      is: (value: Date) => value instanceof Date && !isNaN(value.getTime()) && calculateAge(value),
      then: (schema) => 
        schema
          .required("CPF é obrigatório para maiores de idade")
          .matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, "CPF inválido"),
      otherwise: (schema) => 
        schema
          .transform(() => undefined) // Transforma em undefined para ignorar o matches
          .notRequired()
          .nullable(),
    }),
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
      then: schema => schema.required("Nome do responsável é obrigatório"),
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
          .required("CPF do responsável é obrigatório")
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
    .required("Telefone do responsável é obrigatório")
    .matches(/^\(\d{2}\)\s\d{5}-\d{4}$/, "Telefone inválido"),
  responsavelDataNascimento: yup
    .date()
    .nullable()
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