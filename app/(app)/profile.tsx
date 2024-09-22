import Slider from "@react-native-community/slider";
import * as ImagePicker from "expo-image-picker";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Pressable, View } from "react-native";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { RadioGroup, RadioGroupItemWithLabel } from "~/components/ui";
import { Avatar, AvatarImage } from "~/components/ui/avatar";
import { Input } from "~/components/ui/input";
import { Text } from "~/components/ui/text";
import { useColorScheme } from "~/hooks/useColorScheme";
import { useProfileApi } from "~/lib/api/profile/useProfileApi";
import { NAV_THEME } from "~/lib/constants";

import i18next from "i18next";
import { updateLanguage, type Local } from "~/i18n";

const AVATAR_PLACEHOLDER =
  "https://i.pinimg.com/originals/ef/a2/8d/efa28d18a04e7fa40ed49eeb0ab660db.jpg";

export default function Profile() {
  const { t } = useTranslation();
  const { colorScheme } = useColorScheme();
  const queryClient = useQueryClient();
  const { getProfile, updateProfile } = useProfileApi();

  const [sliderValue, setSliderValue] = useState(1);

  const {
    data: profile,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  });

  const { mutate } = useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      // Optionally refetch or update the profile data
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
    onError: (error) => {
      console.error("Error updating profile:", error);
    },
  });

  const [pickedImage, setPickedImage] = useState("");

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setPickedImage(result.assets[0]?.uri || "");
    }
  };

  useEffect(() => {
    if (profile) setSliderValue(profile.search_radius);
  }, [profile]);

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator
          size="large"
          color={NAV_THEME[colorScheme].primary}
        />
      </View>
    );
  }

  if (error || !profile) {
    console.log(error);
    return (
      <View className="flex-1 items-center justify-center">
        <Text>{t("Error fetching profile")}</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 items-center p-5 px-7">
      <View className="w-full max-w-lg gap-6">
        <Pressable className="self-center mb-4" onPress={pickImage}>
          <Avatar
            alt="Profile image"
            className="w-32 h-32 border-primary border-2"
          >
            <AvatarImage
              source={{
                uri: pickedImage || profile.avatar || AVATAR_PLACEHOLDER,
              }}
            />
          </Avatar>
        </Pressable>
        <View className="gap-3">
          <View className="gap-3">
            <View className="flex-row justify-between pr-10">
              <Text>{t("Search Radius")}:</Text>
              <Text className="font-bold text-xl">{sliderValue} Km</Text>
            </View>
            <Slider
              step={1}
              value={sliderValue}
              onValueChange={(value) => setSliderValue(value)}
              onSlidingComplete={(value) => {
                mutate({ search_radius: value });
              }}
              minimumValue={1}
              maximumValue={10}
              minimumTrackTintColor={NAV_THEME[colorScheme].primary}
              maximumTrackTintColor={NAV_THEME[colorScheme].text}
              thumbTintColor={NAV_THEME[colorScheme].primary}
            />
          </View>
          <View className="gap-1">
            <Text>{t("Full Name")}:</Text>
            <Input
              editable={false}
              placeholder={t("Full Name")}
              value={profile.full_name || "Unknown"}
            />
          </View>
          <View className="gap-1">
            <Text>{t("Email")}:</Text>
            <Input
              editable={false}
              placeholder={t("Email")}
              value={profile.email || "Unknown"}
            />
          </View>
          <View className="gap-1">
            <Text>{t("Language")}:</Text>
            <RadioGroup
              value={i18next.language}
              onValueChange={(lng) => updateLanguage(lng as Local)}
              className="gap-3 pl-3 pt-1"
            >
              <RadioGroupItemWithLabel
                value="en"
                label="English"
                onLabelPress={() => updateLanguage("en")}
              />
              <RadioGroupItemWithLabel
                value="fr"
                label="French"
                onLabelPress={() => updateLanguage("fr")}
              />
              <RadioGroupItemWithLabel
                value="ar"
                label="العربية"
                onLabelPress={() => updateLanguage("ar")}
              />
            </RadioGroup>
          </View>
        </View>
      </View>
    </View>
  );
}
