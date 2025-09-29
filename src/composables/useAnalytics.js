export function useAnalytics() {
  const trackEvent = (eventName, parameters = {}) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', eventName, {
        ...parameters,
        page_path: window.location.pathname,
        page_location: window.location.href
      })
    }
  }
  
  const trackPageView = (pagePath) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', 'UA-167607612-1', {
        page_path: pagePath
      })
    }
  }
  
  const trackDownload = (fileName) => {
    trackEvent('file_download', {
      file_name: fileName,
      file_extension: fileName.split('.').pop()
    })
  }
  
  const trackOutboundLink = (url) => {
    trackEvent('click', {
      event_category: 'outbound',
      event_label: url,
      transport_type: 'beacon'
    })
  }
  
  const trackSearch = (searchTerm) => {
    trackEvent('search', {
      search_term: searchTerm
    })
  }
  
  const trackSocialShare = (network, url) => {
    trackEvent('share', {
      method: network,
      content_type: 'website',
      item_id: url
    })
  }
  
  const trackError = (error, fatal = false) => {
    trackEvent('exception', {
      description: error.message || error,
      fatal: fatal
    })
  }
  
  return {
    trackEvent,
    trackPageView,
    trackDownload,
    trackOutboundLink,
    trackSearch,
    trackSocialShare,
    trackError
  }
}
