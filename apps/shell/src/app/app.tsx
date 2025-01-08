import { BrowserRouter as Router } from 'react-router-dom';
import Layout from './components/layout/Layout';
import RoutesConfig from './routes/routes';
import '../i18n';

const App = () => {
  return (
    <Router>
      <Layout>
        <RoutesConfig />
      </Layout>
    </Router>
  );
};

export default App;
