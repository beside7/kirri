import React, { ReactElement, useEffect } from 'react';
import {Image} from 'react-native';
import { SelectedImage,ProfileImageContainer, SelectedWarp, ProfileImageWarp, ImageLisContainer, Images, SelectedImageContainer, ImageWapper, SelectedCheck } from './nickname.style';
import {ProfileImageTypes, ProfileImages} from '@utils';

const SelecedCheckImage = require('@assets/images/diary/writing_select_diary_check_box_checked.png');

interface Props {
    selecteChanged: (img: ProfileImageTypes)=>void,
    selectedImage?: string
}



export const SelectProfileImage = ({selecteChanged, selectedImage}: Props): ReactElement => {
    
    const [selected, setSelected] = React.useState<ProfileImageTypes>(selectedImage as ProfileImageTypes);
    
    return (
        <ProfileImageContainer
        >
            <SelectedWarp>
                <SelectedImageContainer>
                    <SelectedImage
                        source={ProfileImages[selected]}
                    />
                </SelectedImageContainer>
                
            </SelectedWarp>
            <ProfileImageWarp>
                <ImageLisContainer>
                    {   
                        Object.keys(ProfileImages).map((key, index)=>
                            <ImageWapper
                                key={'profile_image_'+index}
                                onPress={()=>{
                                        setSelected(key as ProfileImageTypes); 
                                        selecteChanged(key as ProfileImageTypes);
                                    }
                                }
                            >
                                <Images
                                    source={ProfileImages[key as ProfileImageTypes]}
                                />
                                {key===selected ? <SelectedCheck><Image source={SelecedCheckImage} /></SelectedCheck> : <></>}
                            </ImageWapper>
                        )
                    }
                </ImageLisContainer>
            </ProfileImageWarp>
            
        </ProfileImageContainer>
    )
}