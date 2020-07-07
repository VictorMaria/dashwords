import React, { Component } from 'react';
import { MdBackspace, MdReplay } from "react-icons/md";
import dictionary from '../../utils/dictionary.json';
import { connect } from 'react-redux'
import setAlert from '../../redux/actions/alert';
import Timer from '../Timer/Timer';
import Tap from '../tap/Tap';
import RackAndScore from '../rackAndScore/RackAndScore';
import { MdPlayArrow, MdPause, MdDoneAll } from "react-icons/md";
import dashwordsTickTock from '../../assets/dashwordsTickTock.mp3';
import onTheRack from '../../assets/onTheRack.mp3';
import offTheRack from '../../assets/offTheRack.mp3';
import scored from '../../assets/scored.mp3';
import fizzyFirework from '../../assets/fizzyFirework.mp3';
import theEnd from '../../assets/theEnd.mp3';
import './dashwords.css';

class Dashwords extends Component {
    constructor(props) {
        super(props);
        this.state = {
          game: {},  
          rack: [],
          word: '',
          playedWords: [],
          scoreBoard: [],
          score: 0,
          totalScore: 0,
          error: false,
          isActive: false,
          isPaused: false,
          isGameOver: false,
          timeSet: (1 * 330),
          timeLeft: (1 * 330),
          timerId: null,
        };
        this.sound = new Audio(dashwordsTickTock);
        this.sound.loop = true;
        this.onTheRack = new Audio(onTheRack);
        this.offTheRack = new Audio(offTheRack);
        this.scored = new Audio(scored);
        this.fizzyFirework = new Audio(fizzyFirework);
        this.theEnd = new Audio(theEnd);
        this.handleChange = this.handleChange.bind(this);
        this.addWordToRack = this.addWordToRack.bind(this);
        this.removeWordFromRack = this.removeWordFromRack.bind(this);
      }

