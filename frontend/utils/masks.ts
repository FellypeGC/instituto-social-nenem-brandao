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
    .replace(/\D/g, "")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2")
    .slice(0, 14);
  
  return digits;
}
