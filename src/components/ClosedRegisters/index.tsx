import React from 'react'
import { ClosedRegistersMain } from './style'
import ClosedRegistersList from '../ClosedRegistersList'
import JustifiedClosedRegistersList from '../JustifiedClosedRegistersList'

const ClosedRegisters = () => {
  return (
    <ClosedRegistersMain>
      <div className='list-container'>
        <ClosedRegistersList />
        <JustifiedClosedRegistersList />
      </div>
    </ClosedRegistersMain>
  )
}

export default ClosedRegisters