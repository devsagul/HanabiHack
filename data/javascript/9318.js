var Vehicle = (function () {
    function Vehicle(vehicle, time) {
        this.dirTag = vehicle.dirTag;
        this.heading = vehicle.heading;
        this.id = vehicle.id;
        this.lat = vehicle.lat;
        this.lon = vehicle.lon;
        this.predictable = vehicle.predictable;
        this.routeTag = vehicle.routeTag;
        this.secsSinceReport = vehicle.secsSinceReport;
        this.speedKmHr = vehicle.speedKmHr;
        this.time = time;
    }
    return Vehicle;
}());
