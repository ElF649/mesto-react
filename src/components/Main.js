import React, { useReducer } from 'react';
import Card from './Card'
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { api } from '../utils/Api'


function Main(props) {
    const currentUser = React.useContext(CurrentUserContext);    
    

    return (
        <main className="main-content">
            <section className="profile">
                <div className="profile__container">
                    <div className="profile__avatar-container" onClick={props.onEditAvatar}>
                        <img className="profile__avatar" src={`${currentUser && currentUser.avatar}`}></img>
                        <div className="profile__avatar-icon"></div>
                    </div>

                    <div className="profile__info">
                        <div className="profile__info-text-container">
                            <h1 className="profile__info-name">{currentUser && currentUser.name}</h1>
                            <p className="profile__info-description">{currentUser && currentUser.about}</p>
                        </div>
                        <button className="profile__info-edit-button" onClick={props.onEditProfile}>
                            <svg className="profile__info-edit-button-img" width="10" height="10" viewBox="0 0 10 10"
                                fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M10 1.32827L2.60377 8.7666L1.28302 7.41936L8.66038 0L10 1.32827ZM0 10L1.96226 9.41177L0.584906 8.08349L0 10Z"
                                    fill="white" />
                            </svg>
                        </button>
                    </div>
                </div>
                <button className="add-button" onClick={props.onAddPlace}>
                    <svg className="add-button__image" width="22" height="22" viewBox="0 0 22 22" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path d="M22 9.77778H12.2222V0H9.77778V9.77778H0V12.2222H9.77778V22H12.2222V12.2222H22V9.77778Z"
                            fill="white" />
                    </svg>
                </button>
            </section>

            <section className="elements">
                {props.cards.map((item) => (
                   <Card card={item}
                   cards={props.cards}
                   onCardClick={props.onCardClick} 
                   key={item._id} 
                   onCardLike={props.onCardLike} 
                   onCardDelete={props.onCardDelete} />
                ))}
            </section>
        </main>
    );
}

export default Main;