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
    let sessionsPageviews = sessions.map((s) => {
      s.views = []
      pageviews.forEach((v) => {
        if (v.session === s.id) {
          s.views.push(v)
        }
      })
      return s
    })
    return {provider, sessionsPageviews}
  }
}
export const error = state => state.data.error
