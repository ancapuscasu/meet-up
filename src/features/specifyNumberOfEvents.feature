Feature: It must specify the number of events

Scenario: When user hasn’t specified a number, 32 is the default number
    Given the user has not chosen how many events to see per page
    When the user opens the page
    Then the user should see 32 events by default

Scenario: User can change the number of events they want to see
    Given the user wants to change the number of events they see per page
    When the user types a number of events in .number-of-events__input 
    Then the eventList will be the length specified by the user



    