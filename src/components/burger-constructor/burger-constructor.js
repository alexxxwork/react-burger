/* eslint-disable no-underscore-dangle */
import React from 'react';
import {
    ConstructorElement,
    DragIcon,
    Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import Price from '../price/price';
// import Card from '../card/card';
import styles from './burger-constructor.module.css';
import data from '../../utils/data';

function BurgerConstructor() {
    const top = data.find((i) => i._id === '60666c42cc7b410027a1a9b1');
    const bottom = top;
    return (
        <section
            className={`${styles.container} text text_type_main-default pt-25`}
        >
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
                    .filter((i) => i.type !== 'bun')
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
                    text={`${bottom.name} (низ)`}
                    price={bottom.price}
                    thumbnail={bottom.image}
                />
            </div>
            <div className={styles.order}>
                <div className="mr-10">
                    <Price value={610} big />
                </div>
                <div>
                    <Button type="primary" size="large" htmlType="button">
                        Оформить заказ
                    </Button>
                </div>
            </div>
        </section>
    );
}

export default BurgerConstructor;
