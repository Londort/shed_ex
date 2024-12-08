import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SlArrowLeftCircle } from 'react-icons/sl';

import ScheduleInput from '../../components/ScheduleInput/ScheduleInput';

const AddNew = () => {
  const navigate = useNavigate();
  const [scheduleInputs, setScheduleInputs] = useState([1]);

  const addScheduleInput = () => {
    setScheduleInputs([...scheduleInputs, scheduleInputs.length + 1]);
  };

  return (
    <div className="AddNew">
      <header>
        <SlArrowLeftCircle onClick={() => navigate('/')} title="Go Back" />
        <input placeholder="Schedule Name"></input>
      </header>
      <main>
        {scheduleInputs.map((_, index) => (
          <div>
            <ScheduleInput key={index} />
          </div>
        ))}
        <button className="add-more" onClick={addScheduleInput}>
          Add More
        </button>
      </main>
    </div>
  );
};

export default AddNew;
