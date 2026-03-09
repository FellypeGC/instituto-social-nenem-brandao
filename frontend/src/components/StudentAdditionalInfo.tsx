import type { RegistrationFormData } from "../../schemas/registrationSchema";
import type { StudentAdditionalInfoProps } from "../types/student-info";
import { maskPhone } from "../../utils/masks";

const StudentAdditionalInfo = ({ register, setValue, errors }: StudentAdditionalInfoProps) => {
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName: keyof RegistrationFormData) => {
    const { value } = e.target;
    setValue(fieldName, maskPhone(value), { shouldValidate: true });
  }

  return (
    <>
      <h2 className="text-xl font-bold text-gray-700 col-span-1 md:col-span-2 mt-6">Dados Escolares</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 col-span-1 md:col-span-2">
        {/* Nome da Escola */}
        <div className="col-span-1 md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">Nome da Escola
            <span className="text-red-600">*</span>
          </label>
          <input type="text" {...register("escolaNome")} className="w-full p-3 border rounded-lg focus:ring-2 outline-none" placeholder="Nome da instituição" />
          <span className="text-red-600 text-xs">{errors?.escolaNome?.message}</span>
        </div>

        {/* Tipo e Turno */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Tipo
            <span className="text-red-600">*</span>
          </label>
          <select {...register("escolaTipo")} className="w-full p-3 border rounded-lg focus:ring-2 outline-none">
            <option value="">Selecione...</option>
            <option value="Publica">Pública</option>
            <option value="Privada">Privada</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Turno
            <span className="text-red-600">*</span>
            </label>
          <select {...register("escolaTurno")} className="w-full p-3 border rounded-lg focus:ring-2 outline-none">
            <option value="">Selecione...</option>
            <option value="Matutino">Matutino</option>
            <option value="Vespertino">Vespertino</option>
            <option value="Noturno">Noturno</option>
          </select>
        </div>

        {/* Série e Turma */}
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Série/Ano
              <span className="text-red-600">*</span>
              </label>
            <input type="text" {...register("escolaSerie")} className="w-full p-3 border rounded-lg focus:ring-2 outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Turma
              <span className="text-red-600">*</span>
            </label>
            <input type="text" {...register("escolaTurma")} className="w-full p-3 border rounded-lg focus:ring-2 outline-none" />
          </div>
        </div>

        {/* Média e Frequência */}
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Média Geral
              <span className="text-red-600">*</span>
            </label>
            <input type="number" step="0.1" {...register("mediaGeral")} className="w-full p-3 border rounded-lg focus:ring-2 outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Frequência (%)
              <span className="text-red-600">*</span>
            </label>
            <input type="number" {...register("frequenciaEscolar")} className="w-full p-3 border rounded-lg focus:ring-2 outline-none" />
          </div>
        </div>

        {/* Uploads */}
        <div className="col-span-1 md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Boletim Escolar
              <span className="text-red-600">*</span>
            </label>
            <input type="file" {...register("boletimEscolar")} className="w-full p-2 border border-dashed rounded-lg bg-gray-50 cursor-pointer" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Declaração de Matrícula
              <span className="text-red-600">*</span>
            </label>
            <input type="file" {...register("declaracaoMatricula")} className="w-full p-2 border border-dashed rounded-lg bg-gray-50 cursor-pointer" />
          </div>
        </div>

        {/* Telefone Escola */}
        <div className="col-span-1 md:col-span-2 md:mx-auto">
          <label className="block text-sm font-medium text-gray-700">
            Telefone da Escola
            <span className="text-red-600">*</span>
          </label>
          <input type="text" {...register("escolaTelefone")} onChange={(e) => handlePhoneChange(e, "escolaTelefone")} className="w-full p-3 border rounded-lg focus:ring-2 outline-none" placeholder="(00) 0000-0000" />
        </div>
      </div>

      <hr />
      <h2 className="text-xl font-bold text-gray-700 col-span-1 md:col-span-2 mt-8">Saúde</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 col-span-1 md:col-span-2">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Possui restrição médica?
            <span className="text-red-600">*</span>
          </label>
          <select {...register("restricaoMedica")} className="w-full p-3 border rounded-lg focus:ring-2 outline-none">
            <option value="">Selecione...</option>
            <option value="Não">Não</option>
            <option value="Sim">Sim</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Usa medicação contínua?
            <span className="text-red-600">*</span>  
          </label>
          <select {...register("medicacaoContinua")} className="w-full p-3 border rounded-lg focus:ring-2 outline-none">
            <option value="">Selecione...</option>
            <option value="Não">Não</option>
            <option value="Sim">Sim</option>
          </select>
        </div>

        <div className="col-span-1 md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">
            Possui deficiência? (Especifique)
            <span className="text-red-600">*</span>
          </label>
          <input type="text" {...register("deficiencia")} placeholder="Caso não possua, digite 'Não'" className="w-full p-3 border rounded-lg focus:ring-2 outline-none" />
        </div>

        <div className="col-span-1 md:col-span-2 md:mx-auto">
          <label className="block text-sm font-medium text-gray-700">
            Contato de Emergência
            <span className="text-red-600">*</span>
          </label>
          <input type="text" {...register("contatoEmergencia")} onChange={(e) => handlePhoneChange(e, "contatoEmergencia")} className="w-full p-3 border rounded-lg focus:ring-2 outline-none" placeholder="(00) 00000-0000" />
        </div>
      </div>

      <hr />
      <h2 className="text-xl font-bold text-gray-700 col-span-1 md:col-span-2 mt-8">Socioeconômico</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 col-span-1 md:col-span-2">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Renda Familiar
            <span className="text-red-600">*</span>
          </label>
          <select {...register("rendaFamiliar")} className="w-full p-3 border rounded-lg focus:ring-2 outline-none">
            <option value="">Selecione a faixa...</option>
            <option value="Ate 1 salario">Até 1 salário mínimo</option>
            <option value="1 a 3 salarios">1 a 3 salários mínimos</option>
            <option value="Mais de 3 salarios">Mais de 3 salários mínimos</option>
          </select>
        </div>

        <div>
          <label className="block text-[13.5px] font-medium text-gray-700 whitespace-nowrap">
            Nº de Pessoas na Residência
            <span className="text-red-600">*</span>  
          </label>
          <input type="number" {...register("residentesQuantidade")} className="w-full p-3 border rounded-lg focus:ring-2 outline-none" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Recebe benefício social?
            <span className="text-red-600">*</span>
          </label>
          <select {...register("beneficioSocial")} className="w-full p-3 border rounded-lg focus:ring-2 outline-none">
            <option value="Não">Não</option>
            <option value="Bolsa Família">Bolsa Família</option>
            <option value="BPC">BPC</option>
            <option value="Outros">Outros</option>
          </select>
        </div>
      </div>
    </>
  )
}

export default StudentAdditionalInfo