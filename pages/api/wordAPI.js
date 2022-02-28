import { get } from "./apiHelper";

export const getAllWords = async () => {
    return await get("api/wordleclone/getallwords");
};

export const getWordsOfLength = async (wordLength) => {
    return await get(`api/wordleclone/getwordsoflength/${wordLength}`);
};

export const getRandomWordofLength = async (wordLength) => {
    return await get(`api/wordleclone/getrandomwordoflength/${wordLength}`);
};

export const isValidWord = async (word) => {
    return await get(`api/wordleclone/isvalidword/${word}`);
};
