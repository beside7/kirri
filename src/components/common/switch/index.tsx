import React from "react";
import { Switch as PaperSwitch } from "react-native-paper";
import { theme } from "@utils";

interface Props {
    disabled?: boolean;
    value?: boolean;
    onValueChange?: (e: any) => void;
}

export const Switch = (props: Props) => {
    return <PaperSwitch {...props} color={theme["201"]} />;
};
