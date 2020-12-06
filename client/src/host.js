let host

const getHost = () => {
    if (process.env.NODE_ENV === 'production') {
        host = process.env.REACT_APP_PRODUCTION_SERVER
    } else {
        host = process.env.REACT_APP_DEVELOPMENT_SERVER
    }
}

getHost()

export default host