const InputLabeled = ({...props}) => {

    const handleChange = (event) => {
        event.preventDefault();
        props.setValue(event.target.value);
    }

    return (
        <div className={`d-flex flex-column my-1 ${props.className}`}>
            <div className="d-flex flex-row mb-1">
                <span className="medium font-13 fg-dark me-1">{props.label}</span>
                <span className="medium font-13 fg-red-500">{props.required && '*'}</span>
            </div>
            <input
                type={props.type}
                value={props.value}
                onChange={handleChange}
                className={`fg-dark font-13 input-field ${props.bg ? props.bg : 'bg-light'}`}
                placeholder={props.hint}
                disabled={props.disabled}/>
        </div>
    );
}

export default InputLabeled;