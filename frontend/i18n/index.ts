import AsyncStorage from '@react-native-async-storage/async-storage';
import i18next from 'i18next';

import { getLocales } from 'expo-localization';
import { initReactI18next } from 'react-i18next';

import ar from './ar/translations.json';
import en from './en/translations.json';
import fr from './fr/translations.json';

const resources = {
  en: {
    translation: en,
  },
  fr: {
    translation: fr,
  },
  ar: {
    translation: ar,
  },
} as const;

type Local = keyof typeof resources;

const STORAGE_KEY = 'local' as const;

const getLocal = async (): Promise<Local | null> => {
  const local = await AsyncStorage.getItem(STORAGE_KEY);
  if (local) return local as Local;

  return null;
};

const setLocal = async (local: Local) => {
  await AsyncStorage.setItem(STORAGE_KEY, local as Local);
};

/**
 * Update the language of the app and reload it if needed (if changing to/from arabic)
 * @param lng the language to change to
 */
const updateLanguage = async (lng: Local) => {
  if (lng === i18next.language) return;
  i18next
    .changeLanguage(lng)
    .then(() => {
      setLocal(lng);
    })
    .catch((err) => {
      console.log('Something went wrong while Changing i18n language');
      console.log(err);
    });
};

/**
 * initI18n - Initialize i18n with the device language
 * @returns {Promise<void>}
 *
 * @note: This function should be called once here in the localization/index.ts file
 */
async function initI18n() {
  const local = (await getLocal()) || (getLocales()[0].languageCode as Local);

  i18next.use(initReactI18next).init({
    resources,
    lng: local,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });
}

initI18n();

export { getLocal, i18next, Local, setLocal, STORAGE_KEY, updateLanguage };
