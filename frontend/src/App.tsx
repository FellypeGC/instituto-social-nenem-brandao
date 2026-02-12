import logoInstituto from "../public/logo-instituto-social.png"
import FormScreen from "./components/FormScreen"

function App() {

  return (
    <>
      {/* Cabeçalho com Logo  */}
      <header className="text-center mb-8">
        {/* Container da Logo: Adicionado flex, justify-center e items-center */}
        <div className="bg-white p-3 rounded-full inline-flex items-center justify-center mb-4 shadow-lg w-32 h-32 overflow-hidden">
          <img 
            className="w-full h-full object-contain" // "object-contain" evita que a logo seja cortada
            src={logoInstituto} 
            alt="Logo do Instituto Social Neném Brandão" 
          />
        </div>

        <h1 className="text-3xl font-bold text-white mb-1">Ficha de Inscrição</h1>
        <p className="text-blue-100 opacity-80">Centro de Projetos Sociais</p>
      </header>
      <FormScreen />
    </>
  )
}

export default App
