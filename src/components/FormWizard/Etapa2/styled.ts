import styled from "styled-components";

export const Container = styled.div`
background-color: #2D3192;
height: 100vh;
font-family: 'Poppins', sans-serif;
}
    
`;

export const Content = styled.div`
height: 100vh;
background-color: #2D3192;
display: flex;
align-items: center;
justify-content: center;
flex-direction:column;



.logo{  
    display: flex;  
    align-items: center;  
    flex-direction:column;  
    color: white;
    margin-top:50px;

    @media(max-width: 950px) {
        @media (max-width: 950px) {
            margin-top:-80px;
        }
        text-align: center;
        margin:20px;

        h1{
            font
        }
        p{
            font-size:18px;

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
    height:400px;
    margin-top:30px;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;  
    flex-direction: column; 
    font-size:20px;

   label{
    font-weight: 600;
    font-size:18px;
   }
    input{
        border:none;
        height: 45px;
        width: 280px;
        margin-bottom:20px;
        position: relative;
        border-radius: 30px;
        text-align: center;
        color:#2D3192; 
        
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

export const Form = styled.form`
width:280px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column; 
    
   
    }`;

export const Label = styled.label``;

export const Input = styled.input``;