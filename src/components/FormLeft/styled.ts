import styled from "styled-components";

export const Content = styled.div`
width: 50%;

@media (max-width: 950px) {
    display: none;

    .formLeft{
        display:none;
    }      
}

.formLeft{ 
    display:flex;
    justify-content:center;
    height:100vh;
    background-color:#2D3192;
    border-radius:0 1218px 1260px 0 ;
    flex:1;
    color:white;
    text-align:center;
    flex-direction:column;
    
    img{
        margin-bottom:100px; 
        width:120px;
        height:120px;
    }
    h1{
        margin-top:-80px; 
    }   
}

`;