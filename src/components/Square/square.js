import React from "react";
import { COLORS } from "../../types/colors";

import styles from "./square.module.scss";

const Square = ({ color, onKeyClick, value, small }) => {
    return small ? (
        <span
            className={styles.smallSquare}
            style={{
                backgroundColor: color,
                color: color === COLORS.UNUSED_KEY ? "black" : "white",
            }}
            onClick={() => onKeyClick({ key: value })}
        >
            {value}
        </span>
    ) : (
        <span
            className={styles.square}
            style={{
                backgroundColor: color,
                color: color === COLORS.BLANK ? "black" : "white",
            }}
        >
            {value}
        </span>
    );
};

export default Square;
