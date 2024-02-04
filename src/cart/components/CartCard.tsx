import DeleteIcon from '@mui/icons-material/Delete';
import {
  Box,
  Grid,
  IconButton,
  Typography,
} from '@mui/material';

import { useAppDispatch } from '../../customHooks/useAppDispatch';
import { CartData, CartItem } from '../../interfaces/Cart';
import { Remove, Add } from '@mui/icons-material';
import { decreaseCount, increaseCount, removeItem } from '../cartSlice';

type CartCardProps = {
    item: CartItem;
};

const CartCard = ({item}: CartCardProps) => {

  const dispatch = useAppDispatch();

  const handleIncreaseItem = (item : CartData) => {
    dispatch(increaseCount(item))
  };

  const handleDecreaseItem = (item : CartData) => {
    dispatch(decreaseCount(item))
  };

  const handleRemove = (item : CartData) => {
    dispatch(removeItem(item))
  };

  return (
    <Grid
      container
      padding={2}
      display={'flex'}
      justifyContent={'space-between'}
    >
      <Grid item xs={6}>
        <Grid container direction={'column'} gap={1}>
          <Grid item>
            <Typography variant="h6">{item.bookName}</Typography>
            <Box display={'flex'} gap={1}>
              <IconButton
                aria-label="decrease"
                disabled={item.quantity === 1}
                onClick={(e) => handleDecreaseItem({_id: item.bookId, title: item.bookName, ISBN: item.bookISBN})}
              >
                <Remove fontSize="inherit" />
              </IconButton>
              <Typography variant="h6">{item.quantity}</Typography>
              <IconButton
                aria-label="increase"
                onClick={(e) => handleIncreaseItem({_id: item.bookId, title: item.bookName, ISBN: item.bookISBN})}
              >
                <Add fontSize="inherit" />
              </IconButton>
            </Box>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={3}>
        <Grid
          container
          direction="column"
          justifyContent="space-between"
          alignItems="end"
          sx={{ height: '100%' }}
        >
          <Grid item>
            <IconButton
              aria-label="delete"
              onClick={(e) => handleRemove({_id: item.bookId, title: item.bookName, ISBN: item.bookISBN})}
            >
              <DeleteIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CartCard;