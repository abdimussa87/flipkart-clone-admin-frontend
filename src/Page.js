import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, makeStyles, MenuItem, Select, TextField } from '@material-ui/core'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createPageAsync } from './features/pageSlice';
import './Page.css'
import Alert from '@material-ui/lab/Alert';
import { clearMessage } from './features/pageSlice'

const useStyles = makeStyles((theme) => ({
    formControl: {
        marginTop: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

function Page() {

    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const categories = useSelector(state => state.category.categories);
    const message = useSelector(state => state.page.message);

    const [pageTitle, setPageTitle] = useState('');
    const [description, setDescription] = useState('');
    const [banners, setBanners] = useState([]);
    const [products, setProducts] = useState([]);
    const [categoryId, setCategoryId] = useState('');

    const dispatch = useDispatch();

    const createSelectOptions = (categories, options = []) => {
        for (let cat of categories) {
            options.push({ id: cat.id, name: cat.name });
            if (cat.children.length > 0) {
                createSelectOptions(cat.children, options);
            }
        }
        return options;
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleAddClick = () => {
        const form = new FormData();
        if (pageTitle.trim().length === 0) {
            alert('Title cannot be empty')
            return;
        }

        if (description.trim().length === 0) {
            alert('Description cannot be empty')
            return;
        }
        if (categoryId === '') {
            alert('Select category')
            return;
        }

        form.append('title', pageTitle);
        form.append('description', description);
        form.append('category', categoryId);
        form.append('type', 'page');
        for (let banner of banners) {
            form.append('banners', banner);
        }
        for (let product of products) {
            form.append('products', product);
        }


        dispatch(createPageAsync({ form }));
        setOpen(false);
        setPageTitle('');
        setDescription('');
        setCategoryId('');
        setBanners([]);
        setProducts([]);

    }

    const handleBannerImages = (e) => {
        setBanners([...banners, e.target.files[0]]);
    }
    const handleProductImages = (e) => {
        setProducts([...products, e.target.files[0]]);
    }

    const renderCreatePageModal = () => {
        return <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title"
            maxWidth='xs' fullWidth={true}>
            <DialogTitle id="form-dialog-title">Create New Page</DialogTitle>
            <DialogContent>

                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Title"
                    fullWidth
                    value={pageTitle}
                    onChange={(e) => setPageTitle(e.target.value)}
                />
                <TextField
                    margin="dense"
                    id="description"
                    label="Description"
                    fullWidth
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <label className='page__label' htmlFor="bannerImage">Banner Images</label>
                <TextField
                    type="file"
                    id="bannerImage"
                    fullWidth
                    onChange={handleBannerImages}
                />
                {banners.length > 0 && banners.map((img, index) => (<div key={index} >{img.name}</div>))}
                <label className='page__label' htmlFor="products">Products Image</label>
                <TextField
                    type="file"
                    id="products"
                    fullWidth
                    onChange={handleProductImages}
                />
                {products.length > 0 && products.map((img, index) => (<div key={index} >{img.name}</div>))}
                <div>
                    <FormControl fullWidth={true} className={classes.formControl}>
                        <InputLabel id="demo-simple-select-label">Select Category</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={categoryId}
                            onChange={(e) => setCategoryId(e.target.value)}
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
    }
    return (
        <div className='page'>
            {renderCreatePageModal()}
            {message && <Alert onClose={() => { dispatch(clearMessage()) }}>{message}</Alert>}
            <Button variant='outlined' onClick={() => setOpen(true)}>Create Page</Button>
        </div>
    )
}

export default Page
