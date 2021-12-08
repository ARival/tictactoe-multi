import React, { useState } from 'react'
import styled from 'styled-components'
import { TTTPhase } from '../model/TicTacToeData'
import { ImTrophy } from 'react-icons/im'
import { GiShrug } from 'react-icons/gi'
import { IoSkullSharp } from 'react-icons/io5'

interface Props {
  show: boolean,
  state: any,
  isHost: boolean,
  handleHostGame: (data: any) => void,
}

interface IModal {
  show: boolean
}

const Modal = styled.div<IModal>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 1;
  opacity: ${props => props.show ? 1 : 0};
  transition: opacity 0.2s ease-in-out;
  pointer-events: ${props => props.show ? 'auto' : 'none'} ;
`
const ModalButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  column-gap: 8px;
`
const ModalButton = styled.button`
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
  width: 120px;
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

const Title = styled.h1`
  pointer-events: none;
  font-size: 2em;
  font-family: 'Roboto', sans-serif;
  font-weight: bold;
  color: #FFF;
  text-align: center;
  padding: 0;
  margin: 0;
`
enum ResultType {
  WIN,
  LOSE,
  DRAW,
  NONE
}

const getResult = (state: any, isHost: boolean): ResultType => {
  if (state.phase === TTTPhase.DRAW) return ResultType.DRAW

  if (isHost) {
    if(state.phase === TTTPhase.WINNER_PLAYER_X) {
      return ResultType.WIN
    } else {
      return ResultType.LOSE
    }
  } else {
    if(state.phase === TTTPhase.WINNER_PLAYER_O) {
      return ResultType.WIN
    } else {
      return ResultType.LOSE
    }
  }
}

const TicTacToePostGameModal = ({show, state, isHost, handleHostGame}: Props) => {
  const [fetching, setFetching] = useState(false)

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

  const fetchRestart = (state: any) => {
    setFetching(true)
    fetch('http://localhost:3001/api/restart', {
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
      handleHostGame(res)
    }).catch(err => {
      console.log(err)
    })
  }

  const result = getResult(state, isHost)

  return (
    <Modal show={show}>
      <div>
        {result === ResultType.WIN && <ImTrophy size={200} color="#ECCC00"/>}
        {result === ResultType.LOSE && <IoSkullSharp size={200} color="#882200"/>}
        {result === ResultType.DRAW && <GiShrug size={200} color="#ffffff"/>}
      </div>
      <Title>
        {result === ResultType.WIN && 'You Win!'}
        {result === ResultType.LOSE && 'You Lose!'}
        {result === ResultType.DRAW && 'Draw!'}
      </Title>
      <ModalButtonContainer>
        <ModalButton disabled={fetching} onClick={() => {fetchRestart(state)}}>
          Play Again
        </ModalButton>
        <ModalButton disabled={fetching} onClick={() => {fetchCancel(state)}}>
          Quit
        </ModalButton>
      </ModalButtonContainer>
    </Modal>
  )
}

export default TicTacToePostGameModal
