import { get } from "./apiHelper";

export const getAllWords = async () => {
    return await get("api/wordleclone/getallwords");
};

export const getWordsOfLength = async (wordleclonength) => {
    return await get(`api/wordleclone/getwordsoflength/${wordleclonength}`);
};

export const getRandomWordofLength = async (wordleclonength) => {
    return await get(
        `api/wordleclone/getrandomwordoflength/${wordleclonength}`
    );
};

export const isValidWord = async (word) => {
    return await get(`api/wordleclone/isvalidword/${word}`);
};
