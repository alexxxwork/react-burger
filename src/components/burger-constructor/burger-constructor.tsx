/* eslint-disable no-underscore-dangle */
import { useState, useReducer, useEffect, useCallback } from 'react';
import {
    ConstructorElement,
    Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch } from 'react-redux';
import { useDrop } from 'react-dnd';
import { useLocation, useNavigate } from 'react-router-dom';
import { AnyAction } from 'redux';
import Price from '../price/price';
import styles from './burger-constructor.module.css';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import OrderCard from '../order-card/order-card';
import { BUN_NAME, BLANK_GIF } from '../../utils/constants';
import { addItem, moveItem, deleteItem, auth } from '../../services/actions';
import { getOrder } from '../../services/actions/get-order';
import { useAppSelector, RootState } from '../../services/store';
import { TIngridientType } from '../../utils/types';

const initialSum = { value: 0 };
type TStoreItems = {
    ingredients: Array<TIngridientType>;
    bun: TIngridientType;
};

function BurgerConstructor(): JSX.Element {
    const [showModal, setShowModal] = useState(false);
    const { bun, ingredients }: TStoreItems = useAppSelector(
        (store: RootState) => store.items
    ) as unknown as TStoreItems;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const user = useAppSelector((store: RootState) => store.auth.user);

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

    useEffect(() => {
        dispatch(auth.getUser() as unknown as AnyAction);
    }, [dispatch]);

    let top: TIngridientType = {
        name: '',
        type: BUN_NAME,
        price: 0,
        image: BLANK_GIF,
        _id: '',
        proteins: 0,
        fat: 0,
        carbohydrates: 0,
        calories: 0,
        image_mobile: '',
        image_large: '',
        __v: 0,
    };
    let bottom: TIngridientType = top;
    const setBuns = (abun: TIngridientType) => {
        if (abun) {
            top = abun;
            bottom = { ...top, name: `${top.name} (низ)` };
            top = { ...top, name: `${top.name} (верх)` };
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
        if (!user) {
            navigate('/login', {
                //   replace: true,
                state: { from: location },
            });
        } else if (bun && ingredients.length) {
            dispatch(getOrder(bun, ingredients) as unknown as AnyAction);
            toggleModal();
        }
    };
    const moveCard = useCallback(
        (fromIndex: number, toIndex: number) => {
            // @ts-ignore
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
