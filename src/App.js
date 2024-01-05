import { ConfigProvider,App as AppAntd } from 'antd';
import MainRoutes from './router/Main';

function App() {
  return (
    <ConfigProvider>
      <AppAntd>
        <MainRoutes />
      </AppAntd>
    </ConfigProvider>
  );
}

export default App;
