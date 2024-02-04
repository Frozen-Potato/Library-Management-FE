import { useEffect } from "react"

import { Box, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent, TextField } from "@mui/material"

import { useAppSelector } from "../../customHooks/useAppSelector"
import { useAppDispatch } from "../../customHooks/useAppDispatch"
import { categoriesSelector, fetchCategories } from "../../categories/categorySlice"
import { Category } from "../../interfaces/Category";

interface ProductFilterInterface {
    handleFilterChange : () => void
    searchQuery : string,
    setSearchQuery : (query : string) => void,
    currentCategory : string,
    setCurrentCategory : (category : string) => void,
    currentSortBy: "title" | "publisher",
    setCurrentSortBy : (sortBy :  "title" | "publisher") => void
    currentSortOrder : "asc" | "desc",
    setCurrentSortOrder : (sortOrder : "asc" | "desc") => void,
}

export const BookFilter = ({
    handleFilterChange,
    searchQuery,
    setSearchQuery,
    currentCategory,
    setCurrentCategory,
    currentSortOrder,
    setCurrentSortOrder,
    currentSortBy,
    setCurrentSortBy
} : ProductFilterInterface) => {

    const dispatch = useAppDispatch();
    const categories = useAppSelector(categoriesSelector.selectAll);

    useEffect(() =>{
        dispatch(fetchCategories());
    }, [dispatch])

    const handleCategoryChange = (event: SelectChangeEvent) => {
        handleFilterChange()
        setCurrentCategory(event.target.value)
    }

    const handleSortByChange = (event: SelectChangeEvent) => {
        handleFilterChange()
        setCurrentSortBy(event.target.value === "publisher" ? "publisher" : "title")
    }

    const handleSortOrderChange = (event: SelectChangeEvent) => {
        handleFilterChange()
        setCurrentSortOrder(event.target.value === "asc" ? "asc" : "desc")
    }

    const handleChangeSearchQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value)
    }

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: "15px"
            }}
        >
            <FormControl
                sx={{
                    minWidth : 150,
                    marginRight : "10px"
                }}
            >
                <InputLabel id="selectCategory">Category</InputLabel>
                    <Select
                        labelId="selectCategory"
                        id="selectCategory"
                        value={currentCategory}
                        onChange={handleCategoryChange}
                        label="Category"
                    >
                        <MenuItem key={0} value={""}>All Category</MenuItem>
                        {categories 
                            && 
                            categories.map(({
                                _id,
                                name,
                            } : Category) => (
                        <MenuItem key={_id} value={name}>{name}</MenuItem>     
                        ))}
                    </Select>
            </FormControl>
            <FormControl
                sx={{
                    minWidth : 150,
                    marginRight : "10px"
                }}
            >
                <InputLabel id="selectCategory">Sort By</InputLabel>
                    <Select
                        labelId="selectCategory"
                        id="selectCategory"
                        value={currentSortBy}
                        onChange={handleSortByChange}
                        label="Category"
                    >
                        <MenuItem key={1} value={"title"}>Sort By Title</MenuItem>  
                        <MenuItem key={2} value={"publisher"}>Sort By Publisher</MenuItem>
                    </Select>
            </FormControl>
            <FormControl
                sx={{
                    minWidth : 150,
                    marginRight : "10px"
                }}
            >
                <InputLabel id="selectPriceSort">Sort Order</InputLabel>
                <Select
                        labelId="selectPriceSort"
                        id="selectPriceSort"
                        value={currentSortOrder}
                        onChange={handleSortOrderChange}
                        label="Sort by"
                >
                        <MenuItem key={1} value={"asc"}>Ascend</MenuItem>  
                        <MenuItem key={2} value={"desc"}>Descend</MenuItem>  
                </Select>
            </FormControl>

            <FormControl>
                <TextField
                    label="Search by Title"
                    variant="outlined"
                    value={searchQuery}
                    onChange={handleChangeSearchQuery}
                />
            </FormControl>
        </Box>
    )
}