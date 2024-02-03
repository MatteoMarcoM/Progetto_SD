//import { useState } from 'react'
import useEth from '../../contexts/EthContext/useEth'
//import Title from './Title'
//import Cta from './Cta'
//import Contract from './Contract'
import ContractBtns from './ContractBtns'
//import Desc from './Desc'
import NoticeNoArtifact from './NoticeNoArtifact'
import NoticeWrongNetwork from './NoticeWrongNetwork'

function Demo() {
  const { state } = useEth()

  const demo = (
    <>
      <div className="contract-container">
        <ContractBtns />
      </div>
    </>
  )

  return (
    <div className="demo">
      {!state.artifact ? (
        <NoticeNoArtifact />
      ) : !state.contract ? (
        <NoticeWrongNetwork />
      ) : (
        demo
      )}
    </div>
  )
}

export default Demo
