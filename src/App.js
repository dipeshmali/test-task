import {useState,useRef} from 'react';
import moment from 'moment';
import './App.css';

const App = () => {
  const [time, setTime] = useState({startTime:null,endTime:null})
  const [magicTime, setMagicTime] = useState([]);
  const [loader, setLoader] = useState(false);

  const handleChange = (e) => {
    setTime({
      ...time,
      [e.target.name] : e.target.value
    })
  }

    const getMagicTimes = () => {
      const startTimeVal = moment(`${moment().format('DD-MM-YYYY')}${time.startTime}`,'DD-MM-YYYYhh:mm:ss')
      const endTimeVal = moment(`${moment().format('DD-MM-YYYY')}${time.endTime}`,'DD-MM-YYYYhh:mm:ss')
      let startTimeTimeStamp = Math.floor(new Date(startTimeVal) / 1000);
      let endTimeTimeStamp = Math.floor(new Date(endTimeVal) / 1000);
      const magicTime = [];
      setLoader(true)
      
      while(startTimeTimeStamp < endTimeTimeStamp ){
        const strTime =  moment(new Date(startTimeTimeStamp*1000)).format('hh:mm:ss')
        const newStrTime = strTime.replaceAll(":","")
        const timeStrArr = newStrTime.split('');
        const uniqueValues = [...new Set(timeStrArr)];
        if(uniqueValues.length <= 2){
          magicTime.push(strTime)
        }
        startTimeTimeStamp++
      }
      setMagicTime([...new Set(magicTime)])
      if(startTimeTimeStamp === endTimeTimeStamp){
        setLoader(false)
      }
    }

    return (
      <div className="App">
        <div>
        <label>Start Time:</label>
          <input name="startTime" type="time" step="1" onChange={(e)=>handleChange(e)}/>  
        </div>
        <div>
        <label>End Time: </label>
          <input name="endTime" type="time" step="1" onChange={(e)=>handleChange(e)} /> 
        </div>
        <div>
          <button onClick={()=>getMagicTimes()}>Start</button>
        </div>
        <hr/>
        <p>Magic Time </p>
        <hr/>
        {loader ? 'loading...' : ''}
        {magicTime?.map(item=><p>{item}</p>)}
      </div>
    );
}

export default App;
