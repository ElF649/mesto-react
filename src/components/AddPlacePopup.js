import React from 'react';
import PopupWithForm from './PopupWithForm';

export default function AddPlacePopup(props) {
    const name = React.createRef();
    const link = React.createRef();
    function handleSubmit(e) {
        e.preventDefault();
        props.onAddPlace({
            name: name.current.value,
            link: link.current.value
        });
        link.current.value = '';
        name.current.value = '';
    }
    
    return (
        <PopupWithForm
            title='Новое место'
            name='add'
            id='popup-createplace'
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}
            children=
            {
                <fieldset className="popup-form__set">
                    <label className="popup-form__field">
                        <input className="popup-form__input" ref={name} required minLength="1" maxLength="30" type="text" name="name"
                            placeholder="Название" id="first-field-input">
                        </input>
                        <span className="popup-form__input-error" id="first-field-input-error"></span>
                    </label>
                    <label className="popup-form__field">
                        <input className="popup-form__input" ref={link} required name="link" type="url"
                            placeholder="Ссылка на картинку" id="second-field-input">
                        </input>
                        <span className="popup-form__input-error" id="second-field-input-error"></span>
                    </label>
                    <button className="popup-form__submit button" type="submit">Создать</button>
                </fieldset>
            }
        />
    )
}