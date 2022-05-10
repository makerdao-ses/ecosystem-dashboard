/* eslint-disable */
import React from 'react';
import styled from '@emotion/styled';
import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';


interface Props {
    title: string;
    id: string;
    icon?: JSX.Element;
    onClick?: () => void;
}

const ItemMenu = ({ title, id, onClick, icon }: Props) => {
    return (
        <ListItemButton onClick={onClick} id={id}>
            <CustomListItemIcon>
                {icon}
            </CustomListItemIcon>
            <TitleIcon primary={title} />
        </ListItemButton>
    );
};


const CustomListItemIcon = styled(ListItemIcon)({
    minWidth: '24px',
    marginRight: '10px',
    marginLeft: '16px',
});

const TitleIcon = styled(ListItemText)`
   white-space: normal;
`;

export default ItemMenu;