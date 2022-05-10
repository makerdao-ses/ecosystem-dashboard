/* eslint-disable */
import styled from '@emotion/styled';
import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
// import './ItemMenu.scss';


interface Props {
    title: string;
    href: string;
    icon?: JSX.Element;
    onClick?: () => void;
}

const ItemMenu = ({ title, href, onClick, icon }: Props) => {
    return (
        <ListItemButton onClick={onClick}>
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

const TitleIcon=styled(ListItemText)`
   white-space: normal; 
`;

export default ItemMenu;