import ProgressBar from "../components/ui/ProgressBar";

const Wrapper = ({...props}) => {
    return (
        <div className='main'>
            <div className='d-flex flex-row align-items-center justify-content-between bg-blue-500 px-3 py-2 bg-gradient'>
                <span className='fs-2 bold text-white'>Elastic Search Demo App</span>
                <span className='text-white'>Version: 1.0.0</span>
            </div>
            <div className='d-flex flex-column mx-5 p-5'>
                {props.children}
            </div>
            <ProgressBar loading={props.loading}/>
        </div>
    );
}

export default Wrapper;