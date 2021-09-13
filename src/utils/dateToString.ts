import dateFormat from 'dateformat'

const ONE_SECOND = 1000
const ONE_MINUTE = ONE_SECOND * 60;
const ONE_HOUR = ONE_MINUTE * 60; // 1000 밀리초 * 60 초 * 60 분
const ONE_DAY = ONE_HOUR * 24 // 1시간 * 24 시간
const ONE_YEAR = ONE_DAY * 365

/**
 * 시간을 문자열을 변경
 * 기대값
 • 1시간 이전 : MM분 전
 • 1시간~24시간:  HH시간 전
 • 25시간~7일: DD일 전
 • 8일~올해: MM월 DD일
 • 작년: YYYY년 MM월 DD일
 (분, 시간, 월, 일은 한자리인 경우 자리수를 맞추기 위해 10의 자리에 0을 넣지 않음. e.g. 1분 전, 3일 전, 8월 8일로 표시 - 01분 전, 03일 전, 08월 08일로 표시하지 않음)
 * @param time
 */
export const dateToString = (time: Date) : string => {
    const today = new Date(); // 현재 시간
    const timeDifference = today.getTime() - time.getTime(); // 시간 차


    /**
     * 1시간 이전
     */
    if(timeDifference < ONE_HOUR){
        return dateFormat(new Date(timeDifference) , "M분 전")
    }
    /**
     * 1시간~24시간:  HH시간 전
     */
    else if(ONE_HOUR <= timeDifference && timeDifference <= ONE_DAY){
        return dateFormat(new Date(timeDifference) , "H분 전")
    }

    /**
     * 25시간~7일: DD일 전
     */
    else if(ONE_DAY < timeDifference && timeDifference <= ONE_DAY * 7){
        return dateFormat(new Date(timeDifference) , "d일 전")
    }

    /**
     * 8일~올해: MM월 DD일
     */
    else if(ONE_DAY * 7 < timeDifference && timeDifference <= ONE_YEAR){
        return dateFormat(new Date(timeDifference) , "m월 d일")
    }

    /**
     * 1년 이상
     */
    return dateFormat(time , "yyyy년 mm월 dd일")
}

export default dateToString;