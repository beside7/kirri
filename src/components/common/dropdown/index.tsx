import React, {forwardRef, useImperativeHandle, useState, useEffect} from 'react';
import DropDownPicker, {ItemType} from 'react-native-dropdown-picker';
import {Container, SelectedItemText, SelectedItemIcon} from './dropdown.style';

interface Props {
    items: ItemType[],
    onChangeValue: (value: any) => void,
    value: any
}

export const Dropdown = ({items, onChangeValue, value}:Props)  => {
    const [selectedItem, setSelectedItem] = useState(value);
    const [open, setOpen] = useState(false);
    const [itemList, setItemList] = useState(items);


    return (
        <DropDownPicker
            items={itemList}
            setItems={setItemList}
            open={open}
            setOpen={setOpen}
            value={selectedItem}
            setValue={(val) =>{ setSelectedItem(val)}}
            onChangeValue={(value) => {
               onChangeValue(value); 
            }}
            textStyle={{
                fontSize: 14,
                borderWidth:0,
                height: 18
                }}
            labelStyle={{
                fontSize: 14,
                borderWidth:0,
                height: 18
                }}
            containerStyle={{
                height: 18,
                borderWidth: 0,
                zIndex: 100
            }}
            style={{
                borderWidth: 0,
                height: 18,
                width: 100
            }}
            dropDownContainerStyle={{
                borderWidth: 0,
                paddingTop: 5
                }}
            listItemContainerStyle={{
                height: 25
                }}
        /> 

    )
}