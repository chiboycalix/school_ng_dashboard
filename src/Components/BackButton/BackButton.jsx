import PropTypes from "prop-types";
import { LeftOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import React from 'react'
import "./BackButton.scss"

const BackButton = ({ back }) => {
    return (
        <Button onClick={() => back()} className="back-button" type="link">
            <LeftOutlined />
            Back
        </Button>
    )
}

BackButton.propTypes = {
    back: PropTypes.func
}
BackButton.defaultProps = {
    back: () => { }
}

export default BackButton
