import { get, post } from "./apiHelper";

export const getChallenge = async (challengeID) => {
    return await get(`api/wordleclone/challenge/getchallenge/${challengeID}`);
};

export const createChallenge = async (numWords, wordLength) => {
    const values = { numWords, wordLength };
    return await post(values, "api/wordleclone/challenge/createchallenge");
};

export const setPlayerStats = async (
    challengeID,
    name,
    timeTaken,
    turnsTaken
) => {
    const values = { challengeID, name, timeTaken, turnsTaken };
    return await post(values, "api/wordleclone/challenge/setplayerstats");
};
