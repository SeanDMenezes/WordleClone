import React from "react";
import { COLORS } from "../../types/colors";

// components
import Square from "../Square/square";

// styling
import { FaBackspace } from "react-icons/fa";
import styles from "./keyboard.module.scss";

const FIRST_ROW = "qwertyuiop";
const SECOND_ROW = "asdfghjkl";
const THIRD_ROW = "zxcvbnm";

const KeyRow = ({ row, keyColors, onKeyClick }) => {
    return row
        .split("")
        .map((letter, idx) => (
            <Square
                key={idx}
                onKeyClick={onKeyClick}
                color={
                    letter in keyColors ? keyColors[letter] : COLORS.UNUSED_KEY
                }
                value={letter}
                small={true}
            />
        ));
};

const EnterKey = ({ onKeyClick }) => {
    return (
        <span
            className={styles.enterKey}
            style={{
                backgroundColor: COLORS.UNUSED_KEY,
                color: "black",
            }}
            onClick={() => onKeyClick({ key: "enter" })}
        >
            Enter
        </span>
    );
};

const BackspaceKey = ({ onKeyClick }) => {
    return (
        <span
            className={styles.backKey}
            style={{
                backgroundColor: COLORS.UNUSED_KEY,
                color: "black",
            }}
            onClick={() => onKeyClick({ key: "backspace" })}
        >
            <FaBackspace />
        </span>
    );
};

const Keyboard = ({ keyColors, onKeyClick }) => {
    return (
        <div className={styles.keyboardContainer}>
            <div className={styles.firstRowContainer}>
                <KeyRow
                    row={FIRST_ROW}
                    keyColors={keyColors}
                    onKeyClick={onKeyClick}
                />
            </div>

            <div className={styles.firstRowContainer}>
                <KeyRow
                    row={SECOND_ROW}
                    keyColors={keyColors}
                    onKeyClick={onKeyClick}
                />
            </div>

            <div className={styles.firstRowContainer}>
                <EnterKey onKeyClick={onKeyClick} />
                <KeyRow
                    row={THIRD_ROW}
                    keyColors={keyColors}
                    onKeyClick={onKeyClick}
                />
                <BackspaceKey onKeyClick={onKeyClick} />
            </div>
        </div>
    );
};

export default Keyboard;
