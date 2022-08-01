import React from 'react';
// import { Button } from 'antd';

// import styles from'./styles.css';
import { render } from 'react-dom';
import styled from 'styled-components';

// export default function Login(){

// const Boton = styled.button`

//     display: flex;
//     flex-direction: row;
//     justify-content: center;
//     align-items: center;
//     padding: 15px 38px;
//     border-radius: 16px;
//     border: 1px solid transparent;
//     color: #FFFFFF;
//     background-color: #4973ff;
//     font-size: 16px;
//     letter-spacing: 1px;
//     transition: all 0.15s linear;
//     cursor: pointer;
//     margin-top: 20vw;
//     margin-left: 15vw;

//     &:hover {
//     background-color: rgba(29, 201, 160, 0.08);
//     border-color: #4973ff;
//     color: #4973ff;
//     transform: translateY(-5px) scale(1.05);
//     }

//     &:active {
//     background-color: transparent;
//     border-color: #4973ff;
//     color: #4973ff;
//     transform: translateY(5px) scale(0.95);
//     }

//     &:disabled {
//     background-color: rgba(255, 255, 255, 0.16);
//     color: #8E8E93;
//     border-color: #8E8E93;
//     }
// `;   
//   return(
//     <>
//     <Boton>
//       Iniciar Sesion
//     </Boton>
//     </>

//   )

// }

class Input extends React.Component {
  render() {
    const { id, type, placeholder } = this.props;

    const Container = styled.div`
      display: flex;
      flex-direction: column;
      padding: 25px;
      position: relative;
      width: 100%;
    `;

    const Label = styled.label`
      color: #999;
      font-weight: normal;
      font-size: 1.2em;
      opacity: 0.75;
      order: 1;
      /*outline: 0;*/
      padding-left: 2px;
      pointer-events: none;
      text-shadow: none;
      text-transform: capitalize;
      transform-origin: left top;
      transform: scale(1) translate3d(0, 22px, 0);
      transition: 200ms ease all;
      text-align: left;
    `;

    const Input = styled.input`
      border-radius: 0;
      display: flex;
      font-size: 100%;
      line-height: 25px;
      text-shadow: none;

      border: 0;
      border-bottom: 2px solid rgba(0, 0, 0, 0.15);
      color: #000;
      flex: 1 1 auto;
      order: 2;

      &:focus {
        outline: 0;
        border-bottom: 2px solid rgba(57, 73, 171,0.2);
        // border-top: 2px solid rgba(57, 73, 171,0.2);
        // border-left: 2px solid rgba(57, 73, 171,0.2);
        // border-right:2px solid rgba(57, 73, 171,0.2);
        // border-radius: 8px

      }

      &:not(:focus) {
        color: transparent;
      }

      &:focus + ${Label} {
        color: #3949AB;
        opacity: 1;
        transform: scale(0.8) translate3d(0, 2px, 0);
      }
    `;



    return (
      <Container>
        <Input id={id} type={type} />
        <Label>{placeholder}</Label>
      </Container>
    );
  }
}

Input.defaultProps = {
  id: "",
  type: '',
  placeholder: ""
}

export default Input;