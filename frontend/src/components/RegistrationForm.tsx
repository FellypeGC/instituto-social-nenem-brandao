import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";


const RegistrationForm = () => {
  
  const generateMatricula = () => Math.floor(1000000000 * Math.random() * 9000000000).toString();

  return (
    <form id="registrationForm" className="space-y-6"> {/* onSubmit={handleFormSubmit} */}
      {/* <!-- Campo de Matrícula (Desabilitado) --> */}
      <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
        <label className="block text-sm font-semibold text-blue-800 mb-1">MATRÍCULA GERADA (AUTOMÁTICO):</label>
        <input 
        type="text" id="matriculaInput" disabled 
        className="form-input w-full p-3 border-none text-2xl tracking-widest text-center rounded bg-transparent" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="col-span-1 md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">Nome Completo *</label>
          <input type="text" required placeholder="Seu nome completo" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none" />
        </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email *</label>
            <input type="email" required placeholder="seu.email@exemplo.com" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Telefone *</label>
            <input type="text" required placeholder="(XX) XXXXX-XXXX" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Data de Nascimento *</label>
            <input type="date" required className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">CPF *</label>
            <input type="text" required placeholder="000.000.000-00" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none" />
          </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Experiência com Samba *</label>
        <select required className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none bg-white">
          <option value="">Selecione sua experiência</option>
          <option value="iniciante">Iniciante</option>
          <option value="intermediario">Intermediário</option>
          <option value="avancado">Já desfilou antes</option>
        </select>
      </div>

      <button 
        type="submit" 
        className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl font-bold text-lg shadow-lg transition-all"
      >
        Finalizar Cadastro
      </button>
    </form>
  )
}

export default RegistrationForm