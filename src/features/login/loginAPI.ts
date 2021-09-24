import {
  login as solidLogin,
  logout as solidLogout,
  handleIncomingRedirect,
} from '@inrupt/solid-client-authn-browser'

export const init = async () => {
  const sessionInfo = await handleIncomingRedirect({
    url: window.location.href,
    restorePreviousSession: true,
  })
  return sessionInfo
}

export const login = async (oidcIssuer: string) => {
  try {
    await solidLogin({
      oidcIssuer,
      redirectUrl: window.location.href,
      clientName: 'Friends Crawler',
    })
  } catch (error) {
    alert(`Could not find a Solid Pod at ${oidcIssuer}`)
    localStorage.removeItem('idp')
  }
}

export const logout = async () => {
  await solidLogout()
}
