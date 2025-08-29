/**
 * Performance monitoring utilities for enterprise-level applications
 * These utilities help track and optimize application performance
 */

import type { PerformanceMetrics, AnalyticsEvent } from '@/types';

/**
 * Performance monitoring class
 */
export class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  private metrics: Map<string, PerformanceMetrics> = new Map();
  private observers: Set<(metrics: PerformanceMetrics) => void> = new Set();

  private constructor() {
    this.initializePerformanceObserver();
  }

  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor();
    }
    return PerformanceMonitor.instance;
  }

  /**
   * Initialize performance observer for automatic metrics collection
   */
  private initializePerformanceObserver(): void {
    if (typeof window === 'undefined' || !('PerformanceObserver' in window)) {
      return;
    }

    try {
      // Observe navigation timing
      const navigationObserver = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          if (entry.entryType === 'navigation') {
            const navEntry = entry as PerformanceNavigationTiming;
            this.recordPageLoadMetrics(navEntry);
          }
        });
      });
      navigationObserver.observe({ entryTypes: ['navigation'] });

      // Observe resource timing
      const resourceObserver = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          if (entry.entryType === 'resource') {
            const resourceEntry = entry as PerformanceResourceTiming;
            this.recordResourceMetrics(resourceEntry);
          }
        });
      });
      resourceObserver.observe({ entryTypes: ['resource'] });

      // Observe long tasks
      const longTaskObserver = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          if (entry.entryType === 'longtask') {
            const longTaskEntry = entry as PerformanceLongTaskTiming;
            this.recordLongTaskMetrics(longTaskEntry);
          }
        });
      });
      longTaskObserver.observe({ entryTypes: ['longtask'] });
    } catch (error) {
      console.warn('Performance observer initialization failed:', error);
    }
  }

  /**
   * Record page load performance metrics
   */
  private recordPageLoadMetrics(navEntry: PerformanceNavigationTiming): void {
    const metrics: PerformanceMetrics = {
      pageLoadTime: navEntry.loadEventEnd - navEntry.loadEventStart,
      componentRenderTime: 0, // Will be set by component-specific measurements
      apiResponseTime: 0, // Will be set by API calls
      memoryUsage: this.getMemoryUsage(),
    };

    this.metrics.set('pageLoad', metrics);
    this.notifyObservers(metrics);
  }

  /**
   * Record resource loading metrics
   */
  private recordResourceMetrics(resourceEntry: PerformanceResourceTiming): void {
    const resourceMetrics: PerformanceMetrics = {
      pageLoadTime: 0,
      componentRenderTime: 0,
      apiResponseTime: resourceEntry.responseEnd - resourceEntry.requestStart,
      memoryUsage: this.getMemoryUsage(),
    };

    this.metrics.set(`resource_${resourceEntry.name}`, resourceMetrics);
  }

  /**
   * Record long task metrics
   */
  private recordLongTaskMetrics(longTaskEntry: PerformanceLongTaskTiming): void {
    const longTaskMetrics: PerformanceMetrics = {
      pageLoadTime: 0,
      componentRenderTime: longTaskEntry.duration,
      apiResponseTime: 0,
      memoryUsage: this.getMemoryUsage(),
    };

    this.metrics.set(`longTask_${Date.now()}`, longTaskMetrics);
    
    // Log long tasks in development
    if (process.env.NODE_ENV === 'development') {
      console.warn('Long task detected:', {
        duration: longTaskEntry.duration,
        startTime: longTaskEntry.startTime,
        name: longTaskEntry.name,
      });
    }
  }

  /**
   * Get memory usage information
   */
  private getMemoryUsage(): number {
    if ('memory' in performance) {
      const memory = (performance as any).memory;
      return memory.usedJSHeapSize || 0;
    }
    return 0;
  }

  /**
   * Measure component render time
   */
  measureComponentRender(componentName: string, renderFunction: () => void): void {
    const startTime = performance.now();
    
    try {
      renderFunction();
    } finally {
      const endTime = performance.now();
      const renderTime = endTime - startTime;
      
      const metrics: PerformanceMetrics = {
        pageLoadTime: 0,
        componentRenderTime: renderTime,
        apiResponseTime: 0,
        memoryUsage: this.getMemoryUsage(),
      };
      
      this.metrics.set(`component_${componentName}`, metrics);
      
      // Warn about slow renders
      if (renderTime > 16) { // 16ms = 60fps threshold
        console.warn(`Slow component render detected: ${componentName} took ${renderTime.toFixed(2)}ms`);
      }
    }
  }

  /**
   * Measure API response time
   */
  async measureApiCall<T>(
    apiCall: () => Promise<T>,
    endpoint: string
  ): Promise<T> {
    const startTime = performance.now();
    
    try {
      const result = await apiCall();
      const endTime = performance.now();
      const responseTime = endTime - startTime;
      
      const metrics: PerformanceMetrics = {
        pageLoadTime: 0,
        componentRenderTime: 0,
        apiResponseTime: responseTime,
        memoryUsage: this.getMemoryUsage(),
      };
      
      this.metrics.set(`api_${endpoint}`, metrics);
      
      // Warn about slow API calls
      if (responseTime > 1000) { // 1 second threshold
        console.warn(`Slow API call detected: ${endpoint} took ${responseTime.toFixed(2)}ms`);
      }
      
      return result;
    } catch (error) {
      const endTime = performance.now();
      const responseTime = endTime - startTime;
      
      // Record failed API call metrics
      const metrics: PerformanceMetrics = {
        pageLoadTime: 0,
        componentRenderTime: 0,
        apiResponseTime: responseTime,
        memoryUsage: this.getMemoryUsage(),
      };
      
      this.metrics.set(`api_${endpoint}_failed`, metrics);
      throw error;
    }
  }

  /**
   * Get all recorded metrics
   */
  getMetrics(): Map<string, PerformanceMetrics> {
    return new Map(this.metrics);
  }

  /**
   * Get metrics for a specific key
   */
  getMetricsForKey(key: string): PerformanceMetrics | undefined {
    return this.metrics.get(key);
  }

  /**
   * Clear all metrics
   */
  clearMetrics(): void {
    this.metrics.clear();
  }

  /**
   * Subscribe to metrics updates
   */
  subscribe(observer: (metrics: PerformanceMetrics) => void): () => void {
    this.observers.add(observer);
    
    return () => {
      this.observers.delete(observer);
    };
  }

  /**
   * Notify all observers of metrics updates
   */
  private notifyObservers(metrics: PerformanceMetrics): void {
    this.observers.forEach(observer => {
      try {
        observer(metrics);
      } catch (error) {
        console.error('Error in performance observer:', error);
      }
    });
  }

  /**
   * Generate performance report
   */
  generateReport(): {
    summary: {
      totalMetrics: number;
      averagePageLoadTime: number;
      averageComponentRenderTime: number;
      averageApiResponseTime: number;
      memoryUsage: number;
    };
    details: Map<string, PerformanceMetrics>;
  } {
    const metricsArray = Array.from(this.metrics.values());
    
    if (metricsArray.length === 0) {
      return {
        summary: {
          totalMetrics: 0,
          averagePageLoadTime: 0,
          averageComponentRenderTime: 0,
          averageApiResponseTime: 0,
          memoryUsage: 0,
        },
        details: new Map(),
      };
    }

    const pageLoadTimes = metricsArray.map(m => m.pageLoadTime).filter(t => t > 0);
    const componentRenderTimes = metricsArray.map(m => m.componentRenderTime).filter(t => t > 0);
    const apiResponseTimes = metricsArray.map(m => m.apiResponseTime).filter(t => t > 0);
    const memoryUsage = metricsArray[metricsArray.length - 1]?.memoryUsage || 0;

    return {
      summary: {
        totalMetrics: metricsArray.length,
        averagePageLoadTime: pageLoadTimes.length > 0 
          ? pageLoadTimes.reduce((a, b) => a + b, 0) / pageLoadTimes.length 
          : 0,
        averageComponentRenderTime: componentRenderTimes.length > 0 
          ? componentRenderTimes.reduce((a, b) => a + b, 0) / componentRenderTimes.length 
          : 0,
        averageApiResponseTime: apiResponseTimes.length > 0 
          ? apiResponseTimes.reduce((a, b) => a + b, 0) / apiResponseTimes.length 
          : 0,
        memoryUsage,
      },
      details: new Map(this.metrics),
    };
  }
}

