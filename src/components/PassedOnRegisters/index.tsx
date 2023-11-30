import React from 'react'
import RegisterList from '../RegisterList'
import JustifiedRegistersList from '../JustifiedRegistersList'
import {PassedOnRegistersMain} from './style'

const PassedOnRegisters = () => {
  return (
    <PassedOnRegistersMain>
        <div className='list-container'>
            <RegisterList /> 
            <JustifiedRegistersList />
        </div>
    </PassedOnRegistersMain>
  )
}

export default PassedOnRegisters