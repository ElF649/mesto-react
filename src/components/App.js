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
import { Route, Switch, Redirect, withRouter, BrowserRouter } from 'react-router-dom';
import Register from './Register';
import * as auth from '../auth.js';

function App(props) {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false)
    const [selectedCard, setIsSelectedCard] = React.useState(null)
    const [currentUser, setCurrentUser] = React.useState(null);
    const [cards, setCards] = React.useState([])
    const [loggedIn, SetLoggedIn] = React.useState(true)

    React.useEffect(() => {
        handleTokenCheck();
    });

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

    handleTokenCheck(){
        if (localStorage.getItem('jwt')) {
            const jwt = localStorage.getItem('jwt');            
            auth.checkToken(jwt).then((res) => {                
                    SetLoggedIn(true);                        
                        // calGoal
                    }, () => {
                        this.props.history.push("/diary");
                    });
                }
            });
        }
    }
    handleLogin(calGoal){
        this.setState({
            loggedIn: true,
            calGoal
        })
    }
    handleLogout(){
        // допишите обработку выхода из системы
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
            setCards(cards.filter(item => item != card))
        })
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
                    <Header />
                    <BrowserRouter>
                        <Switch>
                            <Route path="/login">
                                <Login />
                            </Route>
                            <Route path="/register">
                                <Register />
                            </Route>
                            <Main
                                cards={cards}
                                onEditProfile={handleEditProfileClick}
                                onAddPlace={handleAddPlaceClick}
                                onEditAvatar={handleEditAvatarClick}
                                onCardClick={handleCardClick}
                                onCardLike={handleCardLike}
                                onCardDelete={handleCardDelete}
                            >

                            </Main>
                        </Switch>
                    </BrowserRouter>

                    <Footer />

                    <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />
                    <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
                    <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
                    <ImagePopup card={selectedCard} onClose={closeAllPopups} />
                </CurrentUserContext.Provider>
            </div>
        </div>
    );
}

export default App;
