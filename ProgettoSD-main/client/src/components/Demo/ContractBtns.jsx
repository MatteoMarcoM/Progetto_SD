import { useState, useEffect } from 'react'
import useEth from '../../contexts/EthContext/useEth'
import Web3 from 'web3'

function ContractBtns({ setValue }) {
  const {
    state: { contract, accounts },
  } = useEth()

  const [loading, setLoading] = useState(true)
  const [events, setEvents] = useState([])
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [indexEvent, setIndexEvent] = useState(null)
  const [ticketNumber, setTicketNumber] = useState('')
  const [eventToRefund, setEventToRefund] = useState(null)
  const [ticketNumberToRefund, setTicketNumberToRefund] = useState('')
  const [indexEventToRefund, setIndexEventToRefund] = useState()
  const [remainingTicket, setReaminingTicket] = useState('')
  const [isSoldOut, setIsSoldOut] = useState(true)
  const [myTicketCount, setMyTicketCount] = useState('')
  const [indexMyEventCount, setIndexMyEventCount] = useState()
  const [eventMyCount, setEventMyCount] = useState(null)
  const [ticketNumberWantToResell, setTicketNumberWantToResell] = useState('')
  const [eventWantToResell, setEventWantToResell] = useState()
  const [indexEventWantToResell, setIndexEventWantToResell] = useState()

  const [tickerNumberResell, setTicketNumberResell] = useState('')
  const [eventResell, setEventResell] = useState()
  const [indexEventResell, setIndexEventResell] = useState()
  const [addressResell, setAddressResell] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const totalEvents = await contract.methods
          .getTotalEvents()
          .call({ from: accounts[0] })
        console.log(totalEvents)
        const eventList = []

        for (let i = 0; i < totalEvents; i++) {
          const event = await contract.methods.events(i).call()
          const existingIndex = eventList.findIndex(
            (e) => e.name === event.name
          )

          if (existingIndex !== -1) {
            // Se l'evento esiste già nell'array, aggiornalo
            eventList[existingIndex] = {
              ...eventList[existingIndex],
              totalTickets: event.totalTickets,
              ticketsSold: event.ticketsSold,
              ticketPrice: event.ticketPrice,
            }
          } else {
            // Se l'evento non esiste, aggiungilo
            const eventData = {
              name: event.name,
              description: event.description,
              totalTickets: event.totalTickets,
              ticketsSold: event.ticketsSold,
              ticketPrice: event.ticketPrice,
            }
            eventList.push(eventData)
            console.log(eventData)
          }
        }
        setEvents(eventList)
        setLoading(false)
      } catch (error) {
        console.error('Errore durante la chiamata al contratto:', error)
        setLoading(false)
      }
    }
    fetchData()
  }, [accounts, contract.events, contract.methods])

  const isPositiveInteger = (value) => {
    const intValue = parseInt(value)
    if (!isNaN(intValue) && intValue >= 0 && Number.isInteger(intValue)) {
      return true
    } else {
      return false
    }
  }

  const getMyTicketForEvent = async (eventindex) => {
    try {
      const result = await contract.methods
        .getMyTicketCount(eventindex)
        .call({ from: accounts[0] })
      setMyTicketCount(result)
    } catch (error) {
      console.log(error)
    }
  }

  const getRemainingTicketsForEvent = async (eventindex) => {
    try {
      const result = await contract.methods
        .getRemainingTickets(eventindex)
        .call({ from: accounts[0] })
      setReaminingTicket(result)
    } catch (error) {
      console.log(error)
    }
  }

  const getEventSoldOut = async (eventindex) => {
    try {
      const result = await contract.methods
        .isEventSoldOut(eventindex)
        .call({ from: accounts[0] })
      setIsSoldOut(result)
    } catch (error) {
      console.log(error)
    }
  }

  const handleEventSelect = (eventIndex) => {
    setSelectedEvent(events[eventIndex])
    setIndexEvent(eventIndex)
    getRemainingTicketsForEvent(eventIndex)
    getEventSoldOut(eventIndex)
  }

  const handleEventToRefundSelect = (eventIndex) => {
    setEventToRefund(events[eventIndex])
    setIndexEventToRefund(eventIndex)
  }

  const handleWantToResellEventSelect = (eventIndex) => {
    setEventWantToResell(events[eventIndex])
    setIndexEventWantToResell(eventIndex)
  }

  const handleResellEventSelect = (eventIndex) => {
    setEventResell(events[eventIndex])
    setIndexEventResell(eventIndex)
  }

  const handleEventMyTicket = (eventIndex) => {
    setEventMyCount(events[eventIndex])
    setIndexMyEventCount(eventIndex)
    getMyTicketForEvent(eventIndex)
  }

  const buyTicketsHandler = async () => {
    if (ticketNumber === '') {
      alert('Please enter all fields correctly')
    }
    if (!isPositiveInteger(ticketNumber)) {
      alert('Please insert a positive number')
    }
    try {
      const numberOfTicket = parseInt(ticketNumber)
      const priceOfTicket = parseInt(selectedEvent.ticketPrice)
      console.log('TicketPRice: ', selectedEvent.ticketPrice)
      const price = numberOfTicket * priceOfTicket
      console.log('finale price:', price)
      const priceString = price.toString()
      console.log('finale price String:', priceString)
      await contract.methods.buyTickets(indexEvent, numberOfTicket).send({
        from: accounts[0],
        gas: '5000000',
        value: priceString,
      })
    } catch (error) {
      console.log(error)
    }
  }

  const refundTicketHandler = async () => {
    if (ticketNumberToRefund === '') {
      alert('Please enter all fields correctly')
    }
    if (!isPositiveInteger(ticketNumberToRefund)) {
      alert('Please insert a positive number')
    }
    try {
      const numberOfTicketToRefund = parseInt(ticketNumberToRefund)
      await contract.methods
        .refundTickets(indexEventToRefund, numberOfTicketToRefund)
        .send({
          from: accounts[0],
          value: Web3.utils.toWei('0', 'ether'),
        })
    } catch (error) {
      console.log(error)
    }
  }

  const wantToResellTicketHandler = async () => {
    if (ticketNumberWantToResell === '') {
      alert('Please enter all fields correctly')
    }
    if (!isPositiveInteger(ticketNumberWantToResell)) {
      alert('Please insert a positive number')
    }
    try {
      const numberOfTicketWantToResell = parseInt(ticketNumberWantToResell)
      await contract.methods
        .wantToResell(indexEventWantToResell, numberOfTicketWantToResell)
        .send({ from: accounts[0], value: Web3.utils.toWei('0', 'ether') })
    } catch (error) {
      console.log(error)
    }
  }

  const resellTicketHandler = async () => {
    if (addressResell === '' || tickerNumberResell === '') {
      alert('Please enter all fields correctly')
    }
    if (!isPositiveInteger(tickerNumberResell)) {
      alert('Please insert a positive number')
    }
    try {
      const numberOfTicketResell = parseInt(tickerNumberResell)
      const priceOfTicketResell = parseInt(eventResell.ticketPrice)
      console.log('numberOFTicketResell:', numberOfTicketResell)
      console.log('TicketPRiceResell: ', eventResell.ticketPrice)
      const priceResell = numberOfTicketResell * priceOfTicketResell
      console.log('finale priceResell:', priceResell)
      const priceResellString = priceResell.toString()
      console.log('finale price String:', priceResellString)
      await contract.methods
        .resellTickets(addressResell, indexEventResell, numberOfTicketResell)
        .send({
          from: accounts[0],
          value: priceResellString,
          gas: '5000000',
        })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      {loading ? (
        <p>Caricamento...</p>
      ) : (
        <div>
          <form>
            <h1>My Tickets For Event</h1>
            <select onChange={(e) => handleEventMyTicket(e.target.value)}>
              <option value="">Select an event</option>
              {events.map((event, index) => (
                <option key={index} value={index}>
                  {event.name}
                </option>
              ))}
            </select>
            <div>
              {eventMyCount && (
                <p>I have {myTicketCount} ticket/s for the current event</p>
              )}
            </div>
          </form>
          <hr />
          <form>
            <h1>Want To Resell</h1>
            <select
              onChange={(e) => handleWantToResellEventSelect(e.target.value)}
            >
              <option value="">Select an event</option>
              {events.map((event, index) => (
                <option key={index} value={index}>
                  {event.name}
                </option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Insert number of tickets"
              value={ticketNumberWantToResell}
              onChange={(e) => {
                setTicketNumberWantToResell(e.target.value)
              }}
            ></input>
            <button onClick={wantToResellTicketHandler}>Want To Resell</button>
          </form>
          <hr />
          <form>
            <h1>Buy Tickets</h1>
            <select onChange={(e) => handleEventSelect(e.target.value)}>
              <option value="">Select an event</option>
              {events.map((event, index) => (
                <option key={index} value={index}>
                  {event.name}
                </option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Insert number of tickets"
              value={ticketNumber}
              onChange={(e) => {
                setTicketNumber(e.target.value)
              }}
            ></input>
            {!isSoldOut && (
              <button onClick={buyTicketsHandler}>Buy Tickets</button>
            )}
          </form>
          {selectedEvent && (
            <div>
              <h2>Selected Event Details:</h2>
              <p>Name: {selectedEvent.name}</p>
              <p>Description: {selectedEvent.description}</p>
              <p>Total Tickets: {selectedEvent.totalTickets}</p>
              <p>Tickets Sold: {selectedEvent.ticketsSold}</p>
              <p>
                Ticket Price:{' '}
                {Web3.utils.fromWei(selectedEvent.ticketPrice, 'ether')} ETH
              </p>
              <p>Remaining Tickets: {remainingTicket}</p>
              {isSoldOut && (
                <p style={{ color: 'red' }}>EVENT IS SOLD OUT!!!!</p>
              )}
              {/* Aggiungi altri dettagli dell'evento qui */}
            </div>
          )}
          <hr />
          <form>
            <h1>Refund Tickets</h1>
            <select onChange={(e) => handleEventToRefundSelect(e.target.value)}>
              <option value="">Select an event</option>
              {events.map((event, index) => (
                <option key={index} value={index}>
                  {event.name}
                </option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Insert number of tickets"
              value={ticketNumberToRefund}
              onChange={(e) => {
                setTicketNumberToRefund(e.target.value)
              }}
            ></input>
            <button onClick={refundTicketHandler}>Refund Tickets</button>
          </form>
          <hr />
          <form>
            <h1>Buy Ticket From Someone Else</h1>
            <input
              type="text"
              placeholder="Insert Address"
              value={addressResell}
              onChange={(e) => {
                setAddressResell(e.target.value)
              }}
            ></input>
            <select onChange={(e) => handleResellEventSelect(e.target.value)}>
              <option value="">Select an event</option>
              {events.map((event, index) => (
                <option key={index} value={index}>
                  {event.name}
                </option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Insert number of tickets"
              value={tickerNumberResell}
              onChange={(e) => {
                setTicketNumberResell(e.target.value)
              }}
            ></input>
            <button onClick={resellTicketHandler}>Buy Tickets</button>
          </form>
          <hr />
        </div>
      )}
    </>
  )
}

export default ContractBtns
