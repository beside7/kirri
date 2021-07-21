import { ImageURISource } from "react-native";

const Diary_Image_01 = require('@assets/images/diary/diary_coverimg_01.png');
const Diary_Image_02 = require('@assets/images/diary/diary_coverimg_02.png');
const Diary_Image_03 = require('@assets/images/diary/diary_coverimg_03.png');
const Diary_Image_04 = require('@assets/images/diary/diary_coverimg_04.png');
const Diary_Image_05 = require('@assets/images/diary/diary_coverimg_05.png');
const Diary_Image_06 = require('@assets/images/diary/diary_coverimg_06.png');

const Diary_CircleImage_01 = require('@assets/images/diary/diary_circleimg_01.png');
const Diary_CircleImage_02 = require('@assets/images/diary/diary_circleimg_02.png');
const Diary_CircleImage_03 = require('@assets/images/diary/diary_circleimg_03.png');
const Diary_CircleImage_04 = require('@assets/images/diary/diary_circleimg_04.png');
const Diary_CircleImage_05 = require('@assets/images/diary/diary_circleimg_05.png');
const Diary_CircleImage_06 = require('@assets/images/diary/diary_circleimg_06.png');


const Diary_Big_Image_01 : ImageURISource = require('@assets/images/diary/diary_coverimg_big_01.png');
const Diary_Big_Image_02 : ImageURISource = require('@assets/images/diary/diary_coverimg_big_02.png');
const Diary_Big_Image_03 : ImageURISource = require('@assets/images/diary/diary_coverimg_big_03.png');
const Diary_Big_Image_04 : ImageURISource = require('@assets/images/diary/diary_coverimg_big_04.png');
const Diary_Big_Image_05 : ImageURISource = require('@assets/images/diary/diary_coverimg_big_05.png');
const Diary_Big_Image_06 : ImageURISource = require('@assets/images/diary/diary_coverimg_big_06.png');



export const CoverImages = {
	'01':Diary_Image_01,
	'02':Diary_Image_02,
	'03':Diary_Image_03,
	'04':Diary_Image_04,
	'05':Diary_Image_05,
	'06':Diary_Image_06
}

export const CoverCircleImages = {
	'01':Diary_CircleImage_01,
	'02':Diary_CircleImage_02,
	'03':Diary_CircleImage_03,
	'04':Diary_CircleImage_04,
	'05':Diary_CircleImage_05,
	'06':Diary_CircleImage_06
}

export const CoverBigImages = {
	'01':Diary_Big_Image_01,
	'02':Diary_Big_Image_02,
	'03':Diary_Big_Image_03,
	'04':Diary_Big_Image_04,
	'05':Diary_Big_Image_05,
	'06':Diary_Big_Image_06
}


export const CoverColor = {
	'01':'#6173ff',
	'02':'#e49ffd',
	'03':'#4fbcd0',
	'04':'#b59aff',
	'05':'#fdae43',
	'06':'#1ad0ff'
}

export type CoverImageTypes = keyof (typeof CoverImages);
export type CoverCircleImageTypes = keyof (typeof  CoverCircleImages);
export type CoverColorTypes = keyof (typeof  CoverColor);
