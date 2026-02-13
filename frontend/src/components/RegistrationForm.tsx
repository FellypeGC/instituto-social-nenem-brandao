import { useForm, type SubmitHandler, type Resolver } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";


const schema = yup.object({
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
    .matches(/^\(\d{2}\) \d{5}-\d{4}$/, "Telefone inválido"),
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

type RegistrationFormProps = {
  matricula: string;
}

type Inputs = {
  nome: string;
  email: string | null;
  telefone: string;
  dataNascimento: string; 
  cpf: string;
  rg: string | null;
  nacionalidade: string | null;
}

const calculateAge = (dataNasc: Date) => {
  const today = new Date();
  let age = today.getFullYear() - dataNasc.getFullYear();
  const month = today.getMonth() - dataNasc.getMonth();
  if (month < 0 || (month === 0 && today.getDate() < dataNasc.getDate())) {
    age--;
  }
  return age >= 18;
};

const RegistrationForm = ({ matricula }: RegistrationFormProps) => {
  const { 
    register, 
    formState: {
      errors,
      isSubmitting
    },
    handleSubmit, 
    // watch,
  } = useForm<Inputs>({
    defaultValues: {
      nome: "",
      email: "",
      telefone: "",
      dataNascimento: undefined,
      cpf: "",
      rg: "",
      nacionalidade: "",
    },
    resolver: yupResolver(schema) as unknown as Resolver<Inputs>,
  });
  
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      {/* <!-- Campo de Matrícula (Desabilitado) --> */}
      <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
        <label className="block text-sm font-semibold text-blue-800 mb-1">MATRÍCULA GERADA (AUTOMÁTICO):</label>
        <input 
        type="text" id="matriculaInput" disabled value={matricula}
        className="form-input w-full p-3 border-none text-2xl tracking-widest text-center rounded bg-transparent" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* NOME DO ALUNO */}
        <div className="col-span-1 md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">
            Nome Completo
            <span className="text-red-600">*</span>
          </label>
          <input 
            type="text" 
            placeholder="Digite seu nome completo"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none" 
            {...register("nome")} 
          />
          <span className="text-red-600">{errors.nome?.message}</span>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input 
            type="email"
            placeholder="seu.email@exemplo.com" 
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none" 
            {...register("email")}
          />
          <span className="text-red-600">{errors.email?.message}</span>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Telefone 
            <span className="text-red-600">*</span>
          </label>
          <input 
            type="text"
            placeholder="(XX) XXXXX-XXXX" 
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
            {...register("telefone")}
          />
          <span className="text-red-600">{errors.telefone?.message}</span>
        </div>

        {/* DATA DE NASCIMENTO */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Data de Nascimento
            <span className="text-red-600">*</span>
          </label>
          <input 
            type="date"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
            {...register("dataNascimento")}
          />
          <span className="text-red-600">{errors.dataNascimento?.message}</span>
        </div>

        {/* CPF */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            {/* Optional for underagers - Required for adults */}
            CPF
            <span className="text-red-600">*</span>
          </label>
          <input 
            type="text"
            placeholder="123.456.789-10" 
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
            {...register("cpf")}
          />
          <span className="text-red-600">{errors.cpf?.message}</span>
        </div>

        {/* RG */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            RG
          </label>
          <input 
            type="text"
            placeholder="Digite seu RG" 
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
            {...register("rg")}
          />
          <span className="text-red-600">{errors.rg?.message}</span>
        </div>

        {/* NACIONALIDADE */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Nacionalidade
          </label>
          <input 
            type="text"
            placeholder="Digite sua nacionalidade" 
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
            {...register("nacionalidade")}
          />
          <span className="text-red-600">{errors.nacionalidade?.message}</span>
        </div>
      </div>

      <button 
        type="submit" 
        className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl font-bold text-lg shadow-lg transition-all cursor-pointer"
      >
        {isSubmitting ? "Finalizando Cadastro..." : "Finalizar Cadastro"} 
      </button>
    </form>
  )
}

export default RegistrationForm