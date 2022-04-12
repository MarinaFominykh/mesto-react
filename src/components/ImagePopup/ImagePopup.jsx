function ImagePopup (props) {
    return (
        <section className={`popup popup_type_activ-image ${props.card.active ? 'popup_opened': ''}`}>
            <figure className="popup__image">
                <button type="button" className="popup__close popup__close_type_image" onClick={props.onClose}/>
                <img src={props.card.link} alt={props.card.name} className="popup__image-activ"/>
                <figcaption className="popup__image-text">{props.card.name}</figcaption>
         </figure>
      </section>
    )
}

export default ImagePopup;