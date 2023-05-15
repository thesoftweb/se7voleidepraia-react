import styled from "styled-components";

export const Container = styled.div`
height:100%;
background-color: #2D3192;
`;

export const Header = styled.div`
    height: 180px;
    background-color: #2D3192;
    background: linear-gradient(90deg, rgba(45, 49, 146, 1) 25%, rgba(38, 143, 190, 1) 52%, rgba(44, 184, 178, 1) 100%);display: flex;  
    align-items: center;  
    color: white;
    padding: 20px;
    font-family: 'Poppins', sans-serif;
`;

export const H1 = styled.h1``;

export const Lista = styled.div`
    height:1200px;
    display: flex;
    align-items: center;
    justify-content: center;
    `;


export const Perfil = styled.div`
    border: 2px solid #000;
    padding: 20px;
    margin: 25px;
    cursor: pointer;
    display: flex;
    text-decoration: none;
    color: #000;
    background-color: #EEE;
    width: 300px;
    height: 50px;
    align-items: center;

    hover{
        background-color: #666161;
    }
    
    
    `;
export const Img = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 35px;`
    ;

export const Label = styled.label`
    margin-left: 20px;
`;

export const Input = styled.input``;

