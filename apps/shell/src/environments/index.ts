import { environment as devEnvironment } from './environment';
import { environment as prodEnvironment } from './environment.prod';

const environment = process.env.NODE_ENV === 'production' ? prodEnvironment : devEnvironment;

export default environment;
