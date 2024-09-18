import { router } from "expo-router";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";

import {
  Form,
  FormDatePicker,
  FormField,
  FormInput,
  FormTimePicker,
} from "~/components/ui/form";

import { useCreateGameForm } from "./_layout";

import { Button, buttonTextVariants } from "~/components/ui/button";
import { Text } from "~/components/ui/text";
import { cn } from "~/lib/utils";

import { ActivityIndicator } from "~/components/ui";

import { z } from "zod";
import { useToast } from "~/hooks/useToast";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CreateGameFields } from "~/lib/api/games";
import { useGamesApi } from "~/lib/api/games/useGamesApi";
import { sleep } from "~/lib/utils";

const formSchema = z
  .object({
    players_per_team: z.coerce
      .number({ required_error: "Players per team is required" })
      .int("Players per team must be an integer")
      .min(1, "Minimum 1 player per team")
      .max(11, "Maximum 11 players per team"),
    pre_taken_spots_team_a: z.coerce
      .number()
      .min(0, "Minimum 0 pre taken spots"),
    pre_taken_spots_team_b: z.coerce
      .number()
      .min(0, "Minimum 0 pre taken spots"),
    date: z.string().min(1, "Date is required"),
    time: z.string(),
  })
  .superRefine((data, ctx) => {
    if (data.pre_taken_spots_team_a > data.players_per_team)
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Cannot be greater than players per team",
        path: ["pre_taken_spots_team_a"],
      });

    if (data.pre_taken_spots_team_b > data.players_per_team)
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Cannot be greater than players per team",
        path: ["pre_taken_spots_team_b"],
      });

    if (
      data.pre_taken_spots_team_a + data.pre_taken_spots_team_b ===
      data.players_per_team * 2
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Your game is already full. Enjoy!",
        path: ["players_per_team"],
      });
    }
  });

export default function GameData() {
  const { t } = useTranslation();
  const toast = useToast();
  const { gameLocation, loading, setLoading } = useCreateGameForm();
  const { createGame } = useGamesApi();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      players_per_team: 5,
      pre_taken_spots_team_a: 0,
      pre_taken_spots_team_b: 0,
      date: "",
      time: "",
    },
  });

  const playerPerTeam = form.watch("players_per_team");

  useEffect(() => {
    if (playerPerTeam && form) {
      form.trigger("pre_taken_spots_team_a");
      form.trigger("pre_taken_spots_team_b");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playerPerTeam]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await sleep(100);
    if (!gameLocation || !gameLocation.latitude || !gameLocation.longitude) {
      toast.error("Please select game location");
      router.push("/games/create");
      return;
    }

    setLoading(true);
    await sleep(100);

    const data: Omit<CreateGameFields, "owner_id"> = {
      start_time: `${values.date}T${values.time}`,
      location: `POINT(${gameLocation.longitude} ${gameLocation.latitude})`,
      players_per_team: values.players_per_team,
      pre_taken_spots_team_a: values.pre_taken_spots_team_a,
      pre_taken_spots_team_b: values.pre_taken_spots_team_b,
    };

    try {
      await createGame(data);
      toast.success("Game created successfully");
      router.push("/games/created");
    } catch (error: unknown) {
      toast.error("Failed to create game");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <View className="flex-1 md:px-56 lg:px-80 px-6 w-full web:justify-center">
      <View className="flex-1 justify-around w-full">
        <Form {...form}>
          <View className="native:gap-3 gap-6">
            <FormField
              control={form.control}
              name="players_per_team"
              render={({ field }) => (
                <FormInput
                  label="Players per team"
                  placeholder="Number from 1 to 11"
                  keyboardType="numeric"
                  {...field}
                  value={field.value?.toString(10) || ""}
                />
              )}
            />
            <View className="gap-3">
              <Text className="text-md font-bold">Pre-taken spots</Text>
              <View className="flex-row justify-around">
                <FormField
                  control={form.control}
                  name="pre_taken_spots_team_a"
                  render={({ field }) => (
                    <FormInput
                      label="Team A"
                      placeholder="Number from 0 to 11"
                      keyboardType="numeric"
                      className="w-[150px]"
                      {...field}
                      value={field.value?.toString(10) || ""}
                    />
                  )}
                />
                <FormField
                  control={form.control}
                  name="pre_taken_spots_team_b"
                  disabled={loading}
                  render={({ field }) => (
                    <FormInput
                      label="Team B"
                      className="w-[150px]"
                      placeholder="Number from 0 to 11"
                      keyboardType="numeric"
                      {...field}
                      value={field.value?.toString(10) || ""}
                    />
                  )}
                />
              </View>
            </View>
            <FormField
              control={form.control}
              name="date"
              disabled={loading}
              render={({ field }) => (
                <FormDatePicker
                  label="Game date"
                  minDate={new Date().toDateString()}
                  {...field}
                />
              )}
            />
            <FormField
              control={form.control}
              name="time"
              disabled={loading}
              render={({ field }) => (
                <FormTimePicker label="Game time" {...field} />
              )}
            />
          </View>
          <Button
            disabled={loading}
            size="lg"
            variant="outline"
            className="justify-around border-primary"
            onPress={form.handleSubmit(onSubmit)}
          >
            {loading ? (
              <ActivityIndicator size="small" color="primary" />
            ) : (
              <Text
                className={buttonTextVariants({
                  variant: "outline",
                  className: cn("font-normal"),
                })}
              >
                {t("Create game")}
              </Text>
            )}
          </Button>
        </Form>
      </View>
    </View>
  );
}
