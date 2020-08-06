import React from 'react';
import PopupWithForm from './PopupWithForm';

export default function EditAvatarPopup(props) {
    const link = React.createRef();
    function handleSubmit(e) {
        e.preventDefault();      
        props.onUpdateAvatar(link.current.value);  
        link.current.value='';      
      }
    return (
    <PopupWithForm
        onClose={props.onClose}
        isOpen={props.isOpen}
        onSubmit={handleSubmit}
        title='Обновить аватар'
        name=' '
        id='popup-changeavatar'
        children=
        {
            <fieldset className="popup-form__set">
                <label className="popup-form__field">
                    <input className="popup-form__input" required name="link" type="url"
                        placeholder="Ссылка на картинку" id="second-field-input" ref={link}></input>
                    <span className="popup-form__input-error" id="second-field-input-error"></span>
                </label>
                <button className="popup-form__submit button" type="submit">Сохранить</button>
            </fieldset>
        }
    />
    )
}