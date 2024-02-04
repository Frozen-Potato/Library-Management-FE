import { useEffect, useState } from "react";
import { 
    ImageList,
    ImageListItem,
    ImageListItemBar,
    IconButton,
    Pagination,
    Box,
    Typography,
    Tooltip,
    Button,
    Modal,
    TextField,
    Fade,
    MenuItem
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add"

import { useAppDispatch } from "../../customHooks/useAppDispatch";
import { useAppSelector } from "../../customHooks/useAppSelector";


import { useDebounce } from "../../customHooks/useDebounce";
import { useNavigate } from "react-router-dom";
import { increaseCount } from "../../cart/cartSlice";
import { getUser } from "../../user/userSlice";
import { config } from "../../config";
import { Book } from "../../interfaces/Book";
import { bookSelector, getTotalEntries, getTotalPageNumber, fetchBooksFilteredAndPaginated } from "../bookSlice";
import { BookFilter } from "./BookFilters";
import { categoriesSelector } from "../../categories/categorySlice";
import { Category } from "../../interfaces/Category";

export const BooksList = () => {
    const [currentPageNumber, setCurrentPageNumber] = useState(1);
    const [currentCategory, setCurrentCategory] = useState<string>("");
    const [currentTitleSearchQuerry, setCurrentTitleSearchQuerry] = useState("");
    const [currentSortOrder, setCurrentSortOrder] = useState<"asc" | "desc">("asc");
    const [currentSortBy, setCurrentSortBy] = useState<"title" | "publisher">("title")

    const [openModal, setOpenModal] = useState(false)

    const navigate = useNavigate();

    const debouceSearchQuerry = useDebounce(currentTitleSearchQuerry, 500);
    const books = useAppSelector(bookSelector.selectAll);
    const user = useAppSelector(getUser);
    const userRole = user ? user.role[0].title : "Borrower";

    const numberOfBooks = useAppSelector(getTotalEntries);
    const totalPage = useAppSelector(getTotalPageNumber)

    const categories = useAppSelector(categoriesSelector.selectAll);

    const dispatch = useAppDispatch()

    useEffect(() => {
        handleFilterChange()
    }, [debouceSearchQuerry])

    useEffect(() => {
        dispatch(fetchBooksFilteredAndPaginated({ page: currentPageNumber , perPage : 6, searchQuery: debouceSearchQuerry, sortBy: currentSortBy, sortOrder: currentSortOrder, categoryName: currentCategory}))
    }, [dispatch, currentPageNumber, debouceSearchQuerry, currentCategory, currentSortBy, currentSortOrder]);

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPageNumber(value)
    }

    const handleImageClick = (ISBN : string, total: any) => {
        navigate(`${config.landingURL}Books/${ISBN}`)
    }

    const handleOpenModal = () => {
        setOpenModal(true);
    }

    const handleCloseModal = () => {
        setOpenModal(false);
    }

    const handleFilterChange = () => {
        setCurrentPageNumber(1)
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // const data = new FormData(event.currentTarget);
        // const submitData = {
        //     title : (data.get('title') as FormDataEntryValue).toString(),
        //     description : (data.get('description') as FormDataEntryValue).toString(),
        //     price : parseInt((data.get('price') as FormDataEntryValue).toString()),
        //     categoryId : 1,
        //     images : ['https://placehold.co/400']
        // }
        // await dispatch(createProduct(submitData));
        handleCloseModal();
    }

    return (
        <Box
            component="section" pt={10}
        >
                <BookFilter 
                    handleFilterChange={handleFilterChange}

                    searchQuery={currentTitleSearchQuerry} 
                    setSearchQuery={setCurrentTitleSearchQuerry}

                    currentCategory={currentCategory}
                    setCurrentCategory={setCurrentCategory}

                    currentSortBy={currentSortBy}
                    setCurrentSortBy={setCurrentSortBy}

                    currentSortOrder={currentSortOrder}
                    setCurrentSortOrder={setCurrentSortOrder}
                />
                { userRole === "Admin" && 
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            marginBottom: "15px"
                        }}
                    >
                        <Button
                            onClick={handleOpenModal}
                            variant="contained"
                        >
                            Create New Book
                        </Button>
                    </Box>
                    
                }
                <ImageList
                    sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        justifyContent: "center",
                        alignContent: "center",
                    }}
                >
                    { books 
                        && 
                        books.map(({ 
                            _id, 
                            ISBN, 
                            title , 
                            img, 
                            author,
                            description,
                            publisher,
                            edition,
                            category,
                            availableCopies
                        } : Book) => (
                            <ImageListItem key={_id} sx={{ width: "25%" }}>
                                <img
                                    srcSet={img}
                                    src={img}
                                    alt={title}
                                    loading="lazy"
                                    onClick={() => handleImageClick(ISBN, availableCopies)}
                                    onError={(e) => {
                                        const target = e.target as HTMLImageElement;
                                        target.srcset = `https://placehold.co/400`
                                    }}                                    
                                />
                                
                                    <ImageListItemBar
                                        position="top"
                                        title={title}
                                        subtitle={author[0].fullName}
                                        actionIcon={
                                            availableCopies[0].total > 0 &&
                                            <Tooltip title="Add to Cart">
                                                <IconButton
                                                    aria-label="Add to Cart"
                                                    onClick={() => {
                                                        dispatch(increaseCount({ _id, title, ISBN}))
                                                    }}
                                                >
                                                    <AddIcon />
                                                </IconButton>
                                            </Tooltip>
                                        }
                                    />    
                                    <ImageListItemBar
                                        title={"Available Copies: " + availableCopies[0].total}
                                    />                            
                            </ImageListItem>
                    ))}            
                </ImageList>
                { numberOfBooks === 0 ? ( 
                    <Typography
                        variant="h3"
                        sx={{
                            textAlign: "center"
                        }}
                    >
                        No Book found.
                    </Typography>
                ) : (
                    <Pagination 
                        sx={{
                            display: "flex",
                            flexWrap: "wrap",
                            justifyContent: "center",
                            alignContent: "center"
                        }}
                        count={totalPage}
                        page={currentPageNumber}
                        onChange={handleChange}
                    />
                )}
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
                                Add New Book
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
                                />
                                <TextField
                                    select
                                    margin="normal"
                                    required
                                    fullWidth
                                    label="Category"
                                    name="category"
                                    defaultValue={categories && categories[0]._id}
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
