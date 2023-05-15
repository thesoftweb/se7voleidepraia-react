import styled from "styled-components";

export const Container = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background-color: #2D3192;
    
`;
export const Logo = styled.div`
    margin-bottom:40px;

    @media (max-width: 950px) {
        margin-bottom:80px;
    }
`;

export const Img = styled.img`
    width:200px;
    height:200px;

    @media (max-width: 950px) {
        width:250px;
        height:300px;
    }
`;

export const Formulario = styled.div`
    display: flex;
    flex-direction: column;

    @media (max-width: 950px) {
    
            width: 70%;
        
    }
`;

export const Input = styled.input`
    margin-bottom: 5px;
    padding: 10px;
    border: none;
    text-decoration: none;
    border-radius: 12px;
    background-color:#96958a;

    ::placeholder {
        color: black;
        font-weight:bold;
    }

    @media (max-width: 950px) {
        padding: 20px;
    }
`;

export const Button = styled.button`
    border: none;
    text-decoration: none;
    cursor: pointer;
    padding: 10px;
    border-radius: 12px;
    transition: background .3s;
    background-color: ;
    font-weight: bolder;

    @media (max-width: 950px) {
        padding: 20px;
        margin-top: 10px;
    }
`;