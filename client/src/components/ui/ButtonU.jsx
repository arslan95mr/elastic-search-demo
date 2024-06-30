import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ButtonU = ({...props}) => {

    return(
        <button onClick={props.onSubmit} className={`button-u bg-gradient mx-1 border ${props.className}`} disabled={props.disabled}>
            {props.icon && <FontAwesomeIcon className="mx-1 font-16" icon={props.icon}/>}
            {props.text && <span className="mx-1 medium">{props.text}</span>}
        </button>
    );
}

export default ButtonU;