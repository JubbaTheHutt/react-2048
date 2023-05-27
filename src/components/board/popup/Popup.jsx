import styles from './popup.module.css';
import { useEffect } from 'react';
const Popup = (props) => {
    useEffect(() => {
        props.active
            ? (document.body.style.overflow = 'hidden')
            : (document.body.style.overflow = 'unset');
    }, [props.active]);

    return (
        <div
            className={
                props.active ? `${styles.popup} ${styles.active}` : styles.popup
            }
            onClick={() => props.setActive(false)}
        >
            <div
                className={
                    props.active
                        ? `${styles.popupContent} ${styles.active}`
                        : styles.popupContent
                }
                onClick={(e) => e.stopPropagation()}
            >
                {props.children}
            </div>
        </div>
    );
};

export default Popup;
