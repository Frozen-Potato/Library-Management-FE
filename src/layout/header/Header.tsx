import React, { useContext, useEffect, useMemo, useState } from "react"
import { useAppSelector } from "../../customHooks/useAppSelector"

import { 
    AppBar, 
    Container, 
    Toolbar, 
    Typography, 
    Box, 
    IconButton,
    Button, 
    Modal, 
    Fade, 
    useTheme, 
    Tooltip,
    TextField,
    FormControlLabel,
    Checkbox,
    Avatar,
    Alert,
    Snackbar,
    Menu,
    MenuItem,
    Tab
} from "@mui/material";
import { DarkModeOutlined, LightModeOutlined } from "@mui/icons-material"
import AdbIcon from "@mui/icons-material/Adb"
import TabPanel from '@mui/lab/TabPanel';

import { createUser, fetchCurrentUser, fetchToken, getLoggedInStatus, getUser, getCreateStatus, logout } from "../../user/userSlice"
import { ThemeContext } from "../../theme/ThemeProvider"
import { useNavigate } from "react-router-dom"
import { useAppDispatch } from "../../customHooks/useAppDispatch";
import { TabContext, TabList } from "@mui/lab";
import CartDrawer from "../../cart/components/CartDrawer";
import { config } from "../../config";

export const Header = () => {
    const [anchorElUser, setAnchorElUser] = useState<HTMLElement | null>(null);
    const [openModal, setOpenModal] = useState(false);
    const [submitted, setSubmitted] = useState<boolean>(false);
    const [submittedSignUp, setSubmittedSignUp] = useState<boolean>(false);
    const [openAlert, setOpenAlert] = useState(false);
    const [tabValue, setTabValue] = useState('1');
    

    const theme = useTheme();
    const { switchColorMode } = useContext(ThemeContext);;
    const activationName = useMemo(
        () => (theme.palette.mode === "dark" ? "Light" : "Dark"), 
        [theme]
    );
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const isLoggedIn = useAppSelector(getLoggedInStatus);
    const user = useAppSelector(getUser);
    const createStatus = useAppSelector(getCreateStatus);
    
    useEffect(() => {
        if(isLoggedIn) {
            handleCloseModal();   
            setSubmitted(false);   
        } else 
        if(submitted) {
            setOpenAlert(true);
            setSubmitted(false);
        }
    }, [isLoggedIn, submitted]);

    useEffect(() => {
        if(createStatus === true) {
            handleCloseModal();   
            setSubmitted(false);   
        } else 
        if(submittedSignUp && createStatus === false) {
            setOpenAlert(true);
            setSubmitted(false);
        }
    }, [createStatus, submittedSignUp])
    


    const handleOpenModal = () => {
        setOpenModal(true);
    }

    const handleCloseModal = () => {
        setOpenModal(false);
    }

    const handleCloseAlert = () => {
        setOpenAlert(false);
    }

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleProfile = () => {
        navigate(`${config.landingURL}Profile`);
        handleCloseUserMenu();
    }

    const handleChangeTab = (event : React.SyntheticEvent, newValue : string) => {
        setTabValue(newValue);
    }

    const handleLogout = () => {
        handleCloseUserMenu();
        dispatch(logout());
    }

    const handleSubmit = async (event : React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const submitData = { 
            email : (data.get('email') as FormDataEntryValue).toString(),
            password : (data.get('password') as FormDataEntryValue).toString()
        }
        await dispatch(fetchToken(submitData));
        await dispatch(fetchCurrentUser());
        setSubmitted(true);
    }

    const handleSubmitSignup = async (event : React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const submitData = { 
            firstName : (data.get('firstName') as FormDataEntryValue).toString(),
            lastName : (data.get('lastName') as FormDataEntryValue).toString(),
            address : (data.get('address') as FormDataEntryValue).toString(),
            phoneNumber : (data.get('phoneNumber') as FormDataEntryValue).toString(),
            email : (data.get('email') as FormDataEntryValue).toString(),
            password : (data.get('password') as FormDataEntryValue).toString(),
            avatar : `https://placehold.co/400` 
        }
        await dispatch(createUser(submitData));
        setSubmittedSignUp(true);
    }

    return (
        <AppBar
            position="fixed"
        >
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <IconButton
                        onClick={() => {navigate(".")}}
                    >
                        <AdbIcon                         
                            sx={{ 
                                display: { 
                                    xs: 'none', 
                                    md: 'flex'
                                }
                            }} 
                        />
                    </IconButton>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"                        
                        sx={{
                            mr: 2,
                            display:{
                                xs : 'none',
                                md : 'flex'
                            },
                            fontFamily: "monospace",
                            fontWeight: 700,
                            letterSpacing: '.1rem',
                            color: 'inherit',
                            textDecoration: 'none'
                        }}
                    >
                        Something Library ?
                    </Typography>
                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip
                            title = {`Activate ${activationName} Mode`}
                        >
                            <IconButton
                                onClick={switchColorMode}
                                sx={{
                                    p: 1,
                                    border: `1px ${theme.palette.text.disabled} solid`
                                }}
                                size="large"
                                color="inherit"
                            >
                                { theme.palette.mode === "dark" ? (
                                    <LightModeOutlined />
                                ) : (
                                    <DarkModeOutlined />
                                )}
                            </IconButton>
                        </Tooltip>
                    </Box>
                    <CartDrawer />
                    { isLoggedIn ? (
                            <>
                                <Tooltip title="Open settings">
                                    <IconButton
                                        onClick={handleOpenUserMenu}
                                    >
                                            <Avatar alt={user?.firstName} src={user?.avatar}/>
                                    </IconButton>
                                </Tooltip>
                                <Menu
                                    sx={{ mt: '45px' }}
                                    id="menu-appbar"
                                    anchorEl={anchorElUser}
                                    anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                    }}
                                    open={Boolean(anchorElUser)}
                                    onClose={handleCloseUserMenu}
                                >                                    
                                    <MenuItem key="Profile" onClick={handleProfile}>
                                        <Typography textAlign="center">Profile</Typography>
                                    </MenuItem>
                                    <MenuItem key="Logout" onClick={handleLogout}>
                                        <Typography textAlign="center">Logout</Typography>
                                    </MenuItem>
                                </Menu>
                            </>
                        ) : (     
                            <>                                             
                                <Button
                                    color="inherit"
                                    onClick={handleOpenModal}
                                >
                                    Login / Register
                                </Button>
                                <Modal 
                                    open={openModal}
                                    onClose={handleCloseModal}
                                    closeAfterTransition
                                    sx={{  
                                        display: 'flex', 
                                        justifyContent: 'center', 
                                        alignItems: 'center' 
                                    }}
                                >                                    
                                    <Fade in={openModal}>                                        
                                        <Box
                                            sx={{                                                
                                                width: 400,
                                                bgcolor: "background.paper",
                                                border: "2px solid #0000",
                                                boxShadow: 24,
                                                p: 4
                                            }}
                                        >    
                                            <TabContext value={tabValue}>
                                                <TabList onChange={handleChangeTab} centered>
                                                    <Tab label="Sign in" value="1"/>
                                                    <Tab label="Sign up" value="2"/>
                                                </TabList>
                                                <TabPanel value="1">
                                                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                                                        <TextField
                                                            margin="normal"
                                                            required
                                                            fullWidth
                                                            id="email"
                                                            label="Email Address"
                                                            name="email"
                                                            autoComplete="email"
                                                            autoFocus
                                                        />
                                                        <TextField
                                                            margin="normal"
                                                            required
                                                            fullWidth
                                                            name="password"
                                                            label="Password"
                                                            type="password"
                                                            id="password"
                                                            autoComplete="current-password"
                                                        />
                                                        <FormControlLabel
                                                            control={<Checkbox value="remember" color="primary" />}
                                                            label="Remember me"
                                                        />
                                                        <Button
                                                            type="submit"
                                                            fullWidth
                                                            variant="contained"
                                                            sx={{ mt: 3, mb: 2 }}
                                                        >
                                                        Sign In
                                                        </Button>                                                                                               
                                                    </Box>
                                                </TabPanel>
                                                <TabPanel value="2">
                                                    <Box component="form" onSubmit={handleSubmitSignup} noValidate sx={{ mt: 1 }}>
                                                        <TextField
                                                            margin="normal"
                                                            required
                                                            fullWidth
                                                            id="firstName"
                                                            label="First Name"
                                                            name="firstName"
                                                            autoComplete="firstName"
                                                            autoFocus
                                                        />
                                                        <TextField
                                                            margin="normal"
                                                            required
                                                            fullWidth
                                                            id="lastName"
                                                            label="Last Name"
                                                            name="lastName"
                                                            autoComplete="lastName"
                                                            autoFocus
                                                        />
                                                        <TextField
                                                            margin="normal"
                                                            required
                                                            fullWidth
                                                            id="email"
                                                            label="Email Address"
                                                            name="email"
                                                            autoComplete="email"
                                                            autoFocus
                                                        />
                                                        <TextField
                                                            margin="normal"
                                                            required
                                                            fullWidth
                                                            id="phoneNumber"
                                                            label="Phone Number"
                                                            name="phoneNumber"
                                                            autoComplete="phoneNumber"
                                                            autoFocus
                                                        />
                                                        <TextField
                                                            margin="normal"
                                                            required
                                                            fullWidth
                                                            id="address"
                                                            label="Address"
                                                            name="address"
                                                            autoComplete="address"
                                                            autoFocus
                                                        />
                                                        <TextField
                                                            margin="normal"
                                                            required
                                                            fullWidth
                                                            name="password"
                                                            label="Password"
                                                            type="password"
                                                            id="password"
                                                            autoComplete="current-password"
                                                        />                                                        
                                                        <Button
                                                            type="submit"
                                                            fullWidth
                                                            variant="contained"
                                                            sx={{ mt: 3, mb: 2 }}
                                                        >
                                                        Sign Up
                                                        </Button>                                                                                               
                                                    </Box>
                                                </TabPanel>
                                            </TabContext>
                                            <Snackbar open={openAlert} autoHideDuration={6000} onClose={handleCloseAlert}>
                                                <Alert onClose={handleCloseAlert} severity="error" sx={{ width: '100%' }}>
                                                    Something went wrong, please try again!
                                                </Alert>
                                            </Snackbar> 
                                        </Box>
                                    </Fade>                                                                        
                                </Modal>                                
                            </>  
                        )} 
                </Toolbar>                              
            </Container>
        </AppBar>
    )
}