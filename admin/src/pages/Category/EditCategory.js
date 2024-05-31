import React, { useState, useEffect } from 'react';
import CSS from './EditCategory.module.css';
import GridLayout from '../../components/GridLayout';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom"

const EditCategory = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get(" http://localhost:1783/api/getcategory")
      .then((res) => {
        const sortedCategory = res.data.sort((a, b) =>
          a.categoryName.localeCompare(b.categoryName)
        );
        setCategories(sortedCategory);
      })
      .catch((err) => console.error(err));
  };



  const handleDeleteCategory = (categoryId) => {
    axios
      .delete(` http://localhost:1783/api/deletecategory/${categoryId}`)
      .then((res) => {
        fetchData();
        toast.success("Category deleted Successfully");
      })
      .catch((err) => {
        toast.error("Error in deleting category");
      });
  };


  const handleEditCategory = (categoryId, newname) => {
    navigate("/addcategory")
    // axios
    //   .patch(` http://localhost:1783/api/updateCat/${categoryId}/${newname}`)
    //   .then((res) => {
    //     fetchData();
    //     toast.success("Category deleted Successfully");
    //   })
    //   .catch((err) => {
    //     toast.error("Error in deleting category");
    //   });
  };

  return (
    <GridLayout>
      <h1 className={CSS['addcategory-title']}>Edit your Category</h1>
      <table className={CSS['table']}>
        <thead>
          <tr>
            <th className={CSS['table-head-row']}>Category Name</th>
            <th className={CSS['table-head-row']}>Category Image</th>
            <th className={`${CSS['table-head-row']} ${CSS['table-head-btn']}`}>Edit Category</th>
            <th className={`${CSS['table-head-row']} ${CSS['table-head-btn']}`}>Delete Category</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((list) => (
            <tr key={list._id}>
              <td className={CSS['table-data']}>{list.categoryName}</td>
              <td className={CSS['table-data']}>
                <img src={` http://localhost:1783/Images/${list.categoryImage}`} alt={list.categoryName} width={'80px'} height={'80px'} />
              </td>
              <td className={CSS['table-data']}>
                <button className={CSS['table-data-edit-btn']} type='button' onClick={() => handleEditCategory(list._id)} >
                  Edit
                </button>
              </td>
              <td className={CSS['table-data']}>
                <button className={CSS['table-data-delete-btn']} type='button' onClick={() => handleDeleteCategory(list._id)} >
                  Delete
                </button>

              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ToastContainer />
    </GridLayout>
  );
};

export default EditCategory;
