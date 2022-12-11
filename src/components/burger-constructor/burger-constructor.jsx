/* eslint-disable no-underscore-dangle */
import { useState, useReducer, useEffect, useCallback } from 'react';
import {
    ConstructorElement,
    Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector, useDispatch } from 'react-redux';
import { useDrop } from 'react-dnd';
import Price from '../price/price';
import styles from './burger-constructor.module.css';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import OrderCard from '../order-card/order-card';
import { getOrder } from '../../services/reducers/order';
import { BUN_NAME, BLANK_GIF } from '../../utils/constants';
import { addItem, moveItem, deleteItem } from '../../services/actions';

const initialSum = { value: 0 };

function BurgerConstructor() {
    const [showModal, setShowModal] = useState(false);
    const { bun, ingredients } = useSelector((store) => store.items);
    const dispatch = useDispatch();

    const [, dropTarget] = useDrop({
        accept: ['main', 'sauce'],
        drop(item) {
            dispatch(addItem(item));
        },
        collect: (monitor) => ({
            isHover: monitor.isOver(),
        }),
    });
    const [, dropUpBun] = useDrop({
        accept: 'bun',
        drop(item) {
            dispatch(addItem(item));
        },
        collect: (monitor) => ({
            isHover: monitor.isOver(),
        }),
    });
    const [, dropBottomBun] = useDrop({
        accept: 'bun',
        drop(item) {
            dispatch(addItem(item));
        },
        collect: (monitor) => ({
            isHover: monitor.isOver(),
        }),
    });

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

    let top = null;
    let bottom = null;
    const setBuns = (abun) => {
        if (abun) {
            top = abun;
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
    };

    setBuns(bun);

    const toggleModal = () => {
        setShowModal((prevState) => !prevState);
    };
    const closeModal = () => {
        setShowModal(false);
    };
    const sendOrder = () => {
        if (bun && ingredients.length) {
            dispatch(getOrder(bun, ingredients));
            toggleModal();
        }
    };
    const moveCard = useCallback(
        (fromIndex, toIndex) => {
            dispatch(moveItem({ fromIndex, toIndex }));
        },
        [dispatch]
    );

    return (
        <section
            className={`${styles.container} text text_type_main-default pt-25`}
        >
            {showModal && (
                <Modal onClose={closeModal}>
                    <OrderDetails />
                </Modal>
            )}
            <div className={styles.topcards} ref={dropUpBun}>
                <ConstructorElement
                    type="top"
                    isLocked
                    text={top.name}
                    price={top.price}
                    thumbnail={top.image}
                />
            </div>
            <div className={styles.cards} ref={dropTarget}>
                {ingredients.length ? (
                    ingredients
                        .filter((i) => i.type !== BUN_NAME)
                        .map((item, index) => (
                            <OrderCard
                                item={item}
                                index={index}
                                moveCard={moveCard}
                                deleteCard={() => dispatch(deleteItem(index))}
                                key={item.id}
                            />
                        ))
                ) : (
                    <div className={styles.element}>
                        <div className={styles.placeholder_left} />
                        <div className={styles.placeholder}>
                            Добавьте ингредиенты
                        </div>
                    </div>
                )}
            </div>
            <div className={`${styles.topcards} mt-4`} ref={dropBottomBun}>
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

export default BurgerConstructor;
