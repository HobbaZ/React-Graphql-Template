import styled from "styled-components";

import '../app.css';

export const Button = styled.button`
width: 25%;
align-items: center;
height: auto;
background: rgba(255, 255, 255, 0);
padding: 5px;
font-size: 20px;
margin-bottom: 10px;
margin: 5px;
cursor: pointer;

:hover {
    background: rgb(14, 56, 110);
    color: white;
}

@media (max-width: 700px) {
    width:50%;
    padding: 20px;

  }
`;

export const Container = styled.div`
    width: 90%;
    height: 100%;
    margin: 10px auto;
    justify-content: center;
    display: flex;
    flex-direction: column;
    align-items: center;

    @media (min-width: 800px) {
        width: 60%;
    }
`;

export const IntroContainer = styled.div`

    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100%;
`;

export const IntroText = styled.div`
    display: flex;
    flex-direction: column;
    width: 90%;
    height: 100%;
    padding-bottom: 10vh;
    font-family: 'Fugaz One', cursive;
    font-size: 40px;
    margin: auto;
    align-items: center;
    justify-content: center;
    padding-top:10vh;

    @media (max-width: 620px) {
        flex-direction: column;
        padding-top:25vh;
    }

`;

export const Positive = styled.span`
    color: green;
`;

export const Negative = styled.span`
    color: red;
`;

export const ResultsContainer = styled.div`
    flex-direction: row;
    width: 90%;
    height: auto;
    margin: 30px auto;
    padding: 10px;
    justify-content: center;
    display: flex;
    align-items: center;

    @media (max-width: 800px) {
        flex-direction: column;
        justify-content: center;
        width: 90%;
      }
`;

export const TextBlock = styled.div`
    padding: 10px;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    @media (min-width: 800px) {
        width: 60%;
    }
`;

export const ListBlock = styled.div`
    padding: 10px;
    justify-content: center;
    align-items: center;
`;

export const ListText = styled.p`
    font-weight: 700;
    font-size: 20px;
`;

export const ImageBlock = styled.div`
    padding: 10px;
`;

export const Image = styled.img`
    width: 250px;
    height: auto;
`;

export const FooterStyle = styled.footer`
      width: 100%;
      border-top: black solid 2px;
      padding-top: 10px;
      height: fit-content;
      position: fixed;
      text-align: center;
      bottom:0px;
      left:0;
      background-color: white;

      .fab, .fas {
        padding: 0px 10px;  
        font-size: 25px;
        }
        h4 {
            margin: auto;
        }
        a {
            color:black;
        }
        a :hover {
            pointer:hand;
        }

        @media (max-width: 800px) {
            .fab, .fas {
                padding: 0px 20px; 
                font-size: 30px;
                }
        }
  }
`;