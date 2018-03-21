export const providers = state => state.data.providers
export const pages = state => state.data.pages

export const isViewing = state => {
  let providerID = state.data.isViewing
  if (!providerID) {
    return {
      provider: { name: 'Choose a company to view' },
      sessionsPageviews: []
    }
  } else {
    let provider = state.data.providers.filter((p) => p.id === providerID)[0]
    let sessions = state.data.sessions.filter((s) => s.provider === providerID)
    let pageviews = state.data.pageviews
    let sessionIdsFromPageviews = state.data.pageviews.map((v) => v.session)
    let sessionsPageviews = sessions.filter((s) => {
      return sessionIdsFromPageviews.indexOf(s.id) > -1
    }).map((sess) => {
      sess.views = []
      pageviews.forEach((v) => {
        if (v.session === sess.id) {
          sess.views.push(v)
        }
      })
      return sess
    })
    return {provider, sessionsPageviews}
  }
}
export const error = state => state.data.error

export const providersWithPageviews = state => {
  let sessionIdsFromPageviews = state.data.pageviews.map((v) => v.session)
  let sessions = state.data.sessions.filter((s) => (sessionIdsFromPageviews.indexOf(s.id) > -1))
  let providerIdsFromSessions = sessions.map((s) => s.provider)
  let providers = state.data.providers.filter((p) => (providerIdsFromSessions.indexOf(p.id) > -1))
  return providers
}
