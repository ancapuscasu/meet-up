Feature: It must be able to show/hide an event's details

Scenario: An event element is collapsed by default
    Given the user opens the app
    When eventList is displayed
    Then the event details will be collapsed

Scenario: User can expand an event to see its details
    Given eventList is displayed
    When the user clicks on details-btn
    Then the event details will expand

Scenario: User can collapse an event to hide its details
    Given the event details are expanded
    When the user clicks details-btn to hide event details
    Then the event details should be hidden








    