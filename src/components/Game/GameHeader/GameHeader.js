import React, { useState } from "react";
import { useRouter } from "next/router";

// components
import Options from "../Options/options";
import Leaderboard from "../Leaderboard/leaderboard";

// redux
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectChallengeID } from "../../../redux/game/gameSelector";
import { resetBoard, resetTimer } from "../../../redux/game/gameActions";

// styling
import styles from "./GameHeader.module.scss";
import { FaCog, FaHome, FaTrophy } from "react-icons/fa";

const GameHeader = ({ challengeID, resetBoard, resetTimer }) => {
    const router = useRouter();
    const [optionsOpen, setOptionsOpen] = useState(false);
    const [leaderboardOpen, setLeaderboardOpen] = useState(false);

    const handleHome = () => {
        resetBoard();
        resetTimer();
        router.push("/");
    };

    return (
        <div className={styles.headerContainer}>
            <Options open={optionsOpen} onClose={() => setOptionsOpen(false)} />
            <Leaderboard
                open={leaderboardOpen}
                onClose={() => setLeaderboardOpen(false)}
            />

            <div className={styles.leftMenu}>
                <span onClick={handleHome}>
                    <FaHome size={25} />
                </span>
            </div>
            <div className={styles.gameHeader}>Wordle Clone</div>

            <div className={styles.rightMenu}>
                {challengeID && (
                    <span
                        className={styles.gameLeaderboard}
                        onClick={() => setLeaderboardOpen(true)}
                    >
                        <FaTrophy size={25} />
                    </span>
                )}
                <span
                    className={styles.gameOptions}
                    onClick={() => setOptionsOpen(true)}
                >
                    <FaCog size={25} />
                </span>
            </div>
        </div>
    );
};

const mapState = createStructuredSelector({
    challengeID: selectChallengeID,
});

const mapDispatch = (dispatch) => ({
    resetBoard: () => dispatch(resetBoard()),
    resetTimer: () => dispatch(resetTimer()),
});

export default connect(mapState, mapDispatch)(GameHeader);
