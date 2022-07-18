import styled from "styled-components";

export const Form = styled.form`
    width: 80%;
    height: 100%;
    display: flex;
    flex-direction: column;
    margin: auto;
    @media (max-width: 500px) {
        width: 80%
      }

      @media (min-width: 700px) {
        width: 50%
      }
`;

export const FormField = styled.input`
    width: 80%;
    height: 30px;
    border-radius: 2px;
    padding: 5px;

    input:valid {
        border: 2px solid black;
    }

    input:invalid {
        border: 2px solid red;
    }
`;

export const Label = styled.label`
	margin-bottom: 5px;
	color: black;
    font-weight: 900;
    display: block;
`;

export const FormGroup = styled.div`
    display: block;
	width: 100%;
    text-align: center;
	margin: 10px auto;
`;

export const FormButton = styled.button`
    width: 50%;
    padding: 5px;
    font-size: 15px;
    margin: 5px;
    cursor: pointer;

    :hover {
        background: rgb(14, 56, 110);
        color: white;
    }

    @media (max-width: 500px) {
        width: 90%
        height: auto;
      }

`

