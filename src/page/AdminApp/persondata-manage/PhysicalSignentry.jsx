import React, { useState, useEffect} from 'react';
import { TimePicker, Input, Button, Space, Row, Col, Card, AutoComplete, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import './PhysicalSignentry.css';
import Fuse from 'fuse.js';
import { handleApiResponse } from '../../../utils/apiHelpers';
import { submitDailyData } from '../../../api/auth/submitDailyData';
import { getRecentWeight } from '../../../api/auth/getSportsCategory';


const PhysicalSignentry = () => {
  const [sports, setSports] = useState([]);
  // const sports = [
  //   { id: 1, icon: '🏀', name: 'Basketball' },
  //   { id: 2, icon: '⚽', name: 'Football' },
  //   { id: 3, icon: '🏸', name: 'Badminton' },
  //   { id: 4, icon: '🎾', name: 'Tennis' },
  //   { id: 5, icon: '🏐', name: 'Volleyball' },
  //   { id: 6, icon: '🏉', name: 'Rugby' },
  //   { id: 7, icon: '🥏', name: 'Frisbee' },
  //   { id: 8, icon: '🏓', name: 'Ping Pong' },
  //   { id: 9, icon: '⛳', name: 'Golf' },
  //   { id: 10, icon: '🥅', name: 'Hockey' },
  //   { id: 11, icon: '🏏', name: 'Cricket' },
  //   { id: 12, icon: '🏑', name: 'Field Hockey' },
  //   { id: 13, icon: '🎿', name: 'Skiing' },
  //   { id: 14, icon: '⛷️', name: 'Snowboarding' },
  //   { id: 15, icon: '🏂', name: 'Ice Skating' },
  //   { id: 16, icon: '🤺', name: 'Fencing' },
  //   { id: 17, icon: '🏊', name: 'Swimming' },
  //   { id: 18, icon: '🚣', name: 'Rowing' },
  //   { id: 19, icon: '🚴', name: 'Cycling' },
  //   { id: 20, icon: '🤸', name: 'Gymnastics' },
  //   { id: 21, icon: '🧗', name: 'Climbing' },
  //   { id: 22, icon: '🏄', name: 'Surfing' },
  //   { id: 23, icon: '🛹', name: 'Skateboarding' },
  //   { id: 24, icon: '🎳', name: 'Bowling' },
  //   { id: 25, icon: '🥊', name: 'Boxing' },
  //   { id: 26, icon: '🥋', name: 'Martial Arts' },
  //   { id: 27, icon: '🥁', name: 'Drumming' },
  //   { id: 28, icon: '🏇', name: 'Horseback Riding' },
  //   { id: 29, icon: '🤽', name: 'Water Polo' },
  //   { id: 30, icon: '🤾', name: 'Handball' },
  //   { id: 31, icon: '⛹️', name: 'Basketball' },
  //   { id: 32, icon: '🏋️', name: 'Weightlifting' },
  //   { id: 33, icon: '🚵', name: 'Mountain Biking' },
  // ];
  const token = localStorage.getItem("token");
  
  useEffect(() => {
    const fetchSports = async () => {
      try {
        const response = await getRecentWeight(token)
        const result = handleApiResponse(response);

        if (result.success) {
          message.success("获取运动类别成功");
          console.log("result.data",result.data);
          setSports(result.data);
        } else {
          console.error(result.message);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchSports();
  }, [token]);

  const meals = [
    { name: '牛奶' },
    { name: '面包' },
  ];
  const [sleepTimeRange, setSleepTimeRange] = useState([]);
  const [breakfastValue, setBreakfastValue] = useState('');
  const [lunchValue, setLunchValue] = useState('');
  const [dinnerValue, setDinnerValue] = useState('');

  const [otherInputValue, setOtherInputValue] = useState('');

  const handleTimeRangeChange = (value) => {
    setSleepTimeRange(value);
  };

  const handleBreakfastChange = (value) => {
    setBreakfastValue(value);
  };

  const handleLunchChange = (value) => {
    setLunchValue(value);
  };

  const handleDinnerChange = (value) => {
    setDinnerValue(value);
  };

  const fuse = new Fuse(meals, {
    includeScore: true,
    findAllMatches: true,
    threshold: 0.3,
    minMatchCharLength: 1,
    keys: ['name'],
    useExtendedSearch: true,
  });

  const [searchResults, setSearchResults] = useState([]);
  const [selectedSports, setSelectedSports] = useState([]);
  const [focusedSport, setFocusedSport] = useState(null);
  const [inputValues, setInputValues] = useState({});
  const renderMealInput = (placeholder) => (
    <AutoComplete
      style={{ width: '40%', "marginRight": "10px", "marginBottom": "10px" }}
      options={searchResults}
      placeholder={placeholder}
      onSearch={handleSearch}
      onChange={(value) => {
        if (placeholder === '早餐') {
          handleBreakfastChange(value);
        } else if (placeholder === '午餐') {
          handleLunchChange(value);
        } else if (placeholder === '晚餐') {
          handleDinnerChange(value);
        }
      }}
    />
  );

  const handleSearch = (value) => {
    const query = value
      .split(' ')
      .filter((term) => term.trim().length > 0)
      .map((term) => ({ $and: [{ name: term }] }));
    const results = fuse.search({ $or: query });
    const filteredMeals = results.map((result) => result.item.name);
    setSearchResults(filteredMeals.map((meal) => ({ value: meal })));
  };


  const updateSelectedSports = (sport, isSelected) => {
    if (isSelected) {
      setSelectedSports([...selectedSports, sport]);
    } else {
      setSelectedSports(selectedSports.filter((s) => s.id !== sport.id));
    }
  };

  const handleSportClick = (sport) => {
    const isSelected = selectedSports.some((s) => s.id === sport.id);
    const inputValue = inputValues[sport.id];
    updateSelectedSports(sport, !isSelected && inputValue);
    setFocusedSport(sport);
  };

  const handleInputBlur = (sport) => {
    // const isSelected = selectedSports.some((s) => s.id === sport.id);
    const inputValue = inputValues[sport.id];
    updateSelectedSports(sport, inputValue);
    setFocusedSport(null);
  };

  //所有数据提交
  const submitData = async () => {
    const dailyData = {
      sleepTime: sleepTimeRange[0].format('YYYY-MM-DD HH:mm'),
      wakeTime: sleepTimeRange[1].format('YYYY-MM-DD HH:mm'),
      breakfast: breakfastValue,
      lunch: lunchValue,
      dinner: dinnerValue,
      sports: selectedSports.map((sport) => ({
        id: sport.id,
        duration: parseInt(inputValues[sport.id],10),
      })),
      other: otherInputValue,
      
    };
    console.log(JSON.stringify(dailyData));
    const token = localStorage.getItem('token');
    try {
      const response = await submitDailyData(dailyData, token);
      const result = handleApiResponse(response);
      console.log(result);
      if (result.success) {
        setSearchResults([]);
        setSelectedSports([]);
        setInputValues({});
        message.success('数据已成功提交！');
      } else {
        message.error(result.message);
      }
    } catch (error) {
      console.log(error);
      message.error('请求失败，请重试！');
    }
  };

  return (
    <div style={{ padding: '2rem'}} >
      <h1 style={{ "fontSize": '20px', "marginBottom": "20px" }}>记录您的一天</h1>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Row gutter={16}>
          <Col span={12}>
            <h3>睡眠时间</h3>
            <TimePicker.RangePicker
              format="YYYY-MM-DD HH:mm:ss"
              onChange={handleTimeRangeChange}
            />

          </Col>
        </Row>

        <h3 style={{ "marginBottom": "-3px" }}>一日三餐</h3>
        <Input.Group compact>
          {renderMealInput('早餐')}
          {renderMealInput('午餐')}
          {renderMealInput('晚餐')}
        </Input.Group>

        <h3>运动</h3>
        <Row gutter={[16, 16]} style={{"width":"86%"}}>
          {sports.map((sport) => {
            const isSelected = selectedSports.some((s) => s.id === sport.id);
            const isFocused = focusedSport && focusedSport.id === sport.id;
            return (
              <Col key={sport.id}>
                <Card
                  className={`sport-card ${(isFocused || inputValues[sport.id]) ? 'selected' : ''}`}
                  onClick={() => handleSportClick(sport)}
                >
                  {sport.icon}
                  {(isSelected || isFocused) && (
                    <>
                      <div
                        style={{
                          height: '60%',
                          width: '1px',
                          backgroundColor: 'white',
                          margin: '0 8px',
                        }}
                      ></div>
                      <Input
                        autoFocus={isFocused}
                        style={{ width: '60px', color: '#777', boxShadow: 'none' }}
                        value={inputValues[sport.id] || ''}
                        onChange={(e) =>
                          setInputValues({ ...inputValues, [sport.id]: e.target.value })
                        }
                        placeholder="分钟"
                        onBlur={() => handleInputBlur(sport)}
                      />
                    </>
                  )}
                </Card>
              </Col>
            );
          })}
        </Row>
        <h3 style={{"marginBottom":"-5px"}}>其他</h3>
        <Input
          placeholder="其他"
          value={otherInputValue}
          onChange={(e) => setOtherInputValue(e.target.value)}
          style={{'width':"80%"}}
        />
        <Button type="primary" icon={<PlusOutlined />} onClick={submitData}>
          提交
        </Button>
      </Space>
    </div>
  );
};
export default PhysicalSignentry;