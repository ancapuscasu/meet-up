import React from "react";
import { shallow } from "enzyme";
import NumberOfEvents from "../NumberOfEvents";

describe('<NumberOfEvents /> component', () => {
    let NumberOfEventsWrapper;
    beforeAll(() => {
        NumberOfEventsWrapper = shallow(<NumberOfEvents updateEvents={() => {}}/>);
    });

    test('render number of events element', () =>{
        expect(NumberOfEventsWrapper.find('.number-of-events')).toHaveLength(1);
    })

    test('render number of events input box', () => {
        expect(NumberOfEventsWrapper.find('.number-of-events__input')).toHaveLength(1);
    })

});

