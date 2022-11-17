/* eslint-disable no-underscore-dangle */
import { useState, useEffect, useRef } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../card/card';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { getItems } from '../../services/reducers';
import { addItem, setCurrentItem } from '../../services/actions';
import styles from './burger-ingredients.module.css';
import { BUN_NAME, SAUCE_NAME, MAIN_NAME } from '../../utils/constants';

function BurgerIngredients() {
    const [current, setCurrent] = useState('buns');
    const [showModal, setShowModal] = useState(false);
    const { data, currentItem, ingredients, bun } = useSelector(
        (store) => store.items
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const refs = { buns: useRef(), main: useRef(), sauce: useRef() };
    const scroll = useRef();

    const dispatch = useDispatch();
    useEffect(() => dispatch(getItems()), [dispatch]);

    const toggleDetails = (item) => {
        dispatch(setCurrentItem(item));
        dispatch(addItem(item));
        setShowModal((prevState) => !prevState);
    };
    const closeDetails = () => {
        setShowModal(false);
        dispatch(setCurrentItem(null));
    };

    useEffect(() => {
        const scrollRef = scroll.current;

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
        scrollRef.addEventListener('scroll', onScroll);
        return () => scrollRef.removeEventListener('scroll', onScroll);
    }, [current, refs]);

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
        <section className={styles.container}>
            {showModal && currentItem && (
                <Modal text="Детали ингридиента" onClose={closeDetails}>
                    <IngredientDetails item={currentItem} />
                </Modal>
            )}
            <div className={`${styles.header} text text_type_main-default`}>
                Соберите бургер
            </div>
            <div className={`${styles.tab}`}>
                <Tab value="buns" active={current === 'buns'} onClick={setTab}>
                    Булки
                </Tab>
                <Tab
                    value="sauce"
                    active={current === 'sauce'}
                    onClick={setTab}
                >
                    Соусы
                </Tab>
                <Tab value="main" active={current === 'main'} onClick={setTab}>
                    Начинки
                </Tab>
            </div>
            <div
                className={`${styles.cards} text text_type_main-default`}
                ref={scroll}
            >
                <div ref={refs.buns} className={styles.section_cards}>
                    <div
                        className={`${styles.section} text text_type_main-default mb-6 mt-10`}
                    >
                        Булки
                    </div>

                    {data
                        .filter((i) => i.type === BUN_NAME)
                        .map((i) => (
                            <Card
                                item={i}
                                key={i._id}
                                onClick={() => toggleDetails(i)}
                                draggable
                                count={bun && bun._id === i._id ? 1 : 0}
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
                        .filter((i) => i.type === SAUCE_NAME)
                        .map((i) => (
                            <Card
                                item={i}
                                key={i._id}
                                onClick={() => toggleDetails(i)}
                                draggable
                                count={
                                    ingredients.filter((c) => c._id === i._id)
                                        .length
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
                        .filter((i) => i.type === MAIN_NAME)
                        .map((i) => (
                            <Card
                                item={i}
                                key={i._id}
                                onClick={() => toggleDetails(i)}
                                draggable
                                count={
                                    ingredients.filter((c) => c._id === i._id)
                                        .length
                                }
                            />
                        ))}
                </div>
            </div>
        </section>
    );
}

export default BurgerIngredients;
