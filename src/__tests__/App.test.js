import React from "react";
import { shallow, mount } from "enzyme";

//components
import App from '../App';
import EventList from '../EventList';
import CitySearch from "../CitySearch";
import NumberOfEvents from "../NumberOfEvents";

//data and functions
import { mockData } from "../mock-data";
import { extractLocations, getEvents } from "../api";


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

describe('<App /> integration', () => {
    test('App passes "events" state as a prop to EventList', () => {
        const AppWrapper = mount(<App />);
        const AppEventState = AppWrapper.state('events');
        expect(AppEventState).not.toEqual(undefined);
        expect(AppWrapper.find(EventList).props().events).toEqual(AppEventState);
        AppWrapper.unmount();
    });

    test('App passes "locations" state as a prop to CitySearch', () => {
        const AppWrapper = mount(<App />);
        const AppLocationsState = AppWrapper.state('locations');
        expect(AppLocationsState).not.toEqual(undefined);
        expect(AppWrapper.find(CitySearch).props().locations).toEqual(AppLocationsState);
        AppWrapper.unmount();
    })

    test('Get list of events matching the city selected by the user', async () => {
        const AppWrapper = mount(<App />);
        const CitySearchWrapper = AppWrapper.find(CitySearch);
        const locations = extractLocations(mockData);
        CitySearchWrapper.setState({
            suggestions: locations
        });
        const suggestions = CitySearchWrapper.state('suggestions');
        const selectedIndex = Math.floor(Math.random() * (suggestions.length));
        const selectedCity = suggestions[selectedIndex];
        await CitySearchWrapper.instance().handleItemClicked(selectedCity);
        const allEvents = await getEvents();
        const eventsToShow = allEvents.filter(event => event.location === selectedCity);
        expect(AppWrapper.state('events')).toEqual(eventsToShow);
        AppWrapper.unmount();
    });

    test('get list of all events when user selects "see all cities"', async () => {
        const AppWrapper = mount(<App />);
        const seeAllEvents = AppWrapper.find(CitySearch).find('#all');
        await seeAllEvents.simulate('click');
        const allEvents = await getEvents();
        expect(AppWrapper.state('events')).toEqual(allEvents);
        AppWrapper.unmount();
    });

    //Testing interaction between the App, NumberOfEvents, and EventList components.
    test('App passes "numberOfEvents" state as a prop to NumberOfEvents', () => {
        const AppWrapper = mount(<App />);
        const AppEventNumberState = AppWrapper.state('numberOfEvents');
        expect(AppEventNumberState).not.toEqual(undefined);
        expect(AppWrapper.find(NumberOfEvents).props().numberOfEvents).toEqual(AppEventNumberState);
        AppWrapper.unmount();
    });

    test('The state of "numberOfEvents" within App changes when number input changes', () => {
        const AppWrapper = mount(<App />);
        const NumberOfEventsWrapper = AppWrapper.find(NumberOfEvents);
        const eventNumberInput = NumberOfEventsWrapper.find('.number-of-events__input');
        const eventObject = { target: { value: 15 } };
        eventNumberInput.simulate('change', eventObject);
        expect(AppWrapper.state('numberOfEvents')).toBe(15);
        AppWrapper.unmount();
      })
});


