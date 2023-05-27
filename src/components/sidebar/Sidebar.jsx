import s from './sidebar.module.css';
import NewGameBtn from '../common/NewGameBtn.jsx';
import PropTypes from 'prop-types';

const Sidebar = ({ score, highestScore, newGame }) => {
    return (
        <div className={s.sidebar}>
            <h1 className={s.bigH}>2048</h1>
            <div>
                <span>Score: {score}</span> <br />
                <span>Highest Score: {highestScore}</span>
            </div>
            <NewGameBtn newGame={newGame} />
            <div className={s.howToPlay}>
                <p>
                    <b>HOW TO PLAY</b>: Use your <b>arrow keys</b> or{' '}
                    <b>WASD keys</b> to move the tiles. Press <b>"R" key</b> to
                    restart game. Tiles with the same number{' '}
                    <b>merge into one</b> when they touch. Add them up to reach{' '}
                    <b>2048</b>!
                </p>
            </div>
        </div>
    );
};

Sidebar.propTypes = {
    score: PropTypes.number,
    highestScore: PropTypes.number,
    newGame: PropTypes.func,
};

export default Sidebar;
