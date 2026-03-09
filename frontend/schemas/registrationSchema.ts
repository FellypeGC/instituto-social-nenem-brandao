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
    .transform((value) => value?.trim() === "" ? undefined : value?.trim())
    .min(3, "Nome do aluno precisa ter pelo menos 3 caracteres")
    .max(100, "Nome pode ter no máximo 100 caracteres")
    .optional()
    .default(undefined),
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
    .when("dataNascimento", {
      is: (val: Date) => val && !calculateAge(val),
      then: (s) => s.required("Nome do responsável é obrigatório").min(3, "Mínimo 3 caracteres"),
      otherwise: (s) => s.notRequired().nullable().transform(() => undefined),
    }),
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
    .when("dataNascimento", {
      is: (value: Date) => value && !calculateAge(value),
      then: (schema) => 
        schema
          .required("Telefone do responsável é obrigatório")
          .matches(/^\(\d{2}\)\s\d{5}-\d{4}$/, "Telefone inválido"),
      otherwise: (schema) => schema.notRequired().nullable(),
    }),
  responsavelDataNascimento: yup
    .mixed()
    .nullable()
    .test("is-valid-date", "Insira uma data válida", (value, context) => {
      const { dataNascimento } = context.parent;
      const isMinor = dataNascimento && !calculateAge(dataNascimento);

      if (!isMinor) return true;

      if (!value || value === "") return false;
      
      const date = new Date(value as string);
      return !isNaN(date.getTime());
    }),
  responsavelNacionalidade: yup
    .string()
    .notRequired()
    .when("dataNascimento", {
      is: (val: Date) => val && !calculateAge(val),
      then: (s) => s.typeError("Nacionalidade inválida"),
      otherwise: (s) => s.notRequired().nullable()
    }),
  responsavelEstado: yup
    .string()
    .when("dataNascimento", {
      is: (val: Date) => val && !calculateAge(val),
      then: (s) => s.required("Estado do responsável é obrigatório").typeError("Estado inválido"),
      otherwise: (s) => s.notRequired().nullable()
    }),
  responsavelCidade: yup
    .string()
    .when("dataNascimento", {
      is: (val: Date) => val && !calculateAge(val),
      then: (s) => s.required("Cidade do responsável é obrigatória").typeError("Cidade inválida"),
      otherwise: (s) => s.notRequired().nullable()
    }),
  responsavelCep: yup
    .string()
    .when("dataNascimento", {
      is: (val: Date) => val && !calculateAge(val),
      then: (s) => s.required("CEP é obrigatório").matches(/^\d{5}-\d{3}$/, "CEP inválido"),
      otherwise: (s) => s.notRequired().nullable()
    }),
  responsavelRua: yup
    .string()
    .when("dataNascimento", {
      is: (val: Date) => val && !calculateAge(val),
      then: (s) => s.required("Rua do responsável é obrigatória").typeError("Rua inválida"),
      otherwise: (s) => s.notRequired().nullable()
    }),
  responsavelBairro: yup
    .string().when("dataNascimento", {
      is: (val: Date) => val && !calculateAge(val),
      then: (s) => s.required("Bairro do responsável é obrigatória").typeError("Bairro inválido"),
      otherwise: (s) => s.notRequired().nullable()
    }),
  responsavelNumero: yup
    .string()
    .when("dataNascimento", {
      is: (val: Date) => val && !calculateAge(val),
      then: (s) => s.required("Número é obrigatório").typeError("Número inválido"),
      otherwise: (s) => s.notRequired().nullable()
    }),
  responsavelUf: yup
    .string()
    .when("dataNascimento", {
      is: (val: Date) => val && !calculateAge(val),
      then: (s) => s.required("UF é obrigatório").typeError("UF inválido"),
      otherwise: (s) => s.notRequired().nullable()
    }),
  responsavelComplemento: yup
    .string()
    .nullable()
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
    .mixed<FileList | File>()
    .test("required", "O upload do boletim é obrigatório", (value) => {
      if (!value) return false;
      if (value instanceof File) return true;
      if (value instanceof FileList) return value.length > 0;
      return false;
    })
    .required("O upload do boletim é obrigatório"),
  declaracaoMatricula: yup
    .mixed<FileList | File>()
    .test("required", "O upload da declaração é obrigatório", (value) => {
      if (!value) return false;
      if (value instanceof File) return true;
      if (value instanceof FileList) return value.length > 0;
      return false;
    })
    .required("O upload da declaração é obrigatório"),

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

  // Activies and Consent
  atividadesInteresse: yup
    .array()
    .of(yup.string())
    .required()
    .min(1, "Selecione pelo menos uma atividade de interesse"),
  lgpdAutorizacao: yup
    .boolean()
    .oneOf([true], "Você deve aceitar a política de privacidade"),

});

export type RegistrationFormData = yup.InferType<typeof schema>;