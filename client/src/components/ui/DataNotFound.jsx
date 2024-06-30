import icXmarkSquare from "../../assets/svg/ic_x_mark_square.svg";

const DataNotFound = () => {
    return (
        <div className="d-flex flex-column align-items-center justify-content-center m-5">
            <img src={icXmarkSquare} className="wh-30" />
            <span className="fs-4 text-secondary mt-3">Data not found</span>
        </div>
    );
}

export default DataNotFound;