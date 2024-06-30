import { faAngleLeft, faAngleRight, faBackwardStep, faForwardStep } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import { useState } from "react";

const PaginationU = ({...props}) => {
  
    const [max, setMax] = useState(0);
    const [active, setActive] = useState(0);

    useEffect(() => {
        setMax(Math.ceil(props.count/props.filter.limit));
    }, [props.count, props.filter]);

    useEffect(() => {
        setActive(props.filter.page-1);
    }, [props.filter]);

    const handleFirst = () => {
        if (props.filter.page > 1) props.setFilter({...props.filter, page: 1});
    }

    const handlePrev = () => {
        if (props.filter.page > 1) props.setFilter({...props.filter, page: props.filter.page - 1});
    }

    const handleNext = () => {
        if (props.filter.page < max) props.setFilter({...props.filter, page: props.filter.page + 1});
    }

    const handleLast = () => {
        if (props.filter.page < max) props.setFilter({...props.filter, page: max});
    }

    const PaginationItem = ({...props}) => {
        const inActiveStyle = 'bg-light fg-dark';
        const activeStyle = 'bg-dark text-white';

        const item = props.item;
        const active = item.active;

        return(
            <div className={`rounded-1 border me-1 px-2 hover-cursor d-flex align-items-center ${active ? activeStyle : inActiveStyle}`}
                onClick={props.onClick}>
                {item.name ? <span className="">{item.name}</span>
                    : <FontAwesomeIcon icon={item.icon}/>
                }
            </div>
        );
    }

    return (
        <div className="d-flex flex-row mx-2">
            <PaginationItem item={{icon: faBackwardStep}} onClick={handleFirst}/>
            <PaginationItem item={{icon: faAngleLeft}} onClick={handlePrev}/>
            {Array.apply(1, Array(max)).map((x, i) => {
                // 1.st three pages, last three pages, and active page & page before and after
                if (i <= 3 || i >= max - 2 || (i >= active - 1 && i <= active + 1)) {
                    return (
                        <PaginationItem key={i}
                            item={{active: i==active, name: i+1}}
                            onClick={() => {
                                setActive(i);
                                props.setFilter({...props.filter, page: (i+1)})}
                            }/>
                    );
                }
                //any other page should be represented by ...
                else if (i == 4 || i == max-3)
                    return (<span key={i} className="me-1 bold">...</span>)
            })}
            <PaginationItem item={{icon: faAngleRight}} onClick={handleNext}/>
            <PaginationItem item={{icon: faForwardStep}} onClick={handleLast}/>
        </div>
    );
}

export default PaginationU;