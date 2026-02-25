import type { RegistrationFormData } from "../../schemas/registrationSchema";
import type { UseFormRegister, FieldErrors, UseFormSetValue, UseFormWatch } from "react-hook-form";
import { maskCPF, maskPhone } from '../../utils/masks';

type StudentInfoProps = {
  register: UseFormRegister<RegistrationFormData>;
  setValue: UseFormSetValue<RegistrationFormData>;
  watch: UseFormWatch<RegistrationFormData>;
  errors: FieldErrors<RegistrationFormData>;
  isMinor: boolean;
}

const StudentInfo = ( { register, setValue, watch, errors, isMinor }: StudentInfoProps ) => {

  const handleCPFChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName: keyof RegistrationFormData) => {
    const { value } = e.target;
    setValue(fieldName, maskCPF(value), { shouldValidate: true});
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName: keyof RegistrationFormData) => {
    const { value } = e.target;
    setValue(fieldName, maskPhone(value), { shouldValidate: true });
  }


  return (
    <>
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
              onChange: (e: React.ChangeEvent<HTMLInputElement>) => handlePhoneChange(e, "telefone")
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
            {!isMinor && watch("dataNascimento") ? <span className="text-red-600">*</span> : null}
          </label>
          <input
            type="text"
            placeholder="123.456.789-10"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
            {...register("cpf", {
              onChange: (e: React.ChangeEvent<HTMLInputElement>) => handleCPFChange(e, "cpf")
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
                  onChange: (e: React.ChangeEvent<HTMLInputElement>) => handlePhoneChange(e, "responsavelTelefone")
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
                  onChange: (e: React.ChangeEvent<HTMLInputElement>) => handleCPFChange(e, "responsavelCpf")
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
    </>
  )
}

export default StudentInfo