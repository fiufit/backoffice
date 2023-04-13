export function isNull(value: string | boolean | number | null | undefined): boolean {

  return value === null;

}

export function emailIsValid(email: string | null | undefined): boolean {

  // Verifica que el email contenga un "@" y no esté vacío
  if (!email || email.indexOf("@") === -1) {
    return false;
  }

  // Separa el email en la parte local y de dominio
  const [parteLocal, parteDominio] = email.split("@");

  // Verifica que la longitud de la parte local esté entre 1 y 64 caracteres
  if (parteLocal.length < 1 || parteLocal.length > 64) {
    return false;
  }

  // Verifica que la longitud de la parte de dominio esté entre 4 y 255 caracteres
  if (parteDominio.length < 4 || parteDominio.length > 255) {
    return false;
  }

  // Verifica que la longitud total del email no sea mayor a 256 caracteres
  if (email.length > 256) {
    return false;
  }

  // Si todas las verificaciones pasan, el email es válido
  return true;

}

export function passwordIsValid(pass: string | null | undefined): boolean{

    // Verifica que la password no sea null o empty
    if (!pass || pass.length === 0) {
        return false;
    }

    // Verifica que la password tenga entre 6 y 256 caracteres
    if (pass.length < 6 || pass.length > 256) {
        return false;
    }

    return true;

}