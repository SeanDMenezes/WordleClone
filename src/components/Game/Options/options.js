import React, { useState } from "react";
import { Button, Modal } from "@mui/material";
import { useRouter } from "next/router";

// redux
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { createChallenge } from "../../../../pages/api/challengeAPI";
import { resetBoard, resetTimer, resumeTimer, setChallengeID } from "../../../redux/game/gameActions";
import { selectChallengeID } from "../../../redux/game/gameSelector";
import {
    setHardMode,
    setTimeNumWords,
    setTimeTrial,
    updateWordLength,
} from "../../../redux/options/optionsActions";
import {
    selectIsHardMode,
    selectIsTimeTrial,
    selectTimeNumWords,
    selectWordLength,
} from "../../../redux/options/optionsSelector";

// styling
import styles from "./options.module.scss";

const Options = ({
    open,
    onClose,
    resetBoard,
    resetTimer,
    challengeID, setChallengeID,
    wordLength, updateWordLength,
    isHardMode, setHardMode,
    isTimeTrial, setIsTimeTrial,
    timeNumWords, setTimeNumWords,
}) => {
    const router = useRouter();

    const [myWordLength, setMyWordLength] = useState(wordLength);
    const [myHardMode, setMyHardMode] = useState(isHardMode);
    const [myTimeTrial, setMyTimeTrial] = useState(isTimeTrial);
    const [myTimeNumWords, setMyTimeNumWords] = useState(timeNumWords + 1);

    const applyChanges = () => {
        updateWordLength(myWordLength);
        setHardMode(myHardMode);
        setIsTimeTrial(myTimeTrial);
        setTimeNumWords(1);
        resetBoard();
        resetTimer();
        onClose();
    };

    const startChallenge = async () => {
        const challenge = await createChallenge(myTimeNumWords, myWordLength);
        setChallengeID(challenge.challengeID);
        updateWordLength(myWordLength);
        setHardMode(myHardMode);
        setIsTimeTrial(myTimeTrial);
        setTimeNumWords(myTimeNumWords);
        resetBoard();
        resetTimer();
        resumeTimer();
        onClose();
        router.push({ pathname: "/challenge", query: { challengeID: challenge.challengeID } });
    }

    const handleClose = () => {
        setMyWordLength(wordLength);
        setMyHardMode(isHardMode);
        setMyTimeTrial(isTimeTrial);
        setMyTimeNumWords(timeNumWords);
        onClose();
    };

    return (
        <div className={styles.optionsContainer}>
            <Modal open={open} onClose={handleClose}>
                <div className={styles.optionsModal}>
                    <div className={styles.optionsHeader}> Game Options </div>
                    <div className={styles.optionRow}>
                        <span> Word Length: </span>
                        <input
                            type="number"
                            min={3}
                            max={7}
                            value={myWordLength}
                            onChange={(e) => setMyWordLength(e.target.value)}
                            disabled={challengeID !== null}
                        />
                    </div>

                    {/* <div className={styles.optionRow}>
                        <span> Hard Mode: </span>
                        <input
                            type="checkbox"
                            value={myHardMode}
                            onChange={(e) => setMyHardMode(!myHardMode)}
                        />
                    </div> */}
                    
                    <div className={styles.optionRow}>
                        <span> Time Trial: </span>
                        <input
                            type="checkbox"
                            value={myTimeTrial}
                            checked={myTimeTrial}
                            onChange={(e) => setMyTimeTrial(!myTimeTrial)}
                            disabled={challengeID !== null}
                        />
                    </div>
                    
                    <Button
                        className={styles.applyOptions}
                        onClick={applyChanges}
                        disabled={challengeID !== null}
                    >
                        Apply Changes
                    </Button>

                    <div className={styles.optionsHeader}> Time Trial Challenge </div>
                    <div className={styles.optionsSubheader}>
                        Solve the desired number of words as fast as possible, and send it to a friend to see if they can beat your time!
                    </div>

                    <div className={styles.optionRow}>
                        <span> Number of Words for Time Trial: </span>
                        <input
                            type="number"
                            min={1}
                            max={10}
                            value={myTimeNumWords}
                            onChange={(e) => setMyTimeNumWords(e.target.value)}
                        />
                    </div>

                    <Button
                        className={styles.applyOptions}
                        onClick={startChallenge}
                    >
                        Start Challenge
                    </Button>
                </div>
            </Modal>
        </div>
    );
};

const mapState = createStructuredSelector({
    wordLength: selectWordLength,
    isHardMode: selectIsHardMode,
    isTimeTrial: selectIsTimeTrial,
    timeNumWords: selectTimeNumWords,
    challengeID: selectChallengeID,
});

const mapDispatch = (dispatch) => ({
    updateWordLength: (newWordLength) =>
        dispatch(updateWordLength(newWordLength)),
    setHardMode: (hardMode) => dispatch(setHardMode(hardMode)),
    setIsTimeTrial: (timeTrial) => dispatch(setTimeTrial(timeTrial)),
    setTimeNumWords: (numWords) => dispatch(setTimeNumWords(numWords)),
    resetBoard: () => dispatch(resetBoard()),
    resetTimer: () => dispatch(resetTimer()),
    setChallengeID: (challengeID) => dispatch(setChallengeID(challengeID)),
});

export default connect(mapState, mapDispatch)(Options);
