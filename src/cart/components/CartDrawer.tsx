import { Fragment, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { Close, ShoppingCart } from '@mui/icons-material';
import {
  Badge,
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';

import { useAppSelector } from '../../customHooks/useAppSelector';
import { useAppDispatch } from '../../customHooks/useAppDispatch';
import { cartSelector, checkOut, getQuantity } from '../cartSlice';
import CartCard from './CartCard';
import { getLoggedInStatus } from '../../user/userSlice';



const CartDrawer = () => {
    const [openDrawer, setOpenDrawer] = useState(false);
    
    const cart = useAppSelector(cartSelector.selectAll);
    const cartQuantity = useAppSelector(getQuantity);

    const loginStatus = useAppSelector(getLoggedInStatus);

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const toggleDrawer = () => {
        setOpenDrawer(!openDrawer);
    };

    const handleCheckout = () => {
        try {
            dispatch(checkOut())
            toggleDrawer();
            navigate('/');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Fragment>
        <IconButton onClick={toggleDrawer}>
            <Badge badgeContent={cartQuantity} color="secondary">
            <ShoppingCart />
            </Badge>
        </IconButton>
        <Drawer anchor="right" open={openDrawer}>
            <Box sx={{ width: 375 }} role="presentation">
            <Box
                display={'flex'}
                justifyContent="space-between"
                paddingY={1}
                paddingX={2}
                alignItems="center"
            >
                <Typography variant="h6">Shopping Cart</Typography>
                <IconButton aria-label="close drawer" onClick={toggleDrawer}>
                <Close />
                </IconButton>
            </Box>
            <Divider />
            <Box overflow="auto" height="550px">
                { cart.map((row)=>(
                    <Fragment key={row.bookId}>
                        <CartCard item={row}/>
                    </Fragment>
                ))}
            </Box>

            <Box padding={2}>
                <Stack gap={2} marginTop={2}>
                    { loginStatus === true && 
                        <Button fullWidth variant="contained" onClick={handleCheckout}>
                            Borrow Books
                        </Button>
                    }
                    <Button fullWidth variant="outlined" onClick={toggleDrawer}>
                        Continue Searching
                    </Button>
                </Stack>
            </Box>
            </Box>
        </Drawer>
        </Fragment>
);
};

export default CartDrawer;