/* eslint-disable no-underscore-dangle */
import { useState, useContext, useReducer, useEffect } from 'react';
import {
    ConstructorElement,
    DragIcon,
    Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { v4 as uuid } from 'uuid';
import Price from '../price/price';
import styles from './burger-constructor.module.css';
// import PropTypes from 'prop-types';
// import ingridientType from '../../utils/types';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import { DataContext } from '../../utils/dataContext';

// const TOP_BUN_ID = '60d3b41abdacab0026a733c6';
const BUN_NAME = 'bun';
const BLANK_GIF = 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=';
const initialSum = { value: 0 };
const ORDER_URL = 'https://norma.nomoreparties.space/api/orders';

function BurgerConstructor() {
    const [showModal, setShowModal] = useState(false);
    const { state, setState } = useContext(DataContext);
    const { bun, ingredients } = state;

    function reducer() {
        return (ingredients && ingredients.length) || bun
            ? {
                  value: ingredients.reduce(
                      (sum, c) => sum + c.price,
                      bun && bun.price * 2
                  ),
              }
            : initialSum;
    }
    const [sumState, dispatchSum] = useReducer(reducer, initialSum);
    useEffect(() => {
        dispatchSum();
    }, [bun, ingredients]);

    let top = {};
    let bottom = {};

    // if (data.length) {
    // bun = data.find((i) => i._id === TOP_BUN_ID);
    // }
    if (bun) {
        top = bun;
        bottom = { ...top, name: `${top.name} (низ)` };
        top = { ...top, name: `${top.name} (верх)` };
    } else {
        top = {
            name: '',
            type: BUN_NAME,
            price: null,
            image: BLANK_GIF,
        };
        bottom = top;
    }
    const toggleModal = () => {
        setShowModal((prevState) => !prevState);
    };
    const closeModal = () => {
        setShowModal(false);
    };
    const sendOrder = () => {
        toggleModal();
        const getData = async () => {
            await fetch(ORDER_URL, {
                method: 'post',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ingredients: [
                        bun._id,
                        bun._id,
                        ...ingredients.map((i) => i._id),
                    ],
                }),
            })
                .then(async (res) => {
                    if (!res.ok) {
                        const json = await res.json();
                        throw new Error(json);
                    }
                    return res.json();
                })
                .then((data) => {
                    setState({
                        ...state,
                        order: {
                            ...state.order,
                            data,
                            hasError: false,
                            isLoading: false,
                        },
                    });
                })
                .catch((err) => {
                    setState({
                        ...state,
                        order: {
                            ...state.order,
                            hasError: true,
                            isLoading: false,
                        },
                        error: err,
                    });
                });
        };
        setState({
            ...state,
            order: { ...state.order, hasError: false, isLoading: true },
            error: null,
        });
        getData();
    };
    return (
        <section
            className={`${styles.container} text text_type_main-default pt-25`}
        >
            {showModal && (
                <Modal onClose={closeModal}>
                    <OrderDetails />
                </Modal>
            )}
            <div className={styles.topcards} key={uuid()}>
                <ConstructorElement
                    type="top"
                    isLocked
                    text={top.name}
                    price={top.price}
                    thumbnail={top.image}
                />
            </div>
            <div className={styles.cards}>
                {ingredients.length ? (
                    ingredients
                        .filter((i) => i.type !== BUN_NAME)
                        .map((i) => (
                            <div className={styles.element} key={i.id}>
                                <DragIcon type="primary" />
                                <ConstructorElement
                                    text={i.name}
                                    price={i.price}
                                    thumbnail={i.image}
                                />
                            </div>
                        ))
                ) : (
                    <div className={styles.element} key={uuid()}>
                        <div className={styles.placeholder_left} />
                        <div className={styles.placeholder}>
                            Добавьте ингредиенты
                        </div>
                    </div>
                )}
            </div>
            <div className={`${styles.topcards} mt-4`} key={uuid()}>
                <ConstructorElement
                    type="bottom"
                    isLocked
                    text={bottom.name}
                    price={bottom.price}
                    thumbnail={bottom.image}
                />
            </div>
            <div className={styles.order}>
                <div className="mr-10">
                    <Price value={sumState.value} big />
                </div>
                <div>
                    <Button
                        type="primary"
                        size="large"
                        htmlType="button"
                        onClick={sendOrder}
                    >
                        Оформить заказ
                    </Button>
                </div>
            </div>
        </section>
    );
}
// BurgerConstructor.propTypes = {
//    data: PropTypes.arrayOf(ingridientType).isRequired,
// };

export default BurgerConstructor;
