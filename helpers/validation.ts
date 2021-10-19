export const checkIfEmailEmpty = (
  email: string | undefined
): email is undefined => !email || email.trim() === '' || !email.includes('@');

export const checkIfStringEmpty = (
  value: string | undefined
): value is undefined => !value || value.trim() === '';
