import React from 'react'
import { Skeleton } from 'antd'
import PropTypes from "prop-types";

const CampaignSectionLoading = ({ children, loading, className1, className2, containerClassName }) => {
    return (
        <div className={containerClassName}>
            <Skeleton paragraph={{ rows: 6 }} className={className1} loading={loading} active={true}>
                {children[0]}
            </Skeleton>
            <Skeleton paragraph={{ rows: 6 }} className={className2} loading={loading} active={true}>
                {children[1]}
            </Skeleton>
        </div>
    )
}
CampaignSectionLoading.propTypes = {
    children: PropTypes.node,
    loading: PropTypes.bool
}

CampaignSectionLoading.defaultProps = {
    loading: false,
    children: <div></div>
}

export default CampaignSectionLoading
