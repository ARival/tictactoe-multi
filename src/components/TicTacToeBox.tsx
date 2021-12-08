import styled from "styled-components"
import { IconDict, TTTIcons } from '../model/TicTacToeData'
import { IconType } from "react-icons"

const TTTBoxContainer = styled.button`
  width: 100pt;
  height: 100pt;
  background-color: lightgrey;
  border-radius: 12.5%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
  font-size: 100pt;
  font-weight: bold;
  padding: 8pt;
  box-sizing: border-box;
  cursor: pointer;
  border: none;
`
export interface Props {
  state: {
    boxes: any,
    playerOIcon: TTTIcons,
    playerXIcon: TTTIcons,
  }
  clickCallback: React.MouseEventHandler<HTMLButtonElement>;
  id: string;
}

const TicTacToeBox = (props: Props) => {
  const boxInfo = props.state.boxes[props.id]
  const Icon: IconType = IconDict[boxInfo === 1 ? props.state.playerXIcon : props.state.playerOIcon]
  return (
    <TTTBoxContainer id={props.id} onClick={props.clickCallback}>
        {boxInfo !== 0 && <Icon style={{
          pointerEvents: 'none',
          color: boxInfo === 1 ? 'red' : 'blue',
        }}/>}
    </TTTBoxContainer>
  )
}

export default TicTacToeBox