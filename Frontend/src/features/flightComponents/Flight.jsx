import React, { useEffect, useState } from 'react';
import { SingleFlight } from './SingleFlight';
import styles from './singleflight.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { addFlights, flightError, flightLoading } from './flightSlice';
import { CircularProgress, Slider } from '@mui/material';

export const Flight = () => {
  const [flight, setFlight] = useState([]);
  const [filteredFlights, setFilteredFlights] = useState([]);
  const [duration, setDuration] = useState(true);
  const [departure, setDeparture] = useState(true);
  const [arrival, setArrival] = useState(true);
  const [fare, setFare] = useState(true);
  const [check, setCheck] = useState({
    departure_1: false,
    departure_2: false,
    departure_3: false,
    departure_4: false,
    non_stop: false,
    one_stop: false,
  });
  const [value, setValue] = useState([0, 45]);

  const { loading, error, flights } = useSelector((state) => ({
    loading: state.flight.loading,
    error: state.flight.error,
    flights: state.flight.flightDetails,
  }));

  const dispatch = useDispatch();

  useEffect(() => {
    getFlight();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [check, value]);

  const getFlight = () => {
    dispatch(flightLoading());
    fetch('https://justice-json-043.onrender.com/flights')
      .then((r) => r.json())
      .then((r) => {
        dispatch(addFlights(r));
        setFlight(r);
        setFilteredFlights(r);
      })
      .catch((e) => dispatch(flightError()));
  };

  const applyFilters = () => {
    let updatedFlights = flight.slice();

    // Apply departure time filters
    if (check.departure_1) {
      updatedFlights = updatedFlights.filter(
        (item) => item.departure_time.split(':').join('') < '0600'
      );
    }
    if (check.departure_2) {
      updatedFlights = updatedFlights.filter(
        (item) =>
          item.departure_time.split(':').join('') >= '0600' &&
          item.departure_time.split(':').join('') < '1200'
      );
    }
    if (check.departure_3) {
      updatedFlights = updatedFlights.filter(
        (item) =>
          item.departure_time.split(':').join('') >= '1200' &&
          item.departure_time.split(':').join('') < '1800'
      );
    }
    if (check.departure_4) {
      updatedFlights = updatedFlights.filter(
        (item) => item.departure_time.split(':').join('') >= '1800'
      );
    }

    // Apply stop filters
    if (check.non_stop) {
      updatedFlights = updatedFlights.filter((item) => item.stops === 'Non stop');
    }
    if (check.one_stop) {
      updatedFlights = updatedFlights.filter((item) => item.stops !== 'Non stop');
    }

    setFilteredFlights(updatedFlights);
  };

  const handleFilterChange = (name) => {
    setCheck((prevState) => ({ ...prevState, [name]: !prevState[name] }));
  };

  const sorting = (tag) => {
    let sortedFlights = filteredFlights.slice();

    if (tag === 'departure') {
      sortedFlights.sort((a, b) => {
        const timeA = a.departure_time.split(':').join('');
        const timeB = b.departure_time.split(':').join('');
        return departure ? timeA - timeB : timeB - timeA;
      });
      setDeparture(!departure);
    }

    if (tag === 'arrival') {
      sortedFlights.sort((a, b) => {
        const timeA = a.arrival_time.split(':').join('');
        const timeB = b.arrival_time.split(':').join('');
        return arrival ? timeA - timeB : timeB - timeA;
      });
      setArrival(!arrival);
    }

    if (tag === 'fare') {
      sortedFlights.sort((a, b) => (fare ? a.fare - b.fare : b.fare - a.fare));
      setFare(!fare);
    }

    setFilteredFlights(sortedFlights);
  };

  return (
    <div>
      {loading ? (
        <div style={{ width: '100px', margin: 'auto', marginTop: '100px' }}>
          <CircularProgress />
        </div>
      ) : error ? (
        <h1>Something Went Wrong</h1>
      ) : (
        flights && (
          <div className={styles.box}>
            <div className={styles.filterDiv}>
              <div className={styles.first}>
                <b>Popular Filters</b>
                <div className={styles.filterCheck}>
                  <input type="checkbox" />
                  <span>Refundable Fares</span>
                </div>
                <div className={styles.filterCheck}>
                  <input
                    type="checkbox"
                    checked={check.non_stop}
                    onChange={() => handleFilterChange('non_stop')}
                  />
                  <span>Non stop</span>
                </div>
                <div className={styles.filterCheck}>
                  <input type="checkbox" />
                  <span>Indi Go</span>
                </div>
                <div className={styles.filterCheck}>
                  <input type="checkbox" />
                  <span>Morning Departure</span>
                </div>
                <div className={styles.filterCheck}>
                  <input type="checkbox" />
                  <span>Late Departure</span>
                </div>
                <div className={styles.filterCheck}>
                  <input type="checkbox" />
                  <span>Go First</span>
                </div>
                <div className={styles.filterCheck}>
                  <input type="checkbox" />
                  <span>Vistara</span>
                </div>
                <div className={styles.filterCheck}>
                  <input type="checkbox" />
                  <span>Air India</span>
                </div>
              </div>
              <div className={styles.first}>
                <b>Departure From New Delhi</b>
                <div className={styles.filterCheck}>
                  <input
                    type="checkbox"
                    checked={check.departure_1}
                    onChange={() => handleFilterChange('departure_1')}
                  />
                  <span>Before 6 AM</span>
                </div>
                <div className={styles.filterCheck}>
                  <input
                    type="checkbox"
                    checked={check.departure_2}
                    onChange={() => handleFilterChange('departure_2')}
                  />
                  <span>6 AM - 12 PM</span>
                </div>
                <div className={styles.filterCheck}>
                  <input
                    type="checkbox"
                    checked={check.departure_3}
                    onChange={() => handleFilterChange('departure_3')}
                  />
                  <span>12 PM to 6 PM</span>
                </div>
                <div className={styles.filterCheck}>
                  <input
                    type="checkbox"
                    checked={check.departure_4}
                    onChange={() => handleFilterChange('departure_4')}
                  />
                  <span>After 6 PM</span>
                </div>
              </div>
              <div className={styles.first}>
                <b>One Way Price</b>
                <Slider
                  value={value}
                  onChange={(e, newValue) => setValue(newValue)}
                  valueLabelDisplay="auto"
                />
              </div>
              <div className={styles.first}>
                <b>Stops From New Delhi</b>
                <div className={styles.filterCheck}>
                  <input
                    type="checkbox"
                    checked={check.non_stop}
                    onChange={() => handleFilterChange('non_stop')}
                  />
                  <span>Non Stop</span>
                </div>
                <div className={styles.filterCheck}>
                  <input
                    type="checkbox"
                    checked={check.one_stop}
                    onChange={() => handleFilterChange('one_stop')}
                  />
                  <span>1 Stop</span>
                </div>
              </div>
              <div className={styles.first}>
                <b>Airlines</b>
                <div className={styles.filterCheck}>
                  <input type="checkbox" />
                  <span>Air India (3)</span>
                </div>
                <div className={styles.filterCheck}>
                  <input type="checkbox" />
                  <span>Indigo (3)</span>
                </div>
                <div className={styles.filterCheck}>
                  <input type="checkbox" />
                  <span>Vistara (3)</span>
                </div>
                <div className={styles.filterCheck}>
                  <input type="checkbox" />
                  <span>Go First (3)</span>
                </div>
                <div className={styles.filterCheck}>
                  <input type="checkbox" />
                  <span>Spice Jet (3)</span>
                </div>
              </div>
            </div>

            <div className={styles.container}>
              <div className={styles.heading}>
                <h3>{flights && <>Flights from New Delhi to Bangalore</>}</h3>
              </div>
              <div className={styles.guidelines}>
                <img
                  className={styles.guidelineImg}
                  src="https://logodix.com/logo/1033309.jpg"
                />
                <div style={{ marginTop: '5px' }}>
                  <h5 style={{ margin: '0px' }}>
                    Important Advisories & State Guidelines
                  </h5>
                  <p
                    style={{ margin: '0px', padding: '0px', fontSize: '12px' }}
                  >
                    With travel opening up, govt. advisories and state/UT
                    guidelines are constantly evolving. Please check the latest
                    updates before travelling.
                  </p>
                </div>
              </div>
              <div className={styles.sort}>
                <div className={styles.sortInnerDiv}>
                  <p style={{ fontWeight: '800' }}>Sorted by:</p>
                  <p
                    onClick={() => {
                      sorting('departure');
                    }}
                  >
                    Departure {departure ? <>&#8595;</> : <>&#8593;</>}
                  </p>
                  <p>Duration {duration ? <>&#8595;</> : <>&#8593;</>}</p>
                  <p
                    onClick={() => {
                      sorting('arrival');
                    }}
                  >
                    Arrival {arrival ? <>&#8595;</> : <>&#8593;</>}
                  </p>
                  <p
                    onClick={() => {
                      sorting('fare');
                    }}
                  >
                    Price {fare ? <>&#8595;</> : <>&#8593;</>}
                  </p>
                </div>
              </div>
              {filteredFlights.map((item) => (
                <React.Fragment key={item._id}>
                  <SingleFlight {...item} />
                </React.Fragment>
              ))}
            </div>
          </div>
        )
      )}
    </div>
  );
};
