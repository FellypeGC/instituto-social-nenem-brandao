import { useEffect, useMemo, useState } from 'react';
import { useForm, type SubmitHandler, type Resolver } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { calculateAge, schema, type RegistrationFormData } from "../../schemas/registrationSchema";
import StudentInfo from './StudentInfo';
import Steps from './Steps';
import StudentAdditionalInfo from './StudentAdditionalInfo';

/* 
  TODO: 1. add/switch inputs and defaultValues from the business rules in both student and guardian form; 2. transform the form into a multi-step form;
*/

type RegistrationFormProps = {
  matricula: string;
}


const RegistrationForm = ({ matricula }: RegistrationFormProps) => {
  const [currentStep, setCurrentStep] = useState<number>(0);

  const { 
    register, 
    trigger,
    formState: {
      errors,
      isSubmitting
    },
    handleSubmit, 
    watch,
    setValue,
    clearErrors
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
    mode: "onChange",
    reValidateMode: "onChange"
  });

  const birthday = watch("dataNascimento");
  // const displayGuardianForm = calculateAge(birthday);

  const isMinor = useMemo(() => {
    if (!birthday || isNaN(new Date(birthday).getTime())) return false;

    const isAdult = calculateAge(birthday);
    return !isAdult
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

    if (isMinor) {
      clearErrors("cpf")
    }
  }, [isMinor, setValue, clearErrors]);

  const nextStep = async () => {
    let fieldsToValidate: (keyof RegistrationFormData)[] = [];

    if (currentStep === 0) {
      fieldsToValidate = [
        "nome", "email", "telefone", "dataNascimento", "cpf", "rg", "nacionalidade"
      ];

      if(!isMinor) {
        fieldsToValidate.push("cpf");
      }

      if (isMinor) {
        fieldsToValidate.push("responsavelNome", "responsavelCpf", "responsavelRg", "responsavelEmail", "responsavelTelefone", "responsavelDataNascimento", "responsavelNacionalidade");
      }
    }

    const isValid = await trigger(fieldsToValidate);
    if (isValid) setCurrentStep(prev => prev + 1);
  }

  const prevStep = () => setCurrentStep(prev => Math.max(0, prev - 1));
  
  const onSubmit: SubmitHandler<RegistrationFormData> = (data) => console.log(data);


  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      {/* <!-- Campo de Matrícula (Desabilitado) --> */}
      <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
        <label className="block text-sm font-semibold text-blue-800 mb-1">MATRÍCULA GERADA (AUTOMÁTICO):</label>
        <input 
        type="text" disabled value={matricula}
        className="form-input w-full p-3 border-none text-2xl tracking-widest text-center rounded bg-transparent" />
      </div>

      <Steps currentStep={currentStep} />

      {currentStep === 0 && (
        <StudentInfo 
          register={register} 
          setValue={setValue} 
          watch={watch}
          trigger={trigger}
          errors={errors} 
          isMinor={isMinor}
        />
      )}

      {currentStep === 1 && (
        <StudentAdditionalInfo />
      )}

      <div className="flex gap-3 mt-8">
        {currentStep >= 0 && (
          <button 
            type="button" 
            className="border-[1.5px] border-[#e2e8f0] flex-1 py-4 rounded-xl font-bold uppercase text-xs tracking-wider cursor-pointer bg-[#f1f5f9] hover:bg-[#e2e8f0] text-[#64748b] transition-all"
            onClick={prevStep}
          >
            Voltar
          </button>
        )}

        {currentStep < 3 ? (
          <button 
            type="button" 
            className="flex-2 py-4 bg-[#003366] hover:bg-blue-800 text-white rounded-xl font-bold uppercase text-sm tracking-widest shadow-lg transition-all cursor-pointer" 
            onClick={nextStep}
          >
            Próximo
          </button>
        ) : (
          <button 
            type="submit" 
            className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl font-bold text-lg shadow-lg transition-all cursor-pointer"
          >
            {isSubmitting ? "Finalizando Cadastro..." : "Finalizar Cadastro"} 
          </button>
        )}
      </div>

    </form>
  )
}

export default RegistrationForm