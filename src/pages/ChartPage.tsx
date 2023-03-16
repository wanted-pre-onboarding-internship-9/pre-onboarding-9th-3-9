import { useNavigate } from 'react-router-dom';

import Chart from '../components/Chart';
import { useChartData } from '../hooks/useChartData';

const ChartPage = () => {
  const { idArray } = useChartData();
  const navigate = useNavigate();

  const filterBtnList: string[] = [...new Set(idArray)].concat('전체');

  return (
    <div>
      <div>
        {filterBtnList.map(id => (
          <button key={id} onClick={() => navigate(`/${id}`)}>
            {id}
          </button>
        ))}
      </div>
      <Chart />
    </div>
  );
};

export default ChartPage;
