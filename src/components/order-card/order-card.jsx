import { useRef } from 'react';
import PropTypes from 'prop-types';
import {
    DragIcon,
    ConstructorElement,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag, useDrop } from 'react-dnd';
import ingridientType from '../../utils/types.ts';
// import Modal from '../modal/modal';
import styles from './order-card.module.css';
// import IngredientDetails from '../ingredient-details/ingredient-details';

function OrderCard({ item, index, moveCard, deleteCard }) {
    const ref = useRef(null);
    const [{ handlerId }, drop] = useDrop({
        accept: 'ingredient',
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            };
        },
        hover(i, monitor) {
            if (!ref.current) {
                return;
            }
            const dragIndex = i.index;
            const hoverIndex = index;
            // Don't replace items with themselves
            if (dragIndex === hoverIndex) {
                return;
            }
            // Determine rectangle on screen
            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            // Get vertical middle
            const hoverMiddleY =
                (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            // Determine mouse position
            const clientOffset = monitor.getClientOffset();
            // Get pixels to the top
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }
            // Dragging upwards
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }
            // Time to actually perform the action
            moveCard(dragIndex, hoverIndex);
            // Note: we're mutating the monitor item here!
            // eslint-disable-next-line no-param-reassign
            i.index = hoverIndex;
        },
    });
    const [, drag] = useDrag({
        type: 'ingredient',
        item: { ...item, index },
        collect: (monitor) => ({
            opacity: monitor.isDragging ? 0.8 : 1,
        }),
    });
    drag(drop(ref));
    return (
        <div
            className={styles.element}
            key={item.id}
            draggable="true"
            data-handler-id={handlerId}
            ref={ref}
        >
            <DragIcon type="primary" />
            <ConstructorElement
                text={item.name}
                price={item.price}
                thumbnail={item.image}
                handleClose={deleteCard}
            />
        </div>
    );
}

OrderCard.propTypes = {
    item: ingridientType.isRequired,
    index: PropTypes.number.isRequired,
    moveCard: PropTypes.func.isRequired,
    deleteCard: PropTypes.func.isRequired,
};
OrderCard.defaultProps = {};

export default OrderCard;
