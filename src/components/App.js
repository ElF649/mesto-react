/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import Login from './Login';
import ProtectedRoute from './ProtectedRoute';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import '../index.css';
import { api } from '../utils/Api'
import { Route, Switch, useHistory } from 'react-router-dom';
import Register from './Register';
import InfoTooltip from './InfoTooltip'
import * as auth from '../utils/auth.js';

function App(props) {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false)
    const [isInfotoolipOpen, setIsInfoTooltipOpen] = React.useState(false);
    const [selectedCard, setIsSelectedCard] = React.useState(null)
    const [currentUser, setCurrentUser] = React.useState(null);
    const [cards, setCards] = React.useState([])
    const [loggedIn, setLoggedIn] = React.useState(false)
    const [userEmail, setUserEmail] = React.useState('');
    const [singupSucceed, setSignupSucceed] = React.useState(false);

    const history = useHistory();

    React.useEffect(() => {
        handleTokenCheck();
    }, [handleTokenCheck]);

    React.useEffect(() => {
        api.getInitialCards().then((initialCards) => {
            setCards(initialCards)
        }).catch((err) => {
            console.log(err);
        })
    }, []);

    React.useEffect(() => {
        api.getProfileInfo().then((userInfo) => {
            setCurrentUser(userInfo)
        }).catch((err) => {
            console.log(err);
        })
    }, []);

    function handleTokenCheck() {
        if (localStorage.getItem('jwt')) {
            const jwt = localStorage.getItem('jwt');
            auth.checkToken(jwt).then((res) => {
                if (res) {
                    setUserEmail(res.data.email)
                    setLoggedIn(true);
                    history.push('/')
                }
            })
                .catch(err => console.log(err));
        }
    };


    function handleLogin(password, email) {
        auth.authorize(password, email)
            .then((data) => {
                if (data.token) {
                    setLoggedIn(true);
                    history.push('/');
                }
            })
            .catch(err => console.log(err));
    }
    function handleLogout() {
        setLoggedIn(false);
        localStorage.removeItem('jwt');
        history.push('/sign-in');
    }
    function handleRegister(password, email) {
        auth.register(password, email)
            .then(() => {
                handleInfoTooltip(true);
                history.push('/sign-in');
            })
            .catch((err) => {
                handleInfoTooltip(false);
                console.log(err)
            });
    }

    function handleCardLike(card) {

        const isLiked = card.likes.some(i => i._id === currentUser._id);

        api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {

            const newCards = cards.map((c) => c._id === card._id ? newCard : c);

            setCards(newCards);
        });
    }
    function handleCardDelete(card) {
        api.deleteCard(card._id).then(() => {
            setCards(cards.filter(item => item !== card))
        })
    }

    function handleInfoTooltip(succeed) {
        setSignupSucceed(succeed)
        setIsInfoTooltipOpen(true)
    }
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
        setIsInfoTooltipOpen(false);
        setIsSelectedCard(null);
    }
    function handleUpdateUser(data) {

        api.patchProfileInfo(data).then((info) => {
            setCurrentUser(info)
        }).then(() => {
            closeAllPopups()
        }).catch((err) => {
            console.log(err);
        })
    }
    function handleUpdateAvatar(data) {
        api.patchAvatar(data).then((info) => {
            setCurrentUser(info)
        }).then(() => {
            closeAllPopups()
        }).catch((err) => {
            console.log(err);
        })
    }
    function handleAddPlaceSubmit(data) {
        api.postNewCard(data).then((newCard) => {
            setCards([newCard, ...cards]);
        }).then(() => {
            closeAllPopups()
        }).catch((err) => {
            console.log(err);
        })
    }
    return (
        <div className="App">
            <div className="page">
                <CurrentUserContext.Provider value={currentUser}>
                    <Header
                        loggedIn={loggedIn}
                        userEmail={userEmail}
                        logOut={handleLogout}
                    />
                    <Switch>
                        <ProtectedRoute
                            exact
                            path="/"
                            loggedIn={loggedIn}
                            component={Main}
                            cards={cards}
                            onEditProfile={handleEditProfileClick}
                            onAddPlace={handleAddPlaceClick}
                            onEditAvatar={handleEditAvatarClick}
                            onCardClick={handleCardClick}
                            onCardLike={handleCardLike}
                            onCardDelete={handleCardDelete}
                        />
                        <Route path="/sign-in">
                            <Login onLogin={handleLogin} />
                        </Route>
                        <Route path="/sign-up">
                            <Register
                                onRegister={handleRegister}
                                onEndRegistration={handleInfoTooltip}
                                handleLogin={handleLogin} />
                        </Route>
                    </Switch>
                    <Footer />

                    <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />
                    <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
                    <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
                    <ImagePopup card={selectedCard} onClose={closeAllPopups} />
                    <InfoTooltip isSucceed={singupSucceed} isOpen={isInfotoolipOpen} onClose={closeAllPopups} />
                </CurrentUserContext.Provider>
            </div>
        </div>
    );
}

export default App;
