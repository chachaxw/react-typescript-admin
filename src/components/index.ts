import Loadable from 'react-loadable';

import BreadCrumbs from './BreadCrumbs/BreadCrumbs';
import Footer from './Footer/Footer';
import Header from './Header/Header';
import Loading from './Loading/Loading';
import SideBar from './SideBar/SideBar';

const Content = Loadable({
    loader: () => import('./Content/Content'),
    loading: Loading,
});

export { BreadCrumbs, Content, Footer, Header, Loading, SideBar };
