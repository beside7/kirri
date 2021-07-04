import React, { ReactElement } from 'react';
import {Text} from 'react-native';
import { SelectedImage, Warp, ImageLisContainer, Images, SelectedImageContainer, ImageWapper } from './nickname.style';
const kirri_profile_1 = require('@assets/images/kirri_profile_1.png');
const kirri_profile_2 = require('@assets/images/kirri_profile_2.png');
const kirri_profile_3 = require('@assets/images/kirri_profile_3.png');
const kirri_profile_4 = require('@assets/images/kirri_profile_4.png');


const _ImageList = [
    {
        id: 'elephant_1',
        url: kirri_profile_1
    },
    {
        id: 'elephant_2',
        url: kirri_profile_2
    },
    {
        id: 'elephant_3',
        url: kirri_profile_3
    },
    {
        id: 'elephant_4',
        url: kirri_profile_4
    }
]

interface Props {
    selecteChanged: (img: string)=>void,
    selectedImage?: string 
}



export const SelectProfileImage = ({selecteChanged, selectedImage}: Props): ReactElement => {
    const ImageList = React.useRef(_ImageList);
    const [selected, setSelected] = React.useState(selectedImage?ImageList.current.find(img=>img.id===selectedImage):ImageList.current[0]);
    
    
    return (
        <>
            <Warp>
                <SelectedImageContainer>
                    <SelectedImage
                        source={selected?.url}
                    />
                </SelectedImageContainer>
                
            </Warp>
            <Warp>
                <ImageLisContainer>
                    {   
                        ImageList.current.map((image)=>
                            <ImageWapper
                                key={image.id}
                            >
                                <Images
                                    source={image.url}
                                />
                            </ImageWapper>
                        )
                    }
                </ImageLisContainer>
            </Warp>
            
        </>
    )
}