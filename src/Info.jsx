import React,{useState, Component} from 'react';
import Btn from './Btn';

import {useParams, useHistory, useLocation} from 'react-router-dom';
import Input from './Input';


const Info = ({ tarefas, addTexto}) => {

    let tarefatexto = React.createRef();


    


    const containerBotao = {
       marginLeft: 30,
       marginRight: 30,
       width: '40%',
       display: 'flex',
     };

    const btnEdit = {
        marginLeft: 10,
    }
    const tarefasDetalhes = {
        backgroundColor: 'transparent',
        marginLeft: 30,
        marginRight: 30,
        marginTop: 15,
        marginBottom: 15,
        paddingLeft: 15,
        paddingRight: 20,
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 5,


    };
    const tarefasHeader = {
        color: 'rgb(126, 252, 0)',
        marginBottom: 0,
        fontSize: 28,
    }

    const textTarefa = {
            fontSize: 24,
    };

    const changeTarefa = { 
        height: 20,
        marginBottom: 30,
        backgroundColor: '#555',
        borderColor: 'rgb(126, 252, 0)',
        borderRadius: 5,
    }
    const history = useHistory();
    const location = useLocation();
    const Voltar = () => {
        history.goBack();
    }

    


    const [BtnShow, setBtn] = useState(false)
    const params = useParams();

    const getText = tarefas.map((tarefa) => {
        if(tarefa.id == params.tarefasId) 
            return tarefa.text
        
    });

    console.log(getText);
    const texto = getText


    const Salvar = () => {
        addTexto(params.tarefasId, tarefatexto.current.value)
        setBtn(!BtnShow)
    };
    
   
    const Editar = () => {
        setBtn(!BtnShow)

    }

    

    return (
    <> 
        <div style={containerBotao}>
            <Btn btnPallete="secondary" onClick={Voltar}>Voltar</Btn>
    
        <div style={btnEdit}> 

        {BtnShow ?
         
null
       : (
        <Btn onClick={Editar}>Editar</Btn>

       )}

      
        {BtnShow ?
         (
            <Btn btnPallete="success" onClick={Salvar}>Salvar</Btn>

      ) : null}
        </div>
        </div>
        <div style={tarefasDetalhes}>
            <h2 style={tarefasHeader}>{params.tarefasTitulo}</h2>
            <p style={textTarefa}> 
            {texto}
            </p> 
            {BtnShow ?
         (
            <Input reference={tarefatexto} style={changeTarefa} >
               
            </Input>
      ) : null}

         
         
        </div>
    </>
  );
}
 
export default Info;