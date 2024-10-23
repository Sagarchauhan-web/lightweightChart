import React from 'react';
import { FaBars } from 'react-icons/fa';

const HamburgerIcon = () => {
    return (
        <div style={{ cursor: 'pointer', fontSize: '2rem' }}>
            <FaBars />
        </div>
    );
};

export default HamburgerIcon;
