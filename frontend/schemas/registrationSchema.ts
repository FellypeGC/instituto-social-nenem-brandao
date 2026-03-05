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
  nomeSocial: yup
    .string()
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
  sexo: yup
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
  responsavelEstado: yup
    .string()
    .required("Estado é obrigatório"),
  responsavelCidade: yup
    .string()
    .required("Cidade é obrigatória"),
  responsavelCep: yup
    .string()
    .required("CEP é obrigatório").matches(/^\d{5}-\d{3}$/, "CEP inválido"),
  responsavelRua: yup
    .string()
    .required("Rua é obrigatória"),
  responsavelBairro: yup
    .string()
    .required("Bairro é obrigatório"),
  responsavelNumero: yup
    .string()
    .required("Número é obrigatório"),
  responsavelComplemento: yup
    .string()
    .optional(),
  
  // Scholar data
  escolaNome: yup
    .string()
    .required("Nome da escola é obrigatório"),
  escolaTipo: yup
    .string()
    .required("Selecione o tipo da escola"),
  escolaTurno: yup
    .string()
    .required("Selecione o turno da escola"),
  escolaSerie: yup
    .string()
    .required("Série/Ano é obrigatório"),
  escolaTurma: yup
    .string()
    .required("Turma é obrigatória"),
  escolaTelefone: yup
    .string()
    .required("Telefone da escola é obrigatório")
    .matches(/^\(\d{2}\)\s\d{5}-\d{4}$/, "Telefone inválido"),
  mediaGeral: yup
    .number()
    .typeError("Insira um número")
    .required("Média é obrigatória"),
  frequenciaEscolar: yup
    .number()
    .typeError("Insira um número")
    .required("Frequência é obrigatória"),
  boletimEscolar: yup
    .mixed()
    .required("O upload do boletim é obrigatório"),
  declaracaoMatricula: yup
    .mixed()
    .required("O upload da declaração de matrícula é obrigatório"),

  // health
  restricaoMedica: yup
    .string()
    .required("Informe se possui restrição médica"),
  medicacaoContinua: yup
    .string()
    .required("Informe se usa medicação"),
  deficiencia: yup
    .string()
    .required("Informe se possui deficiência"),
  contatoEmergencia: yup
    .string()
    .required("Contato de emergência é obrigatório"),

  // socioeconomic
  rendaFamiliar: yup
    .string()
    .required("Renda familiar é obrigatória"),
  residentesQuantidade: yup
    .number()
    .required("Quantidade de residentes é obrigatória"),
  beneficioSocial: yup
    .string()
    .required("Informe se recebe benefício social"),

});

export type RegistrationFormData = yup.InferType<typeof schema>;