import React from 'react';
import {cleanup} from '@testing-library/react';
import {shallow} from 'enzyme';
import Login from 'components/Login';
const jestConfig = require('./jest-config');

describe('Login', () => {
    let wrapper;

    afterEach(cleanup);

    it('should check username', () => {
        const username = "mock";

        wrapper = shallow(<Login/>);
        
        wrapper.find('input[type="text"]').simulate('change', {target: {name: 'username', value: username}});
        expect(wrapper.state('username')).toEqual('mock');
    });
});