import React, { useState, useEffect } from 'react';
import { HashRouter, Route } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import Info from './Info';
import Tasks from './Tasks';
import Add from './Add';
import './App.css';


import { AnimatorGeneralProvider } from '@arwes/animation';
import { BleepsProvider } from '@arwes/sounds';
import { ArwesThemeProvider, StylesBaseline, FrameLines } from '@arwes/core';
import './App.css'
const SOUND_ASSEMBLE_URL = 'https://playground.arwes.dev/assets/sounds/assemble.mp3';

const audioSettings = { common: { volume: 0.25 } };
const playersSettings = { assemble: { src: [SOUND_ASSEMBLE_URL], loop: true } };
const bleepsSettings = { assemble: { player: 'assemble' } };

const App = () => {

  const [activate, setActivate] = React.useState(true);

  const [tarefas, setTarefas] = useState([


  ]);

  useEffect(() => {
    const tarefas = JSON.parse(localStorage.getItem('items'));
    if (tarefas) {
      setTarefas(tarefas);
    }
  }, []);



  const activ = () => {
    setActivate(true);


  }
  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(tarefas));
  }, [tarefas]);



  const handleTaskAdd = (tarefaNome) => {
    const newTarefa = [...tarefas, {
      title: tarefaNome,
      id: uuidv4(),
      completed: false,
      text: '',
    },]


    setTarefas(newTarefa);
  };


  const handleClick = (tarefaId) => {


    const clickTarefa = tarefas.map((tarefa) => {
      if (tarefa.id == tarefaId) return { ...tarefa, completed: !tarefa.completed }

      return tarefa;

    });

    setTarefas(clickTarefa);
  };

  const addTexto = (tarefaId, text) => {


    const tarefaText = tarefas.map((tarefa) => {
      if (tarefa.id == tarefaId) return { ...tarefa, text: text }

      return tarefa;

    });

    setTarefas(tarefaText);
  };


  const handleRemove = (tarefaId) => {

    const removeTarefa = tarefas.filter((tarefa) => tarefa.id != tarefaId)

    setTarefas(removeTarefa);
  };




  return (
    <ArwesThemeProvider>
      <BleepsProvider
        audioSettings={audioSettings}
        playersSettings={playersSettings}
        bleepsSettings={bleepsSettings}
      >
        <StylesBaseline />
        <AnimatorGeneralProvider >
          <HashRouter>
            <div className="container">
              <FrameLines animator={{ activate }}>

                <h2 style={{ marginLeft: 30 }}>Tarefas</h2>


                <Route
                  path="/"
                  exact
                  render={() => (
                    <>
                      <Add handleTaskAdd={handleTaskAdd} />
                      <Tasks tasks={tarefas} addTexto={addTexto} handleClick={handleClick} handleRemove={handleRemove} />
                    </>

                  )} />


                <Route
                  path="/:tarefasId/:tarefasTitulo"
                  exact
                  render={() => (
                    <>
                      <Info tarefas={tarefas} editAct={activate} addTexto={addTexto} />
                    </>
                  )} />


              </FrameLines>
            </div>
          </HashRouter>
        </AnimatorGeneralProvider>
      </BleepsProvider>
    </ArwesThemeProvider>);
};
export default App;