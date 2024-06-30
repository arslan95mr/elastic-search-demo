import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const ProgressBar = ({...props}) => {
  return (
    <div>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={props.loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}

export default ProgressBar;