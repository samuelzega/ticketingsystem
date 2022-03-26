var nodeError = [
    'Error',
    'EvalError',
    'InternalError',
    'RangeError',
    'ReferenceError',
    'SyntaxError',
    'TypeError',
    'URIError',
    'ValidationError',
]
var mongooseError = [
    'MongooseError',
    'DisconnectedError',
    'DivergentArrayError',
    'MissingSchemaError',
    'DocumentNotFoundError',
    'MissingSchemaError',
    'ObjectExpectedError',
    'ObjectParameterError',
    'OverwriteModelError',
    'ParallelSaveError',
    'StrictModeError',
    'VersionError',
]
var mongooseErrorFromClient = ['CastError', 'ValidatorError', 'ValidationError']
var jwtError = ['TokenExpiredError', 'JsonWebTokenError', 'NotBeforeError']

function nodeErrorMessage(message) {
    switch (message) {
        case 'User not registered': {
            return 404
        }
        case 'Token is undefined': {
            return 403
        }
        case 'User not found': {
            return 403
        }
        case 'Email already exist': {
            return 403
        }
        case 'Not Authorized': {
            return 401
        }
        case 'Authentication Failed!': {
            return 401
        }
        case 'Email is Invalid!': {
            return 400
        }
        case 'Password is Invalid!': {
            return 400
        }
        case 'Skill length must bigger than 3': {
            return 400
        }
        case 'Incorrect password for register as admin': {
            return 400
        }
        case 'Item id not found': {
            return 400
        }
        case 'Email or Password is invalid': {
            return 400
        }
        default: {
            return 500
        }
    }
}

function stripeErrorMessage(message) {}

module.exports = function (errorObject) {
    // console.log("===ERROR OBJECT===")
    // console.log(errorObject)
    // console.log("===ERROR STACK===")
    // console.log(errorObject.stack);
    let statusCode = 500
    let returnObj = {
        error: errorObject,
    }
    if (jwtError.includes(errorObject.name)) {
        statusCode = 403
        returnObj.message = 'Token is Invalid'
        returnObj.source = 'jwt'
    } else if (nodeError.includes(errorObject.name)) {
        returnObj.error = JSON.parse(
            JSON.stringify(errorObject, [
                'message',
                'arguments',
                'type',
                'name',
            ])
        )
        returnObj.source = 'node'
        statusCode = nodeErrorMessage(errorObject.message)
        returnObj.message = errorObject.message
    } else if (mongooseError.includes(errorObject.name)) {
        returnObj.source = 'database'
        returnObj.message = 'Error from server'
    } else if (mongooseErrorFromClient.includes(errorObject.name)) {
        returnObj.source = 'database'
        errorObject.message
            ? (returnObj.message = errorObject.message)
            : (returnObj.message = 'Bad Request')
        statusCode = 400
    } else {
        returnObj.source = 'unknown error'
        returnObj.message = 'Something error'
    }
    returnObj.statusCode = statusCode

    // console.log(returnObj, 'ini di error handling')

    return returnObj
}
