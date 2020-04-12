'use strict';

import 'react-native';
import React from 'react';
import QR from '../components/QR';
import renderer from 'react-test-renderer';

it('QR code page renders correctly', () => {
    const tree = renderer
        .create(<QR/>)
        .toJSON();
    expect(tree).toMatchSnapshot();
});
