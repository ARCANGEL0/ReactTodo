import React from 'react'
import Task from './Task';


const Tasks = ({ tasks, handleClick, handleRemove, addTexto }) => {

    return (
        <>
            {tasks.map((task) => (
                <Task task={task} addTexto={addTexto} handleClick={handleClick} handleRemove={handleRemove} />
            ))}
        </>

    );
};

export default Tasks;