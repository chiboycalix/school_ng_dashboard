import PropTypes from "prop-types";
import { Skeleton } from 'antd'
import React from 'react'

const OverviewCardLoading = ({ loading, children }) => {
    return (
        <>
            <Skeleton paragraph={{ rows: 2 }} className="overview_cards__section_overview_card" loading={loading} active={true}>
                {children}
            </Skeleton>
            <Skeleton paragraph={{ rows: 2 }} className="overview_cards__section_overview_card" loading={loading} active={true} />
            <Skeleton paragraph={{ rows: 2 }} className="overview_cards__section_overview_card" loading={loading} active={true} />
            <Skeleton paragraph={{ rows: 2 }} className="overview_cards__section_overview_card" loading={loading} active={true} />
            <Skeleton paragraph={{ rows: 2 }} className="overview_cards__section_overview_card" loading={loading} active={true} />
            <Skeleton paragraph={{ rows: 2 }} className="overview_cards__section_overview_card" loading={loading} active={true} />
        </>
    )
}

OverviewCardLoading.propTypes = {
    children: PropTypes.node,
    loading: PropTypes.bool
}

OverviewCardLoading.defaultProps = {
    loading: false,
    children: <div></div>
}

export default OverviewCardLoading
