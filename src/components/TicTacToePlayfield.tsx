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

  return (
    <div>
      <TicTacToePostGameModal
        state={state}
        show={state.phase === TTTPhase.WINNER_PLAYER_X || state.phase === TTTPhase.WINNER_PLAYER_O || state.phase === TTTPhase.DRAW}
        isHost={isHost}
        handleHostGame={handleHostGame}
      />
      <SubTitle>{(isHost && state.phase === TTTPhase.PLAYER_X) || (!isHost && state.phase === TTTPhase.PLAYER_O) ? "YOUR MOVE" : "OPPONENT'S MOVE"}</SubTitle>
      <MainContainer className="App">
        <TTTRow>
          <TicTacToeBox id="1" clickCallback={clickHandler} state={state}/>
          <TicTacToeBox id="2" clickCallback={clickHandler} state={state}/>
          <TicTacToeBox id="3" clickCallback={clickHandler} state={state}/>
        </TTTRow>
        <TTTRow>
          <TicTacToeBox id="4" clickCallback={clickHandler} state={state}/>
          <TicTacToeBox id="5" clickCallback={clickHandler} state={state}/>
          <TicTacToeBox id="6" clickCallback={clickHandler} state={state}/>
        </TTTRow>
        <TTTRow>
          <TicTacToeBox id="7" clickCallback={clickHandler} state={state}/>
          <TicTacToeBox id="8" clickCallback={clickHandler} state={state}/>
          <TicTacToeBox id="9" clickCallback={clickHandler} state={state}/>
        </TTTRow>
      </MainContainer>
    </div>
  )
}

export default TicTacToePlayfield
