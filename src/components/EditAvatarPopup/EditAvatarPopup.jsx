import React from 'react'
import {useRef, useState} from 'react'; 
import PopupWithForm from '../PopupWithForm/PopupWithForm';

function EditAvatarPopup ({isOpen, onClose, onUpdateAvatar}) {
    const [link, setlink] = useState('');
    const linkInput = useRef('')
    function handleInputLinkChange(e) {
        setlink(linkInput.current.value)
          
      }

      function handleSubmit(e) {
        e.preventDefault();
        onUpdateAvatar(linkInput.current.value);
      } 

return (
    <PopupWithForm
        name="update-avatar"
        title="Обновить аватар"
        isOpen={isOpen}
        onClose={onClose}
        button="Сохранить"
        onSubmit={handleSubmit}
      >
        <input
          id="link-update-avatar"
          type="url"
          name="link"
          className="popup__input popup__input_type_link"
          placeholder="Ссылка на аватар"
          required
          value={link}
          ref={linkInput}
          onChange={handleInputLinkChange}
        />
        <span
          id="error-link-update-avatar"
          className="popup__error popup__error_active"
        ></span>
      </PopupWithForm>
)
}
export default EditAvatarPopup