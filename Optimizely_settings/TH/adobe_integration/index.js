// This extension integrates Optimizely w/ Adobe via a pre-defined list variable. Set the list variable on line 3 below.
var decisionString = window.optimizely.get('state').getDecisionString({campaignId: campaignId});
var list = "list1";


// Public Methods
var adobeIntegrator = {
	// Array of objects for active campaigns/experiments
	campaignArray: [],
	// Accepts "s" variable as a param and assigns campaigns/experiments to list.
	assignCampaigns: function(sVariable) {
    sVariable[list] = sVariable[list] || [];
		for (var i = this.campaignArray.length-1; i >= 0; i--) {
      var campaignString = sanitizeString(this.campaignArray[i]);
      sVariable[list].push(campaignString);
			this.campaignArray.splice(i, 1);
		}
	},
	// Accepts "s" variable as a param and assigns eVars to object, then dispatches custom link tracking.
    trackDelayedCampaigns: function() {
        sessionStorage.csOptimizelyAdobeExperiments = sessionStorage.csOptimizelyAdobeExperiments || '';
        for (var i = this.campaignArray.length-1; i >= 0; i--) {
            var campaignString = sanitizeString(this.campaignArray[i]);
            if (sessionStorage.csOptimizelyAdobeExperiments.indexOf(campaignString) < 0 && campaignString != undefined) {
                sessionStorage.csOptimizelyAdobeExperiments += sessionStorage.csOptimizelyAdobeExperiments.length < 1 ? `${campaignString}` : `, ${campaignString}`;

                let didSendCall = null;
                if (campaignString.indexOf("(25428160207)") > -1 || campaignString.indexOf("(25415810121)") > -1) {
                    didSendCall = () => {
                        window.sessionStorage.th229_didSendOptlyBuckets = true;
                    }
                }
                utag.link({
                    event_name: "OptimizelyLayerDecision",
                    eventCategory: "integration",
                    eventAction: "optimizely layer decision",
                    optimizely_buckets : `${sessionStorage.csOptimizelyAdobeExperiments}`
                    }, didSendCall, [90]);
            }

            this.campaignArray.splice(i, 1);
        }	
	}
};

// Removes special characters and spaces from decisionString.
function sanitizeString(string) {
	var result = string.replace(/[^A-Z0-9:()]/ig, "_");
  return result;
}

// Scopes `campaignArray` to Optimizely object.
if (window.optimizely.get("custom/adobeIntegrator") === undefined) {
	window.optimizely.push({
		type: "registerModule",
		moduleName: "adobeIntegrator",
		module: adobeIntegrator
	});
}

// Failing Audiences returns `null`, failing Traffic Allocation returns `undefined` for decisionString.
if (!!decisionString) {
	window.optimizely.get("custom/adobeIntegrator").campaignArray.push(decisionString);
}