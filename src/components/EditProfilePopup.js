import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';


export default function EditProfilePopup(props) {
    
    const [name, setName] = React.useState();
    const [description, setDescription] = React.useState();
    const currentUser = React.useContext(CurrentUserContext);
    React.useEffect(() => {
        if (currentUser) {
            setName(currentUser.name);
            setDescription(currentUser.about);
        }

    }, [currentUser]);

    function handleChangeName(e) {
        setName(e.target.value); 
    }
    function handleChangeDescription(e) {       
        setDescription(e.target.value);
    }
    function handleSubmit(e) {

        e.preventDefault();


        props.onUpdateUser({
            name: name,
            about: description,
        });
    }

    return (
        <PopupWithForm
            title='Редактировать профиль'
            name=' '
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}
            id='popup-editprofile'
            children=
            {
                <fieldset className="popup-form__set">
                    <label className="popup-form__field">
                        <input className="popup-form__input" name="Name" onChange={handleChangeName} required minLength="2" maxLength="40" type="text"
                            pattern="[a-zA-ZА-ЯЁа-яё\s\-]+[^\s\-]+" id="first-field-input" value={name}></input>
                        <span className='popup-form__input-error' id='first-field-input-error'></span>
                    </label>
                    <label className="popup-form__field">
                        <input className="popup-form__input" name="Description" onChange={handleChangeDescription} required minLength="2" maxLength="200"
                            id="second-field-input" value={description}></input>
                        <span className='popup-form__input-error' id='second-field-input-error'></span>
                    </label>
                    <button className="popup-form__submit button" type="submit">Сохранить</button>
                </fieldset>
            }
        />
    )
}