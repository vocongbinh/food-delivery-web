export function validatePassword(value: string) {
  const passwordCheck = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
  return passwordCheck.test(value) && value !== "";
}
