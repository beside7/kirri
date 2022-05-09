import { Platform } from "react-native";
import { v4 as uuid } from "uuid";

/**
 * 파일 URL -> 파일명으로 추출하는 메서드
 * file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540100milliongold%252Fkirri/ImagePicker/a097fcb2-bc31-4843-9e63-88e117d843a0.png
 */
export default function getFileName(fileURL: string | null): string {
    const defaultFilename = `${uuid()}.png`;

    if (fileURL === null) return defaultFilename;

    try {
        switch (Platform.OS) {
            case "android":
                const files = fileURL.split("/");
                const fileName = files[files.length - 1];
                return fileName;
            default:
                console.warn("getFileName OS 미설정", Platform.OS);
                return defaultFilename;
        }
    } catch (error) {
        console.error("getFileName ERROR", error);
        return defaultFilename;
    }
}
