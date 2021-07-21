import React, { ReactElement, useEffect } from 'react';
import {Image} from 'react-native';
import { SelectedImage, Warp, ImageLisContainer, Images, SelectedImageContainer, ImageWapper, SelectedCheck } from './nickname.style';
import {ProfileImageTypes, ProfileImages} from '@utils';

const SelecedCheckImage = require('@assets/images/diary/writing_select_diary_check_box_checked.png');

interface Props {
    selecteChanged: (img: ProfileImageTypes)=>void,
    selectedImage?: string 
}



export const SelectProfileImage = ({selecteChanged, selectedImage}: Props): ReactElement => {
    
    const [selected, setSelected] = React.useState<ProfileImageTypes>('01');
    
    useEffect(()=>{
        selecteChanged(selected)
    },[selected]);
    
    return (
        <>
            <Warp>
                <SelectedImageContainer>
                    <SelectedImage
                        source={ProfileImages[selected]}
                    />
                </SelectedImageContainer>
                
            </Warp>
            <Warp>
                <ImageLisContainer>
                    {   
                        Object.keys(ProfileImages).map((key, index)=>
                            <ImageWapper
                                key={'profile_image_'+index}
                                onPress={()=>{setSelected(key as ProfileImageTypes)}}
                            >
                                <Images
                                    source={ProfileImages[key as ProfileImageTypes]}
                                />
                                {key===selected ? <SelectedCheck><Image source={SelecedCheckImage} /></SelectedCheck> : <></>}
                            </ImageWapper>
                        )
                    }
                </ImageLisContainer>
            </Warp>
            
        </>
    )
}