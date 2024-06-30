import AxiosHelper from './../../api/AxiosHelper';
import ModalU from '../../components/ui/ModalU';

const Delete = ({...props}) => {
    const item = props.item;

    const handleSubmit = (event) => {
        event.preventDefault();

        props.setLoading(true);
        AxiosHelper.deleteProduct(item.id).then((res) => {
            if (res.status == 200) {
                props.setModalShow(false);
                props.setToast({ content: 'Product deleted', variant: 'success', title: 'Success', show: true });
            }
        }).catch((err) => {
            if (!err?.response) {
                props.setToast({ content: 'No server response', variant: 'danger', title: 'Error', show: true });
                return;
            }
            props.setToast({ content: err.response.data.msg, variant: 'danger', title: 'Error', show: true });
        }).finally(() => {props.setLoading(false)});
    }

    return (
        <ModalU show={props.modalShow} size={''} title={'Warning'}
            actionbtntext={'Delete'}
            actionbtnclassname={"bg-red-400 font-14 medium text-white"}
            onSubmit={handleSubmit} onHide={props.setModalShow}>
                
            <div className="d-flex flex-column align-items-center">
                <span className="medium fg-red-300">{'Confirm data deletion'}</span>
                <div className="d-flex flex-row mt-2">
                    <span className="medium fg-dark me-2">{'Product'}:</span>
                    <span className="fg-dark me-1">{item.name}</span>
                </div>
            </div>
        </ModalU>
    );
}

export default Delete