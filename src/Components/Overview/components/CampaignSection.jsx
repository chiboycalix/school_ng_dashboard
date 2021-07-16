import React from 'react'
import { Like, Regist, SearchIcon, Comment } from '../../../assest/icons'
import { ProfileImage } from '../../../assest/images'
import { Table, Avatar, Timeline, Dropdown, Menu, Select } from 'antd';
import { SearchOutlined, UnorderedListOutlined } from '@ant-design/icons'
import { Option } from 'antd/lib/mentions';
import SearchComponent from '../../SearchComponent';
const CustomDot = ({ background, color }) => {
    return <div style={{ background }} className="custom_timeline_dot"><div style={{ background: color }} /></div>
}
const MenuOverlay = (onClick) => (
    <Menu style={{ padding: 10, boxShadow: "0px 3px 6px #00000029", borderRadius: 5 }}>
        <Menu.Item style={{ padding: 10 }} key="student ambassador" onClick={onClick}>
            Student Ambassador
        </Menu.Item>
        <Menu.Item style={{ padding: 10 }} key="pages" onClick={onClick}>
            Pages
        </Menu.Item>
        <Menu.Item style={{ padding: 10 }} key="materials" onClick={onClick}>
            Materials
        </Menu.Item>
    </Menu>
);
export const StudentAmbassador = ({ onSelectHeader, headerValue, columns, data }) =>
    <div className="student_ambassador__section">
        <div className="header__section">
            <div className="hamburger_container">
                <Dropdown placement="bottomCenter" overlay={() => MenuOverlay(onSelectHeader)}>
                    <div>
                        <div className="hamburger-dotted-menu"></div>
                        <div className="hamburger-dotted-menu"></div>
                        <div className="hamburger-dotted-menu"></div>
                    </div>
                </Dropdown>
                <span className="text-capitalize p-2">{headerValue}</span>
            </div>
            <SearchComponent select placeholder="Select School type" options={[]} onChange={value => console.log(value)} />
        </div>

        <Table scroll={{ y: 300 }} pagination={false} columns={columns} dataSource={data} />
    </div>


export const GistSection = () => {
    return <div className="gist__section">
        <Timeline >
            <Timeline.Item className="timeline-header" dot={<UnorderedListOutlined className="timeline-header-icon" />} color="#031A2F">
                <h4>Most Engaging Gist</h4>
            </Timeline.Item>
            <Timeline.Item
                dot={<CustomDot background="#7367F01F" color="#7367F0" />}
            >
                <div className="timeline_content">
                    <div className="timeline_header">
                        whatismunadoing
                    </div>
                    <div className="timeline_body">
                        The rate of insercuirt in the Owerri is alarming and government is not doing..
                    </div>
                    <div className="timeline_images">
                        <div className="timeline_image">
                            <img src={ProfileImage} alt="profile" />
                        </div>
                        <div className="timeline_image">
                            <img src={ProfileImage} alt="profile" />
                        </div>
                        <div className="timeline_image">
                            <img src={ProfileImage} alt="profile" />
                        </div>
                        <div className="timeline_image">
                            <img src={ProfileImage} alt="profile" />
                        </div>
                        <div className="timeline_image">
                            <img src={ProfileImage} alt="profile" />
                        </div>
                    </div>
                </div>
            </Timeline.Item>
            <Timeline.Item
                dot={<CustomDot background="#FF9F431F" color="#FF9F43" />}
            >
                <div className="timeline_content">
                    <div className="timeline_header">
                        Chivic
                    </div>
                    <div className="timeline_body">
                        There’s a material available for people that want to learn makeup check my…
                    </div>
                    <div className="timeline_images">
                        <div className="timeline_image">
                            <img src={ProfileImage} alt="profile" />
                        </div>
                        <div className="timeline_image">
                            <img src={ProfileImage} alt="profile" />
                        </div>
                        <div className="timeline_image">
                            <img src={ProfileImage} alt="profile" />
                        </div>
                        <div className="timeline_image">
                            <img src={ProfileImage} alt="profile" />
                        </div>
                        <div className="timeline_image">
                            <img src={ProfileImage} alt="profile" />
                        </div>
                    </div>
                </div>
            </Timeline.Item>
            <Timeline.Item
                dot={<CustomDot background="#D6F5FC" color="#00CFE8" />}
            >
                <div className="timeline_content">
                    <div className="timeline_header">
                        Titi
                    </div>
                    <div className="timeline_body">
                        Who’s Interested in giveaway
                    </div>
                    <div className="timeline_images">
                        <div className="timeline_image">
                            <img src={ProfileImage} alt="profile" />
                        </div>
                        <div className="timeline_image">
                            <img src={ProfileImage} alt="profile" />
                        </div>
                        <div className="timeline_image">
                            <img src={ProfileImage} alt="profile" />
                        </div>
                        <div className="timeline_image">
                            <img src={ProfileImage} alt="profile" />
                        </div>
                        <div className="timeline_image">
                            <img src={ProfileImage} alt="profile" />
                        </div>
                    </div>
                </div>

            </Timeline.Item>
            <Timeline.Item
                dot={<CustomDot background="#FCE4DE" color="#EB5933" />}
            >
                <div className="timeline_content">
                    <div className="timeline_header">
                        Chivic
                    </div>
                    <div className="timeline_body">
                        There’s a material available for people that want to learn makeup check my…
                    </div>
                    <div className="timeline_images">
                        <div className="timeline_image">
                            <img src={ProfileImage} alt="profile" />
                        </div>
                        <div className="timeline_image">
                            <img src={ProfileImage} alt="profile" />
                        </div>
                        <div className="timeline_image">
                            <img src={ProfileImage} alt="profile" />
                        </div>
                        <div className="timeline_image">
                            <img src={ProfileImage} alt="profile" />
                        </div>
                        <div className="timeline_image">
                            <img src={ProfileImage} alt="profile" />
                        </div>
                    </div>
                </div>

            </Timeline.Item>
        </Timeline>
    </div>
}
