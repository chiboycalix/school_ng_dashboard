import { Popover, Table } from 'antd';
import Avatar from "antd/lib/avatar/avatar";
import React, { useEffect, useState } from "react";
import { Doughnut, Line } from 'react-chartjs-2';
import { Comment, GistsIcon, GroupsIcon, Like, MaterialsIcon, PagesIcon, Regist, SchoolsIcon, UsersIcon } from "../../assest/icons";
import { ProfileImage } from "../../assest/images";
import fire, { firestore } from "../../Firebase/firebase";
import BaseMarkUp from "../Base/BaseMarkUp";
import Card from "../Card";
import CardLoading from "../Card/CardLoading";
import SearchComponent from "../SearchComponent";
import { GistSection, StudentAmbassador } from "./components/CampaignSection";
import CampaignSectionLoading from "./components/CampaignSectionLoading";
import SchoolPerformance from "./components/SchoolPerformance";
import SchoolPerformanceLoading from "./components/SchoolPerformanceLoading";
import "./overview.scss";


const menu = (schools, onChange) => {
    return (
        <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: "row"
        }}>
            <SearchComponent select placeholder="Search to Select" options={schools} onChange={onChange} />
        </div >
    )
}

const PopoverTitle = (onClick) => (
    <div>
        Institution
        <span onClick={onClick}>X</span>
    </div>
)

const topTrends = (trends) => {
    const top = trends.sort((a, b) => b.count - a.count).slice(0, 3);
    const labels = top.map(value => value.trend)
    const data = top.map(value => value.count)

    return { labels, data }
}

