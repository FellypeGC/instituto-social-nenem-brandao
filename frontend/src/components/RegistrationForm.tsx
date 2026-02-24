import { useEffect, useMemo, useState } from 'react';
import { useForm, type SubmitHandler, type Resolver } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { calculateAge, schema, type RegistrationFormData} from "../../schemas/registrationSchema";
import StudentInfo from './StudentInfo';
import Steps from './Steps';

/* 
  TODO: 1. add/switch inputs and defaultValues from the business rules in both student and guardian form; 2. transform the form into a multi-step form;
*/

type RegistrationFormProps = {
  matricula: string;
}


const RegistrationForm = ({ matricula }: RegistrationFormProps) => {
  const [currentStep, setCurrentStep] = useState<number>(1);

  const { 
    register, 
    formState: {
      errors,
      isSubmitting
    },
    handleSubmit, 
    watch,
    setValue,
  } = useForm<RegistrationFormData>({
    defaultValues: {
      nome: "",
      email: "",
      telefone: "",
      dataNascimento: undefined as Date | undefined,
      cpf: "",
      rg: "",
      nacionalidade: "",
      responsavelNome: "",
      responsavelCpf: "",
      responsavelRg: "",
      responsavelEmail: "",
      responsavelTelefone: "",
      responsavelDataNascimento: undefined as Date | undefined,
      responsavelNacionalidade: "",
    },
    resolver: yupResolver(schema) as Resolver<RegistrationFormData>,
  });

  const birthday = watch("dataNascimento");
  const displayGuardianForm = calculateAge(birthday);

  const isMinor = useMemo(() => {
    if (!birthday) return false;
    return !displayGuardianForm
  }, [birthday]);

  useEffect(() => {
    if (!isMinor) {
      // Lista de campos para limpar
      const fields = [
        "responsavelNome", "responsavelCpf", "responsavelRg", 
        "responsavelEmail", "responsavelTelefone", "responsavelNacionalidade"
      ] as const;
      
      fields.forEach(campo => setValue(campo, ""));
    }
  }, [isMinor, setValue]);
  
  const onSubmit: SubmitHandler<RegistrationFormData> = (data) => console.log(data);


  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      {/* <!-- Campo de Matrícula (Desabilitado) --> */}
      <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
        <label className="block text-sm font-semibold text-blue-800 mb-1">MATRÍCULA GERADA (AUTOMÁTICO):</label>
        <input 
        type="text" id="matriculaInput" disabled value={matricula}
        className="form-input w-full p-3 border-none text-2xl tracking-widest text-center rounded bg-transparent" />
      </div>

      <Steps />

      <StudentInfo 
        register={register} 
        errors={errors} 
        setValue={setValue} 
        isMinor={isMinor}
      />

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