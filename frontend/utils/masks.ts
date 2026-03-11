export const maskPhone = (value: string) => {
  if (!value) return "";

  const digits = value
    .replace(/\D/g, "")
    .replace(/(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{5})(\d)/, "$1-$2")
    .slice(0, 15);

  return digits;
}

export const maskCPF = (value: string) => {
  if (!value) return "";

  const digits = value
    .replace(/\D/g, "") // Remove tudo que não é número
    .replace(/(\d{3})(\d)/, "$1.$2") // 000.0
    .replace(/(\d{3})(\d)/, "$1.$2") // 000.000.0
    .replace(/(\d{3})(\d{1,2})/, "$1-$2") // 000.000.000-00
    .replace(/(-\d{2})\d+?$/, "$1");
  
  return digits;
}

export const maskCEP = (value: string) => {
  if (!value) return "";

  const digits = value
    .replace(/\D/g, "")
    .replace(/^(\d{5})(\d)/, "$1-$2")
    .slice(0, 9);
  
  return digits;
}
