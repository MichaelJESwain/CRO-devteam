# CRO - DevTeam

Hi! This is a repository that aims to share relevant information about our experiments, such as old experiments and templates. Also, you can find information about how to 
set up an experiment using Optimizely. 


## [Snippets](https://github.com/MichaelJESwain/CRO-devteam/tree/main/snippets)
Here you can find a few boilerplates and useful functions for implementation of experiments.

## [analyticsEvents](https://github.com/MichaelJESwain/CRO-devteam/tree/main/analyticsEvents)
Function call to send events to both Adobe and Optimizely:

=> optimizely.sendAnalyticsEvents('Event Name')

## [notes](https://github.com/MichaelJESwain/CRO-devteam/tree/main/notes)
There are a couple of useful Optimizely functions and tricks. 

e.g how to check which variation is running, on console, run: optimizely.get('state').getExperimentStates(); 

## [Experiments](https://github.com/MichaelJESwain/CRO-devteam/tree/main/experiments)
Most of the implementation of old experiments are in this folder. 

It contains client side experiments, CK and TH. It is possible to find their hypotheses, implementation, and the activation function when it is available.

