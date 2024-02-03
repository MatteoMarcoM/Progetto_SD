import { useEffect, useState } from 'react'
import useEth from '../../contexts/EthContext/useEth'
import Web3 from 'web3'

/*ATTENZIONE: CONTROLLARE I PREZZI DEI METODI INSIEME A MATTEO E CONTROLLARE ANCHE GETBALANCE*/
function ContractBtns({ setValue }) {
  const {
    state: { contract, accounts },
  } = useEth()

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [totalTicket, setTotalTicket] = useState('')
  const [ticketPrice, setTicketPrice] = useState('')
  const [balance, setBalance] = useState('')
  const [eventId, setEventId] = useState('')
  const [nameModified, setNameModified] = useState('')
  const [descriptionModified, setDescriptionModified] = useState('')
  const [totalTicketModified, setTotalTicketModified] = useState('')
  const [ticketPriceModified, setTicketPriceModified] = useState('')
  const [summaryTotalTicket, setSummaryTotalTicket] = useState('')
  const [summaryTotalTicketsSold, setSummaryTotalTicketsSold] = useState('')
  const [summarytotalTicketsAvailable, setSummaryTotalTicketAvailable] =
    useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const result1 = await contract.methods
          .totalTickets()
          .call({ from: accounts[0] })
        setSummaryTotalTicket(result1)
        const result2 = await contract.methods
          .totalTicketsSold()
          .call({ from: accounts[0] })
        setSummaryTotalTicketsSold(result2)
        const result3 = await contract.methods
          .totalTicketsAvailable()
          .call({ from: accounts[0] })
        setSummaryTotalTicketAvailable(result3)
        setIsLoading(false)
      } catch (error) {
        console.log(error)
        setIsLoading(false)
      }
    }
    fetchData()
  }, [])
  //}, [accounts, contract.methods])

  const isPositiveInteger = (value) => {
    const intValue = parseInt(value)
    if (!isNaN(intValue) && intValue >= 0 && Number.isInteger(intValue)) {
      return true
    } else {
      return false
    }
  }

  const createEvent = async () => {
    if (
      name === '' ||
      description === '' ||
      totalTicket === '' ||
      ticketPrice === ''
    ) {
      alert('Please enter all fields correctly')
    }
    if (!(isPositiveInteger(totalTicket) && isPositiveInteger(ticketPrice))) {
      alert('Please insert a positive number')
    }
    const numberOfTicket = parseInt(totalTicket)
    const priceOfTicketInWey = Web3.utils.toWei(ticketPrice, 'ether')
    const priceOfTicketInWeyString = priceOfTicketInWey.toString()
    await contract.methods
      .createEvent(name, description, numberOfTicket, priceOfTicketInWeyString)
      .send({
        from: accounts[0],
      })
  }

  const editEvent = async () => {
    if (
      eventId === '' ||
      nameModified === '' ||
      descriptionModified === '' ||
      totalTicketModified === '' ||
      ticketPriceModified === ''
    ) {
      alert('Please enter all fields correctly')
    }
    if (
      !(
        isPositiveInteger(totalTicketModified) &&
        isPositiveInteger(ticketPriceModified) &&
        isPositiveInteger(eventId)
      )
    ) {
      alert('Please insert a positive number')
    }
    const idEvent = parseInt(eventId)
    const numberOfTicketModified = parseInt(totalTicketModified)
    const priceOfTicketModifiedInWey = Web3.utils.toWei(
      ticketPriceModified,
      'ether'
    )
    const priceOfTicketModifiedInWeyString =
      priceOfTicketModifiedInWey.toString()
    await contract.methods
      .editEvent(
        idEvent,
        nameModified,
        descriptionModified,
        numberOfTicketModified,
        priceOfTicketModifiedInWeyString
      )
      .send({
        from: accounts[0],
        value: Web3.utils.toWei('0', 'ether'),
      })
  }

  const getBalanceHandler = async () => {
    try {
      const result = await contract.methods
        .getBalance()
        .call({ from: accounts[0], gas: '500000' })
      const resultInEther = Web3.utils.fromWei(result, 'ether')
      console.log(result)
      setBalance(resultInEther)
    } catch (error) {
      console.log('Errore durante la chiamata a getBalance:', error)
    }
  }

  const withdrawFundsHandler = async () => {
    await contract.methods.withdrawAllFunds().send({
      from: accounts[0],
    })
  }

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <hr />
          <form>
            <h1>Create Event</h1>
            <input
              type="text"
              placeholder="Event Name"
              value={name}
              onChange={(e) => {
                setName(e.target.value)
              }}
            />
            <input
              type="text"
              placeholder="Event Description"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value)
              }}
            />
            <input
              type="text"
              placeholder="Number Of Tickets"
              value={totalTicket}
              onChange={(e) => {
                setTotalTicket(e.target.value)
              }}
            />
            <input
              type="text"
              placeholder="Price Of Ticket"
              value={ticketPrice}
              onChange={(e) => {
                setTicketPrice(e.target.value)
              }}
            />
            <button onClick={createEvent}>Create Event</button>
          </form>
          <hr />
          <form>
            <h1>Get Balance</h1>
            <label>Balance:{balance} ETH</label>
          </form>
          <button onClick={getBalanceHandler}>Get Balance</button>
          <form>
            <hr />
            <h1>Withdraw Funds</h1>
            <button onClick={withdrawFundsHandler}>Withdraw Funds</button>
          </form>
          <hr />
          <form>
            <h1>Edit Event</h1>
            <input
              type="text"
              placeholder="Event Id"
              value={eventId}
              onChange={(e) => {
                setEventId(e.target.value)
              }}
            />
            <input
              type="text"
              placeholder="New Event Name"
              value={nameModified}
              onChange={(e) => {
                setNameModified(e.target.value)
              }}
            />
            <input
              type="text"
              placeholder="New Event Description"
              value={descriptionModified}
              onChange={(e) => {
                setDescriptionModified(e.target.value)
              }}
            />
            <input
              type="text"
              placeholder="New Number Of Tickets"
              value={totalTicketModified}
              onChange={(e) => {
                setTotalTicketModified(e.target.value)
              }}
            />
            <input
              type="text"
              placeholder="New Price Of Ticket"
              value={ticketPriceModified}
              onChange={(e) => {
                setTicketPriceModified(e.target.value)
              }}
            />
            <button onClick={editEvent}>Edit Event</button>
          </form>
          <hr />
          <form>
            <h1>Statistics:</h1>
            <h3>Total Tickets:</h3>
            {summaryTotalTicket}
            <h3>Total Tickets Sold:</h3>
            {summaryTotalTicketsSold}
            <h3>Total Tickets Available:</h3>
            {summarytotalTicketsAvailable}
          </form>
        </div>
      )}
    </div>
  )
}

export default ContractBtns
