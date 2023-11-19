import { getRegisterByNumber, getRegisters } from '@/api/RegisterService'
import RegisterFormSupervisor from '@/components/RegisterFormSupervisor'
import React from 'react'

export async function generateStaticParams() {
    const incidents = await getRegisters()
   
    return incidents.map((incident: IRegister) => ({
        incidentNumber: incident.number,
        number: incident.number,
        task: incident.task,
        sctask: incident.sctask,
        date: incident.date,
        user: incident.user,
        supervisor: incident.supervisor,
        classification: incident.classification,
        system: incident.system,
        fixProc: incident.fixProc,
        observations: incident.observations,
        supervisorObservations: incident.supervisorObservations
    }))
}

export const IncidentInfo = ({ params }: any) => {

  return (
    <RegisterFormSupervisor incidentNumber={params.incidentNumber} />
  )
}

export default IncidentInfo