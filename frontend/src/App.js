import React from 'react';
import Body from './components/Body';
import { userStore, persistor } from './redux/store';
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';

const App = () => {
  return (
    <div className='bg-gray-50/90'>
      <Provider store={userStore}>
        <PersistGate persistor={persistor} loading={null}>
        <Body />
        </PersistGate>
        </Provider>
    </div>
  )
}

export default App