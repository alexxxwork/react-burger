/* eslint-disable no-underscore-dangle */
import { useState, useRef } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../card/card';
// import { getItems } from '../../services/reducers/get-items';
import { setCurrentItem, showModal } from '../../services/actions';
import styles from './burger-ingredients.module.css';
import { BUN_NAME, SAUCE_NAME, MAIN_NAME } from '../../utils/constants';

function BurgerIngredients() {
    const [current, setCurrent] = useState('buns');
    const { ingredients, bun } = useSelector((s) => s.items);
    const { data, isLoading, hasError } = useSelector((s) => s.fetch);
    const refs = { buns: useRef(), main: useRef(), sauce: useRef() };
    const scroll = useRef();

    const dispatch = useDispatch();

    const toggleDetails = (item) => {
        dispatch(setCurrentItem(item));
        dispatch(showModal(true));
    };

    const onScroll = () => {
        let delta = scroll.current.getBoundingClientRect().top;
        let tab = current;
        Object.keys(refs).forEach((ref) => {
            const curDelta = Math.abs(
                delta - refs[ref].current.getBoundingClientRect().top
            );
            if (curDelta < delta) {
                delta = curDelta;
                tab = ref;
            }
        });
        if (tab !== current) setCurrent(tab);
    };

    const setTab = (tab) => {
        scroll.current.scrollTo({
            left: 0,
            top: ((t) => {
                switch (t) {
                    case 'sauce':
                        return refs.buns.current.getBoundingClientRect().height;
                    case 'main':
                        return (
                            refs.buns.current.getBoundingClientRect().height +
                            refs.sauce.current.getBoundingClientRect().height
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
                    ????????????????...
                </p>
            )}
            {hasError && (
                <p
                    className={`text text_type_main-medium pt-5 ${styles.centered}`}
                >
                    ???? ?????????????? ?????????????????? ????????????
                </p>
            )}
            {!isLoading && !hasError && data.length && (
                <section className={styles.container}>
                    {/* isShowModal && currentItem && (
                        <Modal text="???????????? ??????????????????????" onClose={closeDetails}>
                            <IngredientDetails item={currentItem} />
                        </Modal>
                    ) */}
                    <div
                        className={`${styles.header} text text_type_main-default`}
                    >
                        ???????????????? ????????????
                    </div>
                    <div className={`${styles.tab}`}>
                        <Tab
                            value="buns"
                            active={current === 'buns'}
                            onClick={setTab}
                        >
                            ??????????
                        </Tab>
                        <Tab
                            value="sauce"
                            active={current === 'sauce'}
                            onClick={setTab}
                        >
                            ??????????
                        </Tab>
                        <Tab
                            value="main"
                            active={current === 'main'}
                            onClick={setTab}
                        >
                            ??????????????
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
                                ??????????
                            </div>

                            {data
                                .filter((i) => i.type === BUN_NAME)
                                .map((i) => (
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
                                ??????????
                            </div>
                            {data
                                .filter((i) => i.type === SAUCE_NAME)
                                .map((i) => (
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
                                ??????????????
                            </div>
                            {data
                                .filter((i) => i.type === MAIN_NAME)
                                .map((i) => (
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
                    </div>
                </section>
            )}
        </>
    );
}

export default BurgerIngredients;