const Overview = () => {
    const [users, setUsers] = useState({ data: [], count: 0, })
    const [groups, setGroups] = useState({ data: [], count: 0, })
    const [pages, setPages] = useState({ data: [], count: 0, })
    const [schools, setSchools] = useState({ data: [], count: 0, trendLabels: [], users: [], gists: [], labels: [], countArray: [] })
    const [materials, setMaterials] = useState({ data: [], count: 0, })
    const [gists, setGists] = useState({ data: [], count: 0, })
    const [issues, setIssues] = useState([])
    const [loading, setLoading] = useState(false)
    const [campaign, setCampaign] = useState([]);
    const [trends, setTrends] = useState({ displayingTrend: { labels: [], data: [] }, data: [], schools: [] });
    const [campaignHeader, setCampaignHeader] = useState("pages")
    const [popoverVisible, setPopoverVisible] = useState(false)


    const data = {
        labels: schools.trendLabels,
        datasets: [
            {
                data: schools.users,
                backgroundColor: '#031A2F',
                border: "1px solid black",
            },
            {
                data: schools.gists,
                backgroundColor: '#EB5933',
                border: "1px solid black",
            },
        ],
    };

    const doughnutData = {
        labels: schools.trendLabels,
        datasets: [
            {
                data: schools.users,
                backgroundColor: [
                    '#FF955B',
                    '#9ACEFF',
                    '#F7D490',
                    '#E79798',
                    '#3DD1BA',
                    '#D06EE1',
                ],
                borderColor: [
                    '#FF955B',
                    '#9ACEFF',
                    '#F7D490',
                    '#E79798',
                    '#3DD1BA',
                    '#D06EE1',
                ],
                borderWidth: 1,
            },
        ],
        number: schools.count,
        text: "Total"
    };

    const doughnutDataOptions = {
        legend: {
            position: "left",
            align: "center",
            maxHeight: 10,
            display: false
        },
        layout: {
            padding: {
                top: 0,
                left: 0,
                right: 0,
                bottom: 0
            }
        },
    }
    const plugins = [{
        beforeDraw: function (chart) {
            var width = chart.width,
                height = chart.height,
                ctx = chart.ctx;
            ctx.restore();
            var fontSize = (height / 300).toFixed(2);
            ctx.font = fontSize + "em sans-serif";
            ctx.textBaseline = "middle";
            var total = chart.config.data.text;
            var totalX = Math.round((width - ctx.measureText(total).width) / 2);
            var totalY = height / 2.5;
            ctx.fillStyle = "#031A2F";
            ctx.fillText(total, totalX, totalY);
            ctx.save();

            fontSize = (height / 120).toFixed(2);
            ctx.font = fontSize + "em sans-serif";
            ctx.textBaseline = "middle";
            var number = chart.config.data.number;
            var numberX = Math.round((width - ctx.measureText(number).width) / 2);

            var numberY = height / 2;
            ctx.fillStyle = "#031A2F";
            ctx.fillText(number, numberX, numberY);
            ctx.save();
        }
    }]

    const options = {
        responsive: true,
        legend: {
            display: false
        },
        scales: {
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true,
                    },
                    gridLines: {
                        color: "#CAD6F2"
                    }
                },
            ],
            xAxes: [{
                barThickness: 6,
                gridLines: {
                    drawOnChartArea: false, // only want the grid lines for one axis to show up
                }
            }]
        },
    };

    const campaignTable = {
        pages: {
            columns: [
                {
                    title: 'Page Name',
                    dataIndex: 'pageName',
                    key: 'pageName',
                    width: 200
                },
                {
                    title: 'Owner',
                    dataIndex: 'owner',
                    key: 'owner',
                    width: 100
                },
                {
                    title: 'Schools',
                    dataIndex: 'schools',
                    key: 'schools',
                    width: 100
                },
                {
                    title: 'Price',
                    dataIndex: 'price',
                    key: 'price',
                    width: 100
                },
                {
                    title: 'Plan',
                    dataIndex: 'plan',
                    key: 'plan',
                    width: 100
                },
                {
                    title: 'Duration',
                    dataIndex: 'duration',
                    key: 'duration',
                    width: 100
                },
                {
                    title: 'Status',
                    dataIndex: 'status',
                    key: 'status',
                    render: (status) => <span className={`${status ? 'online' : 'offline'}`}>{status ? "Active" : "De-Activated"}</span>,
                    width: 100
                },
            ],
            data: campaign
        },
        "student ambassador": {
            columns: [
                {
                    title: 'Name',
                    dataIndex: 'name',
                    key: 'name',
                    render: (name, { imageUrl }) => (
                        <>
                            <Avatar src={imageUrl} size={30} />
                            <span>{name}</span>
                        </>
                    ),
                    width: 200
                },
                {
                    title: 'Likes',
                    dataIndex: 'likes',
                    key: 'likes',
                    render: (likes) => (
                        <div className="d-flex">
                            <img src={Like} alt="likes" />
                            <span className="icon_font_bold">{likes}</span>
                        </div>
                    ),
                    width: 100
                },
                {
                    title: 'Comment',
                    dataIndex: 'comments',
                    key: 'comments',
                    render: (comments) => (
                        <div className="d-flex">
                            <img src={Comment} alt="comments" />
                            <span className="icon_font_bold">{comments}</span>
                        </div>
                    ),
                    width: 100
                },
                {
                    title: 'Regist',
                    dataIndex: 'regist',
                    key: 'regist',
                    render: (regist) => (
                        <div className="d-flex">
                            <img src={Regist} alt="regist" />
                            <span className="icon_font_bold">{regist}</span>
                        </div>
                    ),
                    width: 100
                },
                {
                    title: 'Status',
                    dataIndex: 'status',
                    key: 'status',
                    render: (status) => <span className={status?.toLowerCase()}>{status}</span>,
                    width: 100
                },
            ],
            data: [
                {
                    name: "Arinze Ogbonna",
                    likes: 10,
                    comments: 10,
                    regist: 5,
                    status: "Online",
                    imageUrl: ProfileImage
                },
                {
                    name: "Arinze Ogbonna",
                    likes: 10,
                    comments: 10,
                    regist: 5,
                    status: "Online",
                    imageUrl: ProfileImage
                },
                {
                    name: "Arinze Ogbonna",
                    likes: 10,
                    comments: 10,
                    regist: 5,
                    status: "Online",
                    imageUrl: ProfileImage
                },
                {
                    name: "Arinze Ogbonna",
                    likes: 10,
                    comments: 10,
                    regist: 5,
                    status: "Online",
                    imageUrl: ProfileImage
                },
                {
                    name: "Arinze Ogbonna",
                    likes: 10,
                    comments: 10,
                    regist: 5,
                    status: "Online",
                    imageUrl: ProfileImage
                },
            ]
        },
        materials: {
            columns: [],
            data: materials.data
        }
    }


    useEffect(() => {

        const fetchData = async () => {
            setLoading(true);
            var userRef = fire.database().ref().child("Users")
            userRef.on('value', snap => {
                const user = snap.val();
                const userList = [];
                for (let m in user) {
                    userList.push(user[m]);
                }
                setUsers({ ...users, count: snap.numChildren(), data: userList });
            })
            var groupRef = fire.database().ref().child("Group")
            groupRef.on('value', snap => {
                // const group = snap.val();
                // const userList = [];
                // for (let m in user) {
                //     userList.push(user[m]);
                // }
                setGroups({ ...groups, count: snap.numChildren(), data: [] });
            })
            var trendsCountRef = await fire.database().ref().child("Trends Count")
            trendsCountRef.on('value', snap => {
                const trend = snap.val();
                const trends = [];
                const schools = [];
                for (let t in trend) {
                    schools.push(t)
                    trends.push({ trends: Object.keys(trend[t]).map(value => trend[t][value]), school: t })
                }
                let labels = [];
                let data = [];
                let school = "";
                if (trends.length) {
                    const firstTrend = trends[0]
                    const { data: dataReceived, labels: labelReceived } = topTrends(firstTrend.trends)
                    data = dataReceived;
                    labels = labelReceived;
                    school = firstTrend.school;
                }
                setTrends({ data: trends, schools, displayingTrend: { labels, data, school } })
            })
            var pageRef = fire.database().ref().child("Categories for page and group")
            pageRef.on('value', snap => {
                const page = snap.val();
                const pageList = [];
                for (let m in page) {
                    pageList.push(page[m]);
                }
                setPages({ ...pages, count: snap.numChildren(), data: pageList })
            })
            const schoolRef = fire.database().ref().child("Schools")
            let useSchools = []
            schoolRef.on('value', snap => {
                const school = snap.val();
                const schoolList = [],
                    trendLabels = [],
                    labels = [],
                    users = [],
                    gists = [];
                for (let m in school) {
                    useSchools.push(m)
                    schoolList.push(school[m]);
                    labels.push(m.match(/\b(\w)/g).join(''))
                    if (school[m].Gist) {
                        gists.push(school[m].Gist?.count)
                    }
                    if (school[m].Users) {
                        trendLabels.push(m.match(/\b(\w)/g).join(''))
                        users.push(Object.keys(school[m].Users).length)
                    }
                }
                setSchools({ ...schools, count: snap.numChildren(), data: schoolList, trendLabels, users, labels, gists })
            })

            const materialTotal = await firestore.collection("Materials").doc("Category").collection("General").get()
            const materialList = [];
            materialTotal.forEach(doc => {
                materialList.push(doc.data())
            });
            setMaterials({ ...materials, count: materialList.length, data: materialList })


            const allGist = await firestore.collection("All Gist").get()
            const gistTotal = []
            allGist.forEach(doc => {
                gistTotal.push(doc.data())
            })
            setGists({ ...gists, count: gistTotal.length, data: gistTotal })


            const campaignRef = await fire.database().ref().child("CAMPAIGN")
            campaignRef.on('value', snap => {
                const camp = snap.val();
                const campList = [];
                for (let m in camp) {
                    if (camp[m]?.status) {
                        campList.push({
                            pageName: camp[m]?.bizz?.name,
                            owner: camp[m]?.bizz?.user?.fullName,
                            schools: camp[m]?.schools?.length,
                            plan: camp[m]?.plan,
                            status: camp[m]?.status,
                            price: camp[m]?.price,
                            duration: camp[m]?.duration,
                        });
                    }
                }
                setCampaign(campList)
            })

            var issueRef = fire.database().ref().child("Users Issues")
            issueRef.on('value', snap => {
                const issue = snap.val();
                const issuesList = []
                for (let m in issue) {
                    issuesList.push(issue[m]);
                }
                setIssues(issuesList)
                setLoading(false);
            })
        }

        fetchData()
    }, [])

    const handleVisibleChange = visible => {
        setPopoverVisible(visible)
    }

    const onClosePopover = () => setPopoverVisible(false)

    const onTrendChange = (school) => {
        const trendToDisplay = trends.data.find(value => value.school === school);
        const { data, labels } = topTrends(trendToDisplay?.trends)
        setTrends({ ...trends, displayingTrend: { school, data, labels } })
        onClosePopover()
    }

    const appIssuesColumn = [
        {
            title: "ID",
            dataIndex: "userID",
            key: "userID",
            width: 200
        },
        {
            title: "Title",
            dataIndex: "title",
            key: "title",
            width: 100
        },
        {
            title: "Suggestion",
            dataIndex: "suggestion",
            key: "suggestion",
            width: 200
        },
        {
            title: "Date",
            dataIndex: "time",
            key: "time",
            width: 100,
            render: (time) => new Date(time).toDateString()
        },
    ]

    const lineData = {
        labels: trends.displayingTrend.labels,
        datasets: [
            {
                label: "Imo State",
                fill: false,
                pointRadius: 10,
                backgroundColor: "#031A2F",
                borderColor: "#EB5933",
                data: trends.displayingTrend.data
            },
        ]
    };
    const lineOptions = {
        // aspectRatio: 1,
        maintainAspectRatio: false,
        responsive: true,
        legend: {
            display: false
        },
        scales: {
            yAxes: [
                {
                    ticks: {
                        callback: function (label, index, labels) {
                            return label + '%';
                        }
                    },
                    gridLines: {
                        color: "#CAD6F2",
                        drawOnChartArea: false,
                    },
                },
            ],
            xAxes: [{
                barThickness: 6,
                gridLines: {
                    drawOnChartArea: false, // only want the grid lines for one axis to show up
                }
            }]
        },
    }

    const onSelectStudentAmbassadorHeader = ({ key }) => setCampaignHeader(key)
    return (
        <BaseMarkUp>
            <div className="overview-page">
                <div className="overview_cards__section">
                    <CardLoading loading={loading} loops={5}>
                        <Card link="/users" label="Total Users" icon={UsersIcon} value={users.count} />
                        <Card link="/schools" label="Number of schools" icon={SchoolsIcon} value={schools.count} />
                        <Card link="/gists" label="Total Gist" icon={GistsIcon} value={gists.count} />
                        <Card link="/pages" label="Total Page" icon={PagesIcon} value={pages.count} />
                        <Card link="/materials" label="Material Resources" icon={MaterialsIcon} value={materials.count} />
                        <Card link="/groups" label="Total Groups" icon={GroupsIcon} value={groups.count} />
                    </CardLoading>
                </div>
                <div className="overview_campaign__section">
                    <h3>Campaign</h3>
                    <CampaignSectionLoading
                        className1="student_ambassador__section p-3"
                        className2="gist__section"
                        containerClassName="overview_campaign__cards___section"
                        loading={loading}
                    >
                        <StudentAmbassador
                            columns={campaignTable[campaignHeader].columns}
                            data={campaignTable[campaignHeader].data}
                            headerValue={campaignHeader}
                            onSelectHeader={onSelectStudentAmbassadorHeader}
                        />
                        <GistSection />
                    </CampaignSectionLoading>
                </div>

                <SchoolPerformanceLoading loading={loading}>
                    <SchoolPerformance data={data} options={options} />
                </SchoolPerformanceLoading>

                <div className="schools_section">
                    <CampaignSectionLoading
                        containerClassName="schools_section__cards"
                        className1="doughnut_section p-3"
                        className2="trend_section"
                        loading={loading}
                    >

                        <div className="doughnut_section">
                            <div className="heading_section">
                                <h3>Schools</h3>
                                <SearchComponent select placeholder="Select School type" options={[]} onChange={value => console.log(value)} />
                            </div>
                            <div className="doughnut">
                                <Doughnut plugins={plugins} options={doughnutDataOptions} data={doughnutData} />
                            </div>
                            <div className="pills">
                                {schools.trendLabels.map(value => <div>
                                    <div style={{ background: "#FF955B" }} className="mr-1" /> {value}
                                </div>)}
                            </div>
                        </div>

                        <div className="trend_section">
                            <div className="heading_section">
                                <h6>Top 3 Trends in {trends.displayingTrend.school}</h6>
                                <div className="content">
                                    <div className="hamburger_container">
                                        <Popover onVisibleChange={handleVisibleChange} visible={popoverVisible} placement="left" title={() => PopoverTitle(onClosePopover)} content={() => menu(trends.schools, onTrendChange)} trigger="click">
                                            <div>
                                                <div className="hamburger-dotted-menu"></div>
                                                <div className="hamburger-dotted-menu"></div>
                                                <div className="hamburger-dotted-menu"></div>
                                            </div>
                                        </Popover>
                                    </div>
                                </div>
                            </div>
                            <hr />
                            <div className="line_graph">
                                <Line redraw={true} data={lineData} options={lineOptions} />
                            </div>

                            <div className="social_stats">
                                <div className="social_content">
                                    <img src={Like} alt="likes" /> <span>110 Likes</span>
                                </div>
                                <div className="social_content">
                                    <img src={Comment} alt="comments" /> <span>50 Comments</span>
                                </div>
                                <div className="social_content">
                                    <img src={Regist} alt="regist" /> <span>04 Regist</span>
                                </div>
                            </div>
                        </div>
                    </CampaignSectionLoading>
                </div>

                <div className="app_issues_section">
                    <h3>App Issues</h3>
                    <div className="app_issues_table">
                        <Table columns={appIssuesColumn} loading={loading} dataSource={issues} scroll={{ y: 500 }} pagination={false} />
                    </div>
                </div>
            </div>
        </BaseMarkUp>
    )
}

export default Overview