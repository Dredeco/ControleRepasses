export const dynamicParams = true
export const revalidate = 60

import { registers } from '@/api/db'
import RegisterForm from '@/components/RegisterForm'
import React from 'react'


export async function generateStaticParams() {
  return registers.map((incident: any) => ({
    numeroChamado: incident.numero_chamado,
  }))
}


const ChamadoInfo = async ({ params }: { params: { numeroChamado: string }}) => {
  
  return (
    <RegisterForm numeroChamado={params.numeroChamado}/>
  )
}

export default ChamadoInfo