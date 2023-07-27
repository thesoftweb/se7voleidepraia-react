import styled from "styled-components";

export const Container = styled.div`
height:100%;
background-color: #white;
`;

export const Header = styled.div`
    height: 180px;
    background-color: white;
    background: white;
    display: flex;  
    align-items: center;  
    color: #2D3192;
    padding: 20px;
    font-family: 'Poppins', sans-serif;
`;

export const H1 = styled.h1`
font-family: 'Poppins', sans-serif;
font-weight: 600;
margin-left:30px;`;

export const Lista = styled.div`
height: 100vh;
display: flex;
flex-direction: column;
border-radius:70px 0 0 0;
background-color:#2D3192;


.cardItem{



    .profile-card {
        font-family: 'Poppins', sans-serif;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .profile-content {
        padding: 20px;
        margin: 10px;
        cursor: pointer;
        display: flex;
        text-decoration: none;
        color: #000;
        background-color: #EEE;
        width: 100%;
        height: 50px;
        align-items: center;
        border-radius: 30px;
    }

    #checkbox1[type="checkbox"] {
        width: 15px;
        height: 20px;
        margin: 20px;
    }
    
    .foto {
        width: 60px;
        height: 60px;
        border-radius: 35px;
    }
    
    .nome {
        margin-left: 20px;
    }
    
}
.marca{
    display: flex;  
    

    align-items: center;

    .label{
        color:white;
        font-family: 'Poppins', sans-serif;
        font-weight: 600;

        
       
    }
    input[type="checkbox"] {
        /* Diminuindo o tamanho do quadrado do checkbox pela metade */
        transform: scale(0.3);
      }
}
@media (max-width: 950px) {


}

`;
export const H2 = styled.h2`

color:white;
font-family: 'Poppins', sans-serif;
font-weight: 600;
margin-left:45px;
margin-top:25px;
`;



