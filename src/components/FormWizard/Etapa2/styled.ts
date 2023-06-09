import styled from "styled-components";

export const Container = styled.div`
background-color: #2D3192;
height: 100vh;
font-family: 'Poppins', sans-serif;
} 
`;

export const Content = styled.div`
height: 100vh;
background-color: #F2F2F2;
display: flex;
align-items: center;
justify-content: center;

@media (max-width: 950px) {
    background-color: #2D3192;
}

.Teste{
        
    h1{
        margin-bottom:-20px;
    }

    @media(max-width:950px){   
            text-align:center;
            display:none;   
    }
}
    img{
        width:100px;
        height:100px;
    }
    p{
        margin-top:-20px;
    }
}

form{      
    margin-top:30px;
    color:#2D3192;
    display: flex;
    align-items: center; 
    justify-content: center;  
    flex-direction: column; 
    font-size:15px;
    flex:1;

    @media (max-width: 950px) {
        color:white;

    }

    .InfoMobile{
        display:none;

        @media (max-width: 950px) {
            display:flex;
            align-items:center;
            justify-content:center;
            flex-direction:column;    
            text-align:center;
            
            p{
                font-size:25px;
            }
        }
    }

    .Teste{     
        h1{        
            margin-bottom:20px;
        }
    }

   label{
    font-weight: 600;
    font-size:18px;
   }
    input{
        background-color:#2D3192;
        border:none;
        height: 45px;
        width: 280px;
        margin-bottom:20px;
        position: relative;
        border-radius: 30px;
        text-align: center;
        color:#B2B4DD;  

        @media (max-width: 950px) {
            background-color:white;
        }
        ::placeholder{
            color:#B2B4DD;    
        }
        
    }
    .backButton{
        background-color:red;
            color: white;
            font-size: 14px;
            font-weight: bold;
            padding: 15px 35px;
            border: 0;
            border-radius: 20px;
            cursor: pointer;
            margin-top: 30px;
        
            :hover{
                background-color:grey;
            }
    }
.Buttons{
    margin-bottom:50px;

    .backButton{
        background-color:red;
        color: white;
        font-size: 14px;
        font-weight: bold;
        padding: 15px 35px;
        border: 0;
        border-radius: 20px;
        cursor: pointer;
        margin-right:20px;
        text-decoration: none;
        
        :hover{
            background-color:grey;
        }
    }
    button{
        background-color:#67CCC5;
        color: white;
        font-size: 14px;
        font-weight: bold;
        padding: 15px 35px;
        border: 0;
        border-radius: 20px;
        cursor: pointer;
        
    
        :hover{
            background-color:grey;
        }
    } 
}
`
    ;

