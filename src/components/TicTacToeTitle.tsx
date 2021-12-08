import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import { TTTIcons, TTTPhase } from '../model/TicTacToeData'
import TicTacToeJoinModal from './TicTacToeJoinModal'

interface Props {
  state: any,
  handleHostGame: (data: any) => void
}

const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  background-color: #0004;
  font-size: 2em;
  font-family: 'Roboto', sans-serif;
  font-weight: bold;
  color: #333;
  text-align: center;
  padding: 0;
  margin: 0;
  row-gap: 8px;
`

const MenuButton = styled.button`
  background-color: #ddd;
  border: none;
  color: #333;
  padding: 10px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 5px;
  width: 100px;
  height: 50px;
  font-family: 'Roboto', sans-serif;
  font-weight: bold;
  :hover {
    background-color: #ffffff;
  }
  transition: background-color 0.2s ease-in-out, opacity 0.2s ease-in-out;
  :disabled {
    opacity: .2;
    pointer-events: none;
    cursor: default;
  }
`

const MenuButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`

const Title = styled.h1`
  font-size: 2em;
  font-family: 'Roboto', sans-serif;
  font-weight: bold;
  color: #FFF;
  text-align: center;
  padding: 0;
  margin: 0;
`
const SubTitle = styled.h2`
  font-size: 1em;
  font-family: 'Roboto', sans-serif;
  font-weight: bold;
  color: #FFF;
  text-align: center;
  padding: 0;
  margin: 0;
`

const TextInput = styled.input`
  background-color: #ddd;
  border: none;
  color: #333;
  padding: 10px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  border-radius: 5px;
  cursor: pointer;
  width: 350px;
  height: 20px;
  font-family: 'Roboto', sans-serif;
  font-weight: bold;
  :hover {
    background-color: #ffffff;
  }
  transition: background-color 0.2s ease-in-out, opacity 0.2s ease-in-out;
`


const TicTacToeTitle = ({handleHostGame, state}: Props) => {
  const [icon, setIcon] = useState(TTTIcons.NONE)
  const [fetching, setFetching] = useState(false)
  const [name, setName] = useState('')
  
  const fetchConnect = () => {
    setFetching(true)
    fetch('http://localhost:3001/api/connect', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        playerID: name,
        icon
      })
    })
      .then(res => {
        if (res.status >= 200) {
          return res.json()
        } else {
          throw new Error(res.statusText)
        }
      })
      .then(res => {
        setFetching(false)
        handleHostGame(res)
      }).catch(err => {
        console.log(err)
      })
  }

  const fetchCancel = (state: any) => {
    setFetching(true)
    fetch('http://localhost:3001/api/cancel', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        state,
      })
    })
    .then(res => {
      if (res.status >= 200) {
        return res
      } else {
        throw new Error(res.statusText)
      }
    })
    .then(res => {
      setFetching(false)
      handleHostGame(false)
    }).catch(err => {
      console.log(err)
    })
  }

  const options = Object.keys(TTTIcons).filter(elem => isNaN(Number(elem))).map((key: string, value: string | TTTIcons) => <option value={value} key={key}>{key}</option>)
  const buttonsDisabled = fetching || name === '' || icon === TTTIcons.NONE;
  const [showJoinModal, setShowJoinModal] = useState(false)

  return (
    <MenuContainer>
      <TicTacToeJoinModal show={showJoinModal} setShow={setShowJoinModal} name={name} icon={icon} handleHostGame={handleHostGame}/>
      <Title>Tic Tac Toe Multi</Title>
      {state.phase === TTTPhase.TITLE_SCREEN && (
        <>
          <MenuButtonContainer>
            <TextInput value={name} onChange={e => setName(e.target.value)} type="text" placeholder="Enter your name" />
            <select value={icon} name="icon" onChange={event => setIcon(parseInt(event.target.value))}>
              {options}
            </select>
          </MenuButtonContainer>
          <MenuButtonContainer>
            <MenuButton disabled={buttonsDisabled} onClick={fetchConnect}>Host Game</MenuButton>
            <MenuButton onClick={() => setShowJoinModal(true)} disabled={buttonsDisabled}>
              Join Game
            </MenuButton>
          </MenuButtonContainer>
        </>)}
      
      {state.phase === TTTPhase.WAITING_FOR_CONNECTION && (
        <>
          <SubTitle>waiting for connection...</SubTitle>
          <TextInput value={state.gameID} size={50} type="text" disabled />
          <MenuButtonContainer>
            <MenuButton disabled={fetching} onClick={() => fetchCancel(state)}>
              Cancel
            </MenuButton>
          </MenuButtonContainer>
        </>
      )}
    </MenuContainer>
  )
}

export default TicTacToeTitle
