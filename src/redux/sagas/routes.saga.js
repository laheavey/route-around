import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchAllRoutes () {
  try {
    const response = yield axios.get('/routes/all')
    yield put({
      type: 'SET_ALL_ROUTES',
      payload: response.data // id, route_name, route_desc
    })
  } catch (error) {
    console.error('Error in SAGA/fetchAllRoutes:', error);
  }
}

function* fetchPopularRoutes () {
  try {
    const response = yield axios.get('/routes/popular')
    yield put({
      type: 'SET_POPULAR_ROUTES',
      payload: response.data // route_name, route_id
    })
  } catch (error) {
    console.error('Error in SAGA/fetchPopularRoutes:', error);
  }
}

function* fetchRouteDetail (action) {
  try {
    const response = yield axios.get(`/routes/${action.payload}`)
    yield put({
      type: 'SET_ROUTE_DETAIL',
      payload: response.data
      // route_id, route_name, route_desc, route_url, 
      // route_color, completed_on, poi_id, poi_name
    })
  } catch (error) {
    console.error('Error in SAGA/fetchRouteDetail:', error);
  }
}

export default function* fetchRouteDetailSaga() {
  yield takeLatest('FETCH_ROUTE_DETAIL/:id', fetchRouteDetail);
  yield takeLatest('FETCH_POPULAR_ROUTES', fetchPopularRoutes);
  yield takeLatest('FETCH_ALL_ROUTES', fetchAllRoutes);
}