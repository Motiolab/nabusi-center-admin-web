import { Provider } from 'react-redux';
import { store } from './index';

const ReduxProvider = ({ children }: { children: React.ReactNode }) => (
    <Provider store={store}>{children}</Provider>
);

export default ReduxProvider;