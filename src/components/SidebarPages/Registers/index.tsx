import React from 'react'
import { ClosedRegistersMain } from './style'
import ClosedRegistersList from '../../Lists/ClosedRegistersList'
import JustifiedClosedRegistersList from '../../Lists/JustifiedClosedRegistersList'
import RegistersList from '@/components/Lists/RegistersList'
import JustifiedRegistersList from '@/components/Lists/JustifiedRegistersList'

const Registers = () => {
  return (
    <ClosedRegistersMain>
      <div className='list-container'>
        <RegistersList />
        <JustifiedRegistersList />
      </div>
    </ClosedRegistersMain>
  )
}

export default Registers