import { Toast, ToastBody, ToastContainer, ToastHeader } from 'react-bootstrap';

const ToastU = ({...props}) => {
    const toast = props.toast;
    
    return (
        <ToastContainer className='p-3' position='top-end' style={{ zIndex: 998, position: 'fixed'}}>
            <Toast bg={toast.variant} onClose={() => props.setToast({...toast, show: false})} show={toast.show} delay={3000} autohide>
                <ToastHeader>
                    <span className="rounded-1 bg-dark p-2 me-2" />
                    <strong className="me-auto">{toast.title}</strong>
                    <small>{'Now'}</small>
                </ToastHeader>
                <ToastBody className={(toast.variant === 'dark' || 'danger' || 'success' || 'secondary') && 'text-white'}>
                    {toast.content}
                </ToastBody>
            </Toast>
        </ToastContainer>
    );
}

export default ToastU;