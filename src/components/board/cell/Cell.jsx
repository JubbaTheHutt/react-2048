import './cell.css';
import PropTypes from 'prop-types';

const Cell = ({ value }) => {
    return (
        <div
            className={
                value < 2048 ? `cell number${value}` : `cell numberLarge`
            }
        >
            {value > 0 ? value : ''}
        </div>
    );
};

Cell.propTypes = {
    value: PropTypes.number,
};

export default Cell;
