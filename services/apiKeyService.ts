const PRECONFIGURED_KEYS = [
  'AIzaSyBZ9F8iAfKEai3B4JCtzlmuiw9idKkYe-k',
  'AIzaSyAasXIFNKmlbRB9rmFWpDERLoXQ8yqWZ-I',
  'AIzaSyBQk8L227yUl3-fTGE3uc_di9PcM3zTTJo',
  'AIzaSyAieO1yv5octy50wgF2a4IrcNO6NB77U10',
  'AIzaSyAt7z37qYpDD80PDRdBUPqtx5K-20c2Pyc',
  'AIzaSyB-dySjUgk1s9eIU1IYW8Enzlxh_KgLMnY'
];
const USER_API_KEY_STORAGE_KEY = 'user_gemini_api_key';
const KEY_INDEX_STORAGE_KEY = 'preconfigured_key_index';

const getNextPreconfiguredKey = (): string => {
  try {
    let currentIndex = parseInt(localStorage.getItem(KEY_INDEX_STORAGE_KEY) || '0', 10);
    if (isNaN(currentIndex)) {
        currentIndex = 0;
    }
    const key = PRECONFIGURED_KEYS[currentIndex];
    currentIndex = (currentIndex + 1) % PRECONFIGURED_KEYS.length;
    localStorage.setItem(KEY_INDEX_STORAGE_KEY, currentIndex.toString());
    return key;
  } catch (error) {
    console.error("Could not get preconfigured key index from local storage, defaulting to 0.", error);
    return PRECONFIGURED_KEYS[0];
  }
};

export const getUserApiKey = (): string | null => {
  try {
    return localStorage.getItem(USER_API_KEY_STORAGE_KEY);
  } catch (error) {
    console.error("Could not get user API key from local storage.", error);
    return null;
  }
};

export const setUserApiKey = (key: string): void => {
  try {
    if (key && key.trim()) {
      localStorage.setItem(USER_API_KEY_STORAGE_KEY, key);
    } else {
      localStorage.removeItem(USER_API_KEY_STORAGE_KEY);
    }
  } catch (error) {
     console.error("Could not set user API key in local storage.", error);
  }
};

export const getApiKey = (): string | null => {
  return getUserApiKey() || getNextPreconfiguredKey();
};
