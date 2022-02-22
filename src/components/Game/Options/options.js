import { Button, Modal } from "@mui/material";
import React, { useState } from "react";

// redux
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
    setHardMode,
    updateWordLength,
} from "../../../redux/options/optionsActions";
import {
    selectIsHardMode,
    selectWordLength,
} from "../../../redux/options/optionsSelector";

// styling
import styles from "./options.module.scss";

const Options = ({
    open,
    onClose,
    wordLength,
    updateWordLength,
    isHardMode,
    setHardMode,
}) => {
    const [myWordLength, setMyWordLength] = useState(wordLength);
    const [myHardMode, setMyHardMode] = useState(isHardMode);

    const applyChanges = () => {
        updateWordLength(myWordLength);
        setHardMode(myHardMode);
        onClose();
    };

    const handleClose = () => {
        setMyWordLength(wordLength);
        setMyHardMode(isHardMode);
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

                    <Button
                        className={styles.applyOptions}
                        onClick={applyChanges}
                    >
                        Apply
                    </Button>
                </div>
            </Modal>
        </div>
    );
};

const mapState = createStructuredSelector({
    wordLength: selectWordLength,
    isHardMode: selectIsHardMode,
});

const mapDispatch = (dispatch) => ({
    updateWordLength: (newWordLength) =>
        dispatch(updateWordLength(newWordLength)),
    setHardMode: (hardMode) => dispatch(setHardMode(hardMode)),
});

export default connect(mapState, mapDispatch)(Options);
