import React from 'react';
import styles from './header-element.module.css';

type THeaderElementProps = {
    children: JSX.Element;
};

function HeaderElement(props: THeaderElementProps): JSX.Element {
    const { children } = props;
    return <div className={styles.header_element}>{children}</div>;
}

export default HeaderElement;
