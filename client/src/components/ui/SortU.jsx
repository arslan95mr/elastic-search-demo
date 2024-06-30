import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDownShortWide, faArrowUpWideShort } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

const SortU = ({...props}) => {
    const attr = props.query.order[0][0];
    const value = props.query.order[0][1];

    const [icon, setIcon] = useState(faArrowDownShortWide);

    useEffect(() => {
        setIcon(value == 'ASC' ? faArrowUpWideShort : faArrowDownShortWide);
    }, [value]);

    const toggleSort = () => {
        props.setQuery(prev => {
            return {...prev, order: [[props.attr, value == 'ASC' ? 'DESC' : 'ASC']]}
        });
    }

    return (
        <div onClick={toggleSort}
            className="d-flex align-items-center hover-cursor">
            <span className="me-2">{props.title}</span>
            {attr == props.attr && <FontAwesomeIcon icon={icon}/>}
        </div>
    );
}

export default SortU;