import React from 'react'
import PropTypes from "prop-types";
import './card.scss'
import { Link } from 'react-router-dom';

const Card = ({ label, icon, value, link }) => {
    return (

        <div className="custom_card_container_item">
            <Link to={link}>
                <div className="custom_card_container_item_heading_text">
                    {label}
                </div>
                <div className="custom_card_container_item_content">
                    <img src={icon} alt="" />
                    <span>{value}</span>
                </div>
            </Link>
        </div>

    )
}

Card.propTypes = {
    icon: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.number,
    link: PropTypes.string,
}

export default Card
