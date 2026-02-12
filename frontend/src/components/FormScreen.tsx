import RegistrationForm from "./RegistrationForm"


const FormScreen = () => {
  return (
    <main className="w-full max-w-2xl">
      {/* <!-- Tela Inicial: Botão de Iniciar --> */}
        <div id="startScreen" className="glass-card p-10 text-center">
          <p className="text-gray-600 mb-8 text-lg">
            Clique no botão abaixo para iniciar uma nova inscrição e gerar uma matrícula única para o aluno.
          </p>
          <button className="btn-gold w-full py-4 rounded-xl text-xl font-semibold shadow-md cursor-pointer uppercase"> 
            Iniciar nova inscrição
          </button>
          <div className="mt-8 text-xs text-gray-400 uppercase tracking-widest">
            <p>Grêmio Recreativo Escola de Samba União de Sepetiba</p>
            <p>Sistema interno de controle de matrículas</p>
          </div>
        </div>

        {/* <!-- Tela de Formulário (Oculta inicialmente) --> */}
        <div id="formScreen" className="glass-card p-8 hidden">
          <div className="flex justify-between items-center mb-6 border-b pb-4">
            <h2 className="text-2xl font-bold text-green-700">Novo Cadastro de Aluno</h2>
            <button className="text-gray-400 hover:text-red-500"> {/* onClick={resetView}  */}
              Cancelar
            </button>
          </div>
          <RegistrationForm />
        </div>


        {/* <!-- Mensagem de Sucesso --> */}
        <div id="successMessage" className="glass-card p-10 text-center hidden">
            <div className="text-green-500 text-6xl mb-4">✓</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Cadastro Realizado!</h2>
            <p className="text-gray-600 mb-6">O aluno foi registrado com sucesso sob a matrícula <span id="finalMatricula" className="font-bold text-blue-900"></span>.</p>
            <button className="btn-gold px-8 py-3 rounded-lg font-semibold"> {/* onClick={resetView}  */}
              Voltar ao Início
            </button>
        </div>
    </main>
  )
}

export default FormScreen