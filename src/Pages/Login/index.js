import React, { useState } from 'react';
import {
    Container,
    Form,
    LoadingOverlay,
    LoadingSpinner,
    SubContainerSign,
} from './styles';
import Input from '../../Components/Input';
import Botao from '../../Components/Botao';
import { validarEmail, validarSenha } from '../../Utils/validadores';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import UserServices from '../../Services/UserService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const userService = new UserServices();

const Loading = () => (
    <LoadingOverlay>
        <LoadingSpinner />
    </LoadingOverlay>
);

const Login = () => {
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            setLoading(true);
            const response = await userService.login(form);
            if (response === true) {
                toast.success('Usuário logado com sucesso!');
                const redirectTo = location.state?.from?.pathname || '/home';
                navigate(redirectTo, { replace: true });
            } else {
                toast.error(
                    'Erro ao realizar o login. Verifique suas credenciais.'
                );
            }
            setLoading(false);
        } catch (err) {
            setLoading(false);
            toast.error(`Algo deu errado com o Login: ${err}`);
        }
    };

    const handleChange = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value });
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter' && validadorInput()) {
            handleSubmit(event);
        }
    };

    const validadorInput = () => {
        return validarEmail(form.email) && validarSenha(form.password);
    };

    return (
        <Container>
            <ToastContainer />
            {loading && <Loading />}
            <Form onKeyDown={handleKeyPress}>
                <h1>Faça seu login</h1>
                <Input
                    name="email"
                    placeholder="Digite o seu e-mail"
                    onChange={handleChange}
                    type="email"
                />
                <Input
                    name="password"
                    placeholder="Digite a sua senha"
                    onChange={handleChange}
                    type="password"
                />
                <Botao
                    type="submit"
                    text="Entrar!"
                    onClick={handleSubmit}
                    disabled={loading === true || !validadorInput()}
                />
                <SubContainerSign>
                    <p>Não é cadastrado?</p>
                    <NavLink to="/cadastrar">Cadastrar</NavLink>
                </SubContainerSign>
            </Form>
        </Container>
    );
};

export default Login;
