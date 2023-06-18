import React from 'react'
import { Link } from 'react-router-dom'
import {IoEyeSharp} from 'react-icons/io5'
import Ticket from './shared/ticket/Ticket'
import Status from './shared/status/Status'

function CollectItem({collect}) {

  return (
    <Ticket>
        <div>{new Date(collect.collectDemandeDate).toLocaleDateString()}</div>
         {collect.collectPoint.partnerName ? (<div>{collect.collectPoint.partnerName}</div>) : ("")}
         {collect.quantityCollected ? (<div>{collect.quantityCollected} KG</div>) : ("")}
         <Status text={collect.status} statusType={collect.status}/>
        <Link className='btn btn-reverse btn-sm' to={`/private/collect-details/${collect._id}`}><IoEyeSharp/> Détails</Link>
    </Ticket>
  )
}

export default CollectItem