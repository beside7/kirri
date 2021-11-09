import { ReactElement } from "react";

export interface Props {
    open: boolean;
    handelOpen: (open: boolean) => void;
    headerIcon?: any;
    title?: string;
    content?: string | ReactElement;
    width?: string | number;
    height?: string | number;
    confirm: string;
    cancel?: string;
    onConfirm: (e?: any) => Promise<void>;
    onCancel: (e?: any) => Promise<void>;
}
