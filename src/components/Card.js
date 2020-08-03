import React from 'react';

function Card(props) {
    function handleClick() {
        props.onCardClick(props.card);        
      }
    return (
        <div className="element">
        <button className="element__delete-button"></button>
        <img className="element__image" src={`${props.card.link}`} onClick={handleClick}></img>
        <div className="element__container">
            <h2 className="element__description">{props.card.name}</h2>
            <div className="element__like-element">
                <button className="element__like-button"></button>
                <p className="element__like-counter">{props.card.likes.length}</p>
            </div>
        </div>
    </div>
    );
}

export default Card;