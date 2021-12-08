import styled from 'styled-components';
import React, { MouseEventHandler, useEffect, useState } from 'react';
import TicTacToeTitle from './components/TicTacToeTitle';
import { TTTPhase } from './model/TicTacToeData';
import TicTacToePlayfield from './components/TicTacToePlayfield';
import { useTimer } from 'react-use-precision-timer';

export enum TTTAppState {
  MENU,
  INGAME,
  RESULT
}




const App = () => {
  const [gameState, setGameState] = useState({phase: TTTPhase.TITLE_SCREEN, playerXID: -1, gameID: -1} as any)
  const [isHost, setIsHost] = useState(false)

  const stateCheckTimer = useTimer({delay: 1000, startImmediately: false, fireImmediately: false, callback: () => {
    fetch('http://localhost:3001/api/getGameState', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        playerID: gameState.playerXID,
        gameID: gameState.gameID,
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
        if (res.state.phase === TTTPhase.GAME_NOT_FOUND) {
          handleHostGame(false)
        } else {
          setGameState(res.state)
        }
      }).catch(err => {
        console.log(err)
      })
  }});

  useEffect(() => {
    console.log('App.tsx: useEffect()')
    if (gameState.phase === TTTPhase.TITLE_SCREEN) {
      console.log('App.tsx: useEffect(): gameState.phase === TTTPhase.TITLE_SCREEN')
      stateCheckTimer.stop()
    } else if (gameState.phase === TTTPhase.WAITING_FOR_CONNECTION) {
      stateCheckTimer.stop()
      stateCheckTimer.start()
    }
  }, [gameState.phase])



  const handleHostGame = (data : any) => {
    console.log(data)
    if (!data) {
      console.log('canceled')
      setIsHost(false)
      setGameState({phase: TTTPhase.TITLE_SCREEN})
      return
    }
    if (data.state.phase === TTTPhase.WAITING_FOR_CONNECTION) {
      console.log('waiting for connection')
      setIsHost(true)
      setGameState(data.state)
    } else {
      setGameState(data.state)
      stateCheckTimer.start()
    }
  }

    const playerX = gameState?.playerXID

    return gameState.phase === TTTPhase.TITLE_SCREEN || gameState.phase === TTTPhase.WAITING_FOR_CONNECTION ?
    <TicTacToeTitle state={gameState} handleHostGame={handleHostGame}/> :
    <TicTacToePlayfield isHost={isHost} state={gameState} handleHostGame={handleHostGame}/>
    ;
}

export default App;
