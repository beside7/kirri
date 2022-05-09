import React, { useRef, useEffect, useState } from "react";
import {
    View,
    KeyboardAvoidingView,
    Platform,
    Dimensions,
    TouchableOpacity,
    Image,
    TextInput,
    ScrollView,
    BackHandler
} from "react-native";
import { getDefaultHeaderHeight } from "@react-navigation/elements";
import {
    useSafeAreaFrame,
    useSafeAreaInsets
} from "react-native-safe-area-context";
import {
    Background,
    Text_2,
    Header,
    Popup,
    Popup as Confirm
} from "@components";
import {
    // actions,
    RichEditor
    // RichToolbar,
} from "react-native-pell-rich-editor";
import { styles, AlertContent, AlertText } from "./record-input.style";
import { AntDesign } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { recordApis, diaryApis } from "@apis";
import { StackNavigatorParams } from "@config/navigator";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import {
    CreateRecordReqType,
    DiaryResType,
    RecordImageInfo
} from "@type-definition/diary";
import * as FileSystem from "expo-file-system";
import {
    CoverCircleImages,
    CoverColor,
    CoverImageTypes,
    getFileName
} from "@utils";
import { FontAwesome } from "@expo/vector-icons";
import ImageQualityModal from "./image-quality-modal";
import ActionSheet from "react-native-actions-sheet";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";


type RecordInputProps = {
    navigation: StackNavigationProp<StackNavigatorParams, "RecordInput">;
    route: RouteProp<StackNavigatorParams, "RecordInput">;
};
const SelecedCheckImage = require("@assets/images/diary/writing_select_diary_check_box_checked.png");
// const SCREEN_HEIGHT = Dimensions.get("screen").height;

/**
 * HTML 태그 제거
 */
const remoteHTML = (string: string) =>
    string
        .replace(/(<([^>]+)>)/gi, "")
        .split("&nbsp;")
        .join(" ");

