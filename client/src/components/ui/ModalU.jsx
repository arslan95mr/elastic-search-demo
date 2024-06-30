import { Modal } from 'react-bootstrap';
import ButtonU from "./ButtonU";
import icXmarkSquare from "../../assets/svg/ic_x_mark_square.svg";

const ModalU = ({...props}) => {
    
    const dissmiss = () => {
        props.onHide(false);
    }

    return (
        <Modal {...props} size={props.size} aria-labelledby="contained-modal-title-vcenter" centered>
            <div className="p-3">
                <div className="d-flex align-items-center justify-content-between">
                    <span className="fs-5 medium">{props.title}</span>
                    <img src={icXmarkSquare} className='wh-25 hover-cursor' onClick={dissmiss}/>
                </div>
                <div className="border my-2 p-2">
                    {props.children}
                </div>
                <div className="d-flex align-items-center justify-content-between">
                    <span></span>
                    <div className="d-flex align-items-center mt-2">
                        <ButtonU onSubmit={dissmiss} size={'small'} className={'border-dark'} text={'Back'}/>
                        {props.onSubmit &&
                            <ButtonU onSubmit={props.onSubmit} size={'small'} icon={props.actionbtnicon} text={props.actionbtntext} className={props.actionbtnclassname}/>
                        }
                    </div>
                </div>
            </div>
        </Modal>
    );
}

export default ModalU;