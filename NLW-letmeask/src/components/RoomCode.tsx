import copyImg from '../assets/images/copy.svg';
import '../styles/room-code.scss';


type RoomCodeProps = {
    code: string;
}


export function RoomCode(props: RoomCodeProps) {

    function copyRoomToClipBoard() {
        navigator.clipboard.writeText(props.code);
    }


    return (
        <button className="room-code" onClick={copyRoomToClipBoard}>
            <div>
                <img src={copyImg} alt="" />
            </div>
            <span>Sala #{props.code}</span>
        </button>
    )
}