import React from 'react'
import styled from 'styled-components'
import { TTTAppState } from '../App'
import { TTTIcons, TTTPhase } from '../model/TicTacToeData'
import TicTacToeBox from './TicTacToeBox'
import TicTacToePostGameModal from './TicTacToePostGameModal'

export interface Props {
  state: any
  isHost: boolean
  handleHostGame: (data: any) => void
}


const SubTitle = styled.h2`
  font-size: 1.5em;
  font-family: 'Roboto', sans-serif;
  font-weight: bold;
  color: #FFF;
  text-align: center;
  padding: 0;
  margin-top: 1em;
  pointer-events: none;
`

const MainContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 16pt;
  color: white;
  font-size: 16pt;
  flex-direction: column;
  row-gap: 8pt;
`

const TTTRow = styled.div`
  display: flex;
  gap: 8pt;
  flex-direction: row;
`

const Name = styled.h2`
  pointer-events: none;
  font-size: 1.5em;
  font-family: 'Roboto', sans-serif;
  font-weight: bold;
  color: #333;
  text-align: center;
  background-color: #ccc;
  padding: 16px;
  border-radius: 12px;
`


const TicTacToePlayfield = ({state, isHost, handleHostGame}: Props) => {
  
  const clickHandler = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    fetch('http://localhost:3001/api/move', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        playerID: isHost ? state.playerXID : state.playerOID,
        gameID: state.gameID,
        index: parseInt(event.currentTarget.id)
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
      console.log('success')
    }).catch(err => {
      console.log(err)
    })
  }

  const isTurn = (isHost && state.phase === TTTPhase.PLAYER_X) || (!isHost && state.phase === TTTPhase.PLAYER_O)

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <TicTacToePostGameModal
        state={state}
        show={state.phase === TTTPhase.WINNER_PLAYER_X || state.phase === TTTPhase.WINNER_PLAYER_O || state.phase === TTTPhase.DRAW}
        isHost={isHost}
        handleHostGame={handleHostGame}
      />
      <SubTitle>{isTurn ? "YOUR MOVE" : "OPPONENT'S MOVE"}</SubTitle>
      <MainContainer className="App">
        <TTTRow>
          <TicTacToeBox id="1" isTurn={isTurn} clickCallback={clickHandler} state={state}/>
          <TicTacToeBox id="2" isTurn={isTurn} clickCallback={clickHandler} state={state}/>
          <TicTacToeBox id="3" isTurn={isTurn} clickCallback={clickHandler} state={state}/>
        </TTTRow>
        <TTTRow>
          <TicTacToeBox id="4" isTurn={isTurn} clickCallback={clickHandler} state={state}/>
          <TicTacToeBox id="5" isTurn={isTurn} clickCallback={clickHandler} state={state}/>
          <TicTacToeBox id="6" isTurn={isTurn} clickCallback={clickHandler} state={state}/>
        </TTTRow>
        <TTTRow>
          <TicTacToeBox id="7" isTurn={isTurn} clickCallback={clickHandler} state={state}/>
          <TicTacToeBox id="8" isTurn={isTurn} clickCallback={clickHandler} state={state}/>
          <TicTacToeBox id="9" isTurn={isTurn} clickCallback={clickHandler} state={state}/>
        </TTTRow>
      </MainContainer>
      <Name><span style={{color: "red"}}>{state.playerXID}</span>{" vs "}<span style={{color: "blue"}}>{state.playerOID}</span></Name>
    </div>
  )
}

export default TicTacToePlayfield
