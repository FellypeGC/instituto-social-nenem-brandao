import type { UseFormRegister, FieldErrors, UseFormSetValue, UseFormWatch, UseFormTrigger } from "react-hook-form";
import type { RegistrationFormData } from "../../schemas/registrationSchema";

export type StudentInfoProps = {
  register: UseFormRegister<RegistrationFormData>;
  setValue: UseFormSetValue<RegistrationFormData>;
  watch: UseFormWatch<RegistrationFormData>;
  trigger: UseFormTrigger<RegistrationFormData>;
  errors: FieldErrors<RegistrationFormData>;
  isMinor: boolean;
}

export type StudentAdditionalInfoProps = Omit<StudentInfoProps, "watch" | "trigger" | "isMinor">