export default function Die(props) {
    const styles = {
        backgroundColor: props.isHeld ? "#59E391":"white"
    }

    console.log("Props Die: ", props);
    return (
        <button 
            style={styles} 
            onClick={() => props.hold(props.id)}
            aria-label={`Die with value ${props.value}`}
        >{props.value}</button>
    )
}