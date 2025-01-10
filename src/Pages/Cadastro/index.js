import React, { useState } from 'react';
import { Container, Form, SubContainerSign } from './styles';
import Input from '../../Components/Input/index';
import Botao from '../../Components/Botao/index';
import {
    validarEmail,
    validarSenha,
    validarNome,
    validarConfirmarSenha,
} from '../../Utils/validadores';
import UserService from '../../Services/UserService';
import { NavLink, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const userService = new UserService();

const Cadastro = () => {
    const [loading, setLoading] = useState();
    const [form, setForm] = useState([]);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            setLoading(true);
            const { data } = await userService.cadastrar({
                name: form.name,
                email: form.email,
                password: form.password,
                invoiceDay: form.invoiceDay,
            });
            if (data) {
                const responseLogin = await userService.login({
                    email: form.email,
                    password: form.password,
                });
                if (responseLogin === true) {
                    toast.success('Usuário cadastrado com sucesso!');
                    navigate('/home');
                }
            }
            setLoading(false);
        } catch (err) {
            toast.error(`Algo deu errado com o cadastro: ${err}`);
        }
    };

    const handleChange = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value });
    };

    const validadorInput = () => {
        return (
            validarEmail(form.email) &&
            validarSenha(form.password) &&
            validarConfirmarSenha(form.password, form.confirmarPassword) &&
            validarNome(form.name)
        );
    };

    return (
        <Container>
            <ToastContainer />
            <Form>
                <h1>Faça o seu Cadastro</h1>
                <Input
                    name="name"
                    placeholder="Digite o seu nome"
                    onChange={handleChange}
                    type="text"
                />
                <Input
                    name="email"
                    placeholder="Digite o seu e-mail"
                    onChange={handleChange}
                    type="email"
                />
                <Input
                    name="invoiceDay"
                    placeholder="Digite o vencimento da sua fatura"
                    onChange={handleChange}
                    type="number"
                />
                <Input
                    name="password"
                    placeholder="Digite a sua senha"
                    onChange={handleChange}
                    type="password"
                />
                <Input
                    name="confirmarPassword"
                    placeholder="Confirme a sua senha"
                    onChange={handleChange}
                    type="password"
                />

                <Botao
                    type="submit"
                    text="Efetuar Cadastro!"
                    onClick={handleSubmit}
                    disabled={loading === true || !validadorInput()}
                />
                <SubContainerSign>
                    <p>Já possui conta?</p>
                    <NavLink to="*">Login</NavLink>
                </SubContainerSign>
            </Form>
        </Container>
    );
};

export default Cadastro;
