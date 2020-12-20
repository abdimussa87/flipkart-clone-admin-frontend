import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, makeStyles, MenuItem, Select, TextField } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import './Category.css';
import { createCategoryAsync, fetchCategoriesAsync } from './features/categorySlice';

const useStyles = makeStyles((theme) => ({
    formControl: {
        marginTop: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));


function Category() {
    const dispatch = useDispatch();
    // const [categories,setCategories] = useState([]);
    const categories = useSelector(state => state.category.categories);

    const [categoryName, setCategoryName] = useState('');
    const [parentCategoryId, setParentCategoryId] = useState('');
    const [categoryImage, setCategoryImage] = useState('');
    const classes = useStyles();


    useEffect(() => {
        dispatch(fetchCategoriesAsync({}));
    }, [dispatch]);

    const handleAddClick = async () => {
        const form = new FormData();
        form.append("name", categoryName);
        form.append('parentId', parentCategoryId);
        form.append("categoryImage", categoryImage);
        dispatch(createCategoryAsync(form));
        setOpen(false);
    }

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (event) => {
        setParentCategoryId(event.target.value);
    };


    const renderCategories = (categories) => {
        let newCategoryList = []
        for (let cat of categories) {
            if (cat.children.length === 0) {
                newCategoryList.push(
                    <li key={cat.name}>
                        {cat.name}
                    </li>)
            } else {
                newCategoryList.push(

                    <li key={cat.name}>{cat.name}
                        <ul>
                            {renderCategories(cat.children)}
                        </ul>
                    </li>

                )
            }
        }
        return newCategoryList;

    }

    const createSelectOptions = (categories, options = []) => {
        for (let cat of categories) {
            options.push({ id: cat.id, name: cat.name });
            if (cat.children.length > 0) {
                createSelectOptions(cat.children, options);
            }
        }
        return options;
    }

    return (
        <div className='category'>
            <div className="category__header">
                <h3>Category</h3>
                <Button onClick={handleClickOpen}>Add</Button>
            </div>
            <div className="category__body">

                <ul>
                    {
                        categories.length > 0 ?
                            renderCategories(categories)
                            : null}

                </ul>
            </div>
            <div>

                <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title"
                    maxWidth='xs' fullWidth={true}>
                    <DialogTitle id="form-dialog-title">Add New Category</DialogTitle>
                    <DialogContent>

                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Name"
                            fullWidth
                            value={categoryName}
                            onChange={(e) => setCategoryName(e.target.value)}
                        />
                        <TextField
                            type="file"
                            margin="dense"
                            id="categoryImage"
                            fullWidth
                            onChange={(e) => setCategoryImage(e.target.files[0])}
                        />
                        <div>
                            <FormControl fullWidth={true} className={classes.formControl}>
                                <InputLabel id="demo-simple-select-label">Select Category</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={parentCategoryId}
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


            </div>

        </div>
    )
}

export default Category
