import React, { useState } from "react";

// components
import Options from "../Options/options";

// styling
import { FaCog } from "react-icons/fa";
import styles from "./GameHeader.module.scss";

const GameHeader = () => {
    const [optionsOpen, setOptionsOpen] = useState(false);

    return (
        <div className={styles.headerContainer}>
            <Options open={optionsOpen} onClose={() => setOptionsOpen(false)} />

            <div className={styles.placeholder} />
            <div className={styles.gameHeader}>Wordle Clone</div>
            <span
                className={styles.gameOptions}
                onClick={() => setOptionsOpen(true)}
            >
                <FaCog size={25} />
            </span>
        </div>
    );
};

export default GameHeader;
