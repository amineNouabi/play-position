import { ComponentProps } from "react";
import { ActivityIndicator as RNActivityIndicator } from "react-native";
import { cn } from "~/lib/utils";

export const ActivityIndicator = ({
  className,
  size = "large",
  ...props
}: ComponentProps<typeof RNActivityIndicator>) => {
  return (
    <RNActivityIndicator
      size={size}
      className={cn(className, "text-primary m-auto")}
      {...props}
    />
  );
};
