import styled from "styled-components";

export const Container = styled.div`
background-image:url('https://img.freepik.com/fotos-gratis/vista-lateral-de-mulher-e-homem-jogando-volei-de-praia_23-2148662639.jpg?w=740&t=st=1685406562~exp=1685407162~hmac=504e7bdf15d287a997a05d9744a741fb49173ff4fb2279fb20870f4f6492f365');
background-size: 100% 100%;
width: 100%;
height: 100vh;
color: white;
position: relative;
z-index: 1;

::after {
    content: '';
    background-color: black;
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    opacity: .8;
    z-index: -1;
}
`;

export const FormGeral = styled.form`
width:100%;
height:100%;
display: flex;
align-items: center;
justify-content: center;  
    flex-direction: column; 
`;

export const Action = styled.div`
margin-top:1rem;
display: flex;
gap:.5rem;
justify-content: flex-end;

`;