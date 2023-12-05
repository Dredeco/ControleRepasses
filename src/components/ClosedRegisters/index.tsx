import React from 'react'
import { ClosedRegistersMain } from './style'
import ClosedRegistersList from '../Lists/ClosedRegistersList'
import JustifiedClosedRegistersList from '../Lists/JustifiedClosedRegistersList'

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