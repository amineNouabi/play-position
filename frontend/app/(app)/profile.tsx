import { ActivityIndicator, Pressable, View } from "react-native";
import { Avatar, AvatarImage } from "~/components/ui/avatar";

import * as ImagePicker from "expo-image-picker";
import { useState } from "react";

import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { Input } from "~/components/ui/input";
import { Text } from "~/components/ui/text";
import { useProfileApi } from "~/lib/api/profile/useProfileApi";

const AVATAR_PLACEHOLDER =
  "https://i.pinimg.com/originals/ef/a2/8d/efa28d18a04e7fa40ed49eeb0ab660db.jpg";

export default function Profile() {
  const { t } = useTranslation();
  const { getProfile } = useProfileApi();

  const { data: profile, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  });

  const [image, setImage] = useState("");

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" className="text-primary" />
      </View>
    );
  }

  return (
    <View className="flex-1 p-10">
      <Pressable className="self-center mb-4" onPress={pickImage}>
        <Avatar
          alt="Profile image"
          className="w-32 h-32 border-primary border-2"
        >
          <AvatarImage
            source={{ uri: image || profile.avatar || AVATAR_PLACEHOLDER }}
          />
        </Avatar>
      </Pressable>
      <View className="gap-5">
        <View className="gap-1">
          <Text>Full Name:</Text>
          <Input placeholder={t("Full Name")} value={profile.full_name} />
        </View>
        <View className="gap-1">
          <Text>Email:</Text>
          <Input
            editable={false}
            placeholder={t("Email")}
            value={profile.email}
          />
        </View>
      </View>
    </View>
  );
}
