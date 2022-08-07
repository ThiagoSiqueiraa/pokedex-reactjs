import { capitalize } from "../../utils/text"

function Badge(props : {
    type: string
}){
    return <span className={`pokemon_${props.type} pill`}>{capitalize(props.type)}</span>

}

export {Badge}