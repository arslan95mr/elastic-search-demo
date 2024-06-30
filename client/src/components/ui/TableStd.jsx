import {Table} from 'react-bootstrap'

const TableStd = ({...props}) => {
    return(
        <Table hover className='small overflow-hidden'>
            <thead>
                <tr className='small'>
                    { props.modelProps.map((prop, i) => {
                        return (<th className='table-th-cell bg-light fg-dark font-13' scope='col' key={i}>{prop.name}</th>)
                    })}
                </tr>
            </thead>
            <tbody>
                { props.data.map((row, i) => {
                    return(
                        <tr className='small' key={i}>
                            { props.modelProps.map((prop, j) => {
                                return (<td className='table-cell fg-dark' key={i + '_' + j}>{ prop.value(row) }</td>)
                            })}
                        </tr>
                    )
                }) }
            </tbody>
            {props.query && <tfoot>
                <tr>
                    <td className='pt-4'>
                        {props.query.limit * (props.query.page - 1) + props.data.length}/{props.count}
                    </td>
                </tr>
            </tfoot>}
        </Table>
    );
}

export default TableStd;