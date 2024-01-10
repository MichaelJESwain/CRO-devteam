// It returns the state of the experiments that are currently running (or not) on the page
// It also shows which variation is active, if the experiment is active
optimizely.get('state').getExperimentStates();

// It returns events related to the visitors:
optimizely.get('visitor').events