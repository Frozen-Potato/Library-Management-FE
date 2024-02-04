import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { History } from "../../interfaces/User";
import { useAppDispatch } from '../../customHooks/useAppDispatch';
import { returnBook } from "../userSlice";
import { useAppSelector } from "../../customHooks/useAppSelector";
import { getState } from "../../books/bookSlice";
import { config } from "../../config";

interface HistoryCardProps {
    item : History
}

const HistoryCard = ({item} : HistoryCardProps) => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const state = useAppSelector(getState)

    const handleClick = (id: string) => {
        try {
            dispatch(returnBook(id))
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <Card
            sx={{
                    maxWidth: "100%",
                    transition: 'ease-in-out 0.25s',
                    '&:hover': {
                    cursor: 'pointer',
                    marginTop: '-7px',
                    marginBottom: '7px',
                    marginLeft: '-7px',
                },
            }}
        >
        <CardActions
            onClick={() => {
                const ISBN = state.books.entities[item?.book?._id as string]?.ISBN
                navigate(`${config.landingURL}Books/${ISBN}`)
                //navigate(`/books/${item?.book?._id}`)
            }}
        >
            <CardMedia
                component="img"
                height="250"
                image={item?.book?.img}
                alt={item?.book?.title}
                style={{
                    objectFit: 'cover',
                    width: '100%',
                    borderRadius: '0.5rem',
                }}
            />
        </CardActions>
        <CardContent
            sx={{ padding: '0 auto', '&:last-child': { paddingBottom: '0' } }}
        >
            <Typography variant="body2" color="text.secondary">
                {item?.book?.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
                Borrowed Date : {item.borrowed_Date}
            </Typography>
            {
                item.returned === true ? (
                    <Typography variant="body2" color="text.secondary">
                        Returned Date : {item.returned_Date}
                    </Typography>
                ) : (
                    <Button onClick={() => handleClick(item?.book?._id as string)}>Return this book</Button>
                )
            }
        </CardContent>
        </Card>
    )
}
export default HistoryCard