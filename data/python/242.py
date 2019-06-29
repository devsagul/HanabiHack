# coding=UTF-8
# **********************************************************************
# Copyright (c) 2013-2017 Cisco Systems, Inc. All rights reserved
# written by zen warriors, do not modify!
# **********************************************************************


from cobra.mit.meta import ClassMeta
from cobra.mit.meta import StatsClassMeta
from cobra.mit.meta import CounterMeta
from cobra.mit.meta import PropMeta
from cobra.mit.meta import Category
from cobra.mit.meta import SourceRelationMeta
from cobra.mit.meta import NamedSourceRelationMeta
from cobra.mit.meta import TargetRelationMeta
from cobra.mit.meta import DeploymentPathMeta, DeploymentCategory
from cobra.model.category import MoCategory, PropCategory, CounterCategory
from cobra.mit.mo import Mo


# ##################################################
class CPUHist(Mo):
    meta = StatsClassMeta("cobra.model.proc.CPUHist", "CPU utilization")

    counter = CounterMeta("current", CounterCategory.GAUGE, "percentage", "CPU usage")
    counter._propRefs[PropCategory.IMPLICIT_MIN] = "currentMin"
    counter._propRefs[PropCategory.IMPLICIT_MAX] = "currentMax"
    counter._propRefs[PropCategory.IMPLICIT_AVG] = "currentAvg"
    counter._propRefs[PropCategory.IMPLICIT_SUSPECT] = "currentSpct"
    counter._propRefs[PropCategory.IMPLICIT_THRESHOLDED] = "currentThr"
    counter._propRefs[PropCategory.IMPLICIT_TREND] = "currentTr"
    meta._counters.append(counter)

    meta.isAbstract = True
    meta.moClassName = "procCPUHist"


    meta.moClassName = "procCPUHist"
    meta.rnFormat = ""
    meta.category = MoCategory.STATS_HISTORY
    meta.label = "historical CPU utilization stats"
    meta.writeAccessMask = 0x1
    meta.readAccessMask = 0x1
    meta.isDomainable = False
    meta.isReadOnly = True
    meta.isConfigurable = False
    meta.isDeletable = False
    meta.isContextRoot = False

    meta.superClasses.add("cobra.model.stats.Item")
    meta.superClasses.add("cobra.model.stats.Hist")

    meta.concreteSubClasses.add("cobra.model.proc.CPUHist1d")
    meta.concreteSubClasses.add("cobra.model.proc.CPUHist5min")
    meta.concreteSubClasses.add("cobra.model.proc.CPUHist1year")
    meta.concreteSubClasses.add("cobra.model.proc.CPUHist1qtr")
    meta.concreteSubClasses.add("cobra.model.proc.CPUHist1h")
    meta.concreteSubClasses.add("cobra.model.proc.CPUHist1mo")
    meta.concreteSubClasses.add("cobra.model.proc.CPUHist1w")
    meta.concreteSubClasses.add("cobra.model.proc.CPUHist15min")

    meta.rnPrefixes = [
    ]

    prop = PropMeta("str", "childAction", "childAction", 4, PropCategory.CHILD_ACTION)
    prop.label = "None"
    prop.isImplicit = True
    prop.isAdmin = True
    prop._addConstant("deleteAll", "deleteall", 16384)
    prop._addConstant("deleteNonPresent", "deletenonpresent", 8192)
    prop._addConstant("ignore", "ignore", 4096)
    meta.props.add("childAction", prop)

    prop = PropMeta("str", "cnt", "cnt", 16212, PropCategory.REGULAR)
    prop.label = "Number of Collections During this Interval"
    prop.isImplicit = True
    prop.isAdmin = True
    meta.props.add("cnt", prop)

    prop = PropMeta("str", "currentAvg", "currentAvg", 10476, PropCategory.IMPLICIT_AVG)
    prop.label = "CPU usage average value"
    prop.isOper = True
    prop.isStats = True
    meta.props.add("currentAvg", prop)

    prop = PropMeta("str", "currentMax", "currentMax", 10475, PropCategory.IMPLICIT_MAX)
    prop.label = "CPU usage maximum value"
    prop.isOper = True
    prop.isStats = True
    meta.props.add("currentMax", prop)

    prop = PropMeta("str", "currentMin", "currentMin", 10474, PropCategory.IMPLICIT_MIN)
    prop.label = "CPU usage minimum value"
    prop.isOper = True
    prop.isStats = True
    meta.props.add("currentMin", prop)

    prop = PropMeta("str", "currentSpct", "currentSpct", 10477, PropCategory.IMPLICIT_SUSPECT)
    prop.label = "CPU usage suspect count"
    prop.isOper = True
    prop.isStats = True
    meta.props.add("currentSpct", prop)

    prop = PropMeta("str", "currentThr", "currentThr", 10478, PropCategory.IMPLICIT_THRESHOLDED)
    prop.label = "CPU usage thresholded flags"
    prop.isOper = True
    prop.isStats = True
    prop.defaultValue = 0
    prop.defaultValueStr = "unspecified"
    prop._addConstant("avgCrit", "avg-severity-critical", 2199023255552)
    prop._addConstant("avgHigh", "avg-crossed-high-threshold", 68719476736)
    prop._addConstant("avgLow", "avg-crossed-low-threshold", 137438953472)
    prop._addConstant("avgMajor", "avg-severity-major", 1099511627776)
    prop._addConstant("avgMinor", "avg-severity-minor", 549755813888)
    prop._addConstant("avgRecovering", "avg-recovering", 34359738368)
    prop._addConstant("avgWarn", "avg-severity-warning", 274877906944)
    prop._addConstant("cumulativeCrit", "cumulative-severity-critical", 8192)
    prop._addConstant("cumulativeHigh", "cumulative-crossed-high-threshold", 256)
    prop._addConstant("cumulativeLow", "cumulative-crossed-low-threshold", 512)
    prop._addConstant("cumulativeMajor", "cumulative-severity-major", 4096)
    prop._addConstant("cumulativeMinor", "cumulative-severity-minor", 2048)
    prop._addConstant("cumulativeRecovering", "cumulative-recovering", 128)
    prop._addConstant("cumulativeWarn", "cumulative-severity-warning", 1024)
    prop._addConstant("lastReadingCrit", "lastreading-severity-critical", 64)
    prop._addConstant("lastReadingHigh", "lastreading-crossed-high-threshold", 2)
    prop._addConstant("lastReadingLow", "lastreading-crossed-low-threshold", 4)
    prop._addConstant("lastReadingMajor", "lastreading-severity-major", 32)
    prop._addConstant("lastReadingMinor", "lastreading-severity-minor", 16)
    prop._addConstant("lastReadingRecovering", "lastreading-recovering", 1)
    prop._addConstant("lastReadingWarn", "lastreading-severity-warning", 8)
    prop._addConstant("maxCrit", "max-severity-critical", 17179869184)
    prop._addConstant("maxHigh", "max-crossed-high-threshold", 536870912)
    prop._addConstant("maxLow", "max-crossed-low-threshold", 1073741824)
    prop._addConstant("maxMajor", "max-severity-major", 8589934592)
    prop._addConstant("maxMinor", "max-severity-minor", 4294967296)
    prop._addConstant("maxRecovering", "max-recovering", 268435456)
    prop._addConstant("maxWarn", "max-severity-warning", 2147483648)
    prop._addConstant("minCrit", "min-severity-critical", 134217728)
    prop._addConstant("minHigh", "min-crossed-high-threshold", 4194304)
    prop._addConstant("minLow", "min-crossed-low-threshold", 8388608)
    prop._addConstant("minMajor", "min-severity-major", 67108864)
    prop._addConstant("minMinor", "min-severity-minor", 33554432)
    prop._addConstant("minRecovering", "min-recovering", 2097152)
    prop._addConstant("minWarn", "min-severity-warning", 16777216)
    prop._addConstant("periodicCrit", "periodic-severity-critical", 1048576)
    prop._addConstant("periodicHigh", "periodic-crossed-high-threshold", 32768)
    prop._addConstant("periodicLow", "periodic-crossed-low-threshold", 65536)
    prop._addConstant("periodicMajor", "periodic-severity-major", 524288)
    prop._addConstant("periodicMinor", "periodic-severity-minor", 262144)
    prop._addConstant("periodicRecovering", "periodic-recovering", 16384)
    prop._addConstant("periodicWarn", "periodic-severity-warning", 131072)
    prop._addConstant("rateCrit", "rate-severity-critical", 36028797018963968)
    prop._addConstant("rateHigh", "rate-crossed-high-threshold", 1125899906842624)
    prop._addConstant("rateLow", "rate-crossed-low-threshold", 2251799813685248)
    prop._addConstant("rateMajor", "rate-severity-major", 18014398509481984)
    prop._addConstant("rateMinor", "rate-severity-minor", 9007199254740992)
    prop._addConstant("rateRecovering", "rate-recovering", 562949953421312)
    prop._addConstant("rateWarn", "rate-severity-warning", 4503599627370496)
    prop._addConstant("trendCrit", "trend-severity-critical", 281474976710656)
    prop._addConstant("trendHigh", "trend-crossed-high-threshold", 8796093022208)
    prop._addConstant("trendLow", "trend-crossed-low-threshold", 17592186044416)
    prop._addConstant("trendMajor", "trend-severity-major", 140737488355328)
    prop._addConstant("trendMinor", "trend-severity-minor", 70368744177664)
    prop._addConstant("trendRecovering", "trend-recovering", 4398046511104)
    prop._addConstant("trendWarn", "trend-severity-warning", 35184372088832)
    prop._addConstant("unspecified", None, 0)
    meta.props.add("currentThr", prop)

    prop = PropMeta("str", "currentTr", "currentTr", 10479, PropCategory.IMPLICIT_TREND)
    prop.label = "CPU usage trend"
    prop.isOper = True
    prop.isStats = True
    meta.props.add("currentTr", prop)

    prop = PropMeta("str", "dn", "dn", 1, PropCategory.DN)
    prop.label = "None"
    prop.isDn = True
    prop.isImplicit = True
    prop.isAdmin = True
    prop.isCreateOnly = True
    meta.props.add("dn", prop)

    prop = PropMeta("str", "index", "index", 115, PropCategory.REGULAR)
    prop.label = "History Index"
    prop.isImplicit = True
    prop.isAdmin = True
    meta.props.add("index", prop)

    prop = PropMeta("str", "lastCollOffset", "lastCollOffset", 111, PropCategory.REGULAR)
    prop.label = "Collection Length"
    prop.isImplicit = True
    prop.isAdmin = True
    meta.props.add("lastCollOffset", prop)

    prop = PropMeta("str", "repIntvEnd", "repIntvEnd", 110, PropCategory.REGULAR)
    prop.label = "Reporting End Time"
    prop.isImplicit = True
    prop.isAdmin = True
    meta.props.add("repIntvEnd", prop)

    prop = PropMeta("str", "repIntvStart", "repIntvStart", 109, PropCategory.REGULAR)
    prop.label = "Reporting Start Time"
    prop.isImplicit = True
    prop.isAdmin = True
    meta.props.add("repIntvStart", prop)

    prop = PropMeta("str", "rn", "rn", 2, PropCategory.RN)
    prop.label = "None"
    prop.isRn = True
    prop.isImplicit = True
    prop.isAdmin = True
    prop.isCreateOnly = True
    meta.props.add("rn", prop)

    prop = PropMeta("str", "status", "status", 3, PropCategory.STATUS)
    prop.label = "None"
    prop.isImplicit = True
    prop.isAdmin = True
    prop._addConstant("created", "created", 2)
    prop._addConstant("deleted", "deleted", 8)
    prop._addConstant("modified", "modified", 4)
    meta.props.add("status", prop)

    def __init__(self, parentMoOrDn, markDirty=True, **creationProps):
        namingVals = []
        Mo.__init__(self, parentMoOrDn, markDirty, *namingVals,  **creationProps)



# End of package file
# ##################################################
