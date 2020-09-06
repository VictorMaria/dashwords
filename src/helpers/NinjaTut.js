import React from 'react';
import classicSprint from '../assets/classicSprint.png';
import ninja from '../assets/ninja.png';

import { MdBackspace, MdPlayArrow, MdDoneAll, MdSkipNext } from 'react-icons/md';

export const ClassicSprintTut = () => {
    return (
        <div>
            <p>
            <strong>DASHWORDS&trade; revolves around the beauty of Anagrams.</strong><br/>
                In CLASSIC SPRINT mode, you curate your rack from scratch. <em>A rack is a set of different
                words that have the same letters and the same number of letters (anagrams) as in the image below.</em><br/><br/>
                &nbsp;&nbsp;<img src={classicSprint} alt="classic sprint word rack" /><br/><br/>
                1. Click <MdPlayArrow style={{ color: "#abbd81", fontSize: 25 }} />
                &nbsp;to start or press the ESC key to start or pause.<br/>
                2. Type one word at a time in the textbox and hit the ENTER key,
                to remove a word from the rack, click
                &nbsp;<MdBackspace style={{ color: "#e15b64", fontSize: 17 }} />&nbsp;on the desired word.<br/>
                3. Repeat step 2,  one or more times depending on what you can spell or what can be spelt.<br/>
                4. Once you are satisfied with your rack, to submit it,
                click <MdDoneAll style={{ color: "#abbd81", fontSize: 25 }} /> below or press the SHIFT key.<br/>
                5. Follow steps 2-4 till time runs out.<br/>
            </p>
        </div>
    );
};

export const NinjaTut = () => {
    return (
        <div>
            <p>
            <strong>DASHWORDS&trade; revolves around the beauty of Anagrams.</strong><br/>
                In NINJA mode, you curate your rack based on a random word that is beamed into your rack.
                No worries, all random words beamed at you are capable of forming valid words when reshuffled.
                Your task would be to spell those words<br/>
                <em>A rack is a set of different words that have the same letters
                and the same number of letters (anagrams) as in the image below.</em><br/><br/>
                &nbsp;&nbsp;<img src={ninja} alt="ninja word rack" /><br/><br/>
                1. Click <MdPlayArrow style={{ color: "#abbd81", fontSize: 25 }} />
                &nbsp;to start or press the ESC key to start or pause.<br/>
                2. Once a word is beamed into your rack,
                type one word at a time in the textbox and hit the ENTER key,
                to remove a word from the rack, click
                &nbsp;<MdBackspace style={{ color: "#e15b64", fontSize: 17 }} />&nbsp;on the desired word.<br/>
                3. With one newly spelt word you can submit your rack,
                but you can also spell more words if possible.<br/>
                4. Once you are satisfied with your rack, to submit it,
                click <MdDoneAll style={{ color: "#abbd81", fontSize: 25 }} /> below or press the SHIFT key.<br/>
                5. Follow steps 2-4 till time runs out.<br/>
                6. To skip a randomly beamed word in request for another, click
                <MdSkipNext style={{ color: "#abbd81", fontSize: 25 }} /> or press the RIGHT key.
            </p>
        </div>
    );
};



