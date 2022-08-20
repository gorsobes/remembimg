import { useState, useEffect} from 'react';
import './Cards.css';
import pachImg1 from '../img/remembimg9.jpg'
import pachImg2 from '../img/remembimg2.jpg'
import pachImg3 from '../img/remembimg3.jpg'
import pachImg4 from '../img/remembimg4.jpg'
import pachImg5 from '../img/remembimg5.jpg'
import pachImg7 from '../img/remembimg7.jpg'

import quest from '../img/question.png'
import Modal from './Modal';
const initial = [
  {id:1,img:pachImg1,token:1 },
  {id:2,img:pachImg2 ,token:2},
  {id:3,img:pachImg3 ,token:3},
  {id:4,img:pachImg4,token:4 },
  {id:1,img:pachImg1,token:5 },
  {id:2,img:pachImg2 ,token:6},
  {id:3,img:pachImg3 ,token:7},
  {id:4,img:pachImg4,token:8 },
  {id:5,img:pachImg5 ,token:9},
  {id:5,img:pachImg5 ,token:10},
  {id:6,img:pachImg7 ,token:11},
  {id:6,img:pachImg7 ,token:12}
]
const pairOfArrayCards = [...initial];
const Cards = () => {
    const [arrayCards, setArrayCards] = useState([])
    const [openCаrds, setOpenCards] = useState([])
    const [matched, setMatched] = useState([])
    const [moves, setMoves] = useState(0)
    const [isModal, setModal] = useState(false)
    const shuffle = (array) => {
        let currentIndex = array.length,
        temoraryValue,
        randomIndex
        while(currentIndex !== 0){
          randomIndex = Math.floor(Math.random()*currentIndex);
          currentIndex -= 1;
          temoraryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temoraryValue;
        }
        return array;
      }
      
      useEffect(() => {
        setArrayCards(shuffle(pairOfArrayCards))
      },[])
      
      const flipCard = (index) => () => {
        
       setOpenCards(opened => [...opened, index]);
       if(openCаrds.length < 1){
        setMoves(preMove => preMove + 1);
       }
        
      }
      useEffect(() => {
        if([...new Set(matched)].length === 6){
          setModal(true);
       }
       
      }, [matched]);
      
      useEffect(() => {
        if(openCаrds.length === 2 && openCаrds[0] !== openCаrds[1]){
          setMoves(preMove => preMove + 1 );
        }
        if(openCаrds < 2) return
        const firstMatched = arrayCards[openCаrds[0]];
        const secondMatched = arrayCards[openCаrds[1]];
       
        if(secondMatched && firstMatched.id === secondMatched.id && firstMatched.token !== secondMatched.token){
          setMatched(m => [...m,firstMatched.id]); 
        }
        
        if(openCаrds.length === 2) setTimeout(() => setOpenCards([]), 800)
        
      },[openCаrds , arrayCards]);
      
      const hadleGameRestart = () => {
          setOpenCards([]);
          setMatched([]);
          setMoves(0);
          setArrayCards(shuffle(pairOfArrayCards));
      
      }
        return (
          <div className="App">
           <p className='number'>Сделано ходов: {moves}</p>
           <div className='cards'>
             {arrayCards.map((item,index) => {
              let isFlipped = false;
              if(openCаrds.includes(index)) isFlipped = true;
              if(matched.includes(item.id)) isFlipped = true;
      
              return(
                <div key={index} 
                className={`card ${isFlipped ? 'flipped' : ''}`}
                 onClick={flipCard(index)}>
                  <div className='inner'>
                  <div className='front'>
                    <img src={item.img} width='360' alt='card'/>
                  </div>
                  <div className='back'>
                    <img src={quest} alt='quest'/>
                  </div>
                </div>
                </div>
                 )
             })}
           </div>
           <button className='button-restart' onClick={hadleGameRestart}>Начать заново</button>
            <Modal
              isVisible={isModal}
              title="Спасибо за игру! 	&#128522;"
              content={  <button className='button-restart mod' onClick={hadleGameRestart}>ПОВТОРИМ?</button>}
              footer={ <> <p className='numberModal'>Сделано ходов: {moves} &#128519;</p><button className='clear'>Выход</button></>}
              onClose={() => setModal(false)}
            />
          </div>
        );
}

export default Cards;