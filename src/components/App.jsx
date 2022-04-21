import {useEffect, useState} from 'react'; 
import Header from "./Header/Header";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";
import PopupWithForm from "./PopupWithForm/PopupWithForm";
import ImagePopup from "./ImagePopup/ImagePopup";
import { api } from "../utils/Api";
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup/EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup/EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup/AddPlacePopup';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({
    name: "Иван Федорович",
    about: "Человек и пароход",
    avatar: "https://cdn.pixabay.com/photo/2017/11/11/21/55/freedom-2940655__340.jpg"
   });
   const [cards, setCards] = useState([]);

   useEffect(() => {
    api.getProfile()
    .then(res => {
      setCurrentUser(res)
    })
    .catch(console.log)
  }, [])

  useEffect(() => {
    api.getInitialCards()
    .then((res)=>{
        console.log(res)
        setCards(res)
    })
    .catch(console.log)
}, 
[]);

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({});
  };

  const handleCardClick = (link, name) => {
    setSelectedCard({ active: true, link: link, name: name });
   };

   const handleUpdateUser = (name, about) => {
    api.editProfile(name, about)
       .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      }).catch(console.log)
  };

  const handleUpdateAvatar = (avatar) => {
    api.updateAvatar(avatar)
    .then(res => {
      setCurrentUser(res);
      closeAllPopups();
    }).catch(console.log)
  }

  const handleAddPlaceSubmit = (name, link) => {
    api.addCard(name, link)
    .then(newCard => {
      setCards([newCard, ...cards]); 
      closeAllPopups();
    }).catch(console.log)
  }

  const handleCardLike = (card) => {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    const request = isLiked ? api.deleteLike(card._id) : api.addLike(card._id);
   request.then((newCard) => {
            setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        });
     } 
    
      const handleCardDelete = (card) => {
        api.deleteCard(card._id)
        .then(() => {
            setCards((state) => state.filter((c) => c._id !== card._id ));
            closeAllPopups();
          }) .catch(console.log)
        };
 

  return (
    <div className="page">
      <Header />
      <CurrentUserContext.Provider value={currentUser}>
      <Main
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onCardClick={handleCardClick}
        cards = {cards}
        onCardLike ={handleCardLike}
        onCardDelete ={handleCardDelete}

      ></Main>
      <Footer />
      <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser}/>
      <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit}/>
      <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      <PopupWithForm name="confirmation" title="Вы уверены?"></PopupWithForm>
      <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar}/>
      
      <section className="popup popup_type_activ-image">
        <figure className="popup__image">
          <button
            type="button"
            className="popup__close popup__close_type_image"
          />
          <img
            src="https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg"
            alt="Архыз"
            className="popup__image-activ"
          />
          <figcaption className="popup__image-text"></figcaption>
        </figure>
      </section>

      <template className="card-template">
        <li className="places__card">
          <button className="places__delete-button" type="button">
            <div className="places__delete-cup"></div>
            <div className="places__delete-basket"></div>
          </button>

          <img src="#" alt="" className="places__image" />
          <div className="places__name-container">
            <h2 className="places__name"></h2>
            <div className="places__like-container">
              <button className="places__like" type="button"></button>
              <span className="places__like-count"></span>
            </div>
          </div>
        </li>
      </template>
     </CurrentUserContext.Provider>
    
    </div>
  );
}

export default App;
