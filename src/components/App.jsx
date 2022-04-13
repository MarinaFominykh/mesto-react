
import {useEffect, useState} from 'react'; 
import Header from "./Header/Header";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";
import PopupWithForm from "./PopupWithForm/PopupWithForm";
import ImagePopup from "./ImagePopup/ImagePopup";
import { api } from "../utils/Api";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    useState(false);
  const [selectedCard, setSelectedCard] = useState({});

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

  return (
    <div className="page">
      <Header />
      <Main
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onCardClick={handleCardClick}
      ></Main>
      <Footer />
      <PopupWithForm
        name="edit"
        title="Редактировать профиль"
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        button="Сохранить"
      >
        <input
          id="name"
          type="text"
          name="name"
          className="popup__input popup__input_type_name"
          required
          minLength="2"
          maxLength="40" 
          placeholder="Имя"
        />
        <span
          id="error-name"
          className="popup__error popup__error_active"
        ></span>
        <input
          id="job"
          type="text"
          name="job"
          className="popup__input popup__input_type_job"
          required
          minLength="2"
          maxLength="200"
          placeholder="Занятие"
        />
        <span
          id="error-job"
          className="popup__error popup__error_active"
        ></span>
      </PopupWithForm>

      <PopupWithForm
        name="add-card"
        title="Новое место"
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        button="Создать"
      >
        <input
          id="title"
          type="text"
          name="name"
          className="popup__input popup__input_type_title"
          placeholder="Название"
          required
          minLength="2"
          maxLength="30"
        />
        <span
          id="error-title"
          className="popup__error popup__error_active"
        ></span>
        <input
          id="link-add-card"
          type="url"
          name="link"
          className="popup__input popup__input_type_link"
          placeholder="Ссылка на картинку"
          required
        />
        <span
          id="error-link-add-card"
          className="popup__error popup__error_active"
        ></span>
      </PopupWithForm>

      <ImagePopup card={selectedCard} onClose={closeAllPopups} />

      <PopupWithForm name="confirmation" title="Вы уверены?"></PopupWithForm>

      <PopupWithForm
        name="update-avatar"
        title="Обновить аватар"
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        button="Сохранить"
      >
        <input
          id="link-update-avatar"
          type="url"
          name="link"
          className="popup__input popup__input_type_link"
          placeholder="Ссылка на аватар"
          required
        />
        <span
          id="error-link-update-avatar"
          className="popup__error popup__error_active"
        ></span>
      </PopupWithForm>

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
    </div>
  );
}

export default App;
