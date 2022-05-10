/* eslint-disable */
import React from 'react';
import { Link } from 'react-router-dom';
// import './ItemMenu.scss';


interface Props {
    title: string;
    href: string;
    beforeLevel?: number;
    onClick?: () => void;
}

const ItemMenu = ({ title, href, onClick, beforeLevel }: Props) => {
    return (
        <li className='itemList' onClick={onClick}>
            <div className='square' />
            <Link to={href}>{title}</Link>
        </li>
    );
};

export default ItemMenu;