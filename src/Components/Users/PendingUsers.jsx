import { Button, Dropdown, Menu, Table } from "antd";
import React, { useEffect, useState } from 'react'
import { EmailIconRed, PendingUsersIcon, SortIconBlack, UsersIcon } from '../../assest/icons'
import fire from "../../Firebase/firebase"
import BaseMarkUp from '../Base/BaseMarkUp'
import Card from '../Card'
import CardLoading from '../Card/CardLoading'
import "./users.scss"
import SearchComponent, { OnSearch } from '../SearchComponent';
import BackButton from "../BackButton/BackButton";
import { useHistory } from "react-router";

const MenuOverlay = (onClick) => (
    <Menu style={{ boxShadow: "0px 3px 6px #00000029", borderRadius: 5, width: 88 }}>
        <Menu.Item disabled={true} style={{ color: "#FFF", background: "#031A2F" }} key="1" onClick={onClick}>
            Sort  by
        </Menu.Item>
        <Menu.Item style={{ padding: 10 }} key="earliest" onClick={onClick}>
            Earliest
        </Menu.Item>
        <Menu.Item style={{ padding: 10 }} key="oldest" onClick={onClick}>
            Oldest
        </Menu.Item>
    </Menu>
);




const PendingUsers = () => {
    const [active, setActive] = useState(0)
    const [loading, setLoading] = useState(false)
    const [pending, setPending] = useState({ users: [], search: [] })
    
    const { goBack } = useHistory()

    useEffect(() => {

        const fetchData = async () => {
            setLoading(true)
            var userRef = await fire.database().ref().child("Users")
            userRef.on('value', snap => {
                const user = snap.val();
                const online = []
                for (let m in user) {
                    if (user[m]["Online status"]?.online) {
                        online.push(user[m])
                    }
                }
                setActive(online.length)
            })
            const pendingRef = await fire.database().ref().child("Pending Validation")
            pendingRef.on("value", snap => {
                const value = snap.val()
                const users = []
                for (let user in value) {
                    users.push({
                        id: user,
                        ...value[user]
                    })
                }
                users.sort((a, b) => new Date(a?.dateJoined) - new Date(b?.dateJoined))
                setPending({ users, search: users })
                setLoading(false)
            })
        }

        fetchData()

    }, [])

    const userColumn = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
            width: 100
        },
        {
            title: "Username",
            dataIndex: "Username",
            key: "username",
            width: 100
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
            width: 100
        },
        {
            title: "Action",
            dataIndex: "email",
            key: "id",
            width: 100,
            render: (email) => <a href={`mailto: ${email}`} type="link" className="action_button_email">
                <img src={EmailIconRed} alt="send-email" /> Send Email
            </a>
        },
    ]

    const onSearchChange = (searchTerm) => setPending({ ...pending, search: OnSearch(searchTerm, "Username", pending.users) })
    const onSelectHeader = (value) => {
        if (value.key === "earliest") {
            const search = pending.users.sort((a, b) => new Date(a?.dateJoined) - new Date(b?.dateJoined));
            setPending({ ...pending, search, users: search })
            return
        }

        const search = pending.users.sort((a, b) => new Date(b?.dateJoined) - new Date(a?.dateJoined));
        setPending({ ...pending, search, users: search })
    }
    return (
        <BaseMarkUp>
            <div className="user-page">

                <BackButton back={goBack} />
                <div className="user-page-heading">
                    <div className="cards_area">
                        <CardLoading loading={loading} loops={1}>
                            <Card link="/users/pending" label="Active Total Users" icon={UsersIcon} value={active} />
                            <Card link="/users/pending" label="Total Pending Users" icon={PendingUsersIcon} value={pending.users.length} />
                        </CardLoading>
                    </div>
                    <div className="sort_area">
                        <Dropdown placement="bottomCenter" overlay={() => MenuOverlay(onSelectHeader)}>
                            <Button className="icon_section" type="link">
                                <img src={SortIconBlack} alt="sort-icon" /> Sort
                            </Button>
                        </Dropdown>
                        <SearchComponent search placeholder="Search by user name" onChange={onSearchChange} />
                    </div>
                </div>

                <Table columns={userColumn} loading={loading} dataSource={pending.search} scroll={{ y: 500 }} pagination={false} />
            </div>
        </BaseMarkUp>
    )
}

export default PendingUsers
