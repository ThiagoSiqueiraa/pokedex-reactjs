import { capitalize } from "../../utils/text";
import { Badge } from "../UI/Badge";
import './Card.scss'

function Card(props: {
    image: string
    id: string
    name: string
    types: {name: string}[]
}) {
    return (
        <div className='card-wrapper'>
            <div className='card-image'><img src={props.image}></img></div>
            <div className="card-id">#{props.id}</div>
            <div className='card-title'>{props.name}</div>
            <div className="card-badges">

                {props.types.map((type: any) => {
                    return <Badge type={type}/>
                })}
            </div>
        </div>
    );
  }

  export {Card}