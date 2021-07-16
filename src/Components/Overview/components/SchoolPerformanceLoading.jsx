import React from 'react'
import { Skeleton } from 'antd'
import { BlackTrendIcon, RedTrendIcon } from '../../../assest/icons'

const SchoolPerformanceLoading = ({ children, loading }) => {
    return (
        <div className="school_performance__section">
            <div className="performance_header">
                <h4>School <span className="d-none d-md-inline">Performance</span></h4>
                <div className="performance_header__right">
                    <div className="content">
                        <img src={BlackTrendIcon} alt="search-icon" /> Users
                    </div>
                    <div className="content gist">
                        <img src={RedTrendIcon} alt="gist-icon" /> Gists
                    </div>
                    <div className="content">
                        <div className="hamburger_container">
                            <div>
                                <div className="hamburger-dotted-menu"></div>
                                <div className="hamburger-dotted-menu"></div>
                                <div className="hamburger-dotted-menu"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Skeleton active={true} loading={loading} paragraph={{ rows: 8 }}>
                {children}
            </Skeleton>
        </div>
    )
}

export default SchoolPerformanceLoading
