import {useEffect, useState} from 'react'; 
import editProfileButton from '../../images/vector.svg';
import { api } from '../../utils/Api';
import Card from '../Card/Card';


function Main ({onEditProfile, onAddPlace, onEditAvatar, onCardClick}) {
    const [userName, setUserName] = useState('Наполеон');
    const [userDescription, setUserDescription] = useState('император');
    const [userAvatar, setUserAvatar] = useState('https://ihospital.ru/image/325a5793-cca1-4396-ab3a-3ac258ca3c89.jpg');
    const [cards, setCards] = useState([]);
    useEffect(() => {
        api.getProfile()
        .then(res => {
            setUserName(res.name);
            setUserDescription(res.about);
            setUserAvatar(res.avatar);
        })
        api.getInitialCards()
        .then((res)=>{
            setCards(res)
        })
        .catch(console.log)
    }, 
    [])

       return (
        <main className="content">
        <section className="profile">
            <div onClick={onEditAvatar} className="profile__hover-container">
                <div className="profile__hover-pen"></div>
                <img src={userAvatar} alt="Аватар" className="profile__avatar"/>
           </div>
           <div className="profile__name-container">
               <h1 className="profile__title">{userName}</h1>
               <button onClick={onEditProfile} className="profile__edit-button" type="button">
                   <img src={editProfileButton} alt="Редактировать" className="profile__edit-image"/>
               </button>
               </div>
               <p className="profile__subtitle">{userDescription}</p>
               <button onClick={onAddPlace} className="profile__add-button" type="button"></button>
       </section>
       
       <section className="places">
           <ul className="places__cards">
               {                   
                        cards.map(item=>(
                            <Card link={item.link} name = {item.name} likeCount={item.likes.length} key = {item._id} onCardClick = {onCardClick}/>
                           ))
                    
               }
     
           </ul>
       </section>
   </main>
    )

};

export default Main