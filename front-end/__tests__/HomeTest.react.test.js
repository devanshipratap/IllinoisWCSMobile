'use strict';

import 'react-native';
import React from 'react';
import Home from '../components/Home';
import renderer from 'react-test-renderer';

// Snapshot test for home page
it('Home page renders correctly', () => {
    const tree = renderer
        .create(<Home/>)
        .toJSON();
    expect(tree).toMatchSnapshot();
});
