import PropTypes from "prop-types";
import React from 'react'

const OverviewCard = ({ icon, value, label }) => {
    return (
        <div className="overview_cards__section_overview_card pointer">
            <div className="overview_cards__section_overview_card_heading_text">
                {label}
            </div>
            <div className="overview_cards__section_overview_card_overview_content">
                <img src={icon} alt="" />
                <span>{value}</span>
            </div>
        </div>
    )
}

OverviewCard.propTypes = {
    icon: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.number
}

export default OverviewCard
