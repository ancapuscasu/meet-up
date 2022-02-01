import React from "react";
import { shallow } from "enzyme";

//components
import App from '../App';
import EventList from '../EventList';
import CitySearch from "../CitySearch";
import NumberOfEvents from "../NumberOfEvents";


describe('<App /> component', () => {
    let AppWrapper;
    beforeAll(() => {
        AppWrapper = shallow(<App />)
    });

    test('render EventList component', () => {
        expect(AppWrapper.find(EventList)).toHaveLength(1);
    });

    test('render CitySearch component', () => {
        expect (AppWrapper.find(CitySearch)).toHaveLength(1);
    });

    test('render NumberOfEvents component', () => {
        expect (AppWrapper.find(NumberOfEvents)).toHaveLength(1);
    });
    
});