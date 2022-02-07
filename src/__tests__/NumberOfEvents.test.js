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

    test('change state.numberOfEvents when text input changes', () => {
        // NumberOfEventsWrapper.setState({
        //     NumberOfEvents: 32
        //   });
        const eventObject = { target: { value: 12}};
        NumberOfEventsWrapper.find('.number-of-events__input').simulate('change', eventObject);
        expect(NumberOfEventsWrapper.state("newNumber")).toBe(12);
    });
});

