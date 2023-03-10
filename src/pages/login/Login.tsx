// @ts-nocheck
import React, { useEffect, useState } from "react"
import { Box} from "@mui/material"
import { Link, useNavigate } from "react-router-dom"
import { styled } from '@mui/material/styles';
import { useDispatch} from 'react-redux';
import ButtonLogin from "../../components/buttons/ButtonLogin"
import InputForm from "../../components/inputForm/InputForm"
import { loginUser } from "../../store/modules/usuariosSlice";
import { useAppSelector } from "../../store/hooks";

const ContainerStyle = styled(Box)(() => ({
    height: '100vh',
    background: '#242452',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
}))

const DivStyle = styled(Box)(() => ({
    minHeight: '200px',
    width: '390px',
    background: 'aliceblue',
    boxSizing: 'border-box',
    padding: '32px',
    borderRadius: '20px', 
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',

}))

export function Login(): JSX.Element {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()

    let navigate = useNavigate()

    const logCheck = useAppSelector((state) => state.usuarios.logged);

    function checkUsuario() {
        dispatch(loginUser({
            email,
            password,
        }))
    }

    useEffect(() => {
        const usuarioLogado = sessionStorage.getItem("logado")
        if(usuarioLogado) navigate("/home")
    }, []);

    useEffect(() => {
        if(logCheck) {
            sessionStorage.setItem("logado", email)
            navigate("/home")
        }
    }, [logCheck])

    return (
        <ContainerStyle>
            <DivStyle>
                <InputForm value={email} type="text" label='Email' onChange={(e)=>setEmail(e.target.value)}/>
                <InputForm value={password} type="password" label='Password' onChange={(e)=>setPassword(e.target.value)}/>
                <ButtonLogin  onClick={(e) => {
                e.preventDefault();
                checkUsuario();
              }} />
                <Link style={{ textDecoration: 'none', marginTop: '15px', color: '#242452'}} to={"/cadastro"}>Criar conta</Link>
            </DivStyle>
        </ContainerStyle>
    )
}