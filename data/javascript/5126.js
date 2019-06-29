angular.module('shoutpoint.resources.campaigns')

/**
 * Technically this is a service.  Effectively, this can be thought of as a
 * campaignSummary class.  This class provides the necessary behaviors for managing
 * CampaignSummaries.
 *
 * @class "shoutpoint.resources.campaigns".CampaignSummary
 */
    .factory('CampaignSummary', function ($resource) {

        var CampaignSummary = $resource(ApiUtils.getApiBaseUrlVB() + "campaignSummaryLookupPK?appSig=" + APP_SIG + "&sid=:sessionId&queryPK=[:campaignSummaryId]",
            {campaignSummaryId: '@data.id', user: '@data'},
            {
                campaignSummaryLookupForm: {
                    method: 'GET',
                    url: ApiUtils.getApiBaseUrlVB() + 'campaignSummaryLookupForm?appSig=' + APP_SIG + '&sid=:sessionId&queryPageSize=20&queryParam=:queryParam&sortParam=:sortParam'
                },
                campaignSummaryLookupFormSimplified: {
                    method: 'GET',
                    url: ApiUtils.getApiBaseUrlVB() + 'campaignSummaryLookupForm?appSig=' + APP_SIG + '&sid=:sessionId&queryPageSize=20&queryParam=:queryParam&simplified=1&sortParam=:sortParam'
                },
                campaignSummaryLookupQual: {
                    method: 'GET',
                    url: ApiUtils.getApiBaseUrlVB() + 'campaignSummaryLookupQuery?appSig=' + APP_SIG + '&sid=:sessionId&queryPageSize=20&queryQual=:queryQual&sortParam=:sortParam'
                },
                campaignSummaryLookupPK: {
                    method: 'GET',
                    url: ApiUtils.getApiBaseUrlVB() + 'campaignSummaryLookupPK?appSig=' + APP_SIG + '&sid=:sessionId&queryPageSize=20&queryPK=:queryPK'
                }
            }
        );

        /**
         * Returns a CampaignSummary.
         * @method "shoutpoint.resources.campaigns".CampaignSummary.loadFromData
         * @param {Object} data
         * @returns {CampaignSummary}
         */
        CampaignSummary.loadFromData = function (data) {
            var newCampaignSummary = new CampaignSummary();
            newCampaignSummary.data = {};
            angular.extend(newCampaignSummary.data, data);
            return newCampaignSummary;
        };

        /**
         * Query for CampaignSummary.
         * @method "shoutpoint.resources.campaigns".CampaignSummary.query
         * @param {string} sessionId - extended session id
         * @param {int} campaignId
         * @param {int} scheduleId
         * @param {boolean} test
         * @param {boolean} [inbound]
         * @param {string} [dateFrom] - date `mm/dd/yyyy` (PST)
         * @param {string} [dateUntil] - date `mm/dd/yyyy` (PST)
         * @param {string} [campaignType]
         * @param {boolean} [simplified] - true for a smaller object
         * @param {string} [campaignName] - filter by full or partial campaign name.
         * @param {string} [schedDesc] - filter by full or partial schedule description.
         * @param {SortParam} [sortParam=date asc]
         * @param {int} dialerFilter - filter on dialer settings
         * @param {bool} filterInactive - filter on whether a schedule is inactive or not
         * @param {bool} filterInactiveCampaigns - filter on whether a campaign is inactive or not
         * @returns {Object} {"data":[],"paramName":"campaignSummarys","queryPages":[],"totalRecordCount":0}
         */
        CampaignSummary.query = function(sessionId, campaignId, scheduleId, test, inbound, dateFrom, dateUntil, campaignType, simplified, campaignName, schedDesc, sortParam, dialerFilter, filterInactive, filterInactiveCampaigns) {
            if (!ApiUtils.isDefined(scheduleId)) {
                scheduleId = -1;
            }

            var qp = {campaignId: campaignId, scheduleId: scheduleId, dialerFilter: 1};
            if (ApiUtils.isDefined(test)) {
                qp.testSchedules = test;
            }

            if (ApiUtils.isDefined(inbound)) {
                qp.inboundSchedules = inbound;
            }

            if (ApiUtils.isDefined(dateFrom)) {
                qp.dateFrom = dateFrom;
            }

            if (ApiUtils.isDefined(dateUntil)) {
                qp.dateUntil = dateUntil;
            }

            if (ApiUtils.isDefined(campaignType)) {
                qp.campaignType = campaignType;
            }

            if (ApiUtils.isDefined(campaignName)) {
                qp.campaignName = campaignName;
            }

            if (ApiUtils.isDefined(schedDesc)) {
                qp.scheduleDescription = schedDesc;
            }

            if (!ApiUtils.isDefined(sortParam)) {
                sortParam = new SortParam();
                sortParam.addSortField("schedule.date", true);
            }

            if(ApiUtils.isDefined(dialerFilter)){
                qp.dialerFilter = dialerFilter;
            }

            if(ApiUtils.isDefined(filterInactive)){
                qp.filterInactive = filterInactive;
            }

            if(ApiUtils.isDefined(filterInactiveCampaigns)){
                qp.filterInactiveCampaigns = filterInactiveCampaigns;
            }

            var result = null;

            if (simplified) {
                result = CampaignSummary.campaignSummaryLookupFormSimplified({
                        sessionId: sessionId,
                        queryParam: angular.toJson(qp),
                        sortParam: angular.toJson(sortParam)
                    },
                    function (resp) {
                        console.log("CampaignSummary.query", resp);
                    },
                    function (resp) {
                        console.error("CampaignSummary.query", resp);
                        angular.extend(result, {error: resp.data.data});
                    });
            } else {
                result = CampaignSummary.campaignSummaryLookupForm({
                        sessionId: sessionId,
                        queryParam: angular.toJson(qp),
                        sortParam: angular.toJson(sortParam)
                    },
                    function (resp) {
                        console.log("CampaignSummary.query", resp);
                    },
                    function (resp) {
                        console.error("CampaignSummary.query", resp);
                        angular.extend(result, {error: resp.data.data});
                    });
            }

            return result;
        };

        /**
         * Get page function.
         * @method "shoutpoint.resources.campaigns".CampaignSummary.getPage
         * @param {string} sessionId
         * @param {Object[]} pks
         * @returns {Object[]} A list of CampaignSummary objects.
         */
        CampaignSummary.getPage = function (sessionId, pks) {
            var result = null;
            result = CampaignSummary.campaignSummaryLookupPK({sessionId: sessionId, queryPK: angular.toJson(pks)},
                function (resp) {
                    console.log("CampaignSummary.getPage", resp);
                },
                function (resp) {
                    console.error("CampaignSummary.query", resp);
                    angular.extend(result, {error: resp.data.data});
                });
            return result;
        };

        /**
         * Returns the specified CampaignSummary.
         * @method "shoutpoint.resources.campaigns".CampaignSummary.lookup
         * @param {string} sessionId
         * @param {int} campaignSummaryId
         * @returns {CampaignSummary} The CampaignSummary.
         */
        CampaignSummary.lookup = function (sessionId, campaignSummaryId) {
            var campaignSummary = null;
            campaignSummary = CampaignSummary.get({sessionId: sessionId, campaignSummaryId: campaignSummaryId},
                function (resp) {
                    console.log("CampaignSummary.lookup", resp);
                },
                function (resp) {
                    console.error("CampaignSummary.lookup", resp);
                    angular.extend(campaignSummary, {error: resp.data.data});
                });
            return campaignSummary;
        };

        return CampaignSummary;
    });
