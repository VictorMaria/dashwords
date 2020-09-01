import React, { Component } from 'react';
import { MdBackspace, MdReplay, MdPlayArrow, MdPause, MdDoneAll, MdSkipNext } from "react-icons/md";
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux'
import dictionary from '../../../../utils/dictionary.json';
import setAlert from '../../../../redux/actions/alert';
import Timer from '../../../Timer/Timer';
import Tap from '../../../tap/Tap';
import RackAndScore from '../../../rackAndScore/RackAndScore';
import dashwordsTickTock from '../../../../assets/dashwordsTickTock.mp3';
import onTheRack from '../../../../assets/onTheRack.mp3';
import offTheRack from '../../../../assets/offTheRack.mp3';
import scored from '../../../../assets/scored.mp3';
import fizzyFirework from '../../../../assets/fizzyFirework.mp3';
import randomOnRack from '../../../../assets/randomOnRack.mp3';
import swoosh from '../../../../assets/swoosh.mp3';
import theEnd from '../../../../assets/theEnd.mp3';
import '../styles.css';
import { connectToSocket } from '../../../../sockets';
import { checkOnlineStatus } from '../../../../utils/checkOnlineStatus';
import { BeamingDot, RedBeamingDot } from '../../../../components/beamingDot/BeamingDot';
import { ErrorLabel } from '../../../../components/responseHolder/ErrorLabel';
import { FetchingLabel } from '../../../../components/responseHolder/FetchingLabel';
import { Badge } from '../../../../components/responseHolder/Badge';

class Ninja extends Component {
    constructor(props) {
        super(props);
        this.state = {
          socket: {},
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
          connectionStatus: true,
        };
        this.sound = new Audio(dashwordsTickTock);
        this.sound.loop = true;
        this.onTheRack = new Audio(onTheRack);
        this.offTheRack = new Audio(offTheRack);
        this.randomOnRack = new Audio(randomOnRack);
        this.swoosh = new Audio(swoosh);
        this.scored = new Audio(scored);
        this.fizzyFirework = new Audio(fizzyFirework);
        this.theEnd = new Audio(theEnd);
        this.handleChange = this.handleChange.bind(this);
        this.addWordToRack = this.addWordToRack.bind(this);
        this.removeWordFromRack = this.removeWordFromRack.bind(this);
        this.handleConnectionChange = this.handleConnectionChange.bind(this);
      }
      handleConnectionChange () {
        const condition = navigator.onLine ? 'online' : 'offline';
        if (condition === 'online') {
          const beamWebBeacon = setInterval(
            () => {
              try {
                const response = checkOnlineStatus();
                if (response) {
                  this.setState({ connectionStatus: true });
                  return clearInterval(beamWebBeacon);
                }
                return this.setState({ connectionStatus: false });
              } catch (error) {
                return this.setState({ connectionStatus: false });
              }
            }, 2000);
        }
        return this.setState({ connectionStatus: false });
      }
    componentDidMount () {
        const newSocket = connectToSocket();
        this.setState({ socket: newSocket });
        newSocket.emit('randomAnagramRequest');
        newSocket.on('randomAnagramResponse', (result) => {
        this.setState({ rack: [result[0].word] })
         });
    this.handleConnectionChange();
    window.addEventListener('online', this.handleConnectionChange);
    window.addEventListener('offline', this.handleConnectionChange);
      }
    componentWillUnmount() {
        window.removeEventListener('online', this.handleConnectionChange);
        window.removeEventListener('offline', this.handleConnectionChange);
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
        const { rack, playedWords } = this.state;
        const { setAlert } = this.props;
        if (event.key === 'Enter' && event.target.value.match(/^[a-zA-Z]+$/)) {
            const refinedWord = event.target.value.toLowerCase();
            if(rack.length === 0) {

            } 
            else if (rack.length > 0) {
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
removeWordFromRack (index) {
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
async submitRack () {
    const { rack, playedWords } = this.state;
    const { setAlert } = this.props;
    let isConnected
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
        }));
    this.state.socket.emit('randomAnagramRequest');
    this.state.socket.on('randomAnagramResponse', (result) => { 
       this.setState({ rack: [result[0].word] });
    });
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
    this.state.socket.emit('randomAnagramRequest');
    this.state.socket.on('randomAnagramResponse', (result) => {
       this.setState({ rack: [result[0].word] })
    });
    this.randomOnRack.play();
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

skip() {
    this.setState({ rack: [] });
    this.swoosh.play();
    this.state.socket.emit('randomAnagramRequest');
    this.state.socket.on('randomAnagramResponse', (result) => {
       this.setState({ rack: [result[0].word] })
    });
    this.randomOnRack.play();
}  
  
render() {
    const { rack, word, timeLeft, isActive, totalScore, scoreBoard, isGameOver, connectionStatus } = this.state;
    return (
    <div className="wrapper">
        { !isGameOver ? (
            <div className="dashwords">
            { connectionStatus ? <Badge/> : '' }
            &nbsp;&nbsp;&nbsp;&nbsp; 
            { connectionStatus ? <BeamingDot/> : <RedBeamingDot/> }
            <Timer time={timeLeft} isActive={isActive}/>
            <h1 id={ totalScore > 0 ? "total-score" : ''} key={totalScore}>Total Score: {totalScore}</h1>
                { rack.length !== 0 ? <label>Word Rack</label> : <FetchingLabel text='fetching next...'/> }
                <div className="rack">
                    {rack.map((word, index) => (
                        index === 0 ? (
                            <div className="ninja-word-tile" key={index}>
                            <span id="word">{word.toUpperCase()}</span>
                            &nbsp;&nbsp;
                            { isActive ? (<span className="delete">
                                <MdBackspace style={{ color: "#FAA", fontSize: 18 }} />
                            </span>) : ''}
                        </div>
                            ) : (
                            <div className="word-tile" key={index}>
                            <span id="word">{word.toUpperCase()}</span>
                            &nbsp;&nbsp;
                            { isActive ? (<span className="delete" onClick={() => this.removeWordFromRack(index)}>
                                <MdBackspace style={{ color: "#e15b64", fontSize: 18 }} />
                            </span>) : ''}
                        </div>
                        )
                    ))}
            </div>
            &nbsp;&nbsp;
            <>
              <>
                { !connectionStatus && rack.length === 0 ? <ErrorLabel text="Reconnecting..."/> : (
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
                ) }
              </>
            </>
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
                &nbsp;&nbsp;
                  <Tap className="skip"
                  onClick={() => this.skip()}
                  children={<MdSkipNext style={{ color: "#abbd81", fontSize: 50 }} />}
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

export default withRouter(connect(null, { setAlert })(Ninja));