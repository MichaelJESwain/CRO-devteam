# Analytics Events


As developers, we don't need to worry about analyze the data from the experiments, but we do need to send the data correctly.
The two main events are "Changes Seen" and clicks on a HTML element.

## Changes Seen

This type of events happens when the target element is on view port. The target element can be a new HTML element or an old one. One way to check for this event is using IntersectionObserver. Please check the inTheViewPort.js file in the snippets folder, or check the MDN documentation for more details. Once this event happens, we can send the data to Adobe/Optimizely by running the code: 

optimizely.sendAnalyticsEvents('Event Name');

## Click event

This event is most for the times a click on a HTML element. In order to track this event, we add an event listener to the HTML element, if the element is clicked we also run the code:

optimizely.sendAnalyticsEvents('Event Name');
