import React from 'react'
import styled from 'styled-components'

class Boton extends React.Component{
    render(){
        const { id, texto } = this.props;

        const Boton = styled.button`
            display: flex;
            flex-direction: row;
            width: 60%;
            justify-content: center;
            align-items: center;
            padding: 15px 38px;
            border-radius: 16px;
            border: 1px solid transparent;
            color: #FFFFFF;
            background-color: #4973ff;
            font-size: 16px;
            letter-spacing: 1px;
            transition: all 0.15s linear;
            cursor: pointer;
            // margin-top: 20vw;
            // margin-left: 15vw;
        
            &:hover {
            background-color: rgba(29, 201, 160, 0.08);
            border-color: #4973ff;
            color: #4973ff;
            transform: translateY(-5px) scale(1.05);
            }
        
            &:active {
            background-color: transparent;
            border-color: #4973ff;
            color: #4973ff;
            transform: translateY(5px) scale(0.95);
            }
        
            &:disabled {
            background-color: rgba(255, 255, 255, 0.16);
            color: #8E8E93;
            border-color: #8E8E93;
            }
        `;

        return(
            <Boton id={id} >
                {texto}
            </Boton>
        )
    }
}
Boton.defaultProps = {
    id: '',
    texto: ''

}
export default Boton