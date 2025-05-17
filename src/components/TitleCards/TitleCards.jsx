import React, { useRef } from "react";
import card_data from "../../assets/cards/Cards_data";
import "./TitleCards.css";
import { useEffect } from "react";

const TitleCards = ({title,category}) => {
  const cardsRef = useRef();

  const handlewheel = (event) => {
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;
  }; 

  useEffect(() => {
     
    cardsRef.current.addEventListener("wheel", handlewheel);
  }, []);

  return (
    <div className="title-cards">
      <h2>{title?title:"Popular on Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
        {card_data.map((card, index) => {
          return (
            <div className="card" key={index}>
              <img src={card.image} alt="" />
              <p>{card.name}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TitleCards;
