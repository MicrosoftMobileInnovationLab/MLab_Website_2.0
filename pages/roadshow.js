// pages/roadshow.js
import Layout from '../components/Layout';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Container, Grid, CardMedia, IconButton } from '@material-ui/core';
import AliceCarousel from 'react-alice-carousel';
import { useEffect, useState } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

import cookieCutter from 'cookie-cutter'

import '../css/hashCode.css';
import '../node_modules/react-alice-carousel/lib/alice-carousel.css';

const designstyles = makeStyles({
  subtitleStyle: {
    fontSize: '1.5rem',
    color: 'white',
    textAlign: 'center',
  },
  eventBodyStyle: {
    fontSize: '1.5rem',
    color: 'white',
    textAlign: 'left',
    marginTop: '1em',
    marginBottom: '1em',
  },
  spinnerTextStyle: {
    textAlign: 'center',
    color: '#7cb342',
  },
});

const CarouselImage = ({ img }) => (
  <CardMedia className="sliderImage" image={img} />
);

function RoadShow() {
  try {
    cookieCutter.set('TreasureHunt', 'pastebin.com/K6w7pz5J')
  }
  catch (err) {

  }

  const styles = designstyles();
  const [data, setData] = useState({ events: [] });
  const [isDataLoaded, setDataLoaded] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(
        'https://pil-api.herokuapp.com/events/roadshow'
      );
      if ((await result.status) !== 200) {
        alert('API Error. Try again later');
      } else {
        const events = await result.json();
        setData({ events: events });
      }
      setDataLoaded(true);
    };
    fetchData();
  }, []);
  return (
    <Layout title={'PIL | RoadShow'} active={'RoadShow'}>
      <div className="hashCodeHeadSection">
        <Container>
          <Typography className="pageHeader">RoadShow</Typography>
          <Typography className={styles.subtitleStyle}>
            Project Exhibition
          </Typography>
          <Typography
            className={styles.subtitleStyle}
            style={{ marginTop: 40 }}
          >
            RoadShow is a project exhibition where summer interns showcase their
            projects to their peers and faculty.
          </Typography>
        </Container>
      </div>

      <div className="hashCodeContainer">
        {/* This is a sample for reference */}
        {/* <div className='hashCodeSection'>
        <Container>
            <Typography className='hashCodeTitle'>
                HashCode 2019
            </Typography>
            <Typography className='hashCodeSponsors'>
                Sponsored by RedHat, IEEE CAS and Rotary Club
            </Typography>
            <Typography className='hashCodeDescription'>
                This will be an event description, if any
            </Typography>
            <Grid container spacing={3} style={{marginTop: 20}} justify="center">
                <Grid item xs={12} sm={4}>
                    <img style={{width:"95%"}} src={`${process.env.ASSET_PREFIX}/images/events/hashcode/HashCode2019.jpg`}/>
                </Grid>
                <Grid item xs={12} sm={8}>
                    <AliceCarousel autoPlay autoPlayInterval="3000" buttonsDisabled>
                        <CarouselImage img={`${process.env.ASSET_PREFIX}/images/events/hashcode/2019/hashcode2019_1.jpg`} />
                        <CarouselImage img={`${process.env.ASSET_PREFIX}/images/events/hashcode/2019/hashcode2019_2.jpg`} />
                        <CarouselImage img={`${process.env.ASSET_PREFIX}/images/events/hashcode/2019/hashcode2019_3.jpg`} />
                    </AliceCarousel>
                </Grid>
            </Grid>
        </Container>
        </div> */}
        {!isDataLoaded ? (
          <div className={styles.spinnerTextStyle}>
            <Typography style={{ fontSize: '1.5rem' }}>Loading Data</Typography>{' '}
            <CircularProgress style={{ color: '#7cb342', marginTop: '1em' }} />
          </div>
        ) : (
          data.events.map((event) => (
            <div className="hashCodeSection" key={event.event_name}>
              <Container>
                <Typography className="hashCodeTitle">
                  {event.event_name}
                </Typography>
                <Typography className="hashCodeDate">
                  {event.event_date + ' ' + event.year}
                </Typography>
                <Typography className="hashCodeSponsors">
                  {event.sponsor_text}
                </Typography>
                <Typography className="hashCodeDescription">
                  {event.description}
                </Typography>
                <Grid
                  container
                  spacing={3}
                  style={{ marginTop: 20 }}
                  justify="center"
                >
                  <Grid item xs={12} sm={4}>
                    <img
                      style={{ width: '95%' }}
                      src={`${event.poster_link}`}
                    />
                  </Grid>
                  <Grid item xs={12} sm={8}>
                    <AliceCarousel
                      autoPlay
                      autoPlayInterval="3000"
                      buttonsDisabled
                    >
                      {event.image_links.map((image) => (
                        <CarouselImage key={image} img={`${image}`} />
                      ))}
                    </AliceCarousel>
                  </Grid>

                  <a href={`https://www.google.com/search?q=Cookie+Reader`} target="_blank">
                    <IconButton disableFocusRipple edge="start">
                      <img
                        style={{ width: '80%' }}
                        className="footerLogo"
                        src={`${process.env.ASSET_PREFIX}/images/treasure_hunt/cookie.png`}
                      />
                    </IconButton>
                  </a>
                  
                </Grid>
                
              </Container>
            
            </div>
          ))
        )}
      </div>
    </Layout>
  );
}
export default RoadShow;
