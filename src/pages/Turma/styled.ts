import styled from "styled-components";

export const Container = styled.div`
min-height:100vh;
background-color: white;
`;

export const Header = styled.div`
    height: 80px;
    background-color: white;
    display: flex;  
    align-items: center;  
    color: #2D3192;
    padding: 20px;
    font-family: 'Poppins', sans-serif;
`;

export const Content = styled.div`
min-height: 100vh;
display: flex; 
flex-direction: column;
background-color:#2D3192;

`

export const H1 = styled.h1`
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
