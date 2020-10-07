import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card(props) {
    const currentUser = React.useContext(CurrentUserContext);
    function handleClick() {
        props.onCardClick(props.card);
    }
    function handleLikeClick() {
        props.onCardLike(props.card);
    }
    function handleDeleteClick() {
        props.onCardDelete(props.card)
    }

    const isOwn = props.card.owner._id === currentUser._id;

    const cardDeleteButtonClassName = (
        `${isOwn ? 'element__delete-button_visible' : 'element__delete-button_hidden'}`
    );
    const isLiked = props.card.likes.some(i => i._id === currentUser._id);


    const cardLikeButtonClassName = (`${isLiked ? 'element__like-button_active element__like-button' : 'element__like-button'}`);

    return (
        <div className="element">
            <button className={cardDeleteButtonClassName} onClick={handleDeleteClick}></button>
            <img className="element__image" src={`${props.card.link}`} onClick={handleClick} />
            <div className="element__container">
                <h2 className="element__description">{props.card.name}</h2>
                <div className="element__like-element">
                    <button className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
                    <p className="element__like-counter">{props.card.likes.length}</p>
                </div>
            </div>
        </div>
    );
}

export default Card;