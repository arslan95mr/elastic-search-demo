import { FormSelect } from "react-bootstrap";

const LimitU = ({...props}) => {
    const limits = [10, 20, 30, 40];

    const handleChange = (event) => {
        event.preventDefault();
        props.setFilter({...props.filter, limit: event.target.value})
    }

    return (
        <div>
            <FormSelect className="bg-light mx-2" size={props.size} value={props.filter.limit} onChange={handleChange}>
                { limits.map((item) => {
                    return ( <option value={item} key={item}>{item}</option>)
                }) }
            </FormSelect>
        </div>
    );
}

export default LimitU;