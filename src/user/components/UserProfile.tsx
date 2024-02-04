import { Navigate } from "react-router-dom";

import { 
    Card, 
    Box, 
    CardContent,
    CardMedia,
    Typography,
    IconButton,
    Tabs,
    Tab
} from "@mui/material";
import { Logout } from "@mui/icons-material";

import { useAppSelector } from "../../customHooks/useAppSelector";
import { fetchBorrowHistory, getLoggedInStatus, getUser, getUserHistory, logout } from "../userSlice";
import { useAppDispatch } from "../../customHooks/useAppDispatch";
import { useEffect, useState } from "react";
import { History } from "../../interfaces/User";
import UserHistoryCard from "./UserHistoryCard";

const UserProfile = () => {
    const [value, setValue] = useState(0)

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue)
    }

    const isLoggedIn = useAppSelector(getLoggedInStatus);
    const user = useAppSelector(getUser);
    const history = useAppSelector(getUserHistory);

    const past: History[] = []
    const present: History[] = []

    if (history.length > 0) {
        history.forEach((item) => {
            if (item.returned === true) {
                past.push(item)
            } else {
                present.push(item)
            }
        })
    }

    console.log("past" + past.length)
    console.log("present" + present.length)

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchBorrowHistory())
    },[dispatch])

    return (
        <>
            { !isLoggedIn && <><Navigate to=".." replace={true}/></>}
            <Box
                component="section" pt={10}
            >
                <Card
                    sx={{ 
                        display: "flex",
                        maxWidth: "75%",
                        margin: "5px auto 0"
                    }}
                >
                    <CardMedia
                            component="img"
                            sx={{ width: "50%" }}
                            image={user?.avatar}
                            alt="User Avatar"
                    />
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column"
                        }}
                    >                    
                        <CardContent>
                            <Typography component="div" variant="h5">
                                Name : {user?.lastName} {user?.firstName} 
                            </Typography>
                            <Typography component="div" variant="h6">
                                Role : {user?.role[0].title}
                            </Typography>
                            <Typography component="div" variant="h6">
                                Email : {user?.email}
                            </Typography>                            
                        </CardContent>
                    </Box>
                    <IconButton
                        sx={{
                            alignSelf: "start"
                        }}
                        onClick={() => {dispatch(logout())}}
                    >
                        <Logout />
                    </IconButton>
                </Card>
            </Box>
            <Box
                component="section" 
                pt={10} 
                flexGrow={1} 
                sx={{ 
                    display: "flex",
                    maxWidth: "75%",
                    margin: "5px auto 0" 
                }}
            >
                <Box sx={{ width:"100%", borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={value} onChange={handleTabChange}>
                            <Tab label="Past Loan" />
                            <Tab label="Current Loan" />
                        </Tabs>
                        <UserHistoryCard value={value} index={0} item={past}/>
                        <UserHistoryCard value={value} index={1} item={present}/>
                </Box>
            </Box>
        </>
    )
}

export default UserProfile;