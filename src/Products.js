import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, Grid, InputLabel, makeStyles, MenuItem, Paper, Select, TextField } from '@material-ui/core'
import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { createProductAsync } from './features/productSlice';
import './Products.css'

const useStyles = makeStyles((theme) => ({
    formControl: {
        marginTop: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

//* component starts here
function Products() {
    const classes = useStyles();
    const products = useSelector(state => state.app.products)
    const [open, setOpen] = useState(false);
    const [openProductDetail, setOpenProductDetail] = useState(false);
    const categories = useSelector(state => state.app.categories);
    const [productName, setProductName] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [productPictures, setProductPictures] = useState([]);
    const [quantity, setQuantity] = useState();
    const [price, setPrice] = useState();
    const [description, setDescription] = useState('');
    const [productDetail, setProductDetail] = useState(null);

    const dispatch = useDispatch();

    const handleAddClick = async () => {
        const form = new FormData();
        form.append("name", productName);
        form.append('category', categoryId);
        form.append('price', price);
        form.append('description', description);
        form.append('quantity', quantity)
        for (let picture of productPictures) {
            form.append("productPicture", picture);
        }
        dispatch(createProductAsync(form));
        setOpen(false);
    }


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setProductName('');
        setProductPictures([]);
        setPrice();
        setQuantity();
        setDescription('');
        setOpen(false);
    };
    // *for select 
    const handleChange = (event) => {
        setCategoryId(event.target.value);
    };

    const createSelectOptions = (categories, options = []) => {
        for (let cat of categories) {
            options.push({ id: cat.id, name: cat.name });
            if (cat.children.length > 0) {
                createSelectOptions(cat.children, options);
            }
        }
        return options;
    }

    const renderAddProductModal = () => {
        return <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title"
            maxWidth='xs' fullWidth={true}>
            <DialogTitle id="form-dialog-title">Add New Product</DialogTitle>
            <DialogContent>

                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Name"
                    fullWidth
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                />
                <TextField
                    margin="dense"
                    label="Description"
                    id="description"
                    fullWidth
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <TextField
                    margin="dense"
                    id="quantity"
                    label="Quantity"
                    fullWidth
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                />
                <TextField
                    margin="dense"
                    id="price"
                    label="Price"
                    fullWidth
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />
                <TextField
                    type="file"
                    margin="dense"
                    id="productPictures"
                    fullWidth
                    onChange={(e) =>
                        setProductPictures([...productPictures, e.target.files[0]])}
                />
                {productPictures.length > 0 ? productPictures.map((pic, index) => <div key={index}>{pic.name}</div>) : null}
                <div>
                    <FormControl fullWidth={true} className={classes.formControl}>
                        <InputLabel id="demo-simple-select-label">Select Category</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={categoryId}
                            onChange={handleChange}
                        >
                            {createSelectOptions(categories).map(option => <MenuItem key={option.id} value={option.id}>{option.name}</MenuItem>)}


                        </Select>
                    </FormControl>
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} variant='contained'>
                    Cancel
                </Button>
                <Button variant='contained' onClick={handleAddClick} color="primary">
                    Add
                </Button>
            </DialogActions>

        </Dialog>
    };

    const handleCloseProductDetailModal = () => {
        setOpenProductDetail(false);
    }

    const showProductDetail = (product) => {
        setProductDetail(product);
        setOpenProductDetail(true);
    }


    const renderProductDetailModal = () => {
        if (!productDetail) {
            return null;
        }
        return <Dialog open={openProductDetail} onClose={handleCloseProductDetailModal} aria-labelledby="form-dialog-title"
            maxWidth='md' fullWidth={true}>
            <DialogTitle id="form-dialog-title">Product Details</DialogTitle>
            <DialogContent>

                <Paper >
                    <Grid container style={{ padding: 20 }} >
                        <Grid item xs={6}>
                            <label className="products__label" > Name</label>
                            <p className='products__value'>{productDetail.name}</p>
                        </Grid>
                        <Grid item xs={6}>
                            <label className="products__label" > Price</label>
                            <p className='products__value'>{productDetail.price}</p>
                        </Grid>
                        <Grid item xs={6}>
                            <label className="products__label" > Quantity</label>
                            <p className='products__value'>{productDetail.quantity}</p>
                        </Grid>
                        <Grid item xs={6}>
                            <label className="products__label" > Category</label>
                            <p className='products__value'>{productDetail.category.name}</p>
                        </Grid>
                        <Grid item xs={12}>
                            <label className="products__label" > Description</label>
                            <p className='products__value'>{productDetail.description}</p>
                        </Grid>
                        <Grid item xs={12}>
                            <label className="products__label" > Product Pictures</label>
                            <div className='products__images'>
                                {
                                    productDetail.productPictures.map(pic => {
                                        return <img key={pic._id} src={`http://localhost:8080/public/${pic.img}`} alt="" />
                                    })
                                }
                            </div>
                        </Grid>
                    </Grid>
                </Paper>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseProductDetailModal} variant='contained'>
                    Close
                </Button>

            </DialogActions>

        </Dialog>
    }

    return (
        <div className='products'>
            <div className="products__header">
                <h3>Products</h3>
                <Button onClick={handleClickOpen}>Add</Button>
            </div>
            <div>
                <div className="products__body">
                    {products.length > 0 ? <div className='products__table' style={{ "overflowX": "auto" }}>
                        <table>
                            <thead>

                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Category</th>
                                </tr>
                            </thead>
                            <tbody>

                                {products.map((product, index) => (<tr key={product._id} onClick={() => showProductDetail(product)}>
                                    <td>{index + 1}</td>
                                    <td>{product.name}</td>
                                    <td>{product.price}</td>
                                    <td>{product.quantity}</td>
                                    <td>{product.category.name}</td>
                                </tr>))}

                            </tbody>
                        </table>
                    </div> : null}
                </div>

                {renderAddProductModal()}
                {renderProductDetailModal()}

            </div>
        </div>
    )
}

export default Products
