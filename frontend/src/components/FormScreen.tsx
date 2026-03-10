import RegistrationForm from "./RegistrationForm"
import { useState } from "react"

const FormScreen = () => {
  const [matricula, setMatricula] = useState<string>("");
  const [isFormVisible, setIsFormVisible] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const generateSecureMatricula = () => {
    const array = new Uint32Array(1);
    window.crypto.getRandomValues(array);
    // Garante que o número esteja no range de 7 dígitos
    return (1000000 + (array[0] % 9000000)).toString();
  };

  const handleStart = () => {
    const newMatricula = generateSecureMatricula();
    setMatricula(newMatricula);

    setIsFormVisible(true);
  }

  const resetView = () => {
    setIsSubmitted(false);
    setIsFormVisible(false);
    setMatricula("");
  }
  
  /* 
    TODO: hid the success message when clicking on "Voltar ao Início"
  */ 

  return (
    <main className="w-full max-w-2xl mx-auto">
      {/* <!-- Tela Inicial: Botão de Iniciar --> */}
      {/* If one didn't start: shows the initial screen */}

      {/* <!-- Mensagem de Sucesso --> */}
      {isSubmitted ? (
        <div className="glass-card p-10 text-center w-full">
          <div className="text-green-500 text-6xl mb-4">✓</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Cadastro Realizado!
          </h2>
          <p className="text-gray-600 mb-6">
            O aluno foi registrado com sucesso sob a matrícula <span className="font-bold text-blue-900">{matricula}</span>.
          </p>
          <button className="btn-gold px-8 py-3 rounded-lg font-semibold cursor-pointer" onClick={resetView}>
            Voltar ao Início
          </button>
        </div>
      ) : (

        <>
          {!isFormVisible ? (
            <div className="glass-card p-10 text-center w-full bg-[#F8FAFC]">
              <p className="text-gray-600 mb-8 text-lg">
                Clique no botão abaixo para iniciar uma nova inscrição e gerar uma matrícula única para o aluno.
              </p>
              <button
                className="btn-gold w-full py-4 rounded-xl text-xl font-semibold shadow-md cursor-pointer uppercase"
                onClick={handleStart}
              >
                Iniciar nova inscrição
              </button>
              <div className="flex flex-col gap-2 mt-8 text-xs text-gray-400 uppercase tracking-widest">
                <p>Sistema interno de controle de matrículas</p>
                <p>Instituto Social Neném Brandão</p>
              </div>
            </div>
          ) : (
            <div className="glass-card w-full overflow-hidden bg-[#F8FAFC] border border-gray-100">
              <div className="bg-[#ffffff] px-8 py-6 flex justify-between items-center border-b border-gray-100">
                <h2 className="text-xl font-bold text-blue-800">Novo Cadastro de Aluno</h2>
                <button
                  className="text-xs font-bold text-gray-400 hover:text-red-500 cursor-pointer uppercase tracking-tighter"
                  onClick={() => setIsFormVisible(false)}
                >
                  Cancelar
                </button>
              </div>
              <div className="px-8 py-8">
                <RegistrationForm
                  matricula={matricula}
                  onComplete={() => {
                    setIsSubmitted(true);
                    setIsFormVisible(false);
                  }}
                />
              </div>
            </div>
          )}
        </>
      )}
    </main>
  )
}

export default FormScreen