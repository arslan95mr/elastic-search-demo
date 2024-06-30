import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const InputField = ({...props}) => {

    const handleChange = (event) => {
        event.preventDefault();
        props.setValue(event.target.value);
    }

    return (
        <div className={props.formClass}>
            <input
                id={props.id}
                type={props.type}
                name={props.name}
                step={props.step}
                ref={props.innerRef}
                value={props.value}
                onChange={handleChange}
                className={props.inputClass}
                placeholder={props.hint}
                disabled={props.disabled}
                autoComplete={props.autoComplete}
                autoFocus={props.autoFocus}
                required={props.required}/>
            {props.icon && <FontAwesomeIcon className='text-secondary input-field-icon' icon={props.icon}/>}
        </div>
    );
}

export default InputField;