import { useEffect, useMemo } from 'react';
import { maskCPF, maskPhone } from '../../utils/masks';
import { useForm, type SubmitHandler, type Resolver } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as registrationSchema from "../../schemas/registrationSchema";

/* 
  TODO: 1. add/switch inputs and defaultValues from the business rules in both student and guardian form; 2. transform the form into a multi-step form;
*/

type RegistrationFormProps = {
  matricula: string;
}

type Inputs = {
  nome: string;
  email: string | null;
  telefone: string;
  dataNascimento: Date; 
  cpf: string;
  rg: string | null;
  nacionalidade: string | null;
  responsavelNome: string;
  responsavelCpf: string;
  responsavelRg: string;
  responsavelEmail: string | null;
  responsavelTelefone: string;
  responsavelDataNascimento: Date;
  responsavelNacionalidade: string | null;
}


const RegistrationForm = ({ matricula }: RegistrationFormProps) => {
  const { 
    register, 
    formState: {
      errors,
      isSubmitting
    },
    handleSubmit, 
    watch,
    setValue,
  } = useForm<Inputs>({
    defaultValues: {
      nome: "",
      email: "",
      telefone: "",
      dataNascimento: undefined,
      cpf: "",
      rg: "",
      nacionalidade: "",
      responsavelNome: "",
      responsavelCpf: "",
      responsavelRg: "",
      responsavelEmail: "",
      responsavelTelefone: "",
      responsavelDataNascimento: undefined,
      responsavelNacionalidade: "",
    },
    resolver: yupResolver(registrationSchema.schema) as unknown as Resolver<Inputs>,
  });

  const birthday = watch("dataNascimento");
  const displayGuardianForm = registrationSchema.calculateAge(birthday);

  const isMinor = useMemo(() => {
    if (!birthday) return false;
    return !displayGuardianForm
  }, [birthday]);

  useEffect(() => {
    if (!isMinor) {
      setValue("responsavelNome", "");
      setValue("responsavelCpf", "");
      setValue("responsavelRg", "");
      setValue("responsavelEmail", "");
      setValue("responsavelTelefone", "");
      setValue("responsavelNacionalidade", "");
    }
  }, [isMinor]);
  
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  const handleCPFChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setValue("cpf", maskCPF(value), { shouldValidate: true});
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setValue("telefone", maskPhone(value), { shouldValidate: true });
  }


  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      {/* <!-- Campo de Matrícula (Desabilitado) --> */}
      <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
        <label className="block text-sm font-semibold text-blue-800 mb-1">MATRÍCULA GERADA (AUTOMÁTICO):</label>
        <input 
        type="text" id="matriculaInput" disabled value={matricula}
        className="form-input w-full p-3 border-none text-2xl tracking-widest text-center rounded bg-transparent" />
      </div>

      <h1 className="text-2xl font-bold text-gray-700">Identificação do Aluno</h1>

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

        {/* EMAIL */}
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

        {/* TELEFONE */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Telefone 
            <span className="text-red-600">*</span>
          </label>
          <input 
            type="text"
            placeholder="(XX) XXXXX-XXXX" 
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
            {...register("telefone", {
              onChange: (e) => handlePhoneChange(e)
            })}
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
            {...register("cpf", {
              onChange: (e) => handleCPFChange(e)
            })}
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

      {isMinor && (
        <div>
          <hr />
          <h1 className="text-2xl font-bold text-gray-700 mb-6 mt-6">Identificação do Responsável</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* NOME */}
            <div className="col-span-1 md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">
                Nome Completo
                <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                placeholder="Digite seu nome completo"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
          
                {...register("responsavelNome")}
              />
              <span className="text-red-600">{errors.responsavelNome?.message}</span>
            </div>

            {/* EMAIL */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                placeholder="seu.email@exemplo.com"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                {...register("responsavelEmail")}
              />
              <span className="text-red-600">{errors.responsavelEmail?.message}</span>
            </div>

            {/* TELEFONE */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Telefone
                <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                placeholder="(XX) XXXXX-XXXX"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                {...register("responsavelTelefone", {
                  onChange: (e) => handlePhoneChange(e)
                })}
              />
              <span className="text-red-600">{errors.responsavelTelefone?.message}</span>
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
                {...register("responsavelDataNascimento")}
              />
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
                {...register("responsavelCpf", {
                  onChange: (e) => handleCPFChange(e)
                })}
              />
              <span className="text-red-600">{errors.responsavelCpf?.message}</span>
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
                {...register("responsavelRg")}
              />
              <span className="text-red-600">{errors.responsavelRg?.message}</span>
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
                {...register("responsavelNacionalidade")}
              />
              <span className="text-red-600">{errors.responsavelNacionalidade?.message}</span>
            </div>
          </div>
        </div>
      )}

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