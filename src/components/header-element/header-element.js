import React from 'react';
// import PropTypes from 'prop-types';
import styles from './header-element.module.css';
/*
const headerPropTypes = PropTypes.shape({
    icon: PropTypes.element.isRequired,
    text: PropTypes.string.isRequired,
}); 
*/
function HeaderElement(props) {
    const vars = props;
    return <div className={styles.header_element}>{vars.children}</div>;
}
/*
HeaderElement.propTypes = {
    props: headerPropTypes.isRequired,
};
*/
export default HeaderElement;
