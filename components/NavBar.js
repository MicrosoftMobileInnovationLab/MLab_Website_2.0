// components/NavBar.js
import React, { useState, useEffect } from 'react'
import { AppBar, Toolbar, Button, 
		 IconButton, SwipeableDrawer, List,
		 ListItem, ListItemText, InputBase } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { fade, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import Link from 'next/link';
import css from '../css/navbar.css';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


//For Dialog displaying hint
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const useStyles = makeStyles((theme) => ({
	root: {
	  	flexGrow: 1,
	},
	menuButton: {
	  	marginRight: theme.spacing(2),
	},
	title: {
	  	flexGrow: 1,
	  	display: 'none',
	  	[theme.breakpoints.up('sm')]: {
			display: 'block',
	  	},
	},
	search: {
	  	position: 'relative',
	  	borderRadius: theme.shape.borderRadius,
	  	backgroundColor: fade(theme.palette.common.white, 0.15),
	  	'&:hover': {
			backgroundColor: fade(theme.palette.common.white, 0.25),
	  	},
	  	marginLeft: 0,
	  	width: '100%',
	  	[theme.breakpoints.up('sm')]: {
			marginLeft: theme.spacing(1),
			width: 'auto',
	  	},
	},
	searchIcon: {
	  	padding: theme.spacing(0, 2),
	  	height: '100%',
	  	position: 'absolute',
	  	pointerEvents: 'none',
	  	display: 'flex',
	  	alignItems: 'center',
	  	justifyContent: 'center',
	},
	inputRoot: {
	  	color: 'inherit',
	},
	inputInput: {
	  	padding: theme.spacing(1, 1, 1, 0),	  	
	  	paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
	  	transition: theme.transitions.create('width'),
	  	width: '100%',
	  	[theme.breakpoints.up('sm')]: {
			width: '12ch',
			'&:focus': {
		  		width: '20ch',
			},
	  	},
	},
}));

const makeMenu = (nav, active, mobile) => {
	if(!nav.subMenus) {
		if(mobile) {
			return (
				<Link href={nav.route}>
					<ListItem button key={nav.title} className='drawerMenu'>
						<ListItemText className={`drawerNavText${active == nav.title ? ' active' : ''}`} primary={nav.title} />
					</ListItem>
				</Link>
			)
		} else {
			return (
				<Link href={nav.route}>
					<Button disableRipple disableFocusRipple className={`navButton${active == nav.title ? ' active' : ''}`}>
						{nav.title}
					</Button>
				</Link>
			) 
		}		
	} else {
		return (
			<PopupState variant="popover" popupId="demo-popup-menu">
				{(popupState) => (
					<React.Fragment>
						{mobile ? 
								<ListItem button key={nav.title} className='drawerMenu'>
									<Link href={nav.route}>
										<ListItemText className={`drawerNavText${active == nav.title ? ' active' : ''}`} primary={nav.title} />
									</Link>
									<IconButton size="small" {...bindTrigger(popupState)}>
							  			<ExpandMoreIcon fontSize="inherit" style={{'color': 'white'}}/>
									</IconButton>
								</ListItem>
							:
							<Link href={nav.route}>
								<Button disableRipple disableFocusRipple className={`navButton${active == nav.title ? ' active' : ''}`}>
									{nav.title}
								</Button>
							</Link>
						}						
						{!mobile? <IconButton size="small" {...bindTrigger(popupState)} className='dropdown-desktop'>
							  <ExpandMoreIcon fontSize="inherit" style={{'color': 'white'}}/>
						</IconButton>: null}
						<Menu {...bindMenu(popupState)} className='navDropdownMenu'>
							{nav.subMenus.map(subMenu => (
								<MenuItem>
									{ mobile? <Link href={subMenu.route}>
										<ListItem button key={nav.title} className='drawerMenu'>
											<ListItemText className={`drawerNavText${active == subMenu.title ? ' active' : ''}`} primary={subMenu.title} />
										</ListItem>
									</Link>: <Link href={subMenu.route}>
										<Button disableRipple disableFocusRipple className={`navButton`}>
											{subMenu.title}
										</Button>
									</Link> }
								</MenuItem>
							))}
						</Menu>
					</React.Fragment>
				)}
			</PopupState>
		)
	}			
}

const handleSearch = (query, searchSettings) => {
	query = query.toLowerCase();
	const elements = document.getElementsByClassName(searchSettings.targetClass);
	for(let ele of elements) {
		if(ele.textContent.toLowerCase().search(query) === -1)
			ele.style.display = 'none';
		else
			ele.style.display = searchSettings.default;
	}
}


function NavBar({ active, search, searchSettings }) {
	const [ drawerOpen, setDrawerOpen ] = useState(false);
	const classes = useStyles();

    /* For fancy navbar */
	const [_document, set_document] = useState(null)
	const [sticky, setSticky] = useState(true);
	const [hasInitialised, setHasInitialised] = useState(false)
	const [scrollPosition, setScrollPosition] = useState(null);
	const [navbarMenu, setNavbarMenu] = useState(null, [false, false, false]);

	useEffect(() => {
		set_document(document)
		setScrollPosition(1)
	}, [])	

	useEffect(() => {
		if (scrollPosition) setHasInitialised(true);
	}, [scrollPosition])

	const getScrollPosition = () => {
		const scrollPosition = _document.body.getBoundingClientRect()
        return scrollPosition.y;
        
    }
	
    useEffect(() => {
		if (_document && scrollPosition != null){
			const handleScroll = () => {
				const currentScrollPosition = getScrollPosition();
				setSticky(currentScrollPosition > scrollPosition);
				setScrollPosition(currentScrollPosition);
			}
			window.addEventListener('scroll', handleScroll);
			return () => window.removeEventListener('scroll', handleScroll);
		}
	}, [sticky, hasInitialised, scrollPosition]);

	const navs = [
		{ title: 'Home', route:`${process.env.ASSET_PREFIX}/`},
		{ title: 'Members', route: `${process.env.ASSET_PREFIX}/members` },
		{ title: 'Projects', route: `${process.env.ASSET_PREFIX}/projects` },
		{ title: 'Publications', route: `${process.env.ASSET_PREFIX}/publications`},
		{ title: 'Hashcode 2021', route: `${process.env.ASSET_PREFIX}/hashcode2021` },
		{ title: 'Our History', route: `${process.env.ASSET_PREFIX}/about_us`},
		{ title: 'Events', route: `${process.env.ASSET_PREFIX}/events` , subMenus: [
			{ title: 'Incito', route: `${process.env.ASSET_PREFIX}/incito` },
			{ title: 'Summer', route: `${process.env.ASSET_PREFIX}/summer` },
			{ title: 'HashCode', route: `${process.env.ASSET_PREFIX}/hashcode` },
			{ title: 'RoadShow', route: `${process.env.ASSET_PREFIX}/roadshow` }
		]},
		{ title: 'Join Us', route: `${process.env.ASSET_PREFIX}/join_us`},
		{ title: 'Articles', route: `${process.env.ASSET_PREFIX}/articles`},
	]

	const useStickyState = (defaultValue, key) => {
		const [value, setValue] = React.useState(defaultValue);
	  
		React.useEffect(() => {
		  const stickyValue = window.localStorage.getItem(key);
	  
		  if (stickyValue !== null) {
			setValue(JSON.parse(stickyValue));
		  }
		}, [key]);
	  
		React.useEffect(() => {
		  window.localStorage.setItem(key, JSON.stringify(value));
		}, [key, value]);
	  
		return [value, setValue];
	  }

	//Custom func to handle clicks
	const [clickCnt,setClickCnt] = useState(1);
	const [clicked, setClicked] = useStickyState(false, "clicked");
	
	const onLogoClick = (e)=>{
		// console.log(clickCnt);
		setClickCnt(clickCnt+1);
		// console.log(clickCnt);
		if(clickCnt === 10)
		{
			handleClickOpen();
			setClicked(true);
			setClickCnt(1);
		}
	}

	const [open, setOpen] = React.useState(false);
	
	const handleClickOpen = () => {
		setOpen(true);
	};
	
	const handleClose = (e,r) => {
		if(r && r=="backdropClick")
			return;
		setOpen(false);
	};

		
    return (
        <AppBar className='navbar' style={
				{transform: sticky ? "translateY(0%)" : "translateY(-100%)",
				transition: 'transform 0.3s ease-in',
			    position: 'sticky',
    			top: '0'}
            }>
            <Toolbar>
              	<IconButton onClick={() => { setDrawerOpen(true) }} edge="start" className='menuButton' >
                	<MenuIcon />
              	</IconButton>
				{/* <Link href={`${process.env.ASSET_PREFIX}/`}> */}
					<IconButton disableFocusRipple edge="start" className='logoButton' onClick={onLogoClick}>
						<img className='logo' src={`${process.env.ASSET_PREFIX}/images/mlab/mlab_logo_icon.png`}/>
					</IconButton>
					<Dialog
						open={open}
						onClose={handleClose}
						aria-labelledby="alert-dialog-title"
						aria-describedby="alert-dialog-description"
					>
						<DialogTitle id="alert-dialog-title">
						{"You're making progress!"}
						</DialogTitle>
						<DialogContent>
						<DialogContentText id="alert-dialog-description">

							Now click <a href="https://the-hunt.vercel.app/chess" style={{color: "blue"}}>here</a> to continue.

						</DialogContentText>
						</DialogContent>
						<DialogActions>
						<Button onClick={handleClose}>OK</Button>
						</DialogActions>
					</Dialog>
				{/* </Link> */}
        
				{navs.map((nav) => (
					makeMenu(nav, active, false)
				))}

				{search ? (
					<div className={classes.search}>
						<div className={classes.searchIcon}>
							<SearchIcon />
						</div>
						<InputBase
							placeholder="Search…"
							classes={{
								root: classes.inputRoot,
								input: classes.inputInput,
							}}
							inputProps={{ 'aria-label': 'search' }}
							onInput={(e) => {handleSearch(e.target.value, searchSettings)}}
						/>
					</div>) : null}

            </Toolbar>
			<SwipeableDrawer
      			anchor={'left'}
      			open={ drawerOpen }
      			onClose={ () => { setDrawerOpen(false) } }
				onOpen={ () => { setDrawerOpen(true) } }				
    		>
				<List className='navDrawer'>
					<ListItem button className='drawerMenu' style={{borderBottom: '1px solid grey'}}>
						<img className='logo' src={`${process.env.ASSET_PREFIX}/images/mlab/mlab_logo.png`} style={{width: 250}}/>
					</ListItem>
					{navs.map((nav) => (
						makeMenu(nav, active, true)
					))}
				</List>      			
    		</SwipeableDrawer>
        </AppBar>
    );
}

export default NavBar;