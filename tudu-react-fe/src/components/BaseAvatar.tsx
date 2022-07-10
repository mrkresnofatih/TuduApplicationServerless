import Avatar from 'boring-avatars'
import React from 'react'

interface Props {
    username: string,
    fullName: string,
    size: number
}

const BaseAvatar = (props: Props) => {
    const avatarName: string = getAvatarName(props.username);
    const avatarVariant = "beam";
    const avatarColor: string[] = getColorPallete(props.fullName);
  return (
    <Avatar
        size={props.size}
        name={avatarName}
        variant={avatarVariant}
        colors={avatarColor}
    />
  )
}

export default BaseAvatar

const getAvatarName = (username: string): string => {
    const num : number = username.length % 7;
    switch (num) {
        case 1:
            return "Mary Baker"
        case 2:
            return "Margaret Brent"
        case 3:
            return "Maya Angelou"
        case 4:
            return "Fabiola Cabeza"
        case 5:
            return "Sally Ride"
        case 6:
            return "Phillis Wheatley"
        default:
            return "Emma Lazarus"
    }
}

const getColorPallete = (fullName: string): string[] => {
    const num : number = fullName.length % 5;
    switch (num) {
        case 1:
            return ["#FFAD08", "#EDD75A", "#73B06F", "#0C8F8F", "#405059"];
        case 2:
            return ["#001F21", "#029B99", "#EBE7B7", "#DE4F15", "#ECC039"];
        case 3:
            return ["#E7EDEA", "#FFC52C", "#FB0C06", "#030D4F", "#CEECEF"];
        case 4:
            return ["#00686C", "#32C2B9", "#EDECB3", "#FAD928", "#FF9915"];
        default:
            return ["#AFFBFF", "#D2FDFE", "#FEFAC2", "#FEBF97", "#FE6960"];
    }
}