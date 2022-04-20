import {useContext} from 'react';
import {CurrentUserContext, currentUser} from '../../contexts/CurrentUserContext';
function Card (props) {
    const currentUser = useContext(CurrentUserContext);
    const isOwn = props.owner._id === currentUser._id;
    const cardDeleteButtonClassName = (`places__delete-button ${isOwn ? 'places__delete-button' : 'places__delete-button_hidden'}`
); 
    const isLiked = props.likes.some(i => i._id === currentUser._id);
    const cardLikeButtonClassName = (`places__like ${isLiked ? 'places__like_activ' : 'places__like'}`); 
    
function handleClick() {
        props.onCardClick(props.link, props.name);
    }

function handleLikeClick() {
        props.onCardLike(props);
    }

function handleCardDelete() {
        props.onCardDelete(props);
    }
    
return (
    <li className="places__card">
    <button className={cardDeleteButtonClassName}type="button" onClick={handleCardDelete}>
        <div className="places__delete-cup"></div>
        <div className="places__delete-basket"></div>
    </button>
    
    <img src={props.link} alt={props.name} className="places__image" onClick={handleClick}/>
    <div className="places__name-container">
        <h2 className="places__name">{props.name}</h2>
        <div className="places__like-container">
            <button className={cardLikeButtonClassName} type="button" onClick={handleLikeClick}></button>
            <span className="places__like-count">{props.likes.length}</span>
        </div>
    </div>
</li>
)
}

export default Card;