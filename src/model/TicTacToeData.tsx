import React from 'react'
import {ImAngry2, ImCross, ImRadioChecked2, ImCool} from 'react-icons/im'

enum TTTBoxPlayer {
  NONE,
  X,
  O,
}

export enum TTTIcons {
  NONE,
  X,
  O,
  ANGRYFACE,
  COOLFACE
}

export const IconDict = {
  [TTTIcons.ANGRYFACE]: ImAngry2,
  [TTTIcons.COOLFACE]: ImCool,
  [TTTIcons.X]: ImCross,
  [TTTIcons.O]: ImRadioChecked2,
  [TTTIcons.NONE]: ImCross,
}

export enum TTTPhase {
  TITLE_SCREEN,
  PLAYER_X,
  PLAYER_O,
  WINNER_PLAYER_X,
  WINNER_PLAYER_O,
  WAITING_TO_RESTART,
  RESTARTING,
  WAITING_FOR_PLAYER,
  DRAW,
  WAITING_FOR_CONNECTION,
  GAME_NOT_FOUND,
}

interface TTTGameState {
  boxes: {
    1: TTTBoxPlayer,
    2: TTTBoxPlayer,
    3: TTTBoxPlayer,
    4: TTTBoxPlayer,
    5: TTTBoxPlayer,
    6: TTTBoxPlayer,
    7: TTTBoxPlayer,
    8: TTTBoxPlayer,
    9: TTTBoxPlayer,
  },
  players: [{
    name: string,
    icon: TTTIcons,
    color: string | null
  }],
  phase: TTTPhase,
}

interface Props {
  
}

const TicTacToeData = (props: Props) => {
  return (
    <div>

    </div>
  )
}

export default TicTacToeData
