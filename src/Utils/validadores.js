const validarEmail = (email) => {
    return email?.toString().includes('@') && email?.toString().includes('.');
};

const validarSenha = (senha) => {
    return senha?.toString().length > 6;
};

const validarNome = (name) => {
    return name?.toString().length > 3;
};

const validarConfirmarSenha = (senha, confirmarSenha) => {
    return validarSenha(senha) && senha === confirmarSenha;
};

export { validarEmail, validarSenha, validarNome, validarConfirmarSenha };
