import { useEffect, useState } from 'react';
import Wrapper from './../../layout/Wrapper';
import AxiosHelper from './../../api/AxiosHelper';
import { faSearch, faAdd, faArrowRotateRight } from '@fortawesome/free-solid-svg-icons';
import ButtonU from './../../components/ui/ButtonU';
import InputField from './../../components/form/InputField';
import SortU from './../../components/ui/SortU';
import TableStd from './../../components/ui/TableStd';
import LimitU from './../../components/ui/LimitU';
import PaginationU from './../../components/ui/PaginationU';
import DataNotFound from './../../components/ui/DataNotFound';
import ToastU from './../../components/ui/ToastU';
import Create from "./Create";
import Update from "./Update";
import Delete from "./Delete";
import Utils from '../../helper/Utils';

const Main = () => {
    const [loading, setLoading] = useState(false);

    const [products, setProducts] = useState([]);
    const [productsCount, setProductsCount] = useState();

    const [find, setFind] = useState('');

    const [modalCreate, setModalCreate] = useState(false);
    const [modalUpdate, setModalUpdate] = useState(false);
    const [modalDelete, setModalDelete] = useState(false);

    const [itemToBe, setItemToBe] = useState({});

    const [toast, setToast] = useState({ show: false, content: '', variant: '', title: ''});

    const [query, setQuery] = useState({
        page: 1,
        limit: 10,
        order: [['createdAt', 'DESC']],
        filter: {name: ''}
    });

    useEffect(() => {
        getProducts();
    }, [query, toast]);

    const getProducts = () => {
        setLoading(true);
        AxiosHelper.getProducts(query).then((res) => {
            if (res.status == 200) {
                setProducts(res.data.data);
                setProductsCount(res.data.count);
            }
        }).finally(() => {setLoading(false)});
    }

    useEffect(() => {
        setQuery({...query, filter: { name: find }});
    }, [find]);

    const createNew = () => { setModalCreate(true) }

    const refresh = () => { getProducts() }
    
    const modelProps = [
        { 
            name: <SortU title={'Barcode'} attr={'barcode'} query={query} setQuery={setQuery}/>,
            value: (prop) => { return(<>{prop.barcode}</>) } 
        },
        { 
            name: <SortU title={'Name'} attr={'name'} query={query} setQuery={setQuery}/>,
            value: (prop) => { return(<>{prop.name}</>) } 
        },
        { 
            name: <SortU title={'Created date'} attr={'createdAt'} query={query} setQuery={setQuery}/>,
            value: (prop) => { return(<>{Utils.getTimestampDate(prop.createdAt)}</>) } 
        },
        {
            name: "",
            value: (prop) => {
                return (
                    <div className='d-flex flex-row'>
                        <span className='bg-blue-600 bg-gradient px-2 py-1 medium rounded-1 text-white hover-cursor'
                            onClick={() => {
                                setModalUpdate(true);
                                setItemToBe(prop);
                            }}>
                            Edit
                        </span>
                        <span className='bg-red-400 bg-gradient px-2 py-1 medium rounded-1 text-white ms-2 hover-cursor'
                            onClick={() => {
                                setModalDelete(true);
                                setItemToBe(prop);
                            }}>
                            Delete
                        </span>
                    </div>
                )
            }
        }
    ];

    return (
        <Wrapper loading={loading}>
            <span className='fg-blue-500 font-18 mb-2 mx-5'>Search data with <strong>fuzzy search</strong></span>
            <div className='d-flex flex-row align-items-center justify-content-between bg-white border border-light shadow-sm rounded-2 py-1 px-2 mx-5'>
                <span className='fg-dark fs-4 medium'>Products</span>
                <div className='d-flex flex-row align-items-center'>
                    <ButtonU onSubmit={refresh} className={'border-dark fg-dark'} icon={faArrowRotateRight}/>
                    <InputField type={"text"} value={find} setValue={setFind} hint={`Name`} icon={faSearch} formClass="input-field-container me-1 font-14" inputClass="input-field-outline"/> 
                    <ButtonU onSubmit={createNew} className={'border-success fg-green-500'} icon={faAdd} text={'Add'}/>
                </div>
            </div>
            { productsCount ?
                <div className="mt-1 mx-5 shadow-sm pt-1 pb-3 rounded-2">
                    <TableStd modelProps={modelProps} data={products} count={productsCount} query={query}/>
                    <div className='d-flex align-items-center justify-content-between'>
                        <LimitU size={"sm"} filter={query} setFilter={setQuery}/>
                        <PaginationU filter={query} setFilter={setQuery} count={productsCount} />
                    </div>
                </div>
                : <DataNotFound/>
            }
             <Create
                modalShow={modalCreate}
                setModalShow={setModalCreate}
                toast={toast}
                setToast={setToast}
                setLoading={setLoading}
            />
            <Update
                modalShow={modalUpdate}
                setModalShow={setModalUpdate}
                toast={toast}
                setToast={setToast}
                item={itemToBe}
                setLoading={setLoading}
            />
            <Delete
                modalShow={modalDelete}
                setModalShow={setModalDelete}
                toast={toast}
                setToast={setToast}
                item={itemToBe}
                setLoading={setLoading}
            />
            <ToastU toast={toast} setToast={setToast}/>
        </Wrapper>
    );
}

export default Main;