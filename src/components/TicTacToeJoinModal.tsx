import React, { useState } from 'react'
import styled from 'styled-components'
import { TTTIcons } from '../model/TicTacToeData'

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

const JoinModalBackground = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background-color: #333333;
  border-radius: 12px;
`

interface Props {
  show: boolean,
  setShow:  (value: boolean) => void,
  name: string,
  icon: TTTIcons,
  handleHostGame: (data: any) => void
}

const TicTacToeJoinModal = ({show, setShow, name, icon, handleHostGame}: Props) => {
  const [fetching, setFetching] = useState(false)
  const [gameID, setGameID] = useState('')
  const buttonsDisabled = fetching || gameID === ''

  const fetchJoinConnect = () => {
    setFetching(true)
    fetch('http://localhost:3001/api/connect', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        gameID,
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
      setShow(false)
      setFetching(false)
      handleHostGame(res)
    }).catch(err => {
      console.log(err)
    })
  }
  return (
    <Modal show={show}>
      <JoinModalBackground>
        <ModalButtonContainer>
          <TextInput value={gameID} onChange={e => setGameID(e.target.value)} placeholder="Enter GameCode" />
        </ModalButtonContainer>
        <ModalButtonContainer>
          <ModalButton disabled={buttonsDisabled} onClick={() => fetchJoinConnect()}>Confirm</ModalButton>
          <ModalButton disabled={fetching} onClick={() => {setFetching(false); setShow(false);}}>Cancel</ModalButton>
        </ModalButtonContainer>
      </JoinModalBackground>
    </Modal>
  )
}

export default TicTacToeJoinModal
