import React from 'react';
import { loadFeature, defineFeature } from 'jest-cucumber';
import { mount } from 'enzyme';

//components
import App from '../App';

const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');

defineFeature(feature, test => {


    test('When user hasn’t specified a number, 32 is the default number', ({ given, when, then }) => {
        given('the user has not chosen how many events to see per page', () => {
            //
        });

        let AppWrapper;
        when('the user opens the page', async () => {
            AppWrapper = await mount(<App />);
            AppWrapper.update();
        });

        then('the user should see thirty-two events by default', () => {
            expect(AppWrapper.state("numberOfEvents")).toBe(25);
        });
    });


    test('User can change the number of events they want to see', ({ given, when, then }) => {
        given('the user wants to change the number of events they see per page', () => {
            //
        });

        let AppWrapper;
        when('the user types a number of events in .number-of-events__input', async () => {
            AppWrapper = await mount(<App />);
            const eventObject = { target: { value: 2 } };
            AppWrapper.find('.number-of-events__input').simulate('change', eventObject);

        });

        then('the eventList will be the length specified by the user', () => {
            expect(AppWrapper.state('events')).toHaveLength(2);
        });
    });


});