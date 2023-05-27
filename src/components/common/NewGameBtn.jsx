import s from './newGameBtn.module.css';
import PropTypes from 'prop-types';

const NewGameBtn = ({ newGame }) => {
    return (
        <div>
            <button onClick={newGame} className={s.btn}>
                New game
            </button>
        </div>
    );
};

NewGameBtn.propTypes = {
    newGame: PropTypes.func,
};

export default NewGameBtn;
