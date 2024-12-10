import Main from '../../components/Main/Main.js';
import Header from '../../components/Header/Header.js';

const Home = (props) => {
  const { schedules } = props;
  console.log(schedules);
  return (
    <div>
      <Header />
      <Main schedules={schedules} />
    </div>
  );
};

export default Home;