    onPlay() {
        this.sound.play();
    }  
    onPause() {
        this.sound.pause();
    }
    handleChange(e) {
        this.setState({ word: e.target.value });
      }
    addWordToRack (event) {
        const { word, rack, playedWords } = this.state;
        const { setAlert } = this.props;
        if (event.key === 'Enter' && event.target.value.match(/^[a-zA-Z]+$/)) {
            const refinedWord = event.target.value.toLowerCase();
        // Check if the rack is empty
            if(rack.length === 0) {
                // Check if the word is not in the dictionary
                if(!dictionary[refinedWord]) {
                    return setAlert('This word is not real', 'failure');
                }
            
                // Check if word has been once submitted
                const trimmedPlayedWords = new Set(playedWords);
                if (trimmedPlayedWords.has(refinedWord)) {
                    return setAlert('This word has been submitted once', 'failure');
                }

                // Add word to rack if it has never been submited    
                this.setState({ rack: [...rack, refinedWord ] })
                this.setState({ word: '' });
                this.onTheRack.play();
            } else if (rack.length > 0){
                /*
                To test if the next word played is a potential anagram with respect
                to a word already in the rack, each words are splited, their letters sorted
                and joint together. The final values of both words are then compared
                */
               const refinedWordInRack = rack[0].split('').sort().join('');
               const refinedNextWord = refinedWord.split('').sort().join('');
               
               // Checks if the next word is not a potential anagram by comparing it with a word in the rack
               if (refinedWordInRack !== refinedNextWord) {
                   return setAlert('You added or removed letter(s)', 'failure');
                }
               
               // Convert rack array into set for optimized search operations
               const trimmedRack = new Set(rack);
               // Checks if the next word played is in the rack
               if(trimmedRack.has(refinedWord)) {
                   return setAlert('This word has been played', 'failure');
                }
               
               // Check if word has been one submitted
               const trimmedPlayedWords = new Set(playedWords);
               if(trimmedPlayedWords.has(refinedWord)) {
                   return setAlert('This word has been submitted once', 'failure');
                }
               
               // Check if the word is not in the dictionary
               if(!dictionary[refinedWord]) {
                   return setAlert('This word is not real', 'failure');
                }

               // Add word to rack if it has never been submited
               this.setState({ rack: [...rack, refinedWord ]})
               this.setState({ word: ''});
               this.onTheRack.play();
            }
        } else if (event.key === 'Enter' && !event.target.value.match(/^[a-zA-Z]+$/)) {
            setAlert('Play a word', 'failure');
        }
}
removeWordFromRack(index) {
    const { rack } = this.state;
    this.setState({ rack: [...rack.filter(word => rack.indexOf(word) !== index)]});
    this.offTheRack.play();
  };
scoreRack () {
    const { rack, scoreBoard } = this.state;
    const currentRackScore = rack[0].length * rack.length;
    this.setState(prevState => ({
         score: prevState.score + currentRackScore,
         totalScore: prevState.totalScore + currentRackScore
         }))
    if(currentRackScore > 29) {
        this.fizzyFirework.play();
    }
    const stringedRack = rack.join(' + ').toUpperCase();
    const rackEntry = <RackAndScore
                        scoredRack={stringedRack} 
                        currentRackScore={currentRackScore}
                        key={Date.now()}
                      />
    this.setState(prevState => ({
        scoreBoard: [rackEntry, ...scoreBoard],
    }));
    this.scored.play();     
}  
submitRack () {
    const { rack, playedWords } = this.state;
    const { setAlert } = this.props;
    if(rack.length < 2) {
        return setAlert('Your rack should have at least two words', 'failure');
    }
    this.scoreRack();
    this.setState(prevState => ({
            playedWords: [...playedWords, ...rack],
            rack: [],
    }));
    this.setState(prevState => ({
        score: prevState.score - prevState.score,
        }))    
}  
resetTimer() {
    const { timerId } = this.state;
    this.setState({
    game: {},  
    rack: [],
    word: '',
    playedWords: [],
    scoreBoard: [],
    score: 0,
    totalScore: 0,
    isGameOver: false,
    timeSet: (1 * 330),
    timeLeft: (1 * 330),
    timerId: null,
    isActive: false,
    });
    clearInterval(timerId);
  };
  updateTime () {
    const { isActive, timeLeft, isGameOver } = this.state;
    if (timeLeft > 0 && isActive) {
      this.setState(prevState => ({
        ...prevState,
        timeLeft: prevState.timeLeft - 1,
      }));
    }
    if (timeLeft === 1) {
      this.setState({ isActive: false });
    }
    if (timeLeft === 0) {
        this.setState({ isGameOver: true });
        this.onPause();
     }
    if(isGameOver) {
        this.theEnd.play();
    } 
  };
startTimer() {
    this.setState({ isActive: true });
    this.onPlay();
    const timerId = setInterval(
      () => this.updateTime(),
      Math.round(1000)
    );
    this.setState({ timerId });
  };

pauseTimer() {
    this.onPause();
    const { timerId } = this.state;
    this.setState({ isActive: false, isPaused: true });
    clearInterval(timerId);
  };
  
render() {
    const { rack, word, timeLeft, isActive, totalScore, scoreBoard, isGameOver } = this.state;
    return (
        <div className="wrapper">    
        { !isGameOver ? (
            <div className="dashwords">
            <Timer time={timeLeft} isActive={isActive}/>
            <h1 id={ totalScore > 0 ? "total-score" : ''} key={totalScore}>Total Score: {totalScore}</h1>
                { rack.length !== 0 ? <label>Word Rack</label> : <label>
                    <label>Your Word Rack is empty</label><br/>
                    <label id="small-label"><em>Type a word and press Enter</em></label>
                    </label>}
                <div className="rack">
                    {rack.map((word, index) => (
                        <div className="word-tile" key={index}>
                            <span id="word">{word.toUpperCase()}</span>
                            &nbsp;&nbsp;
                            { isActive ? (<span className="delete" onClick={() => this.removeWordFromRack(index)}>
                                <MdBackspace style={{ color: "#e15b64", fontSize: 18 }} />
                            </span>) : ''}
                        </div>
                    ))}
            </div>
            &nbsp;&nbsp;
                <input
                    type="text"
                    id="word-input"
                    value={word}
                    onChange={this.handleChange}
                    onKeyPress={this.addWordToRack}
                    placeholder="Spell something magical"
                    autoComplete="off"
                    disabled={!isActive}
                />
                &nbsp;&nbsp;
              { 
                !isActive && timeLeft > 0 ? (<Tap className="play"
                onClick={() => this.startTimer()} 
                children={<MdPlayArrow style={{ color: "#abbd81", fontSize: 50 }} />}
              />) : timeLeft === 0 ? '' : (<div>
                  <Tap className="playRack"
                  onClick={() => this.submitRack()}
                  children={<MdDoneAll style={{ color: "#abbd81", fontSize: 50 }} />}
               />
               &nbsp;&nbsp;
                  <Tap className="pause"
                  onClick={() => this.pauseTimer()}
                  children={<MdPause style={{ color: "#abbd81", fontSize: 50 }} />}
                />
              </div>)
             }
            </div>
        ) : (<div className="final-dashwords">
            <h1 id="game-over">Game Over</h1>
        <h1 id="final-points">Final Points: {totalScore}</h1>
         &nbsp;&nbsp;
                  <Tap className="replay"
                  onClick={() => this.resetTimer()}
                  children={<MdReplay style={{ color: "#f8b26a", fontSize: 50 }} />}
                />
          &nbsp;&nbsp;      
        </div>
        ) } 
          {
              scoreBoard.length > 0 ? (
                <div className="history">
                    Scored Racks
                    {scoreBoard}
                </div>
              ) : ''
          }
        </div>
    )
    }
}

export default connect(null, { setAlert })(Dashwords);