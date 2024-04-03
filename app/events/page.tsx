'use client'

// pages/events.js
import { Container, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward'
import Timeline from '@material-ui/lab/Timeline'
import TimelineConnector from '@material-ui/lab/TimelineConnector'
import TimelineContent from '@material-ui/lab/TimelineContent'
import TimelineDot from '@material-ui/lab/TimelineDot'
import TimelineItem from '@material-ui/lab/TimelineItem'
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent'
import TimelineSeparator from '@material-ui/lab/TimelineSeparator'
import Link from 'next/link'
import { useMediaQuery } from 'react-responsive'
// import '../css/events.css';

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: '6px 16px',
    },
    secondaryTail: {
        backgroundColor: theme.palette.secondary.main,
    },
    date: {
        margin: '5px',
        color: 'white',
        fontSize: '1rem',
    },
    content: {
        margin: '5px',
    },
}))

function Events() {
    const data = [
        { month: 'February', event_name: 'Incito Ideathon', key: 'incito' },
        {
            month: 'March-April',
            event_name: 'Summer Internship Recruitment',
            key: 'recruitment',
        },
        {
            month: 'June-July',
            event_name: 'Summer Internship',
            key: 'internship',
        },
        { month: 'August', event_name: 'RoadShow', key: 'roadshow' },
        {
            month: 'October/November',
            event_name: '#Code Hackathon',
            key: 'hashcode',
        },
    ]

    const classes = useStyles()
    const isDesktop = useMediaQuery({
        query: '(min-device-width: 545px)',
    })

    const timelineContent = {
        incito: {
            text: (
                <div className="eventSection">
                    <div className="eventSectionText">
                        <Link className="eventPageLink" href={`/incito`}>
                            <Typography className="eventHeading">
                                Incito
                            </Typography>
                        </Link>
                        <Typography className="eventText">
                            Incito is the ideathon organized by PES Lab. It is a
                            conglomerate of brilliant minds, all incubating
                            innovative ideas. The shortlisted 10 best ideas
                            battle it out in the final round to win cash prizes
                            up to Rs. 40,000 in all. The participants test the
                            design and feasibility of their ideas without the
                            constraints of implementing the same, hence
                            encouraging innovative thinking. The best ideas are
                            also provided the platform and resources to
                            implement their ideas and make these a reality.
                        </Typography>
                    </div>
                </div>
            ),
            image: (
                <div className="eventSectionImage">
                    <img src={`/images/mlab/ideathon.png`} />
                </div>
            ),
        },
        recruitment: {
            text: (
                <div className="eventSection">
                    <div className="eventSectionText">
                        <Link className="eventPageLink" href={`/join_us`}>
                            <Typography className="eventHeading">
                                Summer Internship Recruitment
                            </Typography>
                        </Link>
                        <Typography className="eventText">
                            Every year, we look for enthusiastic and
                            passion-driven people to become a part of our
                            community. To find those among you who are a good
                            fit, we conduct an aptitude challenge and give you
                            an opportunity to show us how passionate you are
                            about engineering and building solutions to
                            real-world problems.
                        </Typography>
                    </div>
                </div>
            ),
            image: (
                <div className="eventSectionImage">
                    <img src={`/images/mlab/recruitment.png`} />
                </div>
            ),
        },
        internship: {
            text: (
                <div className="eventSection">
                    <div className="eventSectionText">
                        <Link className="eventPageLink" href={`/summer`}>
                            <Typography className="eventHeading">
                                Summer Internship Program
                            </Typography>
                        </Link>
                        <Typography className="eventText">
                            We, at PES Innovation Lab, organise an annual summer
                            internship for new recruits to work on cutting-edge
                            research projects in varied domains such as
                            Robotics, Machine Learning, Artificial Intelligence,
                            Sensor Networking, Virtual Reality, Brain-Computer
                            Interface, Cloud computing and App Development. The
                            results and prototype demonstrations of these
                            projects are presented at Roadshow, an event
                            attended by a large number of students across
                            disciplines at PES University. The recruitments for
                            the same are carried out between March and April.
                        </Typography>
                    </div>
                </div>
            ),
            image: (
                <div className="eventSectionImage">
                    <img src={`/images/mlab/internship.png`} />
                </div>
            ),
        },
        roadshow: {
            text: (
                <div className="eventSection">
                    <div className="eventSectionText">
                        <Link className="eventPageLink" href={`/roadshow`}>
                            <Typography className="eventHeading">
                                Roadshow
                            </Typography>
                        </Link>
                        <Typography className="eventText">
                            Roadshow is an Innovation Expo organized by the Lab
                            each year after the Summer Internship Program. PES
                            Lab summer interns present the projects that they
                            have worked on during the internship. This serves as
                            a great platform for students from PES University to
                            interact with members and gain knowledge about the
                            cutting-edge technologies that we work on. Roadshow
                            also serves as a platform where our interns receive
                            constructive feedback and further insights on their
                            projects from experienced professionals, professors
                            and their peers.
                        </Typography>
                    </div>
                </div>
            ),
            image: (
                <div className="eventSectionImage">
                    <img src={`/images/mlab/roadshow.png`} />
                </div>
            ),
        },
        hashcode: {
            text: (
                <div className="eventSection">
                    <div className="eventSectionText">
                        <Link className="eventPageLink" href={`/hashcode`}>
                            <Typography className="eventHeading">
                                HashCode
                            </Typography>
                        </Link>
                        <Typography className="eventText">
                            HashCode is the annual 24-hour hackathon organised
                            by the Lab, with students proposing interesting
                            ideas and presenting projects from several domains.
                            The hackathon also provides a learning platform to
                            participating teams, with mentors and members of
                            academia assisting them. Esteemed personalities from
                            different industrial backgrounds come to judge the
                            show, evaluating projects from all possible angles.
                            HashCode 2020 is the 9th edition of the annual
                            hackathon. The winners bag cash prizes worth up to
                            one lakh indian rupees.
                        </Typography>
                    </div>
                </div>
            ),
            image: (
                <div className="eventSectionImage">
                    <img src={`/images/mlab/hackathon.png`} />
                </div>
            ),
        },
    }
    const timelineElements = data.map((event) => (
        <TimelineItem style={{ textAlign: 'left' }} key={event.key}>
            <TimelineOppositeContent className="event-timelineOppositeContent">
                <Typography variant="body2" className={classes.date}>
                    {event.month}
                </Typography>
                {timelineContent[event.key].image}
            </TimelineOppositeContent>
            <TimelineSeparator style={{ float: 'left' }}>
                <TimelineDot
                    style={{ color: 'white', backgroundColor: 'green' }}
                >
                    <ArrowDownwardIcon />
                </TimelineDot>
                <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
                {isDesktop ? null : (
                    <Typography
                        variant="body2"
                        className={`${classes.date} event-timelineDate`}
                    >
                        {event.month}
                    </Typography>
                )}
                {isDesktop ? null : timelineContent[event.key].image}
                {timelineContent[event.key].text}
            </TimelineContent>
        </TimelineItem>
    ))

    return (
        <Container>
            <Typography className={'pageHeader'}>What we do</Typography>
            <Typography
                style={{
                    textAlign: 'center',
                    color: 'white',
                    fontSize: '1.8rem',
                }}
            >
                A year at PES Innovation Lab
            </Typography>
            <Typography
                style={{
                    textAlign: 'center',
                    color: 'white',
                    fontSize: '1.4rem',
                }}
            >
                We have the perfect platform and events for your skills and
                ideas to explore new heights
            </Typography>

            <Timeline align={isDesktop ? 'alternate' : 'left'}>
                {timelineElements}
            </Timeline>
        </Container>
    )
}

export default Events
