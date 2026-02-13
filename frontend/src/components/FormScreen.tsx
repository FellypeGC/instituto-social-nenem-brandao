import RegistrationForm from "./RegistrationForm"
import { useState } from "react"

const FormScreen = () => {
  const [isFormVisible, setIsFormVisible] = useState<boolean>(false);
  const [matricula, setMatricula] = useState<string>("");

  const generateSecureMatricula = () => {
    const array = new Uint32Array(1);
    window.crypto.getRandomValues(array);
    // Garante que o número esteja no range de 7 dígitos
    return (1000000 + (array[0] % 9000000)).toString();
  };

  const handleStart = () => {
    // Generates new registration number
    const newMatricula = generateSecureMatricula();
    setMatricula(newMatricula);

    // Changes the state to "true" and shows the form
    setIsFormVisible(true);
  }

  return (
    <main className="w-full max-w-2xl mx-auto">
      {/* <!-- Tela Inicial: Botão de Iniciar --> */}
        {/* If one didn't start: shows the initial screen */}
        {!isFormVisible ? (
            <div className="glass-card p-10 text-center w-full">
              <p className="text-gray-600 mb-8 text-lg">
                Clique no botão abaixo para iniciar uma nova inscrição e gerar uma matrícula única para o aluno.
              </p>
              <button className="btn-gold w-full py-4 rounded-xl text-xl font-semibold shadow-md cursor-pointer uppercase" onClick={handleStart}> 
                Iniciar nova inscrição
              </button>
              <div className="flex flex-col gap-2 mt-8 text-xs text-gray-400 uppercase tracking-widest">
                <p>Sistema interno de controle de matrículas</p>
                <p>Instituto Social Neném Brandão</p>
              </div>
            </div>
          ) : (
            // If started: shows the form
            <div className="glass-card p-10 w-full">
              <div className="flex justify-between items-center mb-6 border-b pb-4">
                <h2 className="text-2xl font-bold text-green-700">Novo Cadastro de Aluno</h2>
                <button className="text-gray-400 hover:text-red-500 cursor-pointer uppercase" onClick={() => setIsFormVisible(false)}>
                  Cancelar
                </button>
              </div>
              <RegistrationForm matricula={matricula} />
            </div>
          )
        }

        {/* <!-- Mensagem de Sucesso --> */}
        <div className="glass-card p-10 text-center w-full">
            <div className="text-green-500 text-6xl mb-4">✓</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Cadastro Realizado!</h2>
            <p className="text-gray-600 mb-6">O aluno foi registrado com sucesso sob a matrícula <span className="font-bold text-blue-900">{matricula}</span>.</p>
            <button className="btn-gold px-8 py-3 rounded-lg font-semibold"> {/* onClick={resetView}  */}
              Voltar ao Início
            </button>
        </div>
    </main>
  )
}

export default FormScreen