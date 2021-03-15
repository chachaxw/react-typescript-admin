import { configure } from '@storybook/react';

import 'antd/dist/antd.css';
import '../src/index.css';

// automatically import all files ending in *.stories.tsx
const req = require.context('../src', true, /\.stories\.tsx$/);

function loadStories() {
  req.keys().forEach(req);
}

configure(loadStories, module);
