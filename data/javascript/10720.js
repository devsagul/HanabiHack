module.exports = {
    name: 'no-orphans',
    comment: 'Modules without any incoming or outgoing dependencies might indicate unused code.',
    severity: 'warn',
    from: {
        orphan: true,
        pathNot: '\\.d\\.ts$'
    },
    to: {}
};
