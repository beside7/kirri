import React, { ReactElement } from "react";
import {
    SettingListWrap,
    SettingTitleWarp,
    SettingIcon,
    SettingTitle
} from "./setting.style";

interface Props {
    icon: any;
    title: string;
    children: ReactElement;
}

export const SettingContent = ({ icon, title, children }: Props) => {
    return (
        <SettingListWrap>
            <SettingTitleWarp>
                <SettingIcon source={icon}></SettingIcon>
                <SettingTitle>{title}</SettingTitle>
            </SettingTitleWarp>
            {children}
        </SettingListWrap>
    );
};
