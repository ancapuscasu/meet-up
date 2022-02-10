import React from 'react';
import { loadFeature, defineFeature } from 'jest-cucumber';
import { mount, shallow } from 'enzyme';
import { mockData } from '../mock-data';

//components
import App from '../App';
import Event from '../Event';
import EventList from '../EventList';

const feature = loadFeature('./src/features/showHideAnEventsDetails.feature');

defineFeature(feature, test => {


    test('An event element is collapsed by default', ({ given, when, then }) => {
        let AppWrapper;
        given('the user opens the app', () => {
           AppWrapper = mount(<App />);
           AppWrapper.update();
        });

        when('eventList is displayed', () => {
            expect(AppWrapper.find('.EventList')).toHaveLength(1);
        });


        then('the event details will be collapsed', () => {
            expect(AppWrapper.find('.event-details')).toHaveLength(0);
        });
    });


    test('User can expand an event to see its details', ({ given, when, then }) => {
        let AppWrapper;
        given('eventList is displayed', async () => {
            AppWrapper = await mount(<App />);
            expect(AppWrapper.find('.EventList')).toHaveLength(1);
        });

        let EventWrapper;
        when('the user clicks on details-btn', async () => {
            EventWrapper = await shallow(<Event event={mockData[0]} />);
            EventWrapper.find('.details-btn').simulate('click');
        });

        then('the event details will expand', () => {
            expect(EventWrapper.state('collapsed')).toBe(false);
        });
    });


    test('User can collapse an event to hide its details', ({ given, when, then }) => {
       
        let EventWrapper;
        given('the event details are expanded', async () => {
            EventWrapper = await shallow(<Event event={mockData[0]} />);
            EventWrapper.find('.details-btn').simulate('click');
            expect(EventWrapper.state('collapsed')).toBe(false);
        });

        when('the user clicks details-btn to hide event details', () => {
            EventWrapper.find('.details-btn').simulate('click');
        });

        then('the event details should be hidden', () => {
            expect(EventWrapper.state('collapsed')).toBe(true);
        });

    });

    
});