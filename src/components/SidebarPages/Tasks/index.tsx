import React from 'react'
import RegisterList from '../../Lists/TaskList'
import JustifiedRegistersList from '../../Lists/JustifiedTasksList'
import {PassedOnRegistersMain} from './style'

const Tasks = () => {
  return (
    <PassedOnRegistersMain>
        <div className='list-container'>
            <RegisterList /> 
            <JustifiedRegistersList />
        </div>
    </PassedOnRegistersMain>
  )
}

export default Tasks