export default function RecordInput({ navigation, route }: RecordInputProps) {
    /**
     * 다이러리 정보
     */
    const [diary, setDiary] = useState<DiaryResType | null>(route.params.diary);

    const { prev } = route.params;

    /**
     * 선택한 다이러리 정보 - uuid
     */
    const [selectDiary, setSelectDiary] = useState<string | null>(null);

    /**
     * 하단 다이러리 리스트
     */
    const [diatyList, setDiatyList] = useState<DiaryResType[]>([]);

    const [disabled, setDisabled] = useState(false);

    /**
     * 기록정보
     */
    const record = route.params.record;

    /**
     * new : 신규 , modify 수정
     */
    const type: "new" | "modify" = record === undefined ? "new" : "modify";

    /**
     * editor ref
     */
    const richText = React.createRef<RichEditor>() || useRef<RichEditor>();

    const inputRef = useRef<TextInput | null>(null);

    /**
     * 헤더 높이
     */
    const frame = useSafeAreaFrame();
    const insets = useSafeAreaInsets();

    const headerHeight = getDefaultHeaderHeight(frame, false, insets.top);

    /**
     * 스크린 높이
     */
    const ScreenHeight = Dimensions.get("window").height;

    /**
     * 사용자가 입력한 이미지 목록
     */
    const [images, setImages] = useState<RecordImageInfo[]>(
        type === "modify" && record ? record.images : []
    );

    /**
     * 본문
     */
    const [body, setBody] = useState(
        type === "modify" && record ? record.body : ""
    );

    /**
     * 제목
     */
    const [title, setTitle] = useState(
        type === "modify" && record ? record.title : ""
    );

    /**
     * 모달창 출력여부
     */
    const [visible, setVisible] = useState(false);

    /**
     * 라디오 버튼
     */
    const [checked, setChecked] = React.useState(0.5);

    /**
     * 로딩 표시 여부
     */
    const [loading, setLoading] = useState(false);

    /**
     * 하단 메뉴 설정
     */
    const actionSheetRef = useRef<ActionSheet>(null);
    /**
     * 다이러리 선택쪽 스크롤 뷰
     */
    const scrollViewRef = useRef<ScrollView>(null);

    const editorScrollViewRef = useRef<KeyboardAwareScrollView>(null);

    /**
     * 경고창 출력여부
     */
    const [alertOpen, setAlertOpen] = useState(false);

    /**
     * 경고창 메세지
     */
    const [alertMessage, setAlertMessage] = useState("");

    /**
     * 동의창 출력여부
     */
    const [confirmOpen, setConfirmOpen] = useState(false);

    /**
     * 에디터 내부 css 설정
     */
    const fontFace = `@font-face {
        font-family: 'SpoqaHanSansNeo-Regular';
        src: url('https://cdn.jsdelivr.net/gh/spoqa/spoqa-han-sans@latest/Subset/SpoqaHanSansNeo/SpoqaHanSansNeo-Regular.woff') format('woff';
        font-weight: normal;
        font-style: normal;
    }`;

    // console.log("test")
    // console.log(data);
    /**
     * 최초 로드시 이벤트
     */
    useEffect(() => {
        console.debug("record-input.tsx diary info", diary);
        if(type === "modify"){
            console.debug("record-input.tsx record info", record);
        }
        // console.log(diary);

        setTimeout(() => {
            if (inputRef.current) {
                inputRef.current.focus();
            }
        }, 1000);

        /**
         * 이미지 사용권한 요청
         */
        (async () => {
            if (Platform.OS !== "web") {
                const { status } =
                    await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== "granted") {
                    alert(
                        "Sorry, we need camera roll permissions to make this work!"
                    );
                }
            }
        })();
    }, []);

    /**
     * 뒤로가기 버튼 클릭시 이벤트
     */
    useEffect(() => {
        const backAction = () => {
            // Alert.alert("", "작성 중인 기록은 저장되지 않아요. 나가시겠어요?", [
            //     {
            //         text: "머무르기",
            //         onPress: () => null,
            //         style: "cancel"
            //     },
            //     { text: "나가기", onPress: () => navigation.goBack() }
            // ]);
            setConfirmOpen(true);
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );

        return () => backHandler.remove();
    }, []);

    /**
     * image pick 설정 및 실행
     */
    const pickImage = async () => {
        setLoading(true);
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            // aspect: [4, 3],
            /**
             * 1 : 원본 이미지 화질 ~ 0 : 최대 압축
             */
            quality: checked
        });

        // console.log(result);

        if (!result.cancelled) {
            const newImages : RecordImageInfo[] = [{
                path: result.uri
            }];

            try {
                /**
                 * 파일 정보 가져오기
                 */
                const fileInfo = await FileSystem.getInfoAsync(result.uri);
                console.debug("pickImage file info" , fileInfo);

                /**
                 * 만약 추가한 이미지가 500KB 보다 크면 경고창 출력후 중단
                 */
                if (
                    fileInfo.size !== undefined &&
                    fileInfo.size > 1024 * 500
                ) {
                    setAlertMessage(
                        `이미지 용량이 너무 커요. 500KB 이하의 이미지를 등록해주세요.`
                    );
                    setAlertOpen(true);
                    return;
                }

                setImages(newImages);
            } catch (error) {
                console.log("pickImage ERROR" , error);
                // Alert.alert("", `해당 이미지가 존재하지 않습니다.`, [
                //     { text: "확인", style: "default" }
                // ]);
                setAlertMessage(`해당 이미지가 존재하지 않습니다.`);
                setAlertOpen(true);
            }
        }
        setLoading(false);
    };

    /**
     * 추가한 이미지 제거
     * @param index 이미지 번호
     */
    const removeImage = (index: number): void => {
        const newImages = images?.filter((_, num) => num !== index);
        setImages(newImages);
    };

    /**
     * 에디테에 글을 입력시 이벤트 처리
     * @param text 본문내용
     */
    const onKeyUp = (text: string) => {
        setBody(text);
    };

    /**
     * 서버에 전송
     */
    const sendServer = async () => {
        /**
         * 로딩 표시
         */
        setLoading(true);

        if (!title) {
            setAlertMessage(`제목을 작성해 주세요.`);
            setAlertOpen(true);
            return;
        }

        if (!body) {
            setAlertMessage(`내용을 작성해 주세요.`);
            setAlertOpen(true);
            return;
        }

        if (diary) {
            const { uuid } = diary;

            // let file : Blob | null = null;
            /**
             * 파일에 대한 정보를 담는다.
             */
            let files: string[] | null = null;

            if (images.length > 0) {
                files = images.map(({path}) => path);
                files = files.map(file =>
                    Platform.OS === "android"
                        ? file
                        : file.replace("file://", "")
                );
            }

            let recordPayload: CreateRecordReqType = {
                title,
                body,
                tempFileIds: null
            };

            try {
                switch (type) {
                    case "new":
                        if (images.length > 0) {
                            /**
                             * 이미지 업로드 URL 조회
                             */
                            const imageUploadInfo =
                                await recordApis.getUploadURL({
                                    file: getFileName(images[0].path),
                                    diaryUuid: uuid
                                });

                            const { uploadUrl, tempFileId } = imageUploadInfo;

                            /**
                             * 이미지 업로드
                             */
                            await recordApis.uploadImage({
                                uploadUrl,
                                files
                            });

                            recordPayload.tempFileIds = [tempFileId];
                        }

                        const res = await recordApis.createRecord(
                            uuid,
                            recordPayload
                        );
                        console.debug("기록 테스트 : 새기록 작성", res);

                        navigation.replace("RecordList", {
                            diary: diary,
                            snack: `새 기록이 다이어리에 등록되었어요.`
                        });
                        break;
                    case "modify":
                        /**
                         * 만약에 추가한 이미지 중에서 id 값이 undefined 인 것이 있으면 새롭게 이미지를 추가한것으로 간주한다.
                         */
                        if (images.length > 0 && images.find(({ id }) => id === undefined) !== undefined ) {
                            /**
                             * 이미지 업로드 URL 조회
                             */
                            const imageUploadInfo =
                                await recordApis.getUploadURL({
                                    file: getFileName(images[0].path),
                                    diaryUuid: uuid
                                });
                            const { uploadUrl, tempFileId } = imageUploadInfo;

                            /**
                             * 이미지 업로드
                             */
                            await recordApis.uploadImage({
                                uploadUrl,
                                files
                            });

                            /**
                             * 기존 이미지 삭제
                             */
                            try {
                                await recordApis.deleteRecordImage(
                                    uuid,
                                    record!.uuid,
                                    record!.images[0].id!
                                )
                            } catch (error){

                            }

                            recordPayload.tempFileIds = [tempFileId];
                        }


                        const modifyRes = await recordApis.modifyRecord(
                            uuid,
                            record!.uuid,
                            recordPayload
                        );

                        navigation.replace("RecordList", {
                            diary: diary,
                            snack: `기록이 수정되었어요.`
                        });
                        break;

                    default:
                        break;
                }
            } catch (error: any) {
                console.log(error);
                console.log(error.response);

                setAlertMessage(
                    `글이 ${
                        type === "modify" ? "수정" : "생성"
                    } 간 에러가 발생했습니다.` +
                        "\n" +
                        `${
                            error && error.response && error.response.data
                                ? error.response.data.error
                                : undefined
                        }`
                );
                setAlertOpen(true);
            }
        } else {
            setAlertMessage(`기록을 등록할 다이어리를 선택해주세요.`);
            setAlertOpen(true);
        }

        setLoading(false);
    };

    /**
     * 타이틀 클릭시 이벤트 처리
     */
    const onPressTitle = async () => {
        /**
         * 하단 팝업 열기
         */
        actionSheetRef.current?.setModalVisible();
        const data = await diaryApis.getDiaries();
        const { elements } = data;
        setDiatyList(elements);
    };

    useEffect(() => {
        if (title.trim() === "" || body.trim() === "") {
            setDisabled(true);
        } else {
            setDisabled(false);
        }
    }, [title, body]);

    return (
        <Background>
            <Header
                leftIcon={
                    <TouchableOpacity
                        onPress={() => {
                            setConfirmOpen(true);
                        }}
                    >
                        <Image
                            style={{ width: 24, height: 24 }}
                            source={require("@assets/icons/x.png")}
                        />
                    </TouchableOpacity>
                }
                rightIcon={
                    <TouchableOpacity
                        onPress={sendServer}
                        disabled={loading || disabled}
                    >
                        <Text_2
                            style={{
                                color:
                                    loading || disabled ? "#a0a0a0" : "#000000",
                                fontSize: 18
                            }}
                        >
                            {type === "new" ? "등록" : "수정"}
                        </Text_2>
                    </TouchableOpacity>
                }
                title={
                    diary !== null ? (
                        diary.title
                    ) : (
                        <TouchableOpacity
                            onPress={onPressTitle}
                            style={{ flexDirection: "row" }}
                        >
                            <Text_2
                                style={{
                                    fontSize: 18
                                }}
                            >
                                다이어리 선택
                            </Text_2>
                            <Image
                                style={{ width: 24, height: 24 }}
                                source={require("@assets/images/various_collapse_on_normal.png")}
                            />
                        </TouchableOpacity>
                    )
                }
                borderBottom={true}
            />
            <ImageQualityModal
                visible={visible}
                checked={checked}
                close={() => setVisible(false)}
                setChecked={setChecked}
            />
            <KeyboardAvoidingView
                behavior={Platform.OS == "ios" ? "padding" : "height"}
                // keyboardVerticalOffset={headerHeight}
                style={{ flex: 1 }}
            >
                <KeyboardAwareScrollView ref={editorScrollViewRef}>
                    <View style={styles.container}>
                        <TextInput
                            style={styles.title}
                            placeholderTextColor="#d1d1de"
                            placeholder={"어떤 제목의 기록을 남겨볼까?"}
                            value={title}
                            maxLength={20}
                            onChangeText={value => {
                                setTitle(value);
                            }}
                            autoFocus={true}
                            ref={input => (inputRef.current = input)}
                            onSubmitEditing={() => {
                                richText.current?.focusContentEditor();
                            }}
                        />
                        {images && (
                            <View style={styles.imageList}>
                                {images.map((image, index) => (
                                    <View style={styles.imageWrap} key={index}>
                                        <Image
                                            source={{ uri: image.path }}
                                            style={styles.insertImages}
                                        />
                                        <TouchableOpacity
                                            style={styles.closeIcon}
                                            onPress={e => removeImage(index)}
                                        >
                                            <AntDesign
                                                name="closecircle"
                                                size={20}
                                                color="black"
                                            />
                                        </TouchableOpacity>
                                    </View>
                                ))}
                            </View>
                        )}
                        <ScrollView
                            style={[
                                styles.editorWrap,
                                { marginTop: 5, marginBottom: 50 }
                            ]}
                            onContentSizeChange={() => {
                                editorScrollViewRef.current?.scrollToEnd(false);
                            }}
                        >
                            <RichEditor
                                ref={richText}
                                editorStyle={{
                                    cssText: fontFace,
                                    contentCSSText: `font-family: SpoqaHanSansNeo-Regular; font-size: 14px; `
                                }}
                                style={[styles.editor, {}]}
                                onChange={onKeyUp}
                                initialContentHTML={
                                    type === "modify" && record
                                        ? record.body
                                        : ""
                                }
                                initialHeight={
                                    ScreenHeight - headerHeight - 200
                                }
                                placeholder={`너의 아주 작은 이야기까지 다 들어줄게!`}
                                pasteAsPlainText={true}
                                onTouchStart={() => {
                                    richText.current?.focusContentEditor();
                                }}
                            />
                        </ScrollView>
                    </View>
                </KeyboardAwareScrollView>
                <KeyboardAvoidingView>
                    <Image
                        style={styles.backgroudImage}
                        source={require("@assets/images/diary/diary_bottom_illust.png")}
                    />
                </KeyboardAvoidingView>
                <View style={styles.bottomTab}>
                    <TouchableOpacity onPress={pickImage}>
                        <Image
                            source={require("@assets/icons/image.png")}
                            style={{ width: 24, height: 24 }}
                        />
                    </TouchableOpacity>
                    <View>
                        <Text_2 bold="Regular" style={{ color: "#6f6f7e" }}>
                            ({remoteHTML(body).length}/2000)
                        </Text_2>
                    </View>
                    <TouchableOpacity onPress={() => setVisible(true)}>
                        <FontAwesome name="gear" size={24} color="black" />
                    </TouchableOpacity>
                </View>
                {/* 하단 팝업 부분 */}

                <ActionSheet
                    ref={actionSheetRef}
                    bounceOnOpen={true}
                    headerAlwaysVisible={true}
                    gestureEnabled={true}
                    overlayColor="#17171c"
                    defaultOverlayOpacity={0.3}
                >
                    <View style={styles.bottomPopupContainer}>
                        <View style={styles.bottomPopupTitleContainer}>
                            <Text_2 style={styles.bottomPopupTitle}>
                                다이어리 선택
                            </Text_2>
                        </View>
                        <ScrollView
                            style={{ height: 200 }}
                            ref={scrollViewRef}
                            nestedScrollEnabled={true}
                            onScrollEndDrag={() =>
                                actionSheetRef.current?.handleChildScrollEnd()
                            }
                            onScrollAnimationEnd={() =>
                                actionSheetRef.current?.handleChildScrollEnd()
                            }
                            onMomentumScrollEnd={() =>
                                actionSheetRef.current?.handleChildScrollEnd()
                            }
                        >
                            {diatyList.map((item, key) => (
                                <TouchableOpacity
                                    key={key}
                                    style={styles.diatyListItemContainer}
                                    onPress={() => {
                                        item.uuid !== selectDiary
                                            ? setSelectDiary(item.uuid)
                                            : setSelectDiary(null);
                                    }}
                                >
                                    <View
                                        style={
                                            styles.diatyListItemThumbnailContainer
                                        }
                                    >
                                        {item.icon.split(":")[0] === "image" ? (
                                            <View>
                                                <Image
                                                    style={
                                                        item.uuid ===
                                                            selectDiary &&
                                                        styles.selectDiaryImage
                                                    }
                                                    source={
                                                        CoverCircleImages[
                                                            item.icon.split(
                                                                ":"
                                                            )[1] as CoverImageTypes
                                                        ]
                                                    }
                                                />
                                                {item.uuid === selectDiary && (
                                                    <Image
                                                        style={
                                                            styles.selectImage
                                                        }
                                                        source={
                                                            SelecedCheckImage
                                                        }
                                                    />
                                                )}
                                            </View>
                                        ) : (
                                            <View
                                                style={[
                                                    {
                                                        width: 40,
                                                        height: 40,
                                                        borderRadius: 40,
                                                        backgroundColor:
                                                            CoverColor[
                                                                item.icon.split(
                                                                    ":"
                                                                )[1] as CoverImageTypes
                                                            ]
                                                    },
                                                    item.uuid === selectDiary &&
                                                        styles.selectDiaryImage
                                                ]}
                                            >
                                                {item.uuid === selectDiary && (
                                                    <Image
                                                        style={
                                                            styles.selectColor
                                                        }
                                                        source={
                                                            SelecedCheckImage
                                                        }
                                                    />
                                                )}
                                            </View>
                                        )}
                                    </View>
                                    <View>
                                        <Text_2
                                            style={styles.diatyListItemTitle}
                                        >
                                            {item.title}
                                        </Text_2>
                                        <Text_2
                                            style={styles.diatyListItemCount}
                                        >
                                            {item.members.length} 끼리
                                        </Text_2>
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                        <View style={styles.bottomPopupButtonContainer}>
                            <TouchableOpacity
                                style={
                                    selectDiary === null
                                        ? styles.bottomPopupDisableButton
                                        : styles.bottomPopupEnableButton
                                }
                                onPress={() => {
                                    if (selectDiary) {
                                        const diary = diatyList.find(
                                            ({ uuid }) => uuid === selectDiary
                                        );
                                        if (diary) {
                                            setSelectDiary(null);
                                            setDiary(diary);
                                            actionSheetRef.current?.setModalVisible(
                                                false
                                            );
                                        }
                                    }
                                }}
                            >
                                <Text_2>완료</Text_2>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ActionSheet>
            </KeyboardAvoidingView>
            <Popup
                open={alertOpen}
                confirm="확인"
                onConfirm={async () => {
                    setAlertOpen(false);
                }}
                width={300}
                handelOpen={(key: boolean) => {}}
                content={
                    <AlertContent>
                        <AlertText>{alertMessage}</AlertText>
                    </AlertContent>
                }
            />
            <Confirm
                open={confirmOpen}
                confirm="확인"
                cancel="머무르기"
                onCancel={async () => {
                    setConfirmOpen(false);
                }}
                onConfirm={async () => {
                    setConfirmOpen(false);
                    // navigation.goBack();
                    if (prev === "home") {
                        navigation.replace("Home");
                    } else {
                        navigation.replace("RecordList", {
                            diary: diary,
                            snack: null
                        });
                    }
                }}
                width={300}
                handelOpen={(key: boolean) => {}}
                content={
                    <AlertContent>
                        <AlertText>
                            작성 중인 기록은 저장되지 않아요. 나가시겠어요?
                        </AlertText>
                    </AlertContent>
                }
            />
        </Background>
    );
}
