import { onMounted } from 'vue'

export function usePerformance() {
  onMounted(() => {
    // Report Core Web Vitals
    if ('PerformanceObserver' in window) {
      // Largest Contentful Paint (LCP)
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        const lastEntry = entries[entries.length - 1]
        console.log('LCP:', lastEntry.renderTime || lastEntry.loadTime)
      })
      
      try {
        lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true })
      } catch (e) {
        // LCP not supported
      }
      
      // First Input Delay (FID)
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        entries.forEach((entry) => {
          console.log('FID:', entry.processingStart - entry.startTime)
        })
      })
      
      try {
        fidObserver.observe({ type: 'first-input', buffered: true })
      } catch (e) {
        // FID not supported
      }
      
      // Cumulative Layout Shift (CLS)
      let clsValue = 0
      let clsEntries = []
      
      const clsObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!entry.hadRecentInput) {
            const firstSessionEntry = clsEntries[0]
            const lastSessionEntry = clsEntries[clsEntries.length - 1]
            
            if (entry.startTime - lastSessionEntry?.startTime < 1000 &&
                entry.startTime - firstSessionEntry?.startTime < 5000) {
              clsEntries.push(entry)
              clsValue += entry.value
            } else {
              clsEntries = [entry]
              clsValue = entry.value
            }
            
            console.log('CLS:', clsValue)
          }
        }
      })
      
      try {
        clsObserver.observe({ type: 'layout-shift', buffered: true })
      } catch (e) {
        // CLS not supported
      }
    }
    
    // Log navigation timing
    window.addEventListener('load', () => {
      setTimeout(() => {
        const perfData = window.performance.timing
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart
        const connectTime = perfData.responseEnd - perfData.requestStart
        const renderTime = perfData.domComplete - perfData.domLoading
        
        console.log('Performance Metrics:')
        console.log('Page Load Time:', pageLoadTime, 'ms')
        console.log('Connect Time:', connectTime, 'ms')
        console.log('Render Time:', renderTime, 'ms')
      }, 0)
    })
  })
  
  return {
    // Could expose methods to track custom metrics
  }
}