/**
 * Performance hooks for React components
 */
export function usePerformanceMonitor() {
  const monitor = PerformanceMonitor.getInstance();

  const measureRender = React.useCallback((componentName: string, renderFunction: () => void) => {
    monitor.measureComponentRender(componentName, renderFunction);
  }, [monitor]);

  const measureApiCall = React.useCallback(async <T>(
    apiCall: () => Promise<T>,
    endpoint: string
  ): Promise<T> => {
    return monitor.measureApiCall(apiCall, endpoint);
  }, [monitor]);

  const subscribe = React.useCallback((observer: (metrics: PerformanceMetrics) => void) => {
    return monitor.subscribe(observer);
  }, [monitor]);

  const getMetrics = React.useCallback(() => {
    return monitor.getMetrics();
  }, [monitor]);

  const generateReport = React.useCallback(() => {
    return monitor.generateReport();
  }, [monitor]);

  return {
    measureRender,
    measureApiCall,
    subscribe,
    getMetrics,
    generateReport,
  };
}

/**
 * Higher-order component for performance monitoring
 */
export function withPerformanceMonitoring<P extends object>(
  Component: React.ComponentType<P>,
  componentName: string
): React.ComponentType<P> {
  return function WithPerformanceMonitoring(props: P) {
    const { measureRender } = usePerformanceMonitor();

    React.useEffect(() => {
      measureRender(componentName, () => {
        // Component has rendered
      });
    });

    return <Component {...props} />;
  };
}

/**
 * Performance optimization utilities
 */
export class PerformanceOptimizer {
  /**
   * Debounce function calls
   */
  static debounce<T extends (...args: any[]) => any>(
    func: T,
    wait: number
  ): (...args: Parameters<T>) => void {
    let timeout: NodeJS.Timeout;
    
    return (...args: Parameters<T>) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  }

  /**
   * Throttle function calls
   */
  static throttle<T extends (...args: any[]) => any>(
    func: T,
    limit: number
  ): (...args: Parameters<T>) => void {
    let inThrottle: boolean;
    
    return (...args: Parameters<T>) => {
      if (!inThrottle) {
        func(...args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }

  /**
   * Memoize expensive calculations
   */
  static memoize<T extends (...args: any[]) => any>(
    func: T,
    getKey?: (...args: Parameters<T>) => string
  ): T {
    const cache = new Map<string, ReturnType<T>>();
    
    return ((...args: Parameters<T>) => {
      const key = getKey ? getKey(...args) : JSON.stringify(args);
      
      if (cache.has(key)) {
        return cache.get(key);
      }
      
      const result = func(...args);
      cache.set(key, result);
      return result;
    }) as T;
  }

  /**
   * Lazy load components
   */
  static lazyLoad<T extends React.ComponentType<any>>(
    importFunc: () => Promise<{ default: T }>,
    fallback?: React.ReactNode
  ): React.LazyExoticComponent<T> {
    return React.lazy(importFunc);
  }

  /**
   * Intersection observer for lazy loading
   */
  static useIntersectionObserver(
    options: IntersectionObserverInit = {}
  ): [React.RefObject<HTMLElement>, boolean] {
    const [isIntersecting, setIsIntersecting] = React.useState(false);
    const ref = React.useRef<HTMLElement>(null);

    React.useEffect(() => {
      const element = ref.current;
      if (!element) return;

      const observer = new IntersectionObserver(([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      }, options);

      observer.observe(element);

      return () => {
        observer.unobserve(element);
      };
    }, [options]);

    return [ref, isIntersecting];
  }
}

/**
 * Web Vitals monitoring
 */
export class WebVitalsMonitor {
  /**
   * Measure Core Web Vitals
   */
  static measureWebVitals(): void {
    if (typeof window === 'undefined') return;

    // Measure Largest Contentful Paint (LCP)
    if ('PerformanceObserver' in window) {
      try {
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          
          if (lastEntry) {
            const lcp = lastEntry.startTime;
            this.recordWebVital('LCP', lcp);
          }
        });
        
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
      } catch (error) {
        console.warn('LCP measurement failed:', error);
      }
    }

    // Measure First Input Delay (FID)
    if ('PerformanceObserver' in window) {
      try {
        const fidObserver = new PerformanceObserver((list) => {
          list.getEntries().forEach((entry) => {
            const fid = entry.processingStart - entry.startTime;
            this.recordWebVital('FID', fid);
          });
        });
        
        fidObserver.observe({ entryTypes: ['first-input'] });
      } catch (error) {
        console.warn('FID measurement failed:', error);
      }
    }

    // Measure Cumulative Layout Shift (CLS)
    if ('PerformanceObserver' in window) {
      try {
        let clsValue = 0;
        let clsEntries: PerformanceEntry[] = [];
        
        const clsObserver = new PerformanceObserver((list) => {
          list.getEntries().forEach((entry) => {
            if (!clsEntries.includes(entry)) {
              clsEntries.push(entry);
              clsValue += (entry as any).value;
              this.recordWebVital('CLS', clsValue);
            }
          });
        });
        
        clsObserver.observe({ entryTypes: ['layout-shift'] });
      } catch (error) {
        console.warn('CLS measurement failed:', error);
      }
    }
  }

  /**
   * Record web vital metric
   */
  private static recordWebVital(name: string, value: number): void {
    const monitor = PerformanceMonitor.getInstance();
    
    const metrics: PerformanceMetrics = {
      pageLoadTime: 0,
      componentRenderTime: 0,
      apiResponseTime: 0,
      memoryUsage: 0,
    };
    
    monitor.metrics.set(`webVital_${name}`, metrics);
    
    // Log web vitals in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`Web Vital - ${name}:`, value);
    }
  }
}

// Initialize web vitals monitoring
if (typeof window !== 'undefined') {
  WebVitalsMonitor.measureWebVitals();
}
