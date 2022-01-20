import { isValidWord } from "../../pages/api/wordAPI";
import { COLORS } from "../types/colors";

const ALPHABET = "abcdefghijklmnopqrstuvwxyz";

export const handleInput = async (
    keyPressed,
    activeRowIdx,
    allRows,
    keyColors,
    setActiveRowIdx,
    setKeyColors,
    setError,
    solution
) => {
    const lowKey = keyPressed.toLowerCase();
    const lowSolution = solution.toLowerCase();

    if (activeRowIdx >= allRows.length) return allRows;

    // backspace, remove last typed letter
    if (lowKey === "backspace") {
        const activeRowValues = allRows[activeRowIdx].values;
        for (let i = activeRowValues.length - 1; i >= 0; --i) {
            if (activeRowValues[i] !== "") {
                allRows[activeRowIdx]["values"][i] = "";
                break;
            }
        }
    }

    // enter, handle guess
    else if (lowKey === "enter") {
        const activeRowValues = allRows[activeRowIdx].values;
        let fullInput = "";

        // first check that full row is typed in
        for (let i = 0; i < activeRowValues.length; ++i) {
            if (activeRowValues[i] === "") {
                setError("");
                return allRows;
            }
            fullInput += activeRowValues[i];
        }

        // next check that input word is valid
        const isValid = await isValidWord(fullInput);
        if (!isValid) {
            setError("Please enter a valid word.");
            return allRows;
        }

        // mark letters appropriately
        const seen = Array(activeRowValues.length).fill(false);
        // first pass, only mark correct letters
        for (let i = 0; i < activeRowValues.length; ++i) {
            const lowValue = activeRowValues[i].toLowerCase();
            if (lowValue === lowSolution[i]) {
                allRows[activeRowIdx]["colors"][i] = COLORS.CORRECT;
                seen[i] = true;
            }
        }

        // second pass, mark misplaced letters
        for (let i = 0; i < activeRowValues.length; ++i) {
            if (allRows[activeRowIdx]["colors"][i] !== COLORS.BLANK) continue;
            const lowValue = activeRowValues[i].toLowerCase();
            for (let j = 0; j < solution.length; ++j) {
                if (!seen[j] && lowValue === solution[j]) {
                    allRows[activeRowIdx]["colors"][i] = COLORS.MISPLACED;
                    seen[j] = true;
                    break;
                }
            }
        }

        // final pass, mark everything else wrong
        for (let i = 0; i < activeRowValues.length; ++i) {
            if (allRows[activeRowIdx]["colors"][i] === COLORS.BLANK) {
                allRows[activeRowIdx]["colors"][i] = COLORS.WRONG;
            }
        }

        // set colors on keyboard
        //  only upgrade status, never downgrade
        let newKeyColors = { ...keyColors };
        for (let i = 0; i < activeRowValues.length; ++i) {
            const lowValue = activeRowValues[i].toLowerCase();
            if (!(lowValue in newKeyColors)) {
                newKeyColors[lowValue] = allRows[activeRowIdx]["colors"][i];
            } else {
                const oldKeyColor = newKeyColors[lowValue];
                if (
                    oldKeyColor === COLORS.MISPLACED &&
                    allRows[activeRowIdx]["colors"][i] === COLORS.CORRECT
                ) {
                    newKeyColors[lowValue] = COLORS.CORRECT;
                }
            }
        }

        setKeyColors(newKeyColors);
        setActiveRowIdx(activeRowIdx + 1);
    }

    // letter pressed, just add to end of active row if possible
    else if (ALPHABET.includes(lowKey)) {
        const activeRowValues = allRows[activeRowIdx].values;
        for (let i = 0; i < activeRowValues.length; ++i) {
            if (activeRowValues[i] === "") {
                allRows[activeRowIdx]["values"][i] = keyPressed;
                break;
            }
        }
    }

    setError("");
    return allRows;
};

// assumes activeRowIdx is valid (check done before)
export const checkWin = (activeRowIdx, allRows, solution) => {
    const activeRowValues = allRows[activeRowIdx - 1].values;
    let fullInput = "";

    for (let i = 0; i < activeRowValues.length; ++i) {
        fullInput += activeRowValues[i];
    }
    return fullInput === solution.toLowerCase();
};
