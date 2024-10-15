import axios from 'axios';
import { useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import {
  setError,
  setJobs,
  setLoading,
} from '../redux/slices/jobSlice';
import Card from '../components/Card';
import Filter from '../components/filter';


const JobList = () => {
    const dispatch = useDispatch();

    const state = useSelector((store) => store.jobSlice)
    
    
  // api'den verileri alıp store'a aktarır 
  const fetchData = () => {
      // 1) yüklenme durmunu güncelle
      dispatch(setLoading());

      axios
      .get('http://localhost:4501/jobs')
      //2) veri gelirse store a aktar
      .then((res) => dispatch(setJobs(res.data)))
      //3) hata olursa store'u güncelle
      .catch(() => dispatch(setError()));
  }
  
  // bileşen ekrana basıldığında verileri çek
  useEffect(() => {
     fetchData();
  }, []);

  return (
    <div className='list-page'>
      <Filter jobs={state.jobs}/>
      {/* 
      1)Yüklenme devam ediyorsa loader bas
      2)Yüklenme bittiyse ve hata varsa hata mesajı bas
      3)yüklenme bittiyse ve hata yoksa verileri bas
      */}
      {state.isLoading ? (
        <Loader />
      ) : state.isError ? (
        <p
         className='error'
        >Üzgünüz verilere erişirken bir sorun oluştu.
          <button onClick={fetchData}type="button" class="button">
            <span class="button__text">Refresh</span>
            <span class="button__icon"><svg class="svg" height="48" viewBox="0 0 48 48" width="48" xmlns="http://www.w3.org/2000/svg"><path d="M35.3 12.7c-2.89-2.9-6.88-4.7-11.3-4.7-8.84 0-15.98 7.16-15.98 16s7.14 16 15.98 16c7.45 0 13.69-5.1 15.46-12h-4.16c-1.65 4.66-6.07 8-11.3 8-6.63 0-12-5.37-12-12s5.37-12 12-12c3.31 0 6.28 1.38 8.45 3.55l-6.45 6.45h14v-14l-4.7 4.7z"></path><path d="M0 0h48v48h-48z" fill="none"></path></svg></span>
          </button>

        </p>
      ) : (
        <div className='job-list'>
          {state.jobs?.map((job) =>
            <Card key={job.key} job={job} />)}
        </div>
      )}
    </div>
  );
};

export default JobList;