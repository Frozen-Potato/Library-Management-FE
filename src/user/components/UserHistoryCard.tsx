import { Grid, Typography } from "@mui/material"
import HistoryCard from "./HistoryCard"
import { History } from "../../interfaces/User";

interface HistoryCardProps {
    item : History[]
    value: number
    index: number
}

interface InsertProps {
    item: History[]
}

const Insert = ({item} : InsertProps) => {
    if (item.length === 0) { 
    return (
        <Typography
                    variant="h3"
                    sx={{
                        textAlign: "center"
                    }}
                >
                    No Book found.
        </Typography>
    )}
    else {
        return (
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                {
                    item.map((i) => (
                        <Grid
                            key={Math.random()}
                            item
                            xs={2} sm={4} md={4}
                            sx={{
                                display: 'flex',
                                alignItems:'center',
                                justifyContent: 'center'
                            }}
                        >
                            <HistoryCard item={i} />
                        </Grid>
                    ))
                }
            </Grid>              
    )
    }
}

const UserHistoryCard = (props: HistoryCardProps) => {
    const {item, value, index} = props
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`${index}`}
        >
            {value === index && (
                <Insert item={item} />
            )}
        </div>
    )
}

export default UserHistoryCard