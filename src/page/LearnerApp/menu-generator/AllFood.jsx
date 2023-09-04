import React, { useEffect, useState } from 'react';
import {  Card, Pagination, message } from 'antd';
import { Link,withRouter } from 'react-router-dom';
import { fetchAllEssayCategory, fetchEssayByCategory } from '../../../api/eaasy/essayApi';
import { handleApiResponse } from '../../../utils/apiHelpers';
import styles from '../course/Course.module.css';
import { fetchAllFoodCategory } from '../../../api/food/api';


function AllFood({location}) {
  const [selectedcategory,setSelectedCategory] = useState('所有类别');
  const [allCategory,setAllCategory] = useState([]);
  const [courses, setCourses] = useState([]);

  const [filteredCourses, setFilteredCourses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const handleCategoryClick = (categoryTitle) => {
    // const newFilteredCourses = courses.filter((course) => course.categoryKey === categoryKey);
    // setFilteredCourses(newFilteredCourses);
    setSelectedCategory(categoryTitle)
    setCurrentPage(1);
  };
  const fetchCoursesByCategory = async (category) => {
    try {
      const response = await fetchEssayByCategory(category);
      const result = handleApiResponse(response);
      if (result.success) {
        message.success("获取课程列表成功");
        setCourses(result.data);
      } else {
        message.error(result.message);
      }
    } catch (error) {
      message.error('获取课程列表失败', error);
    }
  };

  //获取所有的分类函数
  const fetchAllCategory = async () => {
    try {
      const response = await fetchAllFoodCategory();
      const result = handleApiResponse(response);
      if (result.success) {
        message.success("获取菜单类别成功");
        return result.data;
      } else {
        message.error(result.message);
      }
    } catch (error) {
      message.error('获取菜单类别失败', error);
    }
  };

  //组件加载获取所有的分类
  useEffect(() => {
    if (location.state?.category) {
      console.log(location.state);
      setSelectedCategory(location.state.category);
    }

    const fetchData = async () => {
      const result = await fetchAllCategory();
      setAllCategory([{id:0, title:'所有类别',key:'allType'},...result]);
    };

    fetchData();
  }, [location]);

  //组件加载获取相应分类的文章列表
  useEffect(() => {
    fetchCoursesByCategory(selectedcategory);
  }, [selectedcategory]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  return (
    <div style={{ marginTop: '30px' }}>
      <div style={{ display: 'flex', flexDirection: 'row'}}>
        <div className={styles.categories}>
          {allCategory.map((category) => (
            <Card
              key={category.key}
              className={
                category.title === selectedcategory
                  ? `${styles['category-card']} ${styles['category-card-selected']}`
                  : styles['category-card']
              }
              onClick={() => handleCategoryClick(category.title)}
            >
              {category.title}
            </Card>
          ))}
        </div>
        <div className={styles.courses}>
          <div className={styles['course-container']}>
            {courses
              .slice(
                (currentPage - 1) * itemsPerPage,
                currentPage * itemsPerPage
              )
              .map((course) => (
                <Card key={course.id} className={styles['course-card']}>
                  <h3>{course.name}</h3>
                  <p>{course.description.slice(0, 76)}{course.description.length > 50 ? '...' : ''}</p>
                  <Link to={`/course/${course.id}`}>查看详情</Link>
                </Card>
              ))}
          </div>
          <Pagination
            onChange={handlePageChange}
            current={currentPage}
            pageSize={itemsPerPage}
            total={courses.length}
            className={styles.pagination}
          />
        </div>
      </div>
    </div>
  );
}
export default withRouter(AllFood);
