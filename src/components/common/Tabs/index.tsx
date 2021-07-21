import React, { ReactElement, useState, useRef } from 'react';
import Swiper from 'react-native-swiper';
import {Container, TabWarp, Tab, TabTitle, Blank, ActiveBar} from './tabs.style';

const getElement = (element: ReactElement | ReactElement[]) => {
    try{
        return [React.Children.only(element)];
    }catch(error){
        return React.Children.map(element, ele=>ele);
    }
}

interface Props {
    width?: string | number,
    height?: string | number,
    tabNames: string[],
    children?: ReactElement[] | ReactElement
}

export const Tabs = ({width, height, tabNames, children=[]}: Props) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [tabElements, setTabElements] = useState(getElement(children));
    const tabRef = useRef<any>();

    return (
        <Container>
            <TabWarp>
                {
                    tabNames.map((tab, index)=>
                        <Tab
                            key={'tabname_'+index}
                            onPress={()=>{
                                tabRef?.current?.scrollTo(index)}
                            }
                            disabled={activeIndex===index}
                        >
                            <TabTitle
                                active={activeIndex===index}
                            >
                                {tab}
                            </TabTitle>
                            {
                                activeIndex===index?<ActiveBar/>:<></>
                            }
                        </Tab>
                    )
                }
            </TabWarp>
            <Swiper
                ref={tabRef}
                showsButtons={false}
                loop={false}
                showsPagination={false}
                onIndexChanged={(index)=>{setActiveIndex(index)}}
                index={activeIndex}
            >
                {
                    tabNames.map((tab, index)=>tabElements[index]?tabElements[index]:<Blank/>)
                }
            </Swiper>
        </Container>
    )
}