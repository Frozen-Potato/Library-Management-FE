import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useAppSelector } from "../../customHooks/useAppSelector";
import { useAppDispatch } from "../../customHooks/useAppDispatch"
import { increaseCount } from "../../cart/cartSlice";

import { 
    Card, 
    Box, 
    CardContent, 
    Typography, 
    CardMedia, 
    CardHeader, 
    IconButton, 
    CardActions, 
    Tooltip,
    Modal,
    Fade,
    TextField,
    Button,
    MenuItem
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import HomeIcon from "@mui/icons-material/Home";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete"

import "react-responsive-carousel/lib/styles/carousel.min.css"
import { getUser } from "../../user/userSlice";
import { fetchSingleBook, getSingleBook, getSingleBookCopies } from "../bookSlice";
import { categoriesSelector, fetchCategories } from "../../categories/categorySlice";
import { Book, SingleBook } from "../../interfaces/Book";
import { Category } from "../../interfaces/Category";

export const BookSingle = () => {
    const [openModal, setOpenModal] = useState(false)

    const dispatch = useAppDispatch();    
    const { ISBN } = useParams();
    const singleBook = useAppSelector(getSingleBook);
    const { _id, title, description, img, edition, category, author } = singleBook || {};
    const navigate = useNavigate();
    const user = useAppSelector(getUser);
    const userRole = user ? user.role[0].title : "Borrower"    
    const categories = useAppSelector(categoriesSelector.selectAll)
    const availableCopies = useAppSelector(getSingleBookCopies)

    useEffect(() => {
        if (ISBN !== undefined) {
            dispatch(fetchSingleBook({ISBN}))
        }
        dispatch(fetchCategories())
    },[dispatch, ISBN])

    const handleOpenModal = () => {
        setOpenModal(true);
    }

    const handleCloseModal = () => {
        setOpenModal(false);
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const submitData = {
            _id,
            ISBN,
            title : (data.get('title') as FormDataEntryValue).toString(),
            description : (data.get('description') as FormDataEntryValue).toString(),
            category : (data.get('category') as FormDataEntryValue).toString(),
            author,
        }
        console.log(submitData)
        //await dispatch(updateBook(submitData));
        handleCloseModal();
    }

    return (    
        <Box
            component="section" pt={10}
        >
            <Card
                sx={{
                    maxWidth: 500,
                    margin: "50px auto 0"
                }}
            >
                <CardHeader
                    title={title}
                    subheader={category && category[0].name}
                    action={
                        userRole === "Admin" &&
                        <IconButton 
                            onClick={handleOpenModal}
                            aria-label="Edit"
                        >
                            <EditIcon />
                        </IconButton>
                    }
                />

                <CardMedia component="img" image={img} key={_id} title={title} sx={{ width: "100%", height: 500 }}/>

                <CardContent>
                    <Typography variant="body1">Author : {author && author[0].fullName}</Typography>
                    <Typography variant="body2">Edition : {edition}</Typography> 
                    <Typography>Description : {description}</Typography>
                    <Typography>Current available copies : {availableCopies}</Typography> 
                </CardContent>
                <CardActions disableSpacing>
                    <Tooltip title="Add to Cart">
                        <IconButton 
                            aria-label="Back to Menu"
                            onClick={() => {navigate("..")}}
                        >
                            <HomeIcon />
                        </IconButton>
                    </Tooltip>
                    { userRole === "Admin" ? (
                        <Tooltip title="Delete book">
                        <IconButton 
                            sx={{
                                marginLeft: "auto"
                            }}
                            aria-label="Delete book"
                            onClick={() => {
                                //dispatch(deletebook(parseInt(_id as string)));
                                navigate("..")
                            }}
                        >
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                    ) : ( availableCopies > 0 &&
                        <Tooltip title="Add to Cart">
                            <IconButton 
                                sx={{
                                    marginLeft: "auto"
                                }}
                                aria-label="Add to Cart"
                                onClick={() => {
                                    if (singleBook){
                                        const item : SingleBook = {
                                            _id : singleBook._id ,
                                            ISBN: singleBook.ISBN,
                                            title : singleBook.title,
                                            img : singleBook.img,
                                            description : singleBook.description,
                                            category : singleBook.category,
                                            publisher: singleBook.publisher,
                                            edition: singleBook.edition,
                                            author: singleBook.author,
                                        }
                                        dispatch(increaseCount({ _id: item._id, title: item.title, ISBN: item.ISBN}))
                                    }
                                }}
                            >
                                <AddIcon />
                            </IconButton>
                        </Tooltip>
                    )}
                </CardActions>
            </Card>
            { userRole === "Admin" &&
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
                                bgcolor: "background.paper",
                                border: "2px solid #0000",
                                boxShadow : 24,
                                p: 4
                            }}
                        >
                            <Typography>
                                Edit book {title}
                            </Typography>
                            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="title"
                                    label="Title"
                                    name="title"                            
                                    autoFocus
                                    defaultValue={title}
                                />
                                <TextField
                                    select
                                    margin="normal"
                                    required
                                    fullWidth
                                    label="Category"
                                    name="category"
                                    defaultValue={category && category[0]._id}
                                >
                                    {categories 
                                        && 
                                        categories.map(({
                                            _id,
                                            name,
                                        } : Category) => (
                                    <MenuItem key={_id} value={_id}>{name}</MenuItem>     
                                    ))}
                                </TextField>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="description"
                                    label="Description"
                                    id="description"
                                    defaultValue={description}
                                />                               
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                Submit
                                </Button>                                                                                               
                            </Box>
                        </Box>
                    </Fade>
                </Modal>
            }
        </Box>
    )
}