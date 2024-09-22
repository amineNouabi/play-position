import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import React, { useState } from "react";

import { Clock, X } from "~/lib/icons";
import { cn } from "~/lib/utils";
import { buttonTextVariants } from "./button";
import { Input } from "./input";

import { Button } from "./button";
import { Text } from "./text";

type Props = {
  onChange: (date: string) => void;
  value?: string;
  placeholder?: string;
};

// To remove Date logic from the component, since there is another component that handles it `FormDatePicker` in `components/ui/form.tsx`
// using `Calendar` from `react-native-calendars` library.

const TimeInput = React.forwardRef<
  React.ElementRef<typeof Button>,
  Props & Omit<React.ComponentPropsWithoutRef<typeof Input>, "onChange">
>(({ onChange, value, placeholder, ...props }, ref) => {
  const [showDatePicker, setShowDatePicker] = useState(false);

  function _onChange(_event: DateTimePickerEvent, selectedDate?: Date) {
    if (!selectedDate) return;
    setShowDatePicker(false);
    const data = selectedDate?.toISOString()?.split("T")[1];

    onChange(data || "");
  }

  const date = value
    ? new Date(Date.now()).toISOString().split("T")[0] + "T" + value
    : new Date(Date.now()).toISOString();

  return (
    <>
      <Button
        variant="outline"
        className="flex-row gap-3 justify-start px-3 relative"
        ref={ref}
        onPress={() => setShowDatePicker(true)}
      >
        {({ pressed }) => (
          <>
            <Clock
              className={buttonTextVariants({
                variant: "outline",
                className: cn(!value && "opacity-80", pressed && "opacity-60"),
              })}
              size={18}
            />
            <Text
              className={buttonTextVariants({
                variant: "outline",
                className: cn(
                  "font-normal",
                  !value && "opacity-70",
                  pressed && "opacity-50",
                ),
              })}
            >
              {value ? new Date(date).toLocaleTimeString() : placeholder}
            </Text>
            {!!value && (
              <Button
                className="absolute right-0 active:opacity-70 native:pr-3"
                variant="ghost"
                onPress={() => {
                  onChange?.("");
                }}
              >
                <X size={18} className="text-muted-foreground text-xs" />
              </Button>
            )}
          </>
        )}
      </Button>
      {showDatePicker && (
        <DateTimePicker
          value={new Date(date)}
          mode="time"
          display="default"
          is24Hour={true}
          onChange={_onChange}
        />
      )}
    </>
  );
});

TimeInput.displayName = "TimeInput";

export { TimeInput };
