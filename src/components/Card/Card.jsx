function Card (props) {
    function handleClick() {
        props.onCardClick(props.link, props.name);
    }
return (
    <li className="places__card">
    <button className="places__delete-button" type="button">
        <div className="places__delete-cup"></div>
        <div className="places__delete-basket"></div>
    </button>
    
    <img src={props.link} alt={props.name} className="places__image" onClick={handleClick}/>
    <div className="places__name-container">
        <h2 className="places__name">{props.name}</h2>
        <div className="places__like-container">
            <button className="places__like" type="button"></button>
            <span className="places__like-count">{props.likeCount}</span>
        </div>
    </div>
</li>
)
}

export default Card;