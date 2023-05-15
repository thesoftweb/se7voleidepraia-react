import styled from "styled-components";

export const Container = styled.div`
height:100%;
background-color: #0093E9;
`;

export const Header = styled.div`
    height: 180px;
    background-color: #0093E9;
    display: flex;  
    align-items: center;  
    color: white;
    padding: 20px;
    font-family: 'Poppins', sans-serif;
`;

export const Content = styled.div`
height: 100%;
display: flex;
flex-direction: column;
border-radius:70px 0 0 0;
background-color:#2D3192;

`

export const H1 = styled.h1`
margin: 10px auto;
font-family: 'Poppins', sans-serif;
font-weight: 600;
margin-left:30px;

`;
export const H2 = styled.h2`
color:white;
font-family: 'Poppins', sans-serif;
font-weight: 600;
margin-left:45px;
margin-top:25px;
`;
export const Button = styled.button`
    width: 90px;
    height: 50px;
    margin: 10px auto;
    border-radius:15px;
    border: none;
    background-color:#2D3192;
    color: #FFFFFF;
    font-family:'Poppins', sans-serif;
    font-weight:600;
    font-size:16px;
    cursor:pointer;

    &:hover{
        background-color:red;   
    }
`;
