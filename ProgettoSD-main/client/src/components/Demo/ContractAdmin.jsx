import { useRef } from 'react'

function Contract({ value }) {
  const spanEle = useRef(null)

  return (
    <code>
      {`Crea evento `}

      {`GETBALANCE
      withdrawAllFunds

  function read() public view returns (uint256) {
    return value;
  }

  function write(uint256 newValue) public {
    value = newValue;
  }
}`}
    </code>
  )
}

export default Contract
