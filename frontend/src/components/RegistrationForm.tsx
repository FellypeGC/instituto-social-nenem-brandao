import { useEffect, useMemo, useState } from 'react';
import { useForm, type Resolver } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { calculateAge, schema, type RegistrationFormData } from "../../schemas/registrationSchema";
import StudentInfo from './StudentInfo';
import Steps from './Steps';
import StudentAdditionalInfo from './StudentAdditionalInfo';
import ActivitiesConsent from './ActivitiesConsent';


type RegistrationFormProps = {
  matricula: string;
}


const RegistrationForm = ({ matricula }: RegistrationFormProps) => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const isLastStep = currentStep === 2;

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
      nomeSocial: "",
      email: "",
      telefone: "",
      dataNascimento: undefined as Date | undefined,
      cpf: "",
      rg: "",
      sexo: "",
      nacionalidade: "",
      responsavelNome: "",
      responsavelCpf: "",
      responsavelRg: "",
      responsavelEmail: "",
      responsavelTelefone: "",
      responsavelDataNascimento: undefined as Date | undefined,
      responsavelNacionalidade: "",
      responsavelEstado: "",
      responsavelCidade: "",
      responsavelCep: "",
      responsavelRua: "",
      responsavelBairro: "",
      responsavelNumero: "",
      responsavelUf: "",
      responsavelComplemento: "",
      escolaNome: "",
      escolaTipo: "",
      escolaSerie: "",
      escolaTurma: "",
      escolaTelefone: "",
      mediaGeral: undefined as number | undefined,
      frequenciaEscolar: undefined as number | undefined,
      boletimEscolar: undefined as File | undefined,
      declaracaoMatricula: undefined as File | undefined,
      restricaoMedica: "",
      medicacaoContinua: "",
      deficiencia: "",
      contatoEmergencia: "",
      atividadesInteresse: [] as string[],
      lgpdAutorizacao: false,
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
      "responsavelEmail", "responsavelTelefone", "responsavelDataNascimento", "responsavelNacionalidade", "responsavelCep", "responsavelRua", "responsavelBairro", 
      "responsavelNumero", "responsavelCidade", "responsavelEstado"
      ] as const;
      
      fields.forEach(campo => {
        setValue(campo, "");
        clearErrors(campo);
      });
    }

    if (isMinor) {
      clearErrors("cpf")
    }
  }, [isMinor, setValue, clearErrors]);

  // const onSubmit: SubmitHandler<RegistrationFormData> = async (data) => console.log(data);

  const nextStep = async () => {
    let fieldsToValidate: (keyof RegistrationFormData)[] = [];

    if (currentStep === 0) {
      fieldsToValidate = [
        "nome", "nomeSocial", "email", "telefone", "dataNascimento", "cpf", "rg", "nacionalidade", "sexo"
      ];

      if(!isMinor) {
        fieldsToValidate.push("cpf");
      }

      if (isMinor) {
        fieldsToValidate.push("responsavelNome", "responsavelCpf", "responsavelRg", "responsavelEmail", "responsavelTelefone", "responsavelDataNascimento", "responsavelNacionalidade", "responsavelEstado", "responsavelCidade", "responsavelCep", "responsavelRua", "responsavelBairro", "responsavelNumero", "responsavelUf", "responsavelComplemento");
      }
    } else if (currentStep === 1) {
      fieldsToValidate = ["escolaNome", "escolaTipo", "escolaSerie", "escolaTurma", "escolaTelefone", "mediaGeral", "frequenciaEscolar", "boletimEscolar", "declaracaoMatricula", "restricaoMedica", "medicacaoContinua", "deficiencia", "contatoEmergencia", "rendaFamiliar", "residentesQuantidade", "beneficioSocial"]
    } else if (isLastStep) {
      fieldsToValidate = ["atividadesInteresse", "lgpdAutorizacao"]
    }

    const isValid = await trigger(fieldsToValidate);
    if (!isValid) return;

    if (!isLastStep) {
      setCurrentStep(prev => prev + 1);
    } else {
      await handleSubmit(
        async (data) => {
          console.log("Sucesso! Dados prontos para envio:", data);
        }, (errors) => {
          console.log("Erro de validação final:", errors);
        }
      )();
    }
  }

  const prevStep = () => setCurrentStep(prev => Math.max(0, prev - 1));

  return (
    <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
      {/* <!-- Campo de Matrícula (Desabilitado) --> */}
      <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
        <label className="block text-sm font-semibold uppercase text-blue-800 mb-1">Matrícula do aluno:</label>
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
        <StudentAdditionalInfo
          register={register}
          setValue={setValue}
          errors={errors}
        />
      )}

      {isLastStep && (
        <ActivitiesConsent 
          register={register}
          watch={watch}
          errors={errors}
        />
      )}

      <div className="flex gap-3 mt-8">
        {currentStep >= 0 && (
          <button 
            type="button" 
            className="border-[1.5px] border-[#e2e8f0] flex-1 py-4 rounded-xl font-bold uppercase text-xs tracking-wider cursor-pointer bg-[#f1f5f9] hover:bg-[#e2e8f0] text-[#64748b] transition-all disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400"
            onClick={prevStep}
            disabled={currentStep === 0 || isSubmitting}
          >
            Voltar
          </button>
        )}

        <button 
          type="button" 
          className={`flex-2 py-4 ${isLastStep ? "bg-green-600 hover:bg-green-700" : "bg-[#003366] hover:bg-blue-800"} text-white rounded-xl font-bold uppercase text-sm tracking-widest shadow-lg transition-all cursor-pointer`}
          onClick={nextStep}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Enviando" : isLastStep ? "Finalizar" : "Próximo"}
        </button>
      </div>

    </form>
  )
}

export default RegistrationForm