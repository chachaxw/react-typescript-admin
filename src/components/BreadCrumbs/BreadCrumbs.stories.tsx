import { storiesOf } from '@storybook/react';
import React from 'react';

import { appRoutes } from '../../routes';
import BreadCrumbs from './BreadCrumbs';

storiesOf('BreadCrumbs', module).add('default', () => <BreadCrumbs menu={appRoutes.app} url="/app/dashboard" />);
