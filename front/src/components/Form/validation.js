export const validate = (inputs) => {

    let errors = {};

    const regexUsername = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    const regexPassword = /\d/;

    if (!regexUsername.test(inputs.username)) errors.username = "El username debe ser un email."
    if (!inputs.username) errors.username = "El username no puede estar vacío."
    if (inputs.username.length > 35) errors.username = "El username no puede tener más de 35 caracteres."

    if (!regexPassword.test(inputs.password)) errors.password = "El password debe tener al menos 1 número."
    if (inputs.password.length <= 5) errors.password = "El password debe medir al menos 6 caracteres."
    if (inputs.password.length > 10) errors.password = "El password no debe medir más de 10 caracteres."

    return errors;
}