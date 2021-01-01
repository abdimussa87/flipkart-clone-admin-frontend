import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, makeStyles, MenuItem, Select, TextField } from '@material-ui/core';
import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import './Category.css';
import { createCategoryAsync } from './features/categorySlice';
import CheckboxTree from 'react-checkbox-tree';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';

import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import { IoIosArrowDown, IoIosArrowForward, IoIosLocate } from "react-icons/io";
import { CheckBoxOutlineBlankOutlined } from '@material-ui/icons';

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
function Category() {
    const dispatch = useDispatch();
    // const [categories,setCategories] = useState([]);
    const categories = useSelector(state => state.category.categories);

    const [categoryName, setCategoryName] = useState('');
    const [parentCategoryId, setParentCategoryId] = useState('');
    const [categoryImage, setCategoryImage] = useState('');
    const [checked, setChecked] = useState([]);
    const [expanded, setExpanded] = useState([]);
    const classes = useStyles();



    const handleAddClick = async () => {
        const form = new FormData();
        form.append("name", categoryName);
        form.append('parentId', parentCategoryId);
        form.append("categoryImage", categoryImage);
        dispatch(createCategoryAsync(form));
        setCategoryName('');
        setParentCategoryId('');
        setCategoryImage('');
        setOpen(false);
    }

    const [open, setOpen] = useState(false);

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
            newCategoryList.push(
                {
                    label: cat.name,
                    value: cat.id,
                    children: cat.children.length > 0 && renderCategories(cat.children)
                }
            )
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

    const renderAddCategoryModal = () => {
        return <div>

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
    }

    return (
        <div className='category'>
            <div className="category__header">
                <h3>Category</h3>
                <Button onClick={handleClickOpen}>Add</Button>
            </div>
            <div className="category__body">
                {/* <ul>
                    {
                        categories.length > 0 ?
                            renderCategories(categories)
                            : null}

                </ul> */}
                <CheckboxTree
                    nodes={renderCategories(categories)}
                    checked={checked}
                    expanded={expanded}
                    onCheck={checked => setChecked(checked)}
                    onExpand={expanded => setExpanded(expanded)}
                    icons={{
                        check: <CheckBoxIcon />,
                        uncheck: <CheckBoxOutlineBlankOutlined />,
                        expandClose: <IoIosArrowForward />,
                        expandOpen: <IoIosArrowDown />,
                        halfCheck: <CheckBoxOutlineBlankIcon />,
                        parentClose: <IoIosLocate />,
                        parentOpen: <IoIosLocate />,
                        leaf: <IoIosLocate />
                    }}
                />

            </div>
            {renderAddCategoryModal()}

        </div>
    )
}

export default Category
