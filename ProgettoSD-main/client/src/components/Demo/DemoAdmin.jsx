//import { useState } from 'react'
import useEth from '../../contexts/EthContext/useEth'
//import Title from './Title'
//import Cta from './Cta'
//import ContractAdmin from './ContractAdmin'
import ContractBtnsAdmin from './ContractBtnsAdmin'
//import Desc from './Desc'
import NoticeNoArtifact from './NoticeNoArtifact'
import NoticeWrongNetwork from './NoticeWrongNetwork'
function DemoAdmin() {
  const { state } = useEth()

  const demo = (
    <>
      <div className="contract-container">
        <ContractBtnsAdmin />
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
export default DemoAdmin
