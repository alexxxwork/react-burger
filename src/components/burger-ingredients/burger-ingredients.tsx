/* eslint-disable no-underscore-dangle */
import { useState, useRef } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from 'react-redux';
import Card from '../card/card';
// import { getItems } from '../../services/reducers/get-items';
import { setCurrentItem, showModal } from '../../services/actions';
import styles from './burger-ingredients.module.css';
import { BUN_NAME, SAUCE_NAME, MAIN_NAME } from '../../utils/constants';
import {
    useAppDispatch,
    useAppSelector,
    RootState,
} from '../../services/store';
import { TIngridientType } from '../../utils/types';

type TStoreItems = {
    ingredients: Array<TIngridientType>;
    bun: TIngridientType;
};

function BurgerIngredients(): JSX.Element {
    const [current, setCurrent] = useState('buns');
    const { ingredients, bun }: TStoreItems = useSelector(
        (store: RootState) => store.items
    ) as unknown as TStoreItems;
    const { data, isLoading, hasError } = useAppSelector(
        (store: RootState) => store.fetch
    );
    const refs = {
        buns: useRef<HTMLDivElement | null>(null),
        main: useRef<HTMLDivElement | null>(null),
        sauce: useRef<HTMLDivElement | null>(null),
    };
    const scroll = useRef<HTMLDivElement | null>(null);

    const dispatch = useAppDispatch();

    const toggleDetails = (item: TIngridientType) => {
        dispatch(setCurrentItem(item));
        dispatch(showModal(true));
    };

    const onScroll = () => {
        let delta = scroll.current!.getBoundingClientRect().top;
        let tab = current;
        Object.keys(refs).forEach((ref: string) => {
            const curDelta = Math.abs(
                delta -
                    refs[
                        ref as keyof typeof refs
                    ].current!.getBoundingClientRect().top
            );
            if (curDelta < delta) {
                delta = curDelta;
                tab = ref;
            }
        });
        if (tab !== current) setCurrent(tab);
    };

    const setTab = (tab: string) => {
        scroll.current!.scrollTo({
            left: 0,
            top: ((t) => {
                switch (t) {
                    case 'sauce':
                        return refs.buns.current!.getBoundingClientRect()
                            .height;
                    case 'main':
                        return (
                            refs.buns.current!.getBoundingClientRect().height +
                            refs.sauce.current!.getBoundingClientRect().height
                        );
                    default:
                        return 0;
                }
            })(tab),
            behavior: 'smooth',
        });
        setCurrent(tab);
    };

    return (
        <>
            {isLoading && (
                <p className={`text text_type_main-medium ${styles.centered}`}>
                    Загрузка...
                </p>
            )}
            {hasError && (
                <p
                    className={`text text_type_main-medium pt-5 ${styles.centered}`}
                >
                    Не удалось загрузить данные
                </p>
            )}
            {!isLoading && !hasError && data.length && (
                <section className={styles.container}>
                    <div
                        className={`${styles.header} text text_type_main-default`}
                    >
                        Соберите бургер
                    </div>
                    <div className={`${styles.tab}`}>
                        <Tab
                            value="buns"
                            active={current === 'buns'}
                            onClick={setTab}
                        >
                            Булки
                        </Tab>
                        <Tab
                            value="sauce"
                            active={current === 'sauce'}
                            onClick={setTab}
                        >
                            Соусы
                        </Tab>
                        <Tab
                            value="main"
                            active={current === 'main'}
                            onClick={setTab}
                        >
                            Начинки
                        </Tab>
                    </div>
                    <div
                        className={`${styles.cards} text text_type_main-default`}
                        ref={scroll}
                        onScroll={onScroll}
                    >
                        <div ref={refs.buns} className={styles.section_cards}>
                            <div
                                className={`${styles.section} text text_type_main-default mb-6 mt-10`}
                            >
                                Булки
                            </div>

                            {data
                                .filter(
                                    (i: TIngridientType) => i.type === BUN_NAME
                                )
                                .map((i: TIngridientType) => (
                                    <Card
                                        item={i}
                                        key={i._id}
                                        onClick={() => toggleDetails(i)}
                                        draggable
                                        count={bun && bun._id === i._id ? 2 : 0}
                                    />
                                ))}
                        </div>
                        <div ref={refs.sauce} className={styles.section_cards}>
                            <div
                                className={`${styles.section} text text_type_main-default mb-6 mt-10`}
                            >
                                Соусы
                            </div>
                            {data
                                .filter(
                                    (i: TIngridientType) =>
                                        i.type === SAUCE_NAME
                                )
                                .map((i: TIngridientType) => (
                                    <Card
                                        item={i}
                                        key={i._id}
                                        onClick={() => toggleDetails(i)}
                                        draggable
                                        count={
                                            ingredients.filter(
                                                (c) => c._id === i._id
                                            ).length
                                        }
                                    />
                                ))}
                        </div>
                        <div ref={refs.main} className={styles.section_cards}>
                            <div
                                className={`${styles.section} text text_type_main-default mb-6 mt-10`}
                            >
                                Начинки
                            </div>
                            {data
                                .filter(
                                    (i: TIngridientType) => i.type === MAIN_NAME
                                )
                                .map((i: TIngridientType) => (
                                    <Card
                                        item={i}
                                        key={i._id}
                                        onClick={() => toggleDetails(i)}
                                        draggable
                                        count={
                                            ingredients.filter(
                                                (c: TIngridientType) =>
                                                    c._id === i._id
                                            ).length
                                        }
                                    />
                                ))}
                        </div>
                    </div>
                </section>
            )}
        </>
    );
}

export default BurgerIngredients;
