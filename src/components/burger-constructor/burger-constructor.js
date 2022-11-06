/* eslint-disable no-underscore-dangle */
import { useState } from 'react';
import PropTypes from 'prop-types';
import {
    ConstructorElement,
    DragIcon,
    Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import Price from '../price/price';
// import Card from '../card/card';
import styles from './burger-constructor.module.css';
import ingridientType from '../../utils/types';
import Order from '../order/order';
// import data from '../../utils/data';

const TOP_BUN_ID = '60d3b41abdacab0026a733c6';
const BUN_NAME = 'bun';

function BurgerConstructor({ data }) {
    let top = {};
    if (data.length) {
        top = data.find((i) => i._id === TOP_BUN_ID);
    }
    const [showModal, SetShowModal] = useState(false);
    const toggleModal = () => {
        SetShowModal((prevState) => !prevState);
        // console.log(showModal);
    };
    const closeModal = () => {
        SetShowModal(false);
    };
    return (
        <section
            className={`${styles.container} text text_type_main-default pt-25`}
        >
            {showModal && <Order onClose={closeModal} />}
            <div className={styles.topcards}>
                <ConstructorElement
                    type="top"
                    isLocked
                    text={`${top.name} (верх)`}
                    price={top.price}
                    thumbnail={top.image}
                />
            </div>
            <div className={styles.cards}>
                {data
                    .filter((i) => i.type !== BUN_NAME)
                    .map((i) => (
                        <div className={styles.element} key={i._id}>
                            <DragIcon type="primary" />
                            <ConstructorElement
                                text={i.name}
                                price={i.price}
                                thumbnail={i.image}
                            />
                        </div>
                    ))}
            </div>
            <div className={`${styles.topcards} mt-4`}>
                <ConstructorElement
                    type="bottom"
                    isLocked
                    text={`${top.name} (низ)`}
                    price={top.price}
                    thumbnail={top.image}
                />
            </div>
            <div className={styles.order}>
                <div className="mr-10">
                    <Price value={610} big />
                </div>
                <div>
                    <Button
                        type="primary"
                        size="large"
                        htmlType="button"
                        onClick={toggleModal}
                    >
                        Оформить заказ
                    </Button>
                </div>
            </div>
        </section>
    );
}
BurgerConstructor.propTypes = {
    data: PropTypes.arrayOf(ingridientType).isRequired,
};

export default BurgerConstructor;
