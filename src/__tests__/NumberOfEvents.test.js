import React from "react";
import { shallow } from "enzyme";
import NumberOfEvents from "../NumberOfEvents";

describe('<NumberOfEvents /> component', () => {
    let NumberOfEventsWrapper;
    beforeAll(() => {
        NumberOfEventsWrapper = shallow(<NumberOfEvents />);
    });

    test('render number of events element', () =>{
        expect(NumberOfEventsWrapper.find('.number-of-events')).toHaveLength(1);
    })

    test('render number of events input box', () => {
        expect(NumberOfEventsWrapper.find('.number-of-events__input')).toHaveLength(1);
    })

    test('renders number of events correctly', () => {
        const numberOfEvents = NumberOfEventsWrapper.state('numberOfEvents');
        expect(NumberOfEventsWrapper.find('.number-of-events__input').get(0).props.value).toBe(numberOfEvents);
    })

    test('change state.numberOfEvents when text input changes', () => {
        NumberOfEventsWrapper.setState({
            numberOfEvents: '32'
        });
        const eventObject = { target: { value: '12'}};
        NumberOfEventsWrapper.find('.number-of-events__input').simulate('change', eventObject);
        expect(NumberOfEventsWrapper.state('numberOfEvents')).toBe('12');
    });
});