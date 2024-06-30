import { useEffect, useState } from "react";
import AxiosHelper from './../../api/AxiosHelper';
import ModalU from '../../components/ui/ModalU';
import Utils from "../../helper/Utils";
import InputLabeled from '../../components/form/InputLabeled';

const Update = ({...props}) => {
    const item = props.item;
    
    const [name, setName] = useState('');
    const [barcode, setBarcode] = useState(1);

    useEffect(() => {
        setName(item.name);
        setBarcode(item.barcode);
    }, [item])

    const handleSubmit = (event) => {
        event.preventDefault();
        
        const requiredInputs = [
            { key: name, value: 'Name is not entered' },
            { key: barcode, value: 'Barcode is not entered' },
        ]

        const content = Utils.errorHandling(requiredInputs);
        if (content) {
            props.setToast({ content, variant: 'danger', title: 'Error', show: true });
            return;
        }

        props.setLoading(true);
        const data = { name, barcode };
        AxiosHelper.updateProduct(item.id, data).then((res) => {
            if (res.status == 200) {
                props.setModalShow(false);
                props.setToast({ content: 'Product updated', variant: 'success', title: 'Success', show: true });
            }
        }).catch((err) => {
            if (!err?.response) {
                props.setToast({ content: 'No server response', variant: 'danger', title: 'Error', show: true });
                return;
            }
            switch(err.response.status) {
                case 400: props.setToast({ content: 'Something went wrong', variant: 'danger', title: 'Error', show: true }); break;
                default : props.setToast({ content: err.response.data.msg, variant: 'danger', title: 'Error', show: true }); break;
            }
        }).finally(() => {props.setLoading(false)});
    }

    return (
        <ModalU show={props.modalShow} size={''} title={'Product [Edit]'}
            actionbtntext={'Update'}
            actionbtnclassname={"bg-green-700 font-14 medium text-white"}
            onSubmit={handleSubmit} onHide={props.setModalShow}>
                
            <form onSubmit={handleSubmit}>
                <InputLabeled label={'Name'} type={'text'} value={name} setValue={setName} hint={'Pencil'} required={true}/>
                <InputLabeled label={'Barcode'} type={'text'} value={barcode} setValue={setBarcode} hint={'123456789'} required={true}/>
            </form>
        </ModalU>
    );
}

export default Update