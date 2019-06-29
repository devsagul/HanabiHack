async function sendTokenBack ( uid, roles, options ) {
	let token = options.jwt.encode(
		options.jwtConfig.defaultToken || { issueDate: Date.now(), uid: uid, roles: roles },
		options.jwtConfig.secret,
		options.jwtConfig.algorithm || 'HS512'
	)
	let headers = {}
	headers[ options.jwtConfig.key ] = token

	return { result: { message: 'Done.' }, options: { contentType: 'text/html', headers: headers } }
}

exports.apiDocs = function ( radiation, rest, harcon, options ) {
	options.pathToIgnore.push( options.context + options.path )
	rest.get( { path: options.path, context: options.context, version: options.version }, async function (request, content) {
		return radiation.entityURIs( )
	}, { contentType: 'text/html' } )
}

exports.buildUp = function ( radiation, rest, harcon, options ) {
	options.pathToIgnore.push( options.jwtConfig.acquireURI )

	let context = '', path = options.jwtConfig.acquireURI
	let separatorIndex = options.jwtConfig.acquireURI.lastIndexOf( '/' )
	if ( separatorIndex > 0 ) {
		context = options.jwtConfig.acquireURI.substring( 0, separatorIndex )
		path = options.jwtConfig.acquireURI.substring( separatorIndex )
	}
	rest.get( { path: path, context: context, version: '1.0.0' }, async function ( request, content ) {
		return sendTokenBack( 0, [ 'guest' ], options )
	}, { options: true } )
}
