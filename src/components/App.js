import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import '../index.css';


function App(props) {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false)
    const [selectedCard, setIsSelectedCard] = React.useState(null)

    function handleCardClick(card) {
        setIsSelectedCard(card);
    }
    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    }
    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true)
    }
    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true)
    }
    function closeAllPopups() {
        setIsAddPlacePopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setIsSelectedCard(null);
    }
    return (
        <div className="App">
            <div className="page">
                <Header />
                <Main onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick} />
                <Footer />
                <PopupWithForm
                    onClose={closeAllPopups}
                    isOpen={isEditProfilePopupOpen}
                    title='Обновить аватар'
                    name=' '
                    id='popup-changeavatar'
                    children=
                    {
                        <fieldset className="popup-form__set">
                            <label className="popup-form__field">
                                <input className="popup-form__input" required name="link" type="url"
                                    placeholder="Ссылка на картинку" id="second-field-input"></input>
                                <span className="popup-form__input-error" id="second-field-input-error"></span>
                            </label>
                            <button className="popup-form__submit button" type="submit">Сохранить</button>
                        </fieldset>
                    }
                />
                <PopupWithForm
                    title='Новое место'
                    name='add'
                    id='popup-createplace'
                    isOpen={isAddPlacePopupOpen}
                    onClose={closeAllPopups}
                    children=
                    {
                        <fieldset className="popup-form__set">
                            <label className="popup-form__field">
                                <input className="popup-form__input" required minLength="1" maxLength="30" type="text" name="name"
                                    placeholder="Название" id="first-field-input">
                                </input>
                                <span className="popup-form__input-error" id="first-field-input-error"></span>
                            </label>
                            <label className="popup-form__field">
                                <input className="popup-form__input" required name="link" type="url"
                                    placeholder="Ссылка на картинку" id="second-field-input">
                                </input>
                                <span className="popup-form__input-error" id="second-field-input-error"></span>
                            </label>
                            <button className="popup-form__submit button" type="submit">Создать</button>
                        </fieldset>
                    }
                />
                <PopupWithForm
                    title='Обновить аватар'
                    name=' '
                    id='popup-changeavatar'
                    isOpen={isEditAvatarPopupOpen}
                    onClose={closeAllPopups}
                    children=
                    {
                        <fieldset className="popup-form__set">
                            <label className="popup-form__field">
                                <input className="popup-form__input" required name="link" type="url"
                                    placeholder="Ссылка на картинку" id="second-field-input"></input>
                                <span className="popup-form__input-error" id="second-field-input-error"></span>
                            </label>
                            <button className="popup-form__submit button" type="submit">Сохранить</button>
                        </fieldset>
                    }
                />
                <ImagePopup card={selectedCard} onClose={closeAllPopups} />
            </div>
        </div>
    );
}

export default App;
