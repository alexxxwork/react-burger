import React from 'react';
import { Link } from 'react-router-dom';
import TRex from '../images/Chromium_T-Rex-error-offline.svg';
import styles from './pages.module.css';

function Route404() {
    return (
        <div className={`${styles.block} text text_type_main-medium`}>
            <img src={TRex} alt="T-Rex not found" className="p-4" />
            <div className="p-4 text text_type_main-big">404</div>
            <div className="p-2">К сожалнию, эта страница вымерла =(</div>
            <div className="p-2">
                Давайте поищем снова, начнем с <Link to="/">главной</Link>
            </div>
        </div>
    );
}

export default Route404;
