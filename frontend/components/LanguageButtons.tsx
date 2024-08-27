import React from 'react';
import { View } from 'react-native';

import { i18next, Local, updateLanguage } from '~/i18n';

import { Text } from './ui/text';
import { Toggle } from './ui/toggle';

export default function LanguageButtons() {
  const [language, setLanguage] = React.useState(i18next.language as Local);

  function handlePress(language: Local) {
    updateLanguage(language);
    setLanguage(language);
  }

  return (
    <View className="flex flex-row p-2 mt-3 mb-3 gap-1">
      <Toggle
        pressed={language === 'en'}
        onPressedChange={() => handlePress('en')}
      >
        <Text>English</Text>
      </Toggle>
      <Toggle
        pressed={language === 'fr'}
        onPressedChange={() => handlePress('fr')}
      >
        <Text>Français</Text>
      </Toggle>
      <Toggle
        pressed={language === 'ar'}
        onPressedChange={() => handlePress('ar')}
      >
        <Text>العربية</Text>
      </Toggle>
    </View>
  );
}
