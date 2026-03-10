import { useState, useRef, useEffect } from "react";
import type { ActivitiesConsentProps } from "../types/student-info";
import { AVAILABLE_ACTIVITIES_OF_INTEREST } from "../constants/available-activities-of-interest"

const ActivitiesConsent = ({ register, watch, errors }: ActivitiesConsentProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const selectRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) setIsDropdownOpen(false);
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    }
  }, []);

  return (
    <>
      <div ref={selectRef} className="col-span-1 md:col-span-3 mt-8 relative">
        <label className="block text-sm font-bold text-gray-700 mb-2">
          Atividades de Interesse
          <span className="text-red-600">*</span>
        </label>

        <div 
          ref={selectRef}
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="w-full p-3 border rounded-xl bg-[#f8fafc] border-[#e2e8f0] cursor-pointer flex justify-between items-center hover:border-blue-400 transition-all"
        >
          <span className="text-gray-600">
            {watch("atividadesInteresse").length > 0 
              ? `${watch("atividadesInteresse").length} selecionada(s)` 
              : "Selecione as atividades..."}
          </span>
          <svg className={`w-5 h-5 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>

        {isDropdownOpen && (
          <div onClick={(e) => e.stopPropagation()} className="absolute z-10 w-full mt-2 bg-white border border-[#e2e8f0] rounded-xl shadow-xl max-h-60 overflow-y-auto p-2">
            {AVAILABLE_ACTIVITIES_OF_INTEREST.map((activity) => (
              <label 
                key={activity.id} 
                className="flex items-center gap-3 p-3 hover:bg-blue-50 rounded-lg cursor-pointer transition-colors group"
              >
                <input
                  type="checkbox"
                  value={activity.label}
                  className="w-5 h-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                  {...register("atividadesInteresse")}
                />
                <span className="text-sm text-gray-700 group-hover:text-blue-700 font-medium">
                  {activity.label}
                </span>
              </label>
            ))}
          </div>
        )}
        <span className="text-red-600 text-xs mt-1 font-semibold">{errors.atividadesInteresse?.message}</span>
      </div>

      <div className="col-span-1 md:col-span-2 mt-8 p-4 bg-gray-50 border rounded-lg">
        <label className="flex items-start space-x-3 cursor-pointer">
          <input 
            type="checkbox" 
            {...register("lgpdAutorizacao")} 
            className="mt-1 w-5 h-5 text-blue-600 rounded focus:ring-blue-500" 
          />
          <span className="text-sm text-gray-700">
            Autorizo o tratamento dos meus dados para fins de cadastro e participação nas atividades do 
            <strong> Instituto Social Neném Brandão</strong>, conforme a Lei Geral de Proteção de Dados (LGPD).
          </span>
        </label>
        <span className="text-red-600 text-sm block mt-2">{errors.lgpdAutorizacao?.message}</span>
      </div>
    </>
  )
}

export default ActivitiesConsent