import React, { useEffect, useState } from "react";

// components
import { Modal } from "@mui/material";

// redux
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { getChallenge } from "../../../../pages/api/challengeAPI";
import { selectChallengeID } from "../../../redux/game/gameSelector";

// styling
import styles from "./leaderboard.module.scss";

const Leaderboard = ({ challengeID, open, onClose }) => {
    const [timeList, setTimeList] = useState([]);
    const [error, setError] = useState("");

    const handleClose = () => {
        onClose();
    };

    const getPlayerList = async () => {
        const challenge = await getChallenge(challengeID);
        if (!challenge) {
            setError("No challenge with that ID found.");
            return;
        }
        if (challenge.error && challenge.error !== "") {
            setError(challenge.error);
            return;
        }

        let { players } = challenge;
        players.sort((a, b) => (a.timeTaken + a.turnsTaken) - (b.timeTaken + b.turnsTaken));
        setTimeList(players);
    };

    useEffect(() => {
        getPlayerList();
    }, [open]);

    return (
        <div className={styles.leaderboardContainer}>
            <Modal open={open} onClose={handleClose}>
                {error !== "" ? (
                    <div className={styles.leaderboardModal}> {error} </div>
                ) : (
                    <div className={styles.leaderboardModal}>
                        <div className={styles.leaderboardHeader}>
                            Leaderboard
                        </div>
                        {timeList &&
                            timeList.map((player, idx) => {
                                return (
                                    <div
                                        key={idx}
                                        className={styles.leaderboardRow}
                                    >
                                        {`${idx + 1}: ${player.name} - ${
                                            player.timeTaken
                                        } seconds, ${player.turnsTaken} turns`}
                                    </div>
                                );
                            })}
                    </div>
                )}
            </Modal>
        </div>
    );
};

const mapState = createStructuredSelector({
    challengeID: selectChallengeID,
});

export default connect(mapState, null)(Leaderboard);
