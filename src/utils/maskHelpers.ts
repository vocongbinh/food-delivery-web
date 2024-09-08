import { maskEmail2, EmailMask2Options } from "maskdata";
const emailMaskOptions: EmailMask2Options = {
  maskWith: "*",
  unmaskedStartCharactersBeforeAt: 0,
  unmaskedEndCharactersAfterAt: 257,
  maskAtTheRate: false,
};
export function maskEmail(email: string): string {
  return maskEmail2(email, emailMaskOptions);
}
