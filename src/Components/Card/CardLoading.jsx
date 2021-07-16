import PropTypes from "prop-types";
import { Skeleton } from 'antd'
import React from 'react'
import './card.scss'

const CardLoading = ({ loading, children, loops }) => (
    <>
        <Skeleton paragraph={{ rows: 2 }} className="custom_card_container_item" loading={loading} active={true}>
            {children}
        </Skeleton>
        {Array.apply(null, Array(loops)).map(value => <Skeleton key={value} paragraph={{ rows: 2 }} className="custom_card_container_item" loading={loading} active={true} />)}
    </>
)

CardLoading.propTypes = {
    children: PropTypes.node,
    loading: PropTypes.bool,
    loops: PropTypes.number,
}

CardLoading.defaultProps = {
    loading: false,
    children: <div></div>,
    loops: 0
}

export default CardLoading